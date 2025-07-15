// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Test} from "forge-std/Test.sol";
import {MyToken} from "../contracts/MyToken.sol";

//5、集成测试合约
contract MyTokenVaultTest is Test{
    MyToken public token;

    function setUp() public{
        // token = new MyToken(10000);
    }
}