import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import PrivyWrapper from '@/components/PrivyWrapper'
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "VoucherChain - Crypto in your pocket, redeemable anywhere",
  description:
    "Transform cash into ETN and XFI at your local store. Revolutionary voucher-based crypto gateway powered by smart contracts.",
  keywords: "cryptocurrency, ETN, XFI, voucher, cash to crypto, blockchain, Electroneum, CrossFi",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <PrivyWrapper>
          {children}
        </PrivyWrapper>
      </body>
    </html>
  )
}
