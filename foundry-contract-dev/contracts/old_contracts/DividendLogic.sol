// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

abstract contract DividendLogic {
    //新增分红逻辑
    mapping(address => uint256) public dividends; //可领取的分红
    mapping(address => uint256) public claimedDividends; //未领取的分红

    //总分红池子
    uint256 public totalDividends;
    uint256 public lastDividendTimestamp;

    //事件提醒
    event DividendDistributed(uint256 amount, uint256 timestamp);
    event DividendClaimed(address indexed user, uint256 amount);

    function owner() public view virtual returns (address);

    modifier onlyOwner(){
        require(msg.sender == owner(),"Only owner can call this function");
        _;
    }

    //添加领取分红的用户
    function addDividendsUser(address user, uint256 amount) external onlyOwner{
        require(user != 0x00, "you can't input 0x00");

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

    function distributeDividends() external payable onlyOwner{
        require(msg.value > 0, "No MTK sent for dividends");
        require(totalSupply() > 0, "No tokens issued");

        totalDividends += msg.value;
        lastDividendTimestamp = block.timestamp;

        uint256 totalTokens = totalSupply();

        //可优化点标记
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

    //持有者领取分红
    function claimDividends() external {
        uint256 amount = dividends[msg.sender];
        require(amount > 0, "No dividends to claim");

        dividends[msg.sender] = 0;
        claimDividends[msg.sender] += amount;

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

    function getTokenHolders() internal view returns (address[] memory) {
        address[] memory holders = new address[](1);
        holders[0] = msg.sender;
        return holders;
    }

    //接受 MTK 的回退函数
    receive() external payable {}

}