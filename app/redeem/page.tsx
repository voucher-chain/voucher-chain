"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, CheckCircle, Scan, Wallet, Shield, Clock, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"

export default function RedeemPage() {
  const [voucherCode, setVoucherCode] = useState("")
  const [walletAddress, setWalletAddress] = useState("")
  const [isRedeeming, setIsRedeeming] = useState(false)
  const [redemptionSuccess, setRedemptionSuccess] = useState(false)
  const [voucherInfo, setVoucherInfo] = useState<any>(null)

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
    setIsRedeeming(true)
    setTimeout(() => {
      setIsRedeeming(false)
      setRedemptionSuccess(true)
    }, 3000)
  }

  if (redemptionSuccess) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6 relative overflow-hidden">
        {/* Enhanced Animated Background */}
        <div className="fixed inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-blue-900/20 to-cyan-900/30"></div>
          
          {/* Floating Geometric Shapes */}
          <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full blur-2xl animate-float-slow"></div>
          <div className="absolute top-1/3 right-32 w-24 h-24 bg-gradient-to-r from-emerald-500/20 to-green-500/20 rounded-full blur-2xl animate-float-delayed"></div>
          <div className="absolute bottom-1/4 left-1/3 w-40 h-40 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full blur-3xl animate-float-reverse"></div>
          
          {/* Enhanced Floating Particles */}
          <div className="absolute inset-0">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="absolute animate-float-particle"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 10}s`,
                  animationDuration: `${5 + Math.random() * 10}s`,
                }}
              >
                <div
                  className="w-1 h-1 bg-gradient-to-r from-emerald-400/60 to-green-400/60 rounded-full"
                  style={{
                    boxShadow: "0 0 8px rgba(16, 185, 129, 0.6)",
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        <Card className="w-full max-w-lg bg-gradient-to-br from-white/10 to-white/5 border border-white/20 backdrop-blur-2xl shadow-2xl rounded-3xl relative z-10 glass-card">
          <CardHeader className="text-center p-8">
            <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl animate-bounce">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <CardTitle className="text-3xl text-white mb-2 font-black">Success!</CardTitle>
            <CardDescription className="text-gray-300 text-lg">
              Your crypto has been sent to your wallet
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 p-8">
            <div className="p-6 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-2xl border border-green-500/30 backdrop-blur-xl">
              <h3 className="font-black text-white mb-4 text-xl">Transaction Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300 text-sm">Token:</span>
                  <Badge className="bg-blue-500/40 text-blue-300 border-blue-500/60">ETN</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300 text-sm">Amount:</span>
                  <span className="text-white font-bold text-sm">50 ETN</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300 text-sm">USD Value:</span>
                  <span className="text-white font-bold text-sm">$5.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300 text-sm">Transaction Fee:</span>
                  <span className="text-white font-bold text-sm">0.5 ETN</span>
                </div>
                <div className="border-t border-green-500/30 pt-3">
                  <div className="flex justify-between">
                    <span className="text-white font-black text-sm">You Received:</span>
                    <span className="text-green-400 font-black text-lg">49.5 ETN</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <Link href="/">
                <Button className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white py-4 rounded-2xl shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105 font-semibold">
                  Return to Home
                </Button>
              </Link>
              <Link href="/redeem">
                <Button
                  variant="outline"
                  className="w-full border-purple-500/40 text-white hover:bg-purple-500/20 py-4 rounded-2xl bg-transparent backdrop-blur-xl transition-all duration-300 font-semibold"
                >
                  Redeem Another Voucher
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Enhanced Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-blue-900/20 to-cyan-900/30"></div>
        
        {/* Floating Geometric Shapes */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-full blur-2xl animate-float-slow"></div>
        <div className="absolute top-1/3 right-32 w-24 h-24 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-2xl animate-float-delayed"></div>
        <div className="absolute bottom-1/4 left-1/3 w-40 h-40 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl animate-float-reverse"></div>
        
        {/* Enhanced Floating Particles */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-float-particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 10}s`,
                animationDuration: `${5 + Math.random() * 10}s`,
              }}
            >
              <div
                className="w-1 h-1 bg-gradient-to-r from-cyan-400/60 to-purple-400/60 rounded-full"
                style={{
                  boxShadow: "0 0 8px rgba(34, 211, 238, 0.6)",
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced Header */}
      <header className="relative z-50 border-b border-white/10 bg-black/30 backdrop-blur-3xl sticky top-0 glass-header">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <Link href="/">
                <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-cyan-500/20 group border border-white/20 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25 backdrop-blur-xl">
                  <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
                  Back to Home
                </Button>
              </Link>
              <div className="flex items-center space-x-3 animate-slide-in-left">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 via-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-2xl animate-pulse-glow">
                    <span className="text-white font-bold text-sm">VC</span>
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-ping shadow-lg"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-2xl blur-lg opacity-30 animate-pulse"></div>
                </div>
                <div>
                  <span className="text-2xl font-black bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent animate-gradient-text">
                    Redeem Voucher
                  </span>
                  <div className="text-xs bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent font-semibold">
                    Secure Redemption Portal
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="relative z-10 container mx-auto px-6 py-12 max-w-6xl">
        <div className="text-center mb-12 animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 leading-tight">
            <span className="bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent animate-gradient-text">
              Redeem Your
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent animate-gradient-text-reverse">
              Voucher
            </span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Enter your voucher code and wallet address to receive your crypto instantly
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Enhanced Main Redemption Form */}
          <div className="lg:col-span-2">
            <Card className="bg-gradient-to-br from-white/10 to-white/5 border border-white/20 backdrop-blur-2xl shadow-2xl rounded-3xl glass-card">
              <CardHeader className="p-8">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-xl">
                    <Scan className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl text-white font-black">Voucher Redemption</CardTitle>
                    <CardDescription className="text-gray-300 text-base">
                      Scratch off the code on your voucher card and enter it below
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-8 p-8">
                {/* Step 1: Enter Voucher Code */}
                <div className="space-y-4">
                  <Label htmlFor="voucher-code" className="text-white text-sm font-semibold">
                    Step 1: Enter Voucher Code
                  </Label>
                  <div className="flex space-x-4">
                    <Input
                      id="voucher-code"
                      placeholder="Enter your voucher code"
                      value={voucherCode}
                      onChange={(e) => setVoucherCode(e.target.value.toUpperCase())}
                      className="font-mono text-sm bg-white/10 border-white/20 text-white placeholder-gray-400 backdrop-blur-xl rounded-xl focus:border-purple-500/50 focus:ring-purple-500/20"
                    />
                    <Button
                      onClick={handleCheckVoucher}
                      className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 px-6 rounded-xl font-semibold shadow-lg hover:shadow-purple-500/25"
                    >
                      <Scan className="w-4 h-4 mr-2" />
                      Verify
                    </Button>
                  </div>
                  <p className="text-gray-400 text-xs">Code should be 12-16 characters long</p>
                </div>

                {voucherInfo && (
                  <Alert className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 backdrop-blur-xl rounded-2xl">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    <AlertDescription>
                      <div className="space-y-3">
                        <div className="font-bold text-white text-base">Voucher Verified Successfully!</div>
                        <div className="flex items-center space-x-4">
                          <Badge className="bg-blue-500/40 text-blue-300 border-blue-500/60 text-sm">
                            {voucherInfo.token}
                          </Badge>
                          <span className="text-white font-bold text-base">
                            {voucherInfo.amount} {voucherInfo.token}
                          </span>
                          <span className="text-gray-300 text-sm">(${voucherInfo.usdValue})</span>
                        </div>
                      </div>
                    </AlertDescription>
                  </Alert>
                )}

                {/* Step 2: Enter Wallet Address */}
                {voucherInfo && (
                  <div className="space-y-6">
                    <Label htmlFor="wallet-address" className="text-white text-sm font-semibold">
                      Step 2: Enter {voucherInfo.token} Wallet Address
                    </Label>
                    <Input
                      id="wallet-address"
                      placeholder={`Enter your ${voucherInfo.token} wallet address`}
                      value={walletAddress}
                      onChange={(e) => setWalletAddress(e.target.value)}
                      className="font-mono text-sm bg-white/10 border-white/20 text-white placeholder-gray-400 backdrop-blur-xl rounded-xl focus:border-purple-500/50 focus:ring-purple-500/20"
                    />
                    <p className="text-gray-400 text-xs">
                      Make sure this is your correct {voucherInfo.token} wallet address
                    </p>

                    <div className="p-6 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-2xl backdrop-blur-xl">
                      <div className="flex items-start space-x-4">
                        <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <AlertTriangle className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <div className="font-bold text-yellow-300 mb-3 text-base">Important Security Notice</div>
                          <ul className="text-yellow-200 space-y-2 text-sm">
                            <li>• Double-check your wallet address before proceeding</li>
                            <li>• Transactions cannot be reversed once confirmed</li>
                            <li>• A small processing fee will be deducted</li>
                            <li>• Keep your voucher code safe until redemption is complete</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <Button
                      onClick={handleRedeem}
                      disabled={!walletAddress || isRedeeming}
                      className="w-full bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 hover:from-purple-700 hover:via-blue-700 hover:to-cyan-700 text-white py-4 text-base rounded-2xl shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105 font-semibold"
                      size="lg"
                    >
                      {isRedeeming ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                          Processing Redemption...
                        </>
                      ) : (
                        <>
                          <Wallet className="w-5 h-5 mr-3" />
                          Redeem {voucherInfo.amount} {voucherInfo.token}
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Sidebar */}
          <div className="space-y-6">
            {/* Security Features */}
            <Card className="bg-gradient-to-br from-white/10 to-white/5 border border-white/20 backdrop-blur-2xl rounded-2xl glass-card">
              <CardHeader className="p-6">
                <div className="flex items-center space-x-3">
                  <Shield className="w-5 h-5 text-green-400" />
                  <CardTitle className="text-lg text-white font-bold">Security Features</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4 text-sm">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <div className="font-bold text-white text-sm">Blockchain Secured</div>
                      <p className="text-gray-300 text-xs">All vouchers are validated on-chain</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <div className="font-bold text-white text-sm">One-Time Use</div>
                      <p className="text-gray-300 text-xs">Each voucher can only be redeemed once</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <div className="font-bold text-white text-sm">Instant Transfer</div>
                      <p className="text-gray-300 text-xs">Crypto sent directly to your wallet</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Process Timeline */}
            <Card className="bg-gradient-to-br from-white/10 to-white/5 border border-white/20 backdrop-blur-2xl rounded-2xl glass-card">
              <CardHeader className="p-6">
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-blue-400" />
                  <CardTitle className="text-lg text-white font-bold">Redemption Process</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-xs font-black text-white">
                      1
                    </div>
                    <span className="text-gray-300 text-sm font-medium">Enter voucher code</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-xs font-black text-white">
                      2
                    </div>
                    <span className="text-gray-300 text-sm font-medium">Verify on blockchain</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-xs font-black text-white">
                      3
                    </div>
                    <span className="text-gray-300 text-sm font-medium">Enter wallet address</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-6 h-6 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-xs font-black text-white">
                      4
                    </div>
                    <span className="text-gray-300 text-sm font-medium">Receive crypto instantly</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Help Section */}
            <Card className="bg-gradient-to-br from-white/10 to-white/5 border border-white/20 backdrop-blur-2xl rounded-2xl glass-card">
              <CardHeader className="p-6">
                <CardTitle className="text-lg text-white font-bold">Need Help?</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4 text-sm">
                  <div>
                    <div className="font-bold text-white mb-2 text-sm">Can't find your code?</div>
                    <p className="text-gray-300 text-xs">Gently scratch off the silver coating on your voucher card.</p>
                  </div>
                  <div>
                    <div className="font-bold text-white mb-2 text-sm">Don't have a wallet?</div>
                    <p className="text-gray-300 text-xs">
                      Download the official ETN mobile app or create an XFI wallet.
                    </p>
                  </div>
                  <div>
                    <div className="font-bold text-white mb-2 text-sm">Voucher not working?</div>
                    <p className="text-gray-300 text-xs">Contact our 24/7 support team for immediate assistance.</p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="w-full mt-6 border-white/20 text-white hover:bg-white/10 bg-transparent backdrop-blur-xl text-sm rounded-xl font-semibold"
                >
                  Contact Support
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
