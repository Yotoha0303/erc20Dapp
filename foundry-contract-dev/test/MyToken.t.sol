// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Test} from "forge-std/Test.sol";
import {MyToken} from "../contracts/MyToken.sol";
// import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

//1、单例测试合约
contract MyTokenTest is Test{
    MyToken public token;
    address public owner = address(0x1);

    function setUp() public{
        token = new MyToken();
        //初始化合约
        token.initialize(owner,0);
    }

    function test_mint() public{
        vm.prank(owner);
        token.mint(owner,10);
        assertEq(token.balanceOf(owner), 10);
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