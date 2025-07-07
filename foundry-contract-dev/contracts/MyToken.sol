// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyToken is ERC20, Ownable {
    //新增分红逻辑
    mapping(address => uint256) public dividends; //可领取的分红
    mapping(address => uint256) public claimedDividends; //未领取的分红

    //总分红池子
    uint256 public totalDividends;
    uint256 public lastDividendTimestamp;

    //事件提醒
    event DividendDistributed(uint256 amount, uint256 timestamp);
    event DividendClaimed(address indexed user, uint256 amount);

    constructor(
        uint256 initialSupply
    ) ERC20("MyToken", "MTK") Ownable(msg.sender) {
        _mint(msg.sender, initialSupply);
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    function burn(address from, uint256 amount) public onlyOwner {
        _burn(from, amount);
    }

    //================可模块化设计部分===========================

    //添加领取分红的用户
    function addDividendsUser(address user, uint256 amount) public onlyOwner {
        require(user != address(0x0), "you can't input 0x00");

        dividends[user] = amount;
    }

    //添加批量领取分红的用户
    function addBatchDividendsUsers(
        address[] memory users,
        uint256[] memory amounts
    ) external onlyOwner {
        for (uint256 i = 0; i < users.length; i++) {
            addDividendsUser(users[i], amounts[i]);
        }
    }

    //BUG点
    function distributeDividends() external payable onlyOwner {
        require(msg.value > 0, "No MTK sent for dividends");
        require(totalSupply() > 0, "No tokens issued");

        totalDividends += msg.value;
        lastDividendTimestamp = block.timestamp;

        uint256 totalTokens = totalSupply();
        address[] memory holders = getTokenHolders();

        //gas可优化
        for (uint256 i = 0; i < holders.length; i++) {
            address holder = holders[i];
            uint256 balance = balanceOf(holder);
            if (balance > 0) {
                dividends[holder] += (msg.value * balance) / totalTokens;
            }
        }

        emit DividendDistributed(msg.value, block.timestamp);
    }

    //持有者领取分红（bug:未能领取分红）
    function claimDividends() external {
        uint256 amount = dividends[msg.sender];
        require(amount > 0, "No dividends to claim");

        dividends[msg.sender] = 0;
        claimedDividends[msg.sender] += amount;

        (bool sent, ) = msg.sender.call{value: amount}("");
        require(sent, "Failed to send MTK");

        emit DividendClaimed(msg.sender, amount);
    }

    //获取可领取的分红额度
    function getClaimableDividents(
        address user
    ) external view returns (uint256) {
        return dividends[user];
    }

    //获取当前调用者可领取的分红额度
    function getTokenHolders() internal view returns (address[] memory) {
        address[] memory holders = new address[](1);
        holders[0] = msg.sender;
        return holders;
    }

    //接受 MTK 的回退函数
    receive() external payable {}


    //===============================================================
}
