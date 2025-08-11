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

export const handleVoucherChainError = (error: any): string => {
  if (error.message?.includes('VoucherNotFound')) return 'Voucher not found';
  if (error.message?.includes('VoucherAlreadyRedeemed')) return 'Voucher already redeemed';
  if (error.message?.includes('VoucherExpired')) return 'Voucher has expired';
  if (error.message?.includes('TokenNotSupported')) return 'Token not supported';
  if (error.message?.includes('UnauthorizedMinter')) return 'Unauthorized to mint vouchers';
  if (error.message?.includes('InsufficientBalance')) return 'Insufficient balance';
  return error.message || 'An error occurred';
}; 