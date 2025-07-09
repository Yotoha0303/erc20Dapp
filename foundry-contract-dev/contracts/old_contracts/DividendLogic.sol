// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

abstract contract DividendLogic is Ownable {
    // 存储在调用合约（MyToken2）中
    mapping(address => uint256) public dividends;
    mapping(address => uint256) public claimedDividends;
    uint256 public totalDividends;
    uint256 public lastDividendTimestamp;

    event DividendDistributed(uint256 amount, uint256 timestamp);
    event DividendClaimed(address indexed user, uint256 amount);

    // constructor() Ownable(msg.sender) {}

    // 初始化分红相关状态变量
    function initializeDividends() external onlyOwner {
        totalDividends = 0;
        lastDividendTimestamp = 0;
    }

    // 添加分红用户
    function addDividendsUser(address user, uint256 amount) external onlyOwner {
        require(user != address(0), "Invalid address");
        dividends[user] = amount;
    }

    // 批量添加分红用户
    function addBatchDividendsUsers(address[] memory users, uint256[] memory amounts) external onlyOwner {
        require(users.length == amounts.length, "Arrays length mismatch");
        for (uint256 i = 0; i < users.length; i++) {
            require(users[i] != address(0), "Invalid address");
            dividends[users[i]] = amounts[i];
        }
    }

    // 分发分红
    function distributeDividends(address token) external payable onlyOwner {
        require(msg.value > 0, "No ETH sent for dividends");
        require(IERC20(token).totalSupply() > 0, "No tokens issued");

        totalDividends += msg.value;
        lastDividendTimestamp = block.timestamp;

        // 假设持币者列表由 MyToken2 提供
        // address[] memory holders = IMyToken2(token).getTokenHolders();
        // uint256 totalTokens = IERC20(token).totalSupply();

        // for (uint256 i = 0; i < holders.length; i++) {
        //     address holder = holders[i];
        //     uint256 balance = IERC20(token).balanceOf(holder);
        //     if (balance > 0) {
        //         dividends[holder] += (msg.value * balance) / totalTokens;
        //     }
        // }

        emit DividendDistributed(msg.value, block.timestamp);
    }

    // 领取分红
    function claimDividends(address user) external {
        uint256 amount = dividends[user];
        require(amount > 0, "No dividends to claim");

        dividends[user] = 0;
        claimedDividends[user] += amount;

        (bool sent, ) = user.call{value: amount}("");
        require(sent, "Failed to send ETH");

        emit DividendClaimed(user, amount);
    }

    // 查询可领取分红
    function getClaimableDividends(address user) external view returns (uint256) {
        return dividends[user];
    }
}