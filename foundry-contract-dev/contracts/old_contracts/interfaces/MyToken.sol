// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface MyToken {
    function initialize(uint256 _setValue,uint256 initialSupply) external;

    function totalSupply() external view returns (uint256);

    function value() external view returns(uint256);
}