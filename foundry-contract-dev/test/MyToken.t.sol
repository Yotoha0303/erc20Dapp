// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Test} from "forge-std/Test.sol";
import {MyToken} from "../contracts/MyToken.sol";
// import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

//1、单例测试合约
contract MyTokenTest is Test{
    MyToken public token;
    //声明部署的合约地址
    address public owner = address(0x1);
    address public user1 = address(0x2);
    address public user2 = address(0x3);

    function setUp() public{
        token = new MyToken();
        //初始化合约
        token.initialize(owner,0);
    }

    function test_name() public{

    }

    function test_symbol() public{

    }

    function test_decimals() public{

    }

    function test_totalSupply() public{

    }

    function test_mint() public{
        vm.prank(owner);
        token.mint(owner,10);
        assertEq(token.balanceOf(owner), 10);
    }

    function test_transfer() public{

    }

    function test_transferFrom() public{

    }

    function test_approve() public{

    }

    function test_burn() public{
        //调用owner合约进行操作
        vm.prank(owner);
        
        //需要销毁10个token
        uint256 amount = 10;
        token.mint(owner,amount);
        assertEq(token.balanceOf(owner), amount);

        token.burn(owner,amount);
        assertEq(token.balanceOf(owner), 0);
    }

    function getVersion() public{
        assertEq(token.getVersion(), "V1");
    }

    function test_authorizeUpgrade() public{
        // token._authorizeUpgrade(user);
    }
}