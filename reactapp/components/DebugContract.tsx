"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getVoucherChainContractReadOnly } from '@/lib/contracts/voucherChain';

export default function DebugContract() {
  const [stats, setStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const checkContractStats = async () => {
    setIsLoading(true);
    try {
      const contract = getVoucherChainContractReadOnly();
      if (!contract) return;
      
      const contractStats = await contract.getContractStats();
      const totalMinted = await contract.totalVouchersMinted();
      const totalRedeemed = await contract.totalVouchersRedeemed();
      
      setStats({
        totalMinted: totalMinted.toString(),
        totalRedeemed: totalRedeemed.toString(),
        mintingFee: contractStats.mintingFeeRate.toString(),
        redemptionFee: contractStats.redemptionFeeRate.toString()
      });
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="bg-white/10 backdrop-blur-xl border-white/20">
      <CardHeader>
        <CardTitle className="text-white">Contract Debug</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button 
          onClick={checkContractStats}
          disabled={isLoading}
          className="bg-blue-500 hover:bg-blue-600 text-white"
        >
          {isLoading ? 'Loading...' : 'Check Contract Stats'}
        </Button>
        
        {stats && (
          <div className="text-white space-y-2">
            <p><strong>Total Vouchers Minted:</strong> {stats.totalMinted}</p>
            <p><strong>Total Vouchers Redeemed:</strong> {stats.totalRedeemed}</p>
            <p><strong>Minting Fee:</strong> {stats.mintingFee} basis points</p>
            <p><strong>Redemption Fee:</strong> {stats.redemptionFee} basis points</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 