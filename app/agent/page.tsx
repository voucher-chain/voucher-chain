"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  Plus,
  TrendingUp,
  Users,
  Wallet,
  DollarSign,
  BarChart3,
  Settings,
  Bell,
  Download,
  Eye,
  Sparkles,
  AlertTriangle,
  Loader2,
  CheckCircle,
  Shield,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { usePrivy } from '@privy-io/react-auth'
import LoginModal from '@/components/auth/LoginModal'
import WalletManager from '@/components/auth/WalletManager'

export default function AgentDashboard() {
  const [selectedToken, setSelectedToken] = useState("ETN")
  const [voucherAmount, setVoucherAmount] = useState("")
  const [quantity, setQuantity] = useState("")
  
  const { authenticated, user, logout } = usePrivy()

  const handleMintVoucher = () => {
    if (!authenticated) {
      return
    }
    console.log("Minting voucher:", { selectedToken, voucherAmount, quantity })
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
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-cyan-500/20 group border border-white/20 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25 backdrop-blur-xl"
                >
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
                    Agent Dashboard
                  </span>
                  <div className="text-xs bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent font-semibold">
                    Professional Portal
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3 animate-slide-in-right">
              {authenticated && (
                <>
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-cyan-500/20 group border border-white/20 rounded-xl transition-all duration-300 backdrop-blur-xl"
              >
                <Bell className="w-4 h-4 group-hover:animate-bounce" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-cyan-500/20 group border border-white/20 rounded-xl transition-all duration-300 backdrop-blur-xl"
              >
                <Settings className="w-4 h-4 group-hover:animate-spin" />
              </Button>
              <Badge className="bg-gradient-to-r from-green-500/40 to-emerald-500/40 text-green-300 border-green-500/60 animate-pulse text-xs font-semibold shadow-lg">
                Agent ID: AG001
              </Badge>
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

      <div className="relative z-10 container mx-auto px-6 py-8">
        {/* Authentication Section */}
        {!authenticated ? (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 leading-tight">
                <span className="bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent animate-gradient-text">
                  Become an
                </span>
                <br />
                <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent animate-gradient-text-reverse">
                  Agent!
                </span>
              </h1>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
                Sign in to access the agent dashboard and start minting vouchers
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Authentication Section */}
              <div className="space-y-6">
                <Card className="bg-white/10 backdrop-blur-xl border-white/20">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Shield className="w-5 h-5" />
                      Authentication Required
                    </CardTitle>
                    <CardDescription className="text-gray-300">
                      Sign in to access the agent dashboard
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <LoginModal />
                  </CardContent>
                </Card>
              </div>

              {/* Agent Benefits Section */}
              <div className="space-y-6">
                <Card className="bg-white/10 backdrop-blur-xl border-white/20">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Sparkles className="w-5 h-5" />
                      Agent Benefits
                    </CardTitle>
                    <CardDescription className="text-gray-300">
                      What you get as a VoucherChain agent
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                        </div>
                        <span className="text-white text-sm">Commission on every voucher sold</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                          <CheckCircle className="w-4 h-4 text-blue-400" />
                        </div>
                        <span className="text-white text-sm">Real-time analytics and reporting</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                          <CheckCircle className="w-4 h-4 text-purple-400" />
                        </div>
                        <span className="text-white text-sm">Batch voucher minting capabilities</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-orange-500/20 rounded-lg flex items-center justify-center">
                          <CheckCircle className="w-4 h-4 text-orange-400" />
                        </div>
                        <span className="text-white text-sm">Priority customer support</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        ) : (
          <>
        {/* Enhanced Welcome Section */}
        <div className="mb-12 animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 leading-tight">
            <span className="bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent animate-gradient-text">
              Welcome back,
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent animate-gradient-text-reverse">
              Agent!
            </span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl leading-relaxed">
            Manage your voucher inventory and track your performance with our advanced analytics
          </p>
        </div>

            {/* Wallet Management Section */}
            <div className="mb-8">
              <WalletManager />
            </div>

        {/* Enhanced Stats Overview */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            {
              title: "Total Sales",
              value: "$12,450",
              change: "+20.1%",
              icon: DollarSign,
              color: "from-green-500 to-emerald-500",
              delay: "0ms",
            },
            {
              title: "Vouchers Sold",
              value: "1,247",
              change: "+15%",
              icon: Users,
              color: "from-blue-500 to-cyan-500",
              delay: "100ms",
            },
            {
              title: "Commission Earned",
              value: "$374",
              change: "+12%",
              icon: Wallet,
              color: "from-purple-500 to-pink-500",
              delay: "200ms",
            },
            {
              title: "Redemption Rate",
              value: "94.2%",
              change: "+2.1%",
              icon: BarChart3,
              color: "from-orange-500 to-red-500",
              delay: "300ms",
            },
          ].map((stat, index) => (
            <div key={index} className="group animate-slide-in-up" style={{ animationDelay: stat.delay }}>
              <Card className="bg-gradient-to-br from-white/10 to-white/5 border border-white/20 backdrop-blur-2xl hover:border-purple-500/50 transition-all duration-500 group-hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 rounded-2xl overflow-hidden glass-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
                  <CardTitle className="text-xs font-semibold text-gray-300 group-hover:text-white transition-colors duration-300">
                    {stat.title}
                  </CardTitle>
                  <div
                    className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center shadow-xl group-hover:shadow-purple-500/25 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12`}
                  >
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                </CardHeader>
                <CardContent className="relative z-10">
                  <div className="text-3xl font-black text-white mb-2 group-hover:text-cyan-300 transition-colors duration-300">
                    {stat.value}
                  </div>
                  <div className="flex items-center text-xs">
                    <TrendingUp className="w-4 h-4 text-green-400 mr-2 group-hover:animate-bounce" />
                    <span className="text-green-400 font-semibold">{stat.change}</span>
                        <span className="text-gray-400 ml-1">from last month</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        <div className="animate-fade-in-up" style={{ animationDelay: "400ms" }}>
          <Tabs defaultValue="mint" className="space-y-8">
            <TabsList className="grid w-full grid-cols-3 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-2xl border border-white/20 rounded-2xl p-2 glass-card">
              <TabsTrigger
                value="mint"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500/30 data-[state=active]:to-cyan-500/30 data-[state=active]:text-white text-gray-300 rounded-xl transition-all duration-300 text-sm font-semibold data-[state=active]:shadow-lg"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Mint Vouchers
              </TabsTrigger>
              <TabsTrigger
                value="inventory"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500/30 data-[state=active]:to-cyan-500/30 data-[state=active]:text-white text-gray-300 rounded-xl transition-all duration-300 text-sm font-semibold data-[state=active]:shadow-lg"
              >
                <Eye className="w-4 h-4 mr-2" />
                Inventory
              </TabsTrigger>
              <TabsTrigger
                value="analytics"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500/30 data-[state=active]:to-cyan-500/30 data-[state=active]:text-white text-gray-300 rounded-xl transition-all duration-300 text-sm font-semibold data-[state=active]:shadow-lg"
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                Analytics
              </TabsTrigger>
            </TabsList>

            <TabsContent value="mint" className="space-y-8">
              <Card className="bg-gradient-to-br from-white/10 to-white/5 border border-white/20 backdrop-blur-2xl rounded-3xl overflow-hidden shadow-2xl glass-card">
                <CardHeader className="relative p-8">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-cyan-500/10"></div>
                  <div className="relative z-10">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-2xl animate-pulse-glow">
                        <Sparkles className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl text-white font-black">Mint New Vouchers</CardTitle>
                        <CardDescription className="text-gray-300 text-base">
                          Create new voucher cards for sale to customers
                        </CardDescription>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-8 p-8">
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="space-y-3">
                      <Label htmlFor="token" className="text-white text-sm font-semibold">
                        Token Type
                      </Label>
                      <Select value={selectedToken} onValueChange={setSelectedToken}>
                        <SelectTrigger className="bg-white/10 border-white/20 text-white rounded-xl focus:border-purple-500/50 focus:ring-purple-500/20">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-white/10 border-white/20 backdrop-blur-2xl">
                          <SelectItem value="ETN" className="text-white hover:bg-purple-500/20">
                            ETN
                          </SelectItem>
                          <SelectItem value="XFI" className="text-white hover:bg-purple-500/20">
                            XFI
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="amount" className="text-white text-sm font-semibold">
                        Voucher Amount
                      </Label>
                      <Input
                        id="amount"
                        type="number"
                        placeholder="Enter amount"
                        value={voucherAmount}
                        onChange={(e) => setVoucherAmount(e.target.value)}
                        className="bg-white/10 border-white/20 text-white placeholder-gray-400 rounded-xl focus:border-purple-500/50 focus:ring-purple-500/20"
                      />
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="quantity" className="text-white text-sm font-semibold">
                        Quantity
                      </Label>
                      <Input
                        id="quantity"
                        type="number"
                        placeholder="Number of vouchers"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        className="bg-white/10 border-white/20 text-white placeholder-gray-400 rounded-xl focus:border-purple-500/50 focus:ring-purple-500/20"
                      />
                    </div>
                  </div>
                  <Button
                    onClick={handleMintVoucher}
                    className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white py-4 rounded-2xl shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105 text-lg font-semibold"
                  >
                    <Plus className="w-5 h-5 mr-3" />
                    Mint Vouchers
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="inventory" className="space-y-8">
              <Card className="bg-gradient-to-br from-white/10 to-white/5 border border-white/20 backdrop-blur-2xl rounded-3xl overflow-hidden shadow-2xl glass-card">
                <CardHeader className="p-8">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-2xl animate-pulse-glow">
                        <Eye className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl text-white font-black">Current Inventory</CardTitle>
                        <CardDescription className="text-gray-300 text-base">
                          Track your voucher stock and sales
                        </CardDescription>
                      </div>
                    </div>
                    <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-6 py-3 rounded-xl shadow-xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105 font-semibold">
                      <Download className="w-5 h-5 mr-2" />
                      Export
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="space-y-4">
                    {[
                      { token: "ETN", amount: "50", quantity: 25, value: "$125" },
                      { token: "ETN", amount: "100", quantity: 15, value: "$150" },
                      { token: "XFI", amount: "10", quantity: 30, value: "$300" },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-6 bg-white/10 border border-white/20 rounded-2xl hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25 backdrop-blur-xl"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                            <span className="text-white font-black text-sm">{item.token}</span>
                          </div>
                          <div>
                            <div className="text-white font-bold text-lg">
                              {item.amount} {item.token}
                            </div>
                            <div className="text-gray-300 text-sm">{item.quantity} vouchers</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-white font-bold text-lg">{item.value}</div>
                          <div className="text-gray-300 text-sm">Total Value</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-8">
              <Card className="bg-gradient-to-br from-white/10 to-white/5 border border-white/20 backdrop-blur-2xl rounded-3xl overflow-hidden shadow-2xl glass-card">
                <CardHeader className="p-8">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-2xl animate-pulse-glow">
                      <BarChart3 className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl text-white font-black">Performance Analytics</CardTitle>
                      <CardDescription className="text-gray-300 text-base">
                        Detailed insights into your sales and performance
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <h3 className="text-xl font-bold text-white">Sales Trends</h3>
                      <div className="space-y-4">
                        {[
                          { period: "This Week", sales: "$2,450", change: "+15%" },
                          { period: "This Month", sales: "$8,200", change: "+22%" },
                          { period: "This Quarter", sales: "$24,600", change: "+18%" },
                        ].map((trend, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-4 bg-white/10 border border-white/20 rounded-xl hover:border-purple-500/50 transition-all duration-300 backdrop-blur-xl"
                          >
                            <span className="text-gray-300 font-medium">{trend.period}</span>
                            <div className="text-right">
                              <div className="text-white font-bold text-lg">{trend.sales}</div>
                              <div className="text-green-400 text-sm font-semibold">{trend.change}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-6">
                      <h3 className="text-xl font-bold text-white">Top Performing Tokens</h3>
                      <div className="space-y-4">
                        {[
                          { token: "ETN", sales: "1,247", percentage: "65%" },
                          { token: "XFI", sales: "678", percentage: "35%" },
                        ].map((token, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-4 bg-white/10 border border-white/20 rounded-xl hover:border-purple-500/50 transition-all duration-300 backdrop-blur-xl"
                          >
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg flex items-center justify-center">
                                <span className="text-white text-xs font-black">{token.token}</span>
                              </div>
                              <span className="text-gray-300 font-medium">{token.token}</span>
                            </div>
                            <div className="text-right">
                              <div className="text-white font-bold text-lg">{token.sales}</div>
                              <div className="text-cyan-400 text-sm font-semibold">{token.percentage}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
          </>
        )}
      </div>
    </div>
  )
}
