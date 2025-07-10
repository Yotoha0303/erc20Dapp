// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Test} from "forge-std/Test.sol";
import {MyToken} from "../contracts/MyToken.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyTokenTest is Test{
    MyToken public token;

    function setUp() public{
        token = new MyToken(10000);
    }

    function test_mint() public{
        token.mint(msg.sender,10);
        assertEq(token.balanceOf(msg.sender), 10);
    }
}