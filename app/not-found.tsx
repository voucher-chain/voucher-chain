import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-400 to-red-500 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">VC</span>
            </div>
            <span className="text-2xl font-bold text-gray-900">VoucherChain</span>
          </div>

          <nav className="hidden lg:flex items-center space-x-8">
            <Link href="#product" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
              Product
            </Link>
            <Link href="#solutions" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
              Solutions
            </Link>
            <Link href="#pricing" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
              Pricing
            </Link>
            <Link href="#company" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
              Company
            </Link>
            <Link href="#partners" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
              Partners
            </Link>
          </nav>

          <div className="flex items-center space-x-3">
            <Link href="/agent">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white px-6">Sign-Up</Button>
            </Link>
            <Link href="/redeem">
              <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50 px-6 bg-transparent">
                Sign-In
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* 404 Content */}
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-9xl md:text-[12rem] font-bold text-white mb-8 leading-none">404</h1>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">PAGE NOT FOUND</h2>
          <p className="text-xl text-orange-100 mb-12 max-w-md mx-auto">
            The page requested couldn't be found. This could be a spelling error in the URL or a removed page.
          </p>
          <Link href="/">
            <Button className="bg-white text-orange-600 hover:bg-gray-50 px-8 py-3 text-lg font-medium">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Homepage
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
