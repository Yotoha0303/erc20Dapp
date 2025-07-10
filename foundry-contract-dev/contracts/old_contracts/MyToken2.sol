// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./MyToken.sol";
import "./DividendLogic.sol";

//MyToken(V2)
contract MyToken2 is MyToken,DividendLogic{
    
    constructor(
        uint256 initialSupply
    ) MyToken(initialSupply) {
        _mint(msg.sender, initialSupply);
    }
}
