import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { useWallet } from './hooks/useWallet';
import { TOKEN_ABI, TOKEN_ADDRESS } from './contracts/MyToken';

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
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1> {tokenName} Dapp</h1>
      <p>🧾 当前地址: {account}</p>
      <p>💰 当前余额: {balance} {tokenName}</p>

      <hr style={{ margin: '1rem 0' }} />

      {/* Mint */}
      <h3>🔨 Mint</h3>
      <input
        type="number"
        step="0.01"
        value={mintAmount}
        onChange={(e) => setMintAmount(e.target.value)}
      />
      <button onClick={handleMint}>Mint</button>

      <hr style={{ margin: '1rem 0' }} />

      {/* Transfer */}
      <h3>📤 Transfer</h3>
      <input
        type="text"
        placeholder="接收地址"
        value={transferTo}
        onChange={(e) => setTransferTo(e.target.value)}
        style={{ width: '300px' }}
      />
      <br />
      <input
        type="number"
        step="0.01"
        value={transferAmount}
        onChange={(e) => setTransferAmount(e.target.value)}
      />
      <button onClick={handleTransfer}>Transfer</button>

      <hr style={{ margin: '1rem 0' }} />

      {/* Burn */}
      <h3>🔥 Burn</h3>
      <input
        type="text"
        placeholder="销毁地址"
        value={burnFrom}
        onChange={(e) => setBurnFrom(e.target.value)}
        style={{ width: '300px' }}
      />
      <br />
      <input
        type="number"
        step="0.01"
        value={burnAmount}
        onChange={(e) => setBurnAmount(e.target.value)}
      />
      <button onClick={handleBurn}>Burn</button>
      <hr style={{ margin: '1rem 0' }} />
    </div>
  );
}

export default App;
