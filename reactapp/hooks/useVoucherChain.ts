import { useState, useEffect } from 'react';
import { usePrivy } from '@privy-io/react-auth';
import { ethers } from 'ethers';
import { getVoucherChainContract, getVoucherChainContractReadOnly } from '@/lib/contracts/voucherChain';
import { handleVoucherChainError } from '@/lib/errors/voucherChainErrors';

// Hook for checking voucher status
export const useVoucherStatus = () => {
  const [voucherInfo, setVoucherInfo] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkVoucherStatus = async (voucherCode: string) => {
    if (!voucherCode.trim()) {
      setError("Please enter a voucher code");
      return null;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      const contract = getVoucherChainContractReadOnly();
      if (!contract) throw new Error("Contract not available");

      const status = await contract.getVoucherStatus(voucherCode);
      
      const voucherData = {
        exists: status.exists,
        isRedeemed: status.isRedeemed,
        token: status.token,
        tokenValue: ethers.utils.formatEther(status.tokenValue),
        issuer: status.issuer,
        expiryTimestamp: status.expiryTimestamp.toNumber(),
        isExpired: status.expiryTimestamp.gt(0) && Date.now() > status.expiryTimestamp.toNumber() * 1000,
        rawTokenValue: status.tokenValue
      };
      
      setVoucherInfo(voucherData);
      return voucherData;
    } catch (err: any) {
      const errorMessage = handleVoucherChainError(err);
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { checkVoucherStatus, voucherInfo, isLoading, error, setError };
};

// Hook for redeeming vouchers
export const useVoucherRedemption = () => {
  const { user } = usePrivy();
  const [isRedeeming, setIsRedeeming] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const redeemVoucher = async (voucherCode: string) => {
    if (!user?.wallet?.address) {
      setError("Please connect your wallet first");
      return null;
    }

    if (!voucherCode.trim()) {
      setError("Please enter a voucher code");
      return null;
    }

    setIsRedeeming(true);
    setError(null);

    try {
      const contract = getVoucherChainContract();
      if (!contract) throw new Error("Contract not available");

      const tx = await contract.redeemVoucher(voucherCode, user.wallet.address);
      const receipt = await tx.wait();
      
      return receipt;
    } catch (err: any) {
      const errorMessage = handleVoucherChainError(err);
      setError(errorMessage);
      return null;
    } finally {
      setIsRedeeming(false);
    }
  };

  return { redeemVoucher, isRedeeming, error, setError };
};

// Hook for getting contract statistics
export const useContractStats = () => {
  const [contractStats, setContractStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchContractStats = async () => {
    setIsLoading(true);
    try {
      const contract = getVoucherChainContractReadOnly();
      if (!contract) return;

      const stats = await contract.getContractStats();
      
      setContractStats({
        totalMinted: stats.totalMinted.toString(),
        totalRedeemed: stats.totalRedeemed.toString(),
        mintingFeeRate: stats.mintingFeeRate.toString(),
        redemptionFeeRate: stats.redemptionFeeRate.toString()
      });
    } catch (error) {
      console.error("Failed to fetch contract stats:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchContractStats();
  }, []);

  return { contractStats, isLoading, refetch: fetchContractStats };
}; 