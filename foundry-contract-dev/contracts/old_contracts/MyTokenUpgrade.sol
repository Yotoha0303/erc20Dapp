// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract MyTokenUpgrade {
    address public admin;
    address public implementation; //新合约接口地址

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can call this function");
        _;
    }

    constructor(address _admin, address _implementation) {
        admin = _admin;
        implementation = _implementation;
    }

    //合约升级
    function upgrade(address _implementation) public onlyAdmin {
        implementation = _implementation;
    }

    //获取新合约接口地址
    function getImplementation() public view returns (address) {
        return implementation;
    }

    // fallback函数，将调用委托给逻辑合约
    fallback() external payable {
        (bool success, bytes memory data) = implementation.delegatecall(
            msg.data
        );

        //返回数据
        require(success,"Delegate call failed");
        assembly {
            return(add(data, 32), mload(data))
        }
    }
}
