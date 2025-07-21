foundry.toml
```
[dependencies]
openzeppelin-contracts-upgradeable = { version = "v4.9.3" , git = "https://github.com/OpenZeppelin/openzeppelin-contracts-upgradeable" }
```

remapping.txt
```
@openzeppelin/contracts/=lib/openzeppelin-contracts-upgradeable/lib/openzeppelin-contracts/contracts/
@openzeppelin/contracts-upgradeable/=lib/openzeppelin-contracts-upgradeable/contracts/
```

## 流程记录
1、合约开发
合约标准、openzeppelin版本确认与安装
2、模块化与可升级合约设计
合约功能拆分、更换可升级的依赖
3、foundry测试
参考备忘录中的测试方法和类型，并进行gas优化、存储优化，最后编写报告
4、部署（脚本）
合约：本地部署、测试网部署部署、多链部署
前端：将合约地址写到前端，并转换为前端可读取的abi
5、编写文档
技术文档、项目文档

## 进度记录
1、[]openzeppelin安装管理与维护
2、[]参考`备忘录.md`完成合约测试
3、[]部署
4、[]编写技术文档