import { useWeb3React } from '@web3-react/core';
import { injected, walletconnect, resetWalletConnector, walletlink } from './helpers/connectors';
import { getContract } from './helpers/contract';
import React, { useEffect, useState } from 'react';
import { CHAINS } from './helpers/CHAINS';
import { contractAddress } from "./helpers/contract"


const Web3ReactConnectionComponent = () => {
	const [contractData, setContractData] = useState("")
	// connector, library, chainId, account, activate, deactivate
	const web3reactContext = useWeb3React();


	useEffect(() => {
		if (!!web3reactContext.account) {
			getContractUsingWeb3React()
			const myContract = getContract(web3reactContext.library, web3reactContext.account);
			const handleValueChanged = (value) => {
				setContractData(parseInt(value._hex).toString())
			}
			myContract.on("ValueChanged", handleValueChanged)

			// return () => {
			// 	myContract.removeListener('ValueChanged', handleValueChanged)
			// }
		}
	}, [web3reactContext.account])

	// web3react
	const writeToContractUsingWeb3React = async () => {
		try {
			const randomNumber = Math.floor(Math.random() * 100);
			const myContract = getContract(web3reactContext.library, web3reactContext.account);
			const overrides = {
				gasLimit: 230000
			};
			const tx = await myContract.setData(randomNumber, overrides)
			alert('write:' + randomNumber);
			await tx.wait()
			let reception = await myContract.provider.getTransactionReceipt(tx.hash)
			console.log(reception, reception.status);
		} catch (ex) {
			console.log(ex);
			alert(ex);
		}
	};

	const getContractUsingWeb3React = async () => {
		try {
			const myContract = getContract(web3reactContext.library, web3reactContext.account);
			const getData = await myContract.getData();
			setContractData(parseInt(getData._hex).toString())
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

	const checkEvents = () => {

	}

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

	// //web3react walletconnect
	// const connectWalletConnectSimple = async () => {
	// 	try {
	// 		resetWalletConnector(walletconnect);
	// 		await web3reactContext.activate(walletconnect);
	// 	} catch (ex) {
	// 		console.log(ex);
	// 	}
	// };

	// //web3react coinbase
	// const connectCoinbaseSimple = async () => {
	// 	try {
	// 		await web3reactContext.activate(walletlink);
	// 	} catch (ex) {
	// 		console.log(ex);
	// 	}
	// };

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
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
					onClick={connectMetamaskSimple}
				>
					Connect Metamask Via Web3-React
				</button>
				<button
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
					onClick={disconnectMetamaskSimple}
				>
					Disconnect
				</button>
			</div>
			<div className="flex space-x-3">
				<button
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
					onClick={checkInfoSimple}
				>
					Check web3react Context
				</button>
			</div>
			<div>
				<p>Contract Address: <b>{contractAddress}</b></p>
				<p>Contract Data: <b>{contractData}</b> </p>
			</div>
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
					onClick={checkEvents}
				>
					Check Events
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