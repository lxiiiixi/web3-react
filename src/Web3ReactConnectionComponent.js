import { useWeb3React } from '@web3-react/core';
import { injected, walletconnect, resetWalletConnector, walletlink } from './Helpers/connectors';
import { getContract } from './Helpers/contract';
import React from 'react';
import { CHAINS } from './Helpers/CHAINS';

const Web3ReactConnectionComponent = () => {
	//connector, library, chainId, account, activate, deactivate
	const web3reactContext = useWeb3React();

	//web3react
	const writeToContractUsingWeb3React = async () => {
		try {
			const randomNumber = Math.floor(Math.random() * 100);
			const myContract = getContract(web3reactContext.library, web3reactContext.account);
			const overrides = {
				gasLimit: 230000
			};
			const response = await myContract.setData(randomNumber, overrides);
			alert('write:' + randomNumber);
			console.log(response);
		} catch (ex) {
			console.log(ex);
			alert(ex);
		}
	};

	const getContractUsingWeb3React = async () => {
		try {
			const myContract = getContract(web3reactContext.library, web3reactContext.account);
			const getData = await myContract.getData();
			alert("Get:" + getData);
		} catch (ex) {
			console.log(ex);
			alert(ex);
		}
	};

	const disconnectMetamaskSimple = () => {
		try {
			web3reactContext.deactivate();
		} catch (ex) {
			console.log(ex);
		}
	};

	//web3react context
	const checkInfoSimple = async () => {
		try {
			console.log('web3reactContext', web3reactContext);
		} catch (ex) {
			console.log(ex);
		}
	};

	//web3react metamask
	const connectMetamaskSimple = async () => {
		try {
			await web3reactContext.activate(injected);
		} catch (ex) {
			console.log(ex);
		}
	};

	//web3react walletconnect
	const connectWalletConnectSimple = async () => {
		try {
			resetWalletConnector(walletconnect);
			await web3reactContext.activate(walletconnect);
		} catch (ex) {
			console.log(ex);
		}
	};

	//web3react coinbase
	const connectCoinbaseSimple = async () => {
		try {
			await web3reactContext.activate(walletlink);
		} catch (ex) {
			console.log(ex);
		}
	};

	return (
		<div className="flex flex-col space-y-7 items-start p-10 w-1/2 border-2 border-yellow-300 m-10">
			<h2>Web3React Control</h2>
			{web3reactContext.account ?
				<div>
					<p>Connected 🟢</p>
					<p>Accounts: <b>{web3reactContext.account}</b></p>
					<p>Chain: <b>{`${CHAINS[web3reactContext.chainId].name} (${web3reactContext.chainId})`} </b></p>
				</div>
				:
				<p>Disconnected 🟡</p>
			}
			<div className="flex space-x-3">
				<button
					className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
					onClick={writeToContractUsingWeb3React}
				>
					Write A Data To Contract Via Web3React
				</button>
				<button
					className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
					onClick={getContractUsingWeb3React}
				>
					Get The Contract Data Via Web3React
				</button>

				<button
					className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
					onClick={checkInfoSimple}
				>
					Check web3react Context
				</button>
				<button
					className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
					onClick={disconnectMetamaskSimple}
				>
					Disconnect Web3React
				</button>
			</div>
			<div className="flex space-x-3">
				<button
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
					onClick={connectMetamaskSimple}
				>
					Connect Metamask Via Web3-React
				</button>
			</div>
			{/* <div className="flex space-x-3">
				<button
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
					onClick={connectWalletConnectSimple}
				>
					Connect walletconnect Via Web3-React
				</button>
			</div>
			<div className="flex space-x-3">
				<button
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
					onClick={connectCoinbaseSimple}
				>
					Connect coinbase Via Web3-React
				</button>
			</div> */}
		</div>
	);
};
export default Web3ReactConnectionComponent;