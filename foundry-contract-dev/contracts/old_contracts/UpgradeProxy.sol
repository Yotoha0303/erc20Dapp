// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

//代理合约
contract UpgradeProxy{
    address public implementation;
    address public admin;

    constructor(address _implementation){
        admin = msg.sender;
        implementation = _implementation;
    }

    function upgrade(address _newImplementation) public{
        require(msg.sender == admin,"Only admin");
        implementation = _newImplementation;
    }

    fallback() external payable{
        (bool success,bytes memory data)=implementation.delegatecall(msg.data);
        require(success, "Delegatecall failed");
    }
}