"use client"

import { usePrivy, useSendTransaction } from '@privy-io/react-auth'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { Wallet, LogOut, Send, Copy, CheckCircle, Loader2 } from 'lucide-react'
import { useState } from 'react'

export default function WalletManager() {
  const { user, logout, authenticated } = usePrivy()
  const { sendTransaction } = useSendTransaction()
  const [copied, setCopied] = useState(false)
  const [isSending, setIsSending] = useState(false)

  if (!authenticated || !user) {
    return null
  }

  const wallet = user.wallet
  const address = wallet?.address

  const copyAddress = async () => {
    if (address) {
      await navigator.clipboard.writeText(address)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleSendTransaction = async () => {
    setIsSending(true)
    try {
      await sendTransaction({
        to: '0xE3070d3e4309afA3bC9a6b057685743CF42da77C', // Example address
        value: BigInt('1000000000000000') // 0.001 ETN - using BigInt() constructor
      })
    } catch (error) {
      console.error('Transaction failed:', error)
    } finally {
      setIsSending(false)
    }
  }

  return (
    <Card className="bg-white/10 backdrop-blur-xl border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Wallet className="w-5 h-5" />
          Your Wallet
        </CardTitle>
        <CardDescription className="text-gray-300">
          Manage your embedded wallet
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label className="text-white text-sm font-semibold">Wallet Address</Label>
          <div className="flex items-center gap-2">
            <code className="flex-1 bg-white/10 px-3 py-2 rounded-lg text-white text-sm font-mono">
              {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'Loading...'}
            </code>
            <Button
              onClick={copyAddress}
              size="sm"
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10"
            >
              {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={handleSendTransaction}
            disabled={isSending}
            className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
          >
            {isSending ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Send className="w-4 h-4 mr-2" />
            )}
            Send Transaction
          </Button>
          
          <Button
            onClick={logout}
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        <div className="flex gap-2">
          <Badge variant="secondary" className="bg-green-500/20 text-green-300">
            Connected
          </Badge>
          <Badge variant="secondary" className="bg-blue-500/20 text-blue-300">
            {user.email?.address ? 'Email' : 'Wallet'}
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
} 