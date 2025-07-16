// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Test} from "forge-std/Test.sol";
import {MyToken} from "../contracts/MyToken.sol";

//3、invariant 保证总供应量不变
contract MyTokenInvariantTest is Test{
    MyToken public token;

    function setUp() public{
        token = new MyToken();
    }
}