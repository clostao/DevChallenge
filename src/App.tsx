import React, {useEffect, useState} from 'react';
import logo from './unifi.svg';
import './App.css';
import config from './config/network.config';
import WalletManager from "./services/WalletManager";
import ContractManager from "./services/ContractManager";
import { ethers } from "ethers";

let walletManager = new WalletManager(), contractManager = new ContractManager();

function App() {
  const [wallet, setWallet] : [{address: string, chainId: number, signer ?: ethers.providers.JsonRpcSigner }, Function] = useState({address: '0x0000000000000000000000000000000000000000', chainId: -1 });
  const [buttonsEnabled, setButtonsEnabled] = useState(false);
  const [writePending, setWritePending] = useState(false);
  const [lastNumValue, setLastNumValue] : [any, Function] = useState(null);
  useEffect(() => {
      walletManager.getWalletInformation().then((wallet) => {
          setWallet(wallet);
      });
  }, []);
  useEffect(() => {
      if (config.contract[wallet.chainId] == null) return;
      try {
          contractManager.init(config.contract[wallet.chainId] || "", wallet.signer);
          setButtonsEnabled(true);
      } catch (e) {
          setButtonsEnabled(false);
      }
  }, [wallet.chainId, wallet.signer])
  return (
    <div className="App">
      <div className="App-logo">
        <img src={logo} alt="Unifi Protocol"/>
      </div>
      <div className="App-description">
          Dev Challenge by Carlos Lostao
      </div>
      <div className="App-wallet">
        <>Wallet</>
        <div className="App-wallet-info">
            <div>Address: { wallet.address } </div>
            <div>Network: { (config.networks[wallet.chainId]) || 'Custom'} </div>
        </div>
      </div>
      <div className="App-contract">
          <>Contract</>
          <div className="App-contract-info">
              <div>Address: { config.contract[wallet.chainId] || 'Not in this network'}</div>
              <div>Actions</div>
              {
                  (buttonsEnabled) ? <div className="App-contract-actions">
                      <button onClick={async () => setLastNumValue(await contractManager.getLastNum()) }>Read LastNum</button>
                      <button className={writePending ? 'disabled' : ''} disabled={writePending} onClick={async () => {
                          setWritePending(true);
                          await contractManager.assessMe("123456789012345678901012345678901").then(e => e.wait())
                              .then(e => {
                                  setWritePending(false);
                                  if (e == null) alert('Transaction failed =(');
                              });
                          setLastNumValue(await contractManager.getLastNum());
                      }}>{ writePending ? "Pending..." : "Write LastNum"}</button>
                  </div> : <div>
                      Sorry, we don't support this network yet.
                  </div>
              }
          </div>
      </div>
      { buttonsEnabled && lastNumValue != null && <div className="App-contract-value">
              The LastNum value is: {lastNumValue && lastNumValue?.toString()}
          </div>
      }
    </div>
  );
}

export default App;
