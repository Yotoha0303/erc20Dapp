// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/// @title IMyToken
/// @notice 用于代理合约调用的 MyToken 接口定义，包含核心 ERC20 函数与自定义函数
interface IMyToken {
    // function mint(address to, uint256 amount) external;

    // function balanceOf(address account) external view returns (uint256);

    // SPDX-License-Identifier: MIT

    /// @notice 获取指定账户的代币余额
    /// @param account 要查询余额的地址
    /// @return 余额（uint256）
    function balanceOf(address account) external view returns (uint256);

    /// @notice 向指定地址铸造新代币（仅限管理员）
    /// @param to 接收代币的地址
    /// @param amount 铸造数量
    function mint(address to, uint256 amount) external;

    /// @notice 从指定地址销毁一定数量的代币（仅限管理员）
    /// @param from 要销毁代币的地址
    /// @param amount 要销毁的数量
    function burn(address from, uint256 amount) external;

    /// @notice 获取当前合约版本号（用于验证升级）
    /// @return 版本号字符串（如："V1", "V2"）
    function getVersion() external pure returns (string memory);

    /// @notice 升级合约到新的逻辑实现（UUPS 升级专用函数，只有代理能调用）
    /// @param newImplementation 新的逻辑合约地址
    function upgradeTo(address newImplementation) external;

}