"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, CheckCircle, Scan, Wallet, Shield, Clock, AlertTriangle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { usePrivy } from '@privy-io/react-auth'
import LoginModal from '@/components/auth/LoginModal'
import WalletManager from '@/components/auth/WalletManager'

export default function RedeemPage() {
  const [voucherCode, setVoucherCode] = useState("")
  const [walletAddress, setWalletAddress] = useState("")
  const [isRedeeming, setIsRedeeming] = useState(false)
  const [redemptionSuccess, setRedemptionSuccess] = useState(false)
  const [voucherInfo, setVoucherInfo] = useState<any>(null)
  
  const { authenticated, user, logout } = usePrivy()

  const handleCheckVoucher = () => {
    if (voucherCode.length >= 12) {
      setVoucherInfo({
        token: "ETN",
        amount: "50",
        usdValue: "5.00",
        valid: true,
        expired: false,
      })
    }
  }

  const handleRedeem = async () => {
    if (!authenticated) {
      return
    }
    
    setIsRedeeming(true)
    setTimeout(() => {
      setIsRedeeming(false)
      setRedemptionSuccess(true)
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="bg-white/5 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="flex items-center space-x-2">
              <ArrowLeft className="w-5 h-5 text-white" />
              <span className="text-white font-semibold">Back to Home</span>
            </Link>
            
            <div className="flex items-center space-x-3">
              {authenticated && (
                <>
                  <Badge variant="secondary" className="bg-green-500/20 text-green-300">
                    Connected
                  </Badge>
                  <span className="text-white text-sm">
                    {user?.email?.address || 'Wallet User'}
                  </span>
                  <Button 
                    onClick={logout}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl shadow-xl hover:shadow-orange-500/25 transition-all duration-300 hover:scale-105 text-sm font-semibold"
                  >
                    Logout
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Redeem Your Voucher
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Enter your voucher code and wallet address to claim your cryptocurrency
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Authentication Section */}
          <div className="space-y-6">
            <Card className="bg-white/10 backdrop-blur-xl border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Authentication
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Sign in to redeem your vouchers
                </CardDescription>
              </CardHeader>
              <CardContent>
                {authenticated ? (
                  <WalletManager />
                ) : (
                  <LoginModal />
                )}
              </CardContent>
            </Card>
                  </div>

          {/* Voucher Redemption Section */}
          <div className="space-y-6">
            <Card className="bg-white/10 backdrop-blur-xl border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Scan className="w-5 h-5" />
                  Voucher Redemption
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Enter your voucher code to redeem
                    </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {!authenticated ? (
                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      Please sign in first to redeem your voucher
                    </AlertDescription>
                  </Alert>
                ) : (
                  <>
                    <div className="space-y-3">
                  <Label htmlFor="voucher-code" className="text-white text-sm font-semibold">
                    Step 1: Enter Voucher Code
                  </Label>
                    <Input
                      id="voucher-code"
                        placeholder="Enter your 12-digit voucher code"
                      value={voucherCode}
                        onChange={(e) => setVoucherCode(e.target.value)}
                        className="font-mono text-sm bg-white/10 border-white/20 text-white placeholder-gray-400 backdrop-blur-xl rounded-xl focus:border-orange-500/50 focus:ring-orange-500/20"
                    />
                    <Button
                      onClick={handleCheckVoucher}
                        disabled={voucherCode.length < 12}
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-xl"
                    >
                        Check Voucher
                    </Button>
                </div>

                {voucherInfo && (
                      <div className="space-y-6">
                        <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <CheckCircle className="w-5 h-5 text-green-400" />
                            <span className="text-green-400 font-semibold">Voucher Valid</span>
                          </div>
                          <div className="text-white space-y-1">
                            <p><strong>Token:</strong> {voucherInfo.token}</p>
                            <p><strong>Amount:</strong> {voucherInfo.amount} {voucherInfo.token}</p>
                            <p><strong>Value:</strong> ${voucherInfo.usdValue} USD</p>
                          </div>
                        </div>

                        <div className="space-y-3">
                    <Label htmlFor="wallet-address" className="text-white text-sm font-semibold">
                            Step 2: Confirm Wallet Address
                    </Label>
                    <Input
                      id="wallet-address"
                      placeholder={`Enter your ${voucherInfo.token} wallet address`}
                      value={walletAddress}
                      onChange={(e) => setWalletAddress(e.target.value)}
                            className="font-mono text-sm bg-white/10 border-white/20 text-white placeholder-gray-400 backdrop-blur-xl rounded-xl focus:border-orange-500/50 focus:ring-orange-500/20"
                    />
                    <p className="text-gray-400 text-xs">
                      Make sure this is your correct {voucherInfo.token} wallet address
                    </p>
                    </div>

                    <Button
                      onClick={handleRedeem}
                      disabled={!walletAddress || isRedeeming}
                          className="w-full bg-green-500 hover:bg-green-600 text-white rounded-xl"
                    >
                      {isRedeeming ? (
                        <>
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Processing Redemption...
                        </>
                      ) : (
                        <>
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Redeem Voucher
                        </>
                      )}
                    </Button>
                  </div>
                )}

                    {redemptionSuccess && (
                      <Alert className="bg-green-500/10 border-green-500/20">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        <AlertDescription className="text-green-400">
                          Voucher redeemed successfully! Your tokens have been sent to your wallet.
                        </AlertDescription>
                      </Alert>
                    )}
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
