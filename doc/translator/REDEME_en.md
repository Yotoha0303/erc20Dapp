**中文 | [English](https://github.com/Yotoha0303/ERC20_Dapp_Project/blob/main/REDEME_en.md)**
# Start

```
cd dapp-front-dev

npm i

npm run dev
```

# Project name: ERC20 + front-end Dapp project

## Project Overview

This project is a front-end DApp based on ERC20 contracts, which aims to simulate the token issuance and management process. It has functions such as on-chain coin issuance, authorized transfer, and destruction, covering basic interactions, security testing, and engineering deployment to meet real business development scenarios.

**Implementation ideas**: Build contracts through openzeppelin and ERC20, test them through foundry, use react+vite to build the front end, realize metamask connection, and complete transfer, authorization, casting, destruction, and dividends.

Special content description:

1. Authorization, minting, destruction and dividend management can only be used by contract providers, and other users cannot use it.

2. When users authorize tokens, there are two possibilities.

1) Directly authorize other users to use their own tokens

2) After the tokens are authorized, they are directly withdrawn by the authorized account

**Technology stack**:

| Technical tools | Version | Tool purpose |
| -------------- | -------------------------------- | ------------------ |
| solidity | 0.8.26 | Project infrastructure, contract |
| openzeppelin | Unknown (20250422 --no-commit version) | Contract security tool |
| foundry | v5 | Contract security test |
| ethers | v6 | On-chain interaction tool |
| react | v19.0.0 | Front-end framework |
| vite | 6.3.1 | Front-end build tool |
| ts(TypeScript) | 5.7.2 | Front-end script programming |
| tailwindcss | | Front-end style development |
| vercel | | Hot deployment tool |

Other tools:

alchemy, metamask, github actions

## Architecture diagram

```
[User browser]
|
|—— MetaMask (wallet connection)
|
[React front-end]
|
|—— ethers.js
|
[Alchemy RPC] ——> [Ethereum (Sepolia/Testnet)]
|
|—— ERC20 contract (mint/burn/transfer)
|—— Dividends

```

## User interaction flow chart

Simulate user usage process:

```
text copy edit user open page
↓
Click "Connect wallet"
↓
Page displays account balance
↓
[If it is Owner]
→ Mint / Burn button is visible
↓
Click operation → Trigger contract → Success prompt
```

# Front-end construction

```
//Project structure
images/ //Demo image
foundry-contract-dev/ //Contract development
doc/ //Project documentation
dapp-front-dev/ //Front-end
├── src/
│ ├── components/ # UI components
│ ├── hooks/ # Custom wallet connection Hook
│ ├── utils/ # Contract loading, constant definition
│ ├── contracts/ # Contract ABI + address
│ └── App.tsx # Main component
├── public/
├── package.json
└── vite.config.ts

```

# Project image

**[Project address](https://erc20-dapp.vercel.app/)**

<!--- ![Project_image](https://github.com/Yotoha0303/ERC20_Dapp_Project/blob/main/images/MyToken%20Dapp.png) --->
![Project_exhibition](https://github.com/Yotoha0303/erc20_dapp/blob/main/images/erc20_dapp_exhibition.png)

# Open Source License

MIT

# Contribution Guide

Welcome to submit issues and work together to improve dapp!