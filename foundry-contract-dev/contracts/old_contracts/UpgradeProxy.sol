// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

//通用设计代理合约
contract UpgradeProxy {
    address public implementation;
    address public admin;

    event Upgraded(address indexed newImplementation);

    constructor(address _implementation) {
        admin = msg.sender;
        implementation = _implementation;
    }

    function upgrade(address _newImplementation) public {
        require(msg.sender == admin, "Only admin can upgrade");
        implementation = _newImplementation;
        emit Upgraded(_newImplementation);
    }

    fallback() external payable {
        (bool success, bytes memory data) = implementation.delegatecall(msg.data);
        require(success, "Delegatecall failed");
        assembly {
            return(add(data, 0x20), mload(data))
        }
    }

    receive() external payable {}
}