// src/hooks/useWallet.ts
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

export function useWallet() {
  const [account, setAccount] = useState<string | null>(null);
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [signer, setSigner] = useState<ethers.Signer | null>(null);

  useEffect(() => {
    const init = async () => {
        //获取window.ethereum对象
        const winEthereum  = window.ethereum;
      if (winEthereum) {
        const browserProvider = new ethers.BrowserProvider(winEthereum);
        await winEthereum.request({ method: 'eth_requestAccounts' });
        const signer = await browserProvider.getSigner();
        const address = await signer.getAddress();

        setProvider(browserProvider);
        setSigner(signer);
        setAccount(address);
      }else{
        alert(`未查找到您的钱包信息，请连接您的钱包`)
      }
    };
    init();
  }, []);

  return { account, provider, signer };
}
