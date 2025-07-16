// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Test} from "forge-std/Test.sol";
import {MyToken} from "../contracts/MyToken.sol";

//2、模糊测试合约
contract MyTokenFuzzTest is Test{
    MyToken public token;

    function setUp() public{
        token = new MyToken();
    }
}