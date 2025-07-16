// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Test} from "forge-std/Test.sol";
import {MyToken} from "../contracts/MyToken.sol";
// import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

//1、单例测试合约
contract MyTokenTest is Test{
    MyToken public token;
    // address public user = new address("user");

    function setUp() public{
        token = new MyToken();
    }

    function test_mint() public{
        // token.mint(msg.sender,10);
        // assertEq(token.balanceOf(msg.sender), 10);
    }

    function test_burn() public{

    }

    function getVersion() public{
        assertEq(token.getVersion(), "V1");
    }

    function test_authorizeUpgrade() public{
        // token._authorizeUpgrade(user);
    }
}