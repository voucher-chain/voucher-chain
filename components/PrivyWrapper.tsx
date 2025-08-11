"use client"

import { PrivyProvider } from '@privy-io/react-auth'
import { electroneumTestnet } from 'viem/chains'

export default function PrivyWrapper({ children }: { children: React.ReactNode }) {
  return (
    <PrivyProvider
      appId="cmdoi71us00vllb0k0ngynxfb"
      config={{
        loginMethods: ['email', 'wallet'],
        appearance: {
          theme: 'dark',
          accentColor: '#f97316',
          showWalletLoginFirst: false,
        },
        embeddedWallets: {
          createOnLogin: 'all-users',
        //   noPromptOnSignature: true,
        },
        // Use Electroneum testnet as default
        defaultChain: electroneumTestnet,
        // Add custom chains
        supportedChains: [electroneumTestnet],
      }}
    >
      {children}
    </PrivyProvider>
  )
} 