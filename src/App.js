import { useState, useEffect } from 'react';
import Web3 from 'web3';

const web3 = new Web3('http://127.0.0.1:8545/');

function App() {
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState('');
  const [privateKey, setPrivateKey] = useState('');

  useEffect(() => {
    if (account) {
      getBalance();
    }
  }, [account]);

  function createWallet() {
    const acc = web3.eth.accounts.create();
    setAccount(acc);
    console.log(acc); // Log the newly created account
  }

  function importWallet() {
    try {
      const acc = web3.eth.accounts.privateKeyToAccount(privateKey);
      setAccount(acc);
      console.log(acc); // Log the imported account
    } catch (error) {
      console.error("Error importing wallet: ", error);
    }
  }

  async function getBalance() {
    try {
      const balInWei = await web3.eth.getBalance(account.address);
      const balInEth = web3.utils.fromWei(balInWei, 'ether');
      console.log("balance: ", balInEth);
      setBalance(balInEth);
    } catch (error) {
      console.error("Error fetching balance: ", error);
    }
  }

  return (
    <div className="App flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-bold text-blue-600 mb-6">Simple Token Wallet</h1>
      
      {account ? (
        <div className="p-6 bg-white rounded-lg shadow-lg text-center">
          <h3 className="text-xl font-semibold mb-4">Account Address</h3>
          <p className="text-gray-700 break-all">{account.address}</p>
          <p className="mt-4 text-lg text-green-500">Balance: {balance} ETH</p>
        </div>
      ) : (
        <div className="flex flex-col items-center space-y-4">
          <button 
            onClick={createWallet} 
            className="px-6 py-3 bg-blue-600 text-white rounded-full font-semibold shadow-md hover:bg-blue-700 focus:outline-none"
          >
            Create Wallet
          </button>
          <div className="flex flex-col items-center">
            <input 
              type="text" 
              placeholder="Enter Private Key" 
              value={privateKey} 
              onChange={(e) => setPrivateKey(e.target.value)} 
              className="px-4 py-2 mb-2 border border-gray-300 rounded-lg focus:outline-none"
            />
            <button 
              onClick={importWallet} 
              className="px-6 py-3 bg-green-600 text-white rounded-full font-semibold shadow-md hover:bg-green-700 focus:outline-none"
            >
              Import Wallet
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
