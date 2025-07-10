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

    address[] public holders;   // 持币者列表

    event DividendDistributed(uint256 amount, uint256 timestamp);
    event DividendClaimed(address indexed user, uint256 amount);

    // 初始化分红相关状态变量
    function initializeDividends() external onlyOwner {
        totalDividends = 0;
        lastDividendTimestamp = 0;
    }

    // 添加分红用户
    function addDividendsUser(address user, uint256 amount) external onlyOwner {
        require(user != address(0), "Invalid address");
        dividends[user] = amount;
        holders.push(user);
    }

    // 批量添加分红用户
    function addBatchDividendsUsers(address[] memory users, uint256[] memory amounts) external onlyOwner {
        require(users.length == amounts.length, "Arrays length mismatch");
        for (uint256 i = 0; i < users.length; i++) {
            require(users[i] != address(0), "Invalid address");
            dividends[users[i]] = amounts[i];
        }
    }

    // 分发分红（调用代币合约进行分红，管理员调用该方法时，需要转入ETH）
    function distributeDividends(address token) external payable onlyOwner {
        //1、检查管理员是否发送了ETH
        require(msg.value > 0, "No ETH sent for dividends");
        //2、检查是否发行了代币
        require(IERC20(token).totalSupply() > 0, "No tokens issued");

        //3、将总分红数额累加
        totalDividends += msg.value;
        lastDividendTimestamp = block.timestamp;

        //4、获取代币总供应量(假设为公司总股份)
        uint256 totalTokens = IERC20(token).totalSupply();

        //5、遍历持币者列表，计算每个持币者的分红数额
        for (uint256 i = 0; i < holders.length; i++) {
            //获取分红的名单
            address holder = holders[i];
            //获取持股人投资的股份
            uint256 balance = IERC20(token).balanceOf(holder);
            if (balance > 0) {
                //按照份额将分红分发给投资者
                dividends[holder] += (msg.value * balance) / totalTokens;
            }
        }

        emit DividendDistributed(msg.value, block.timestamp);
    }

    // 领取分红
    function claimDividends(address user) external {
        //1、查看用户可领取的分红数额
        uint256 amount = dividends[user];
        require(amount > 0, "No dividends to claim");

        //2、将用户可领取的分红数额设置为0
        dividends[user] = 0;
        //3、将用户已领取的分红数额累加
        claimedDividends[user] += amount;

        //4、将用户可领取的分红数额发送给用户（bug）
        (bool sent, ) = user.call{value: amount}("");
        require(sent, "Failed to send ETH");

        emit DividendClaimed(user, amount);
    }

    // 查询可领取分红
    function getClaimableDividends(address user) external view returns (uint256) {
        return dividends[user];
    }
}