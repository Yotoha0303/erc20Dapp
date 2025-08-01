**中文 | [English](https://github.com/Yotoha0303/erc20_dapp/blob/main/doc/translator/REDEME_en.md)**
# 启动

```
cd dapp-front-dev

npm i

npm run dev
```

# 项目名称：ERC20 + 前端 Dapp 项目

## 项目概述

本项目为基于 ERC20 合约的前端 DApp，旨在模拟代币发行与管理流程，具备链上发币、授权转账、销毁等功能，涵盖基础交互、安全性测试以及工程化部署，满足真实业务开发场景。

**实现思路**：通过openzeppelin和ERC20构建合约，经过foundry进行测试后，使用react+vite构建前端，实现metamask连接，完成转账、授权、铸造、销毁和分红。

特殊内容说明：

1、授权、铸造、销毁和分红管理只能由合约提供者使用，其他用户不可以使用。

2、用户在授权代币时，有两种可能。

1）直接授权其他用户使用自己的代币

2）授权代币后，由被授权账户直接提取

**技术栈**：

| 技术工具       | 版本                             | 工具用途           |
| -------------- | -------------------------------- | ------------------ |
| solidity       | 0.8.26                           | 项目基础构建，合约 |
| openzeppelin   | 未知（20250422 --no-commit版本） | 合约安全性工具     |
| foundry        | v5                               | 合约安全性测试     |
| ethers         | v6                               | 链上交互工具       |
| react          | v19.0.0                          | 前端框架           |
| vite           | 6.3.1                            | 前端构建工具       |
| ts(TypeScript) | 5.7.2                            | 前端脚本编程       |
| tailwindcss    |                                  | 前端样式开发       |
| vercel    |                                  | 热部署工具       |

其他工具:

alchemy、metamask、github actions

## 架构图

```
[用户浏览器]
    |
    |—— MetaMask（钱包连接）
    |
[React 前端]
    |
    |—— ethers.js
    |
[Alchemy RPC] ——> [Ethereum（Sepolia/Testnet）]
                     |
                     |—— ERC20 合约（mint/burn/transfer）
                     |—— 分红

```

## 用户交互流程图

模拟用户使用流程：

```
text复制编辑用户打开页面
  ↓
点击“连接钱包”
  ↓
页面展示账户余额
  ↓
[如果是 Owner]
→ 可见 Mint / Burn 按钮
  ↓
点击操作 → 触发合约 → 成功提示
```

# 前端构建

```
//项目结构
images/                //演示图片
foundry-contract-dev/  //合约开发
doc/                   //项目文档
dapp-front-dev/        //前端
├── src/
│   ├── components/        # UI组件
│   ├── hooks/             # 自定义钱包连接 Hook
│   ├── utils/             # 合约加载、常量定义
│   ├── contracts/         # 合约 ABI + 地址
│   └── App.tsx            # 主组件
├── public/
├── package.json
└── vite.config.ts

```

# 项目图片

**[项目地址](https://erc20-dapp.vercel.app/)**

<!--- ![Project_image](https://github.com/Yotoha0303/ERC20_Dapp_Project/blob/main/images/MyToken%20Dapp.png) --->
![Project_exhibition](https://github.com/Yotoha0303/erc20_dapp/blob/main/images/erc20_dapp_exhibition.png)

# 项目近况

新增分红功能中...

# 开源许可

MIT

# 贡献指南

欢迎提 Issue ，共同完善dapp！
