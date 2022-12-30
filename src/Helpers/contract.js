import { Contract } from '@ethersproject/contracts';
export const contractAbi = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "inputData",
				"type": "uint256"
			}
		],
		"name": "setData",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "oldValue",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "newValue",
				"type": "uint256"
			}
		],
		"name": "ValueChanged",
		"type": "event"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getData",
		"outputs": [
			{
				"name": "retVal",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]


export const contractAddress = '0x63F1A2bC12C63f956c4f59b3B9700b21433685f2';

export const getContract = (library, account) => {
	const signer = library.getSigner(account).connectUnchecked();
	var contract = new Contract(contractAddress, contractAbi, signer);
	// 返回的合约中的方法是根据所部署合约中的定义
	return contract;
};


// 本次交易: https://goerli.etherscan.io/tx/0x9b44e42680b07441949868fb0d86533280f3f928c1fb3d364e1f281b2c115ab5
// 合约信息: https://goerli.etherscan.io/address/0x4d577ff51f5f4c36d2480869dc51ec0d56c541dc
