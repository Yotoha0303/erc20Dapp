// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./interfaces/MyToken.sol";

//调用合约
contract Caller {
    MyToken public proxy;

    constructor(address _proxyAddress) {
        proxy = MyToken(_proxyAddress);
    }

    function initialize(uint256 _setValue, uint256 initialSupply) external {
        proxy.initialize(_setValue, initialSupply);
    }

    function totalSupply() external view returns (uint256) {
        return proxy.totalSupply();
    }

    function value() external view returns (uint256) {
        return proxy.value();
    }
}
