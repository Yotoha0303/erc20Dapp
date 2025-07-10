// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Test} from "forge-std/Test.sol";
import {MyToken} from "../contracts/MyToken.sol";

//4、revert 测试合约
//目的：验证合约是否在错误情况下正确地 revert()
contract MyTokenRevertTest is Test{
    MyToken public token;

    function setUp() public{
        token = new MyToken(10000);
    }
}