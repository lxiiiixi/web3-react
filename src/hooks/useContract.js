import { useWeb3React } from '@web3-react/core';
import { Contract } from '@ethersproject/contracts';
import { useMemo } from 'react';
import { contractAbi, contractAddress } from '../helpers/contract';

export function getContract(contractAddress, ABI, provider, account) {
    const signer = account ? provider.getSigner(account) : provider
    const contract = new Contract(contractAddress, ABI, signer)
    // 返回的合约中的方法是根据所部署合约中的定义
    return contract
}

export function useContract(address, ABI, isSigner = true) {
    const { library: provider, account, chainId } = useWeb3React()
    // console.log(address, ABI, provider, chainId);
    return useMemo(() => {
        if (!address || !ABI || !provider || !chainId) return null
        try {
            return getContract(address, ABI, provider, isSigner && account ? account : undefined)
        } catch (error) {
            console.error('Failed to get contract', error)
            return null
        }
    }, [address, ABI, provider, chainId, account])
}

export function useSetDataContract() {
    return useContract(contractAddress, contractAbi)
}

