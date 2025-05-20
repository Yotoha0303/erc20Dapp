**[中文](https://github.com/Yotoha0303/ERC20_Dapp_Project) | English**
# Start

```
npm run dev
```

# Project name: ERC20 + front-end Dapp project

## Project Overview

This project is a front-end DApp based on ERC20 contracts, which aims to simulate the token issuance and management process. It has functions such as on-chain coin issuance, authorized transfer, and destruction, covering basic interactions, security testing, and engineering deployment to meet real business development scenarios.

**Implementation ideas**: Build contracts through openzeppelin and ERC20, test them through foundry, build the front-end with react+vite, realize metamask connection, and complete transfer, authorization, casting, and destruction.

Special content description:

1. Authorization and casting can only be used by contract providers, not other users.

2. There are two possibilities when users authorize tokens.

1) Directly authorize other users to use their own tokens

2) After authorizing the token, directly transfer

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
| bootstrap | | Front-end style development |

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
|—— Dividend/multi-signature contract (extension module: undeveloped)

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
→ Mint/Burn button is visible
↓
Click operation → Trigger contract → Success prompt
```

# Front-end construction

```
//Project structure
frontend/
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

![Project_image](https://github.com/Yotoha0303/ERC20_Dapp_Project/blob/main/images/MyToken%20Dapp.png)

# Open source license

MIT

# Contribution guide

Welcome to issue issues and improve dapp together!
