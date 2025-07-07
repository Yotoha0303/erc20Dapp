// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract MyToken is ERC20, Ownable,Initializable {

    uint256 public value;

    //设置版本号
    function initialize(uint256 _setValue,uint256 initialSupply) public initializer {
        value = _setValue;
        _mint(msg.sender, initialSupply);
        _transferOwnership(msg.sender);
    }

    constructor(
        
    ) ERC20("MyToken", "MTK") Ownable() {
        
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    function burn(address from, uint256 amount) public onlyOwner{
        _burn(from, amount);
    }
}
