import { useState, useEffect } from 'react';
import Web3 from 'web3';

const web3 = new Web3('http://127.0.0.1:8545/');

function App() {
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const [recipient, setRecipient] = useState('');
  const [error, setError] = useState('');
  const [amount, setAmount] = useState('')

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
      setError('')
    } catch (error) {
      console.error("Error importing wallet: ", error);
      setError("Invalid private key. Please try again.");
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

  async function sendTransaction () {
    try {
      const receipt = await web3.eth.sendTransaction({
        from: account.address,
        to: recipient,
        value: web3.utils.toWei(amount, 'ether'),
        gas: 21000,
        gasPrice: web3.utils.toWei('20', 'gwei')
      });

      console.log("Transaction receipt: ", receipt);
      setRecipient('');
      setError('')
    } catch (error) {
      console.error("Error sending transaction: ", error);
      setError("Transaction failed. Please check the recipient address and your balance.");
    }
  }

  return (
    <div className="App flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-bold text-blue-600 mb-6">Simple Token Wallet</h1>
      
      {account ? (
        <div className="p-6 bg-white rounded-lg shadow-lg text-center">
          <button onClick={getBalance} className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-full font-semibold shadow-md hover:bg-blue-700 focus:outline-none">Refresh</button>
          <h3 className="text-xl font-semibold mb-4">Account Address</h3>
          <p className="text-gray-700 break-all">{account.address}</p>
          <p className="mt-4 text-lg text-green-500">Balance: {balance} ETH</p>
          <input 
              type="text" 
              placeholder="Enter Receiver Address" 
              value={recipient} 
              onChange={(e) => setRecipient(e.target.value)} 
              className="px-4 py-2 mb-2 border border-gray-300 rounded-lg focus:outline-none"
          />
          <input 
              type="text" 
              placeholder="Enter Ether to Send" 
              value={amount} 
              onChange={(e) => setAmount(e.target.value)} 
              className="px-4 py-2 mb-2 border border-gray-300 rounded-lg focus:outline-none"
          />
          <button 
              onClick={sendTransaction} 
              className={`px-6 py-3 ${recipient ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-400 cursor-not-allowed'} text-white rounded-full font-semibold shadow-md focus:outline-none`}
              disabled={!recipient}
            >
              Send Ether
          </button>
          {error && <p className="mt-4 text-red-500">{error}</p>}
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
              className={`px-6 py-3 ${privateKey  ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-400 cursor-not-allowed'} text-white rounded-full font-semibold shadow-md focus:outline-none`}
              disabled={!privateKey}
            >
              Import Wallet
            </button>
          </div>
          {error && <p className="mt-4 text-red-500">{error}</p>}
        </div>
      )}
    </div>
  );
}

export default App;
