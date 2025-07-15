// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

//公司账户地址（股份）
contract ERC20Token is ERC20 {
    address public admin;

    constructor() ERC20("ERC20Token", "ERC20") {
        admin = msg.sender;
        _mint(msg.sender, 10000);
    }

    //只能够管理员调用，用于生成股份/持股
    function mint(address to,uint256 amount) public {
        require(msg.sender == admin);
        _mint(to,amount);
    }
}