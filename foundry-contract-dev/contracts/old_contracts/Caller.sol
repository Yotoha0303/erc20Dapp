// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./interfaces/MyToken.sol";

//调用者合约
contract Caller {
    MyToken public proxy;

    constructor(address _proxyAddress) {
        proxy = MyToken(_proxyAddress);
    }

    function mint(address to, uint256 amount) external {
        proxy.mint(to, amount);
    }

    function balanceOf(address account) external view returns (uint256) {
        return proxy.balanceOf(account);
    }
}
