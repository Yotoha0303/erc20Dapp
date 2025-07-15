// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./interfaces/IMyToken2.sol";

//调用者合约(升级需更换)
contract Caller {
    //逻辑合约的接口
    IMyToken2 public proxy;

    constructor(address _proxyAddress) {
        //调用代理合约
        proxy = IMyToken2(_proxyAddress);

    }

    function mint(address to, uint256 amount) public {
        //通过代理合约调用功能
        proxy.mint(to, amount);
    }

    function balanceOf(address account) external returns (uint256) {
        return proxy.balanceOf(account);
    }
}
