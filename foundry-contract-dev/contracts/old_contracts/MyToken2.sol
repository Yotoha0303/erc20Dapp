// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./MyToken.sol";
import "./DividendLogic.sol";

contract MyToken2 is MyToken,DividendLogic{
    
    constructor(
        uint256 initialSupply
    ) MyToken(initialSupply) {
        _mint(msg.sender, initialSupply);
    }

    // // 初始化 MyToken2 和 DividendLogic
    // function initializeV2(address _dividendLogic) external onlyOwner {
    //     require(_dividendLogic != address(0), "Invalid DividendLogic address");
    //     dividendLogic = _dividendLogic;
    //     holders.push(msg.sender); // 临时添加调用者为持币者
    // }

    // // 代理调用 DividendLogic 的分红功能
    // function addDividendsUser(address user, uint256 amount) external onlyOwner {
    //     DividendLogic(dividendLogic).addDividendsUser(user, amount);
    // }

    // function addBatchDividendsUsers(
    //     address[] memory users,
    //     uint256[] memory amounts
    // ) external onlyOwner {
    //     DividendLogic(dividendLogic).addBatchDividendsUsers(users, amounts);
    // }

    // function distributeDividends() external payable onlyOwner {
    //     DividendLogic(dividendLogic).distributeDividends(address(this));
    // }

    // function claimDividends() external {
    //     DividendLogic(dividendLogic).claimDividends(msg.sender);
    // }

    // function getClaimableDividends(
    //     address user
    // ) external view returns (uint256) {
    //     return DividendLogic(dividendLogic).getClaimableDividends(user);
    // }

    // // 临时实现，需优化
    // function getTokenHolders()
    //     external
    //     view
    //     override
    //     returns (address[] memory)
    // {
    //     return holders;
    // }

    // // 重写 transfer 以更新持币者列表
    // function transfer(
    //     address to,
    //     uint256 amount
    // ) public override returns (bool) {
    //     super.transfer(to, amount);
    //     _updateHolders(msg.sender);
    //     _updateHolders(to);
    //     return true;
    // }

    // function _updateHolders(address user) internal {
    //     if (balanceOf(user) > 0 && !containsHolder(user)) {
    //         holders.push(user);
    //     } else if (balanceOf(user) == 0 && containsHolder(user)) {
    //         removeHolder(user);
    //     }
    // }

    // function containsHolder(address user) internal view returns (bool) {
    //     for (uint256 i = 0; i < holders.length; i++) {
    //         if (holders[i] == user) return true;
    //     }
    //     return false;
    // }

    // function removeHolder(address user) internal {
    //     for (uint256 i = 0; i < holders.length; i++) {
    //         if (holders[i] == user) {
    //             holders[i] = holders[holders.length - 1];
    //             holders.pop();
    //             break;
    //         }
    //     }
    // }
}
