"use client"

import { useState } from 'react'
import { useLoginWithEmail, usePrivy } from '@privy-io/react-auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Mail, Wallet, Loader2 } from 'lucide-react'

export default function LoginModal() {
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [step, setStep] = useState<'email' | 'code'>('email')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  
  const { sendCode, loginWithCode } = useLoginWithEmail()
  const { login, authenticated, user } = usePrivy()

  const handleSendCode = async () => {
    if (!email) {
      setError('Please enter your email address')
      return
    }
    
    setIsLoading(true)
    setError('')
    
    try {
      await sendCode({ email })
      setStep('code')
    } catch (err) {
      setError('Failed to send code. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleLoginWithCode = async () => {
    if (!code) {
      setError('Please enter the verification code')
      return
    }
    
    setIsLoading(true)
    setError('')
    
    try {
      await loginWithCode({ code })
    } catch (err) {
      setError('Invalid code. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleWalletLogin = async () => {
    setIsLoading(true)
    setError('')
    
    try {
      await login()
    } catch (err) {
      setError('Failed to connect wallet. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (authenticated) {
    return (
      <Card className="w-full max-w-md mx-auto bg-white/10 backdrop-blur-xl border-white/20">
        <CardHeader className="text-center">
          <CardTitle className="text-white">Welcome!</CardTitle>
          <CardDescription className="text-gray-300">
            You are logged in as {user?.email?.address || 'Wallet User'}
          </CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md mx-auto bg-white/10 backdrop-blur-xl border-white/20">
      <CardHeader className="text-center">
        <CardTitle className="text-white">Welcome to VoucherChain</CardTitle>
        <CardDescription className="text-gray-300">
          Sign in to redeem your vouchers
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        {step === 'email' ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white text-sm font-semibold">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder-gray-400 rounded-xl focus:border-orange-500/50 focus:ring-orange-500/20"
              />
            </div>
            
            <Button 
              onClick={handleSendCode} 
              disabled={isLoading}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-xl"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Mail className="w-4 h-4 mr-2" />
              )}
              Send Verification Code
            </Button>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-white/20" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-black px-2 text-gray-400">Or</span>
              </div>
            </div>
            
            <Button 
              onClick={handleWalletLogin} 
              disabled={isLoading}
              variant="outline"
              className="w-full border-white/20 text-white hover:bg-white/10 rounded-xl"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Wallet className="w-4 h-4 mr-2" />
              )}
              Connect Wallet
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="code" className="text-white text-sm font-semibold">
                Verification Code
              </Label>
              <Input
                id="code"
                type="text"
                placeholder="Enter 6-digit code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder-gray-400 rounded-xl focus:border-orange-500/50 focus:ring-orange-500/20"
              />
            </div>
            
            <Button 
              onClick={handleLoginWithCode} 
              disabled={isLoading}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-xl"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Mail className="w-4 h-4 mr-2" />
              )}
              Verify & Login
            </Button>
            
            <Button 
              onClick={() => setStep('email')} 
              variant="ghost"
              className="w-full text-gray-400 hover:text-white"
            >
              Back to Email
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
} 