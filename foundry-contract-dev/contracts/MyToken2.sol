// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./MyToken.sol";
import "./DividendLogic.sol";

//MyToken(V2)
contract MyToken2 is MyToken, DividendLogic {
    
    function initializeV2() public reinitializer(2) {
        __DividendLogic_init(); // 初始化新逻辑部分（重要！）
    }

    function getVersion() public virtual override pure returns (string memory) {
        return "V2";
    }
}
