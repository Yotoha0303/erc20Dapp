import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useWallet } from "../hooks/useWallet";
import { TOKEN_ABI, TOKEN_ADDRESS } from "../contracts/MyToken";

export default function MainContent() {
  // 状态管理
  const { account, signer } = useWallet();
  const [singleUser, setSingleUser] = useState<string>("");
  const [multiUsers, setMultiUsers] = useState<string>("");
  const [queryAddress, setQueryAddress] = useState<string>("");
  const [claimAddress, setClaimAddress] = useState<string>("");

  // const [balance, setBalance] = useState<string>("0");
  // const [isOwner, setIsOwner] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!signer || !account) return;

      const contract = new ethers.Contract(TOKEN_ADDRESS, TOKEN_ABI, signer);

      // const name = await contract.name();
      const decimals = await contract.decimals();
      const balanceBN = await contract.balanceOf(account);

      const ownerAddress = await contract.owner();
      const isOwner = ownerAddress === account;
      setIsOwner(isOwner);

      setBalance(ethers.formatUnits(balanceBN, decimals));
    };

    fetchData();
  }, [account, signer]);

  // 添加单个分红用户
  const handleAddSingleUser = async () => {
    if (!signer || !account) return;
    try {
      const contract = new ethers.Contract(TOKEN_ADDRESS, TOKEN_ABI, signer);
      //调用合约，添加单个用户

    } catch (err) {
      console.log("AddSingleUser Error", err);
      alert("Add a single use Error:" + (err as Error).message);
    }
  };
  // 添加多个分红用户
  const handleAddMultiUsers = async () => {
    if (!signer || !account) return;
    try {
      const contract = new ethers.Contract(TOKEN_ADDRESS, TOKEN_ABI, signer);
      //调用合约，添加多个用户

    } catch (err) {
      console.log("AddMultiUsers Error", err);
      alert("Add a Multi use Error:" + (err as Error).message);
    }
  };

  // 查询分红
  const handleQueryDividend = async () => {
    if (!signer || !account) return;
    try {
      const contract = new ethers.Contract(TOKEN_ADDRESS, TOKEN_ABI, signer);
      //调用合约，查看分红

    } catch (err) {
      console.log("QueryDividend Error", err);
      alert("Query dividend Error:" + (err as Error).message);
    }
  };

  // 领取分红
  const handleClaimDividend = async () => {
    if (!signer || !account) return;
    try {
      const contract = new ethers.Contract(TOKEN_ADDRESS, TOKEN_ABI, signer);
      //调用合约，领取分红

    } catch (err) {
      console.log("ClaimDividend Error", err);
      alert("Claim dividend Error:" + (err as Error).message);
    }
  };

  return (
    <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* 添加分红用户卡片 */}
      <div className="group bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 hover:bg-white/10 hover:border-emerald-400/30 transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-emerald-500/20 transform hover:-translate-y-2">
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center mr-4 shadow-lg group-hover:shadow-emerald-500/50 transition-all duration-300">
            <span className="text-2xl">➕</span>
          </div>
          <h3 className="text-xl font-bold text-white">添加分红用户</h3>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-cyan-200 mb-2">
              单个用户地址
            </label>
            <input
              type="text"
              value={singleUser}
              onChange={(e) => setSingleUser(e.target.value)}
              className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300"
              placeholder="输入单个用户地址"
            />
          </div>
          <button
            onClick={handleAddSingleUser}
            className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-transparent shadow-lg hover:shadow-emerald-500/50"
          >
            添加单个用户
          </button>
          <div>
            <label className="block text-sm font-medium text-cyan-200 mb-2">
              多个用户地址（逗号分隔）
            </label>
            <input
              type="text"
              value={multiUsers}
              onChange={(e) => setMultiUsers(e.target.value)}
              className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300"
              placeholder="输入多个用户地址,用逗号分隔"
            />
          </div>
          <button
            onClick={handleAddMultiUsers}
            className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-transparent shadow-lg hover:shadow-emerald-500/50"
          >
            添加多个用户
          </button>
        </div>
      </div>

      {/* 分红操作卡片 */}
      <div className="group bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 hover:bg-white/10 hover:border-blue-400/30 transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-blue-500/20 transform hover:-translate-y-2">
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center mr-4 shadow-lg group-hover:shadow-blue-500/50 transition-all duration-300">
            <span className="text-2xl">💹</span>
          </div>
          <h3 className="text-xl font-bold text-white">分红操作</h3>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-cyan-200 mb-2">
              查看分红
            </label>
            <input
              type="text"
              value={queryAddress}
              onChange={(e) => setQueryAddress(e.target.value)}
              className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300"
              placeholder="输入需要查看的地址"
            />
          </div>
          <button
            onClick={handleQueryDividend}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-transparent shadow-lg hover:shadow-blue-500/50"
          >
            查看分红
          </button>
          <div>
            <label className="block text-sm font-medium text-cyan-200 mb-2">
              领取分红
            </label>
            <input
              type="text"
              value={claimAddress}
              onChange={(e) => setClaimAddress(e.target.value)}
              className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300"
              placeholder="输入需要领取的地址"
            />
          </div>
          <button
            onClick={handleClaimDividend}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-transparent shadow-lg hover:shadow-blue-500/50"
          >
            领取分红
          </button>
        </div>
      </div>
    </div>
  );
}
