import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useWallet } from "./hooks/useWallet";
import { TOKEN_ABI, TOKEN_ADDRESS } from "./contracts/MyToken";
import MainContent from "./components/MainContent.tsx";

function App() {
  const { account, signer } = useWallet();
  const [tokenName, setTokenName] = useState<string>("");
  const [balance, setBalance] = useState<string>("0");
  const [decimals, setDecimals] = useState<number>(18);

  const [mintAmount, setMintAmount] = useState<string>("0.01");
  const [transferTo, setTransferTo] = useState<string>("");
  const [transferAmount, setTransferAmount] = useState<string>("0.01");
  const [burnFrom, setBurnFrom] = useState<string>("");
  const [burnAmount, setBurnAmount] = useState<string>("0.01");
  const [approveFrom, setApproveFrom] = useState<string>("");
  const [approveAmount, setApproveAmount] = useState<string>("0.01");
  const [approveAddress, setApproveAddress] = useState<string>("");
  const [transferFromAddress, setTransferFromAddress] = useState<string>("");
  const [transferFromAmount, setTransferFromAmount] = useState<string>("0.01");

  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!signer || !account) return;

      const contract = new ethers.Contract(TOKEN_ADDRESS, TOKEN_ABI, signer);

      const name = await contract.name();
      const decimals = await contract.decimals();
      const balanceBN = await contract.balanceOf(account);

      const ownerAddress = await contract.owner();
      const isOwner = ownerAddress === account;
      setIsOwner(isOwner);

      setTokenName(name);
      setDecimals(decimals);
      setBalance(ethers.formatUnits(balanceBN, decimals));
    };

    fetchData();
  }, [account, signer]);

  const handleMint = async () => {
    if (!signer || !account) return;
    try {
      const contract = new ethers.Contract(TOKEN_ADDRESS, TOKEN_ABI, signer);
      const amount = ethers.parseUnits(mintAmount, decimals);
      const tx = await contract.mint(account, amount);
      await tx.wait();
      alert(`✅ Minted ${mintAmount} tokens!`);
      window.location.reload();
    } catch (err) {
      console.error("Mint Error:", err);
      alert("❌ Mint Failed: " + (err as Error).message);
    }
  };

  const handleTransfer = async () => {
    if (!signer || !account) return;
    try {
      const contract = new ethers.Contract(TOKEN_ADDRESS, TOKEN_ABI, signer);
      const amount = ethers.parseUnits(transferAmount, decimals);
      const tx = await contract.transfer(transferTo, amount);
      await tx.wait();
      alert(`✅ Transferred ${transferAmount} tokens to ${transferTo}`);
      window.location.reload();
    } catch (err) {
      console.error("Transfer Error:", err);
      alert("❌ Transfer Failed: " + (err as Error).message);
    }
  };

  const handleBurn = async () => {
    if (!signer || !account) return;
    try {
      const contract = new ethers.Contract(TOKEN_ADDRESS, TOKEN_ABI, signer);
      const amount = ethers.parseUnits(burnAmount, decimals);
      const tx = await contract.burn(burnFrom, amount);
      await tx.wait();
      alert(`🔥 Burned ${burnAmount} tokens from ${burnFrom}`);
      window.location.reload();
    } catch (err) {
      console.error("Burn Error:", err);
      alert("❌ Burn Failed: " + (err as Error).message);
    }
  };

  const handleApprove = async () => {
    if (!signer || !account) return;
    try {
      const contract = new ethers.Contract(TOKEN_ADDRESS, TOKEN_ABI, signer);
      const amount = ethers.parseUnits(approveAmount, decimals);
      const tx = await contract.approve(approveFrom, amount);
      await tx.wait();
      alert(`✅ Approve ${approveAmount} tokens from ${approveFrom}`);
      window.location.reload();
    } catch (err) {
      console.error("Approve Error:", err);
      alert("❌ Approve Failed: " + (err as Error).message);
    }
  };

  const handleTransferFrom = async () => {
    if (!signer || !account) return;
    try {
      const contract = new ethers.Contract(TOKEN_ADDRESS, TOKEN_ABI, signer);
      const amount = ethers.parseUnits(transferFromAmount, decimals);
      const tx = await contract.transferFrom(
        approveAddress,
        transferFromAddress,
        amount
      );
      await tx.wait();
      alert(
        `✅ Recipient ${transferFromAmount} tokens from ${transferFromAddress}`
      );
      window.location.reload();
    } catch (err) {
      console.log("Recipient Error:", err);
      alert("❌ Recipient Failed: " + (err as Error).message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent mb-6 animate-pulse">
            {tokenName} DApp
          </h1>
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 max-w-3xl mx-auto border border-white/10 shadow-2xl">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="text-left">
                <p className="text-cyan-200 mb-2 flex items-center">
                  <span className="font-semibold mr-2">🧾 当前地址:</span>
                </p>
                <p className="font-mono text-sm break-all bg-black/20 rounded-lg p-2 text-gray-300">
                  {account || "未连接钱包"}
                </p>
              </div>
              <div className="text-left">
                <p className="text-emerald-200 mb-2 flex items-center">
                  <span className="font-semibold mr-2">💰 当前余额:</span>
                </p>
                <p className="text-2xl font-bold text-emerald-400 bg-black/20 rounded-lg p-2">
                  {balance} {tokenName}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 功能卡片网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto mb-8">
          {/* Mint Card */}
          {isOwner?(
          <div className="group bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:bg-white/10 hover:border-emerald-400/30 transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-emerald-500/20 transform hover:-translate-y-2">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center mr-4 shadow-lg group-hover:shadow-emerald-500/50 transition-all duration-300">
                <span className="text-2xl">🔨</span>
              </div>
              <h3 className="text-xl font-bold text-white">铸造代币</h3>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-cyan-200 mb-2">
                  铸造数量
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={mintAmount}
                  onChange={(e) => setMintAmount(e.target.value)}
                  className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300"
                  placeholder="输入数量"
                />
              </div>
              <button
                onClick={handleMint}
                className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-transparent shadow-lg hover:shadow-emerald-500/50"
              >
                铸造代币
              </button>
            </div>
          </div>
          ):(
            //非管理员无法铸造
            <></>
          )}

          {/* Transfer Card */}
          <div className="group bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:bg-white/10 hover:border-blue-400/30 transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-blue-500/20 transform hover:-translate-y-2">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center mr-4 shadow-lg group-hover:shadow-blue-500/50 transition-all duration-300">
                <span className="text-2xl">📤</span>
              </div>
              <h3 className="text-xl font-bold text-white">转账代币</h3>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-cyan-200 mb-2">
                  接收地址
                </label>
                <input
                  type="text"
                  placeholder="输入接收地址"
                  value={transferTo}
                  onChange={(e) => setTransferTo(e.target.value)}
                  className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-cyan-200 mb-2">
                  转账数量
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={transferAmount}
                  onChange={(e) => setTransferAmount(e.target.value)}
                  className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300"
                  placeholder="输入数量"
                />
              </div>
              <button
                onClick={handleTransfer}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-transparent shadow-lg hover:shadow-blue-500/50"
              >
                转账代币
              </button>
            </div>
          </div>

          {/* Burn Card */}
          {isOwner?(
          <div className="group bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:bg-white/10 hover:border-red-400/30 transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-red-500/20 transform hover:-translate-y-2">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-red-600 rounded-xl flex items-center justify-center mr-4 shadow-lg group-hover:shadow-red-500/50 transition-all duration-300">
                <span className="text-2xl">🔥</span>
              </div>
              <h3 className="text-xl font-bold text-white">销毁代币</h3>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-cyan-200 mb-2">
                  销毁地址
                </label>
                <input
                  type="text"
                  placeholder="输入销毁地址"
                  value={burnFrom}
                  onChange={(e) => setBurnFrom(e.target.value)}
                  className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-cyan-200 mb-2">
                  销毁数量
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={burnAmount}
                  onChange={(e) => setBurnAmount(e.target.value)}
                  className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300"
                  placeholder="输入数量"
                />
              </div>
              <button
                onClick={handleBurn}
                className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 focus:ring-offset-transparent shadow-lg hover:shadow-red-500/50"
              >
                销毁代币
              </button>
            </div>
          </div>
        ):(
            //非管理员无法铸造
            <></>
          )}


          {/* Approve Card */}
          <div className="group bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:bg-white/10 hover:border-purple-400/30 transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-purple-500/20 transform hover:-translate-y-2">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center mr-4 shadow-lg group-hover:shadow-purple-500/50 transition-all duration-300">
                <span className="text-2xl">🔐</span>
              </div>
              <h3 className="text-xl font-bold text-white">授权代币</h3>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-cyan-200 mb-2">
                  授权地址
                </label>
                <input
                  type="text"
                  placeholder="输入授权地址"
                  value={approveFrom}
                  onChange={(e) => setApproveFrom(e.target.value)}
                  className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-cyan-200 mb-2">
                  授权数量
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={approveAmount}
                  onChange={(e) => setApproveAmount(e.target.value)}
                  className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300"
                  placeholder="输入数量"
                />
              </div>
              <button
                onClick={handleApprove}
                className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-transparent shadow-lg hover:shadow-purple-500/50"
              >
                授权
              </button>
            </div>
          </div>
        </div>

        {/* TransferFrom Card - 独立一行 */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="group bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 hover:bg-white/10 hover:border-amber-400/30 transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-amber-500/20 transform hover:-translate-y-2">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center mr-4 shadow-lg group-hover:shadow-amber-500/50 transition-all duration-300">
                <span className="text-2xl">📥</span>
              </div>
              <h3 className="text-xl font-bold text-white">获取授权代币</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-cyan-200 mb-2">
                  授权地址
                </label>
                <input
                  type="text"
                  placeholder="输入授权地址"
                  value={approveAddress}
                  onChange={(e) => setApproveAddress(e.target.value)}
                  className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-cyan-200 mb-2">
                  收取地址
                </label>
                <input
                  type="text"
                  placeholder="输入收取地址"
                  value={transferFromAddress}
                  onChange={(e) => setTransferFromAddress(e.target.value)}
                  className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-cyan-200 mb-2">
                  授权数量
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={transferFromAmount}
                  onChange={(e) => setTransferFromAmount(e.target.value)}
                  className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300"
                  placeholder="输入数量"
                />
              </div>
            </div>
            <div className="mt-6">
              <button
                onClick={handleTransferFrom}
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-transparent shadow-lg hover:shadow-amber-500/50"
              >
                收取授权代币
              </button>
            </div>
          </div>
        </div>

        {/* MainContent Component */}
        {isOwner?(
        <div className="mt-12">
          <MainContent />
        </div>
        ):(
          <></>
        )}
      </div>
    </div>
  );
}

export default App;
