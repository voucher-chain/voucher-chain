import { ethers } from 'ethers';
import VoucherChainABI from '../../contracts/VoucherChain.json';

const CONTRACT_ADDRESS = '0x52C84043CD9c865236f11d9Fc9F56aa003c1f922';
const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL || 'https://rpc.ankr.com/electroneum_testnet';

export const getVoucherChainContract = (signer?: ethers.Signer) => {
  const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
  return new ethers.Contract(CONTRACT_ADDRESS, VoucherChainABI, signer || provider);
};

export const getVoucherChainContractReadOnly = () => {
  const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
  return new ethers.Contract(CONTRACT_ADDRESS, VoucherChainABI, provider);
};