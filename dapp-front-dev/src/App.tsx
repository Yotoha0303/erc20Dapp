import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { useWallet } from './hooks/useWallet';
import { TOKEN_ABI, TOKEN_ADDRESS } from './contracts/MyToken';
import MainContent from './components/MainContent.tsx'

function App() {
  const { account, signer } = useWallet();
  const [tokenName, setTokenName] = useState<string>('');
  const [balance, setBalance] = useState<string>('0');
  const [decimals, setDecimals] = useState<number>(18);

  const [mintAmount, setMintAmount] = useState<string>('0.01');
  const [transferTo, setTransferTo] = useState<string>('');
  const [transferAmount, setTransferAmount] = useState<string>('0.01');
  const [burnFrom, setBurnFrom] = useState<string>('');
  const [burnAmount, setBurnAmount] = useState<string>('0.01');

  useEffect(() => {
    const fetchData = async () => {
      if (!signer || !account) return;

      const contract = new ethers.Contract(TOKEN_ADDRESS, TOKEN_ABI, signer);
      const name = await contract.name();
      const decimals = await contract.decimals();
      const balanceBN = await contract.balanceOf(account);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
            {tokenName} DApp
          </h1>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 max-w-2xl mx-auto">
            <p className="text-blue-200 mb-2">
              <span className="font-semibold">🧾 当前地址:</span> 
              <span className="font-mono text-sm break-all">{account || '未连接钱包'}</span>
            </p>
            <p className="text-green-200">
              <span className="font-semibold">💰 当前余额:</span> 
              <span className="text-xl font-bold">{balance} {tokenName}</span>
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* Mint Card */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mr-3">
                <span className="text-xl">🔨</span>
              </div>
              <h3 className="text-xl font-semibold">铸造代币</h3>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-blue-200 mb-2">铸造数量</label>
                <input
                  type="number"
                  step="0.01"
                  value={mintAmount}
                  onChange={(e) => setMintAmount(e.target.value)}
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent text-white placeholder-gray-300"
                  placeholder="输入数量"
                />
              </div>
              <button 
                onClick={handleMint}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-transparent"
              >
                铸造代币
              </button>
            </div>
          </div>

          {/* Transfer Card */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                <span className="text-xl">📤</span>
              </div>
              <h3 className="text-xl font-semibold">转账代币</h3>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-blue-200 mb-2">接收地址</label>
                <input
                  type="text"
                  placeholder="输入接收地址"
                  value={transferTo}
                  onChange={(e) => setTransferTo(e.target.value)}
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-white placeholder-gray-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-blue-200 mb-2">转账数量</label>
                <input
                  type="number"
                  step="0.01"
                  value={transferAmount}
                  onChange={(e) => setTransferAmount(e.target.value)}
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-white placeholder-gray-300"
                  placeholder="输入数量"
                />
              </div>
              <button 
                onClick={handleTransfer}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-transparent"
              >
                转账代币
              </button>
            </div>
          </div>

          {/* Burn Card */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center mr-3">
                <span className="text-xl">🔥</span>
              </div>
              <h3 className="text-xl font-semibold">销毁代币</h3>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-blue-200 mb-2">销毁地址</label>
                <input
                  type="text"
                  placeholder="输入销毁地址"
                  value={burnFrom}
                  onChange={(e) => setBurnFrom(e.target.value)}
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent text-white placeholder-gray-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-blue-200 mb-2">销毁数量</label>
                <input
                  type="number"
                  step="0.01"
                  value={burnAmount}
                  onChange={(e) => setBurnAmount(e.target.value)}
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent text-white placeholder-gray-300"
                  placeholder="输入数量"
                />
              </div>
              <button 
                onClick={handleBurn}
                className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 focus:ring-offset-transparent"
              >
                销毁代币
              </button>
            </div>
          </div>
        </div>

        {/* MainContent Component */}
        <div className="mt-8">
          <MainContent/>
        </div>
      </div>
    </div>
  );
}

export default App;
