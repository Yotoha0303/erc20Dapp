const { error } = require("console");
const fs = require("fs");
const path = require("path")

const runFilePath = path.resolve(
    __dirname,
    ""
);
const envFilePath = path.resolve(
    __dirname,
    ""
);

try {
    const runData = JSON.parse(fs.readFileSync(runFilePath, "utf-8"))
    //bug
    const contractAddress = runData.transactions.find(tx => tx.contractName === "MyToken")?.contractAddress;

    if (!contractAddress) {
        throw new Error("Failer contract address!")
    }

    let env = fs.existsSync(envFilePath) ? fs.readFileSync(envFilePath, "utf-8") : "";
    env = env.replace(/VITE_CONTRACT_ADDRESS=.*/g, `VITE_CONTRACT_ADDRESS=${contractAddress}`);

    if (!env.includes("VITE_CONTRACT_ADDRESS")) {
        env += `\nVITE_CONTRACT_ADDRESS=${contractAddress}`
    }

    fs.writeFileSync(envFilePath, env);
    console.log("contract address was writing in front at .env file:", contractAddress)
} catch (e) {
    console.log("Failer writing contract address!",e.message);
}