// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./MyToken.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "./DividendLogic.sol";

contract MyToken2 is MyToken,Initializable,DividendLogic{

    uint256 public value;

    function initialize(uint256 _setValue) public initializer {
        value = _setValue;
    }

}