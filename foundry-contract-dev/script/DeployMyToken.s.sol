// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../contracts/MyToken2.sol";

contract MyToken is Script{
    
    function setUp() public{}

    function run() public{
        uint256 deployKey = vm.envString("DEPLOYER_PRIVATE_KEY");
        vm.startBroadcast(deployKey);

        MyToken2 myk = new MyToken2();
        console.log("Deploy MyToken at :",address(myk));

        vm.stopBroadcast();
    }
}