"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import Link from "next/link"
import {
  ArrowRight,
  Store,
  Zap,
  CheckCircle,
  Star,
  Sparkles,
  Shield,
  Smartphone,
  Infinity,
  Globe,
  Users,
  TrendingUp,
  Lock,
  Wallet,
  Clock,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const featuresRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY
      const rate = scrolled * -0.5

      if (heroRef.current) {
        heroRef.current.style.transform = `translateY(${rate}px)`
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in")
        }
      })
    }, observerOptions)

    const elements = document.querySelectorAll(".observe-me")
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  const handleRippleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget
    const ripple = document.createElement("span")
    const rect = button.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    const x = e.clientX - rect.left - size / 2
    const y = e.clientY - rect.top - size / 2

    ripple.style.width = ripple.style.height = size + "px"
    ripple.style.left = x + "px"
    ripple.style.top = y + "px"
    ripple.classList.add("ripple")

    button.appendChild(ripple)

    setTimeout(() => {
      ripple.remove()
    }, 600)
  }

  return (
    <div className="min-h-screen bg-black overflow-hidden relative">
      {/* Enhanced Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-blue-900/20 to-cyan-900/30"></div>

        {/* Floating Geometric Shapes */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full blur-2xl animate-float-slow"></div>
        <div className="absolute top-1/3 right-20 w-24 h-24 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full blur-2xl animate-float-delayed"></div>
        <div className="absolute bottom-1/4 left-1/3 w-40 h-40 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-float-reverse"></div>

        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="grid-pattern animate-grid-move"></div>
        </div>

        {/* Enhanced Floating Particles */}
        <div className="absolute inset-0">
          {[...Array(100)].map((_, i) => (
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
                className="w-1 h-1 bg-gradient-to-r from-white/30 to-cyan-400/30 rounded-full"
                style={{
                  boxShadow: "0 0 6px rgba(34, 211, 238, 0.4)",
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
            <div className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-2xl group-hover:shadow-purple-500/50 transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 animate-pulse-glow">
                  <span className="text-white font-bold text-sm">VC</span>
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-ping"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-xl blur-lg opacity-30 group-hover:opacity-60 transition-opacity duration-500"></div>
              </div>
              <div className="animate-slide-in-left">
                <span className="text-xl font-bold bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent animate-gradient-text">
                  VoucherChain
                </span>
                <div className="text-xs bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent font-medium">
                  Next-Gen Crypto Gateway
                </div>
              </div>
            </div>

            <nav className="hidden lg:flex items-center space-x-6">
              {[
                { name: "Product", href: "#product" },
                { name: "Solutions", href: "#solutions" },
                { name: "Technology", href: "#technology" },
                { name: "Enterprise", href: "#enterprise" },
              ].map((item, index) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-300 hover:text-white transition-all duration-300 font-medium relative group animate-fade-in-down hover-glow text-sm"
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={(e) => {
                    e.preventDefault()
                    const element = document.querySelector(item.href)
                    if (element) {
                      element.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      })
                    }
                  }}
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 group-hover:w-full transition-all duration-300"></span>
                  <span className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></span>
                </a>
              ))}
            </nav>

            <div className="flex items-center space-x-3 animate-slide-in-right">
              <Link href="/agent">
                <Button
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-4 py-2 rounded-lg shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105 ripple-button text-sm"
                  onClick={handleRippleClick}
                >
                  <Sparkles className="w-4 h-4 mr-2 animate-spin-slow" />
                  Agent Portal
                </Button>
              </Link>
              <Link href="/redeem">
                <Button
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-4 py-2 rounded-lg shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 hover:scale-105 ripple-button text-sm"
                  onClick={handleRippleClick}
                >
                  <Zap className="w-4 h-4 mr-2 animate-pulse" />
                  Redeem Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Enhanced Hero Section */}
      <section ref={heroRef} className="relative z-10 py-20 px-6 min-h-screen flex items-center">
        <div className="container mx-auto">
          <div className="max-w-5xl mx-auto text-center">
            {/* Floating Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-purple-500/30 backdrop-blur-2xl mb-8 animate-bounce-slow glass-card">
              <Infinity className="w-4 h-4 text-cyan-400 mr-2 animate-spin-slow" />
              <span className="text-sm font-semibold bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
                Revolutionary Crypto Access Platform
              </span>
              <div className="ml-2 px-2 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full text-black text-xs font-bold animate-pulse">
                LIVE
              </div>
            </div>

            {/* Enhanced Main Heading */}
            <div className="space-y-4 mb-8">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight">
                <div className="animate-slide-up observe-me" style={{ animationDelay: "200ms" }}>
                  <span className="bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent animate-gradient-text">
                    CRYPTO
                  </span>
                </div>
                <div className="animate-slide-up observe-me" style={{ animationDelay: "400ms" }}>
                  <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-gradient-text-reverse">
                    REVOLUTION
                  </span>
                </div>
                <div className="animate-slide-up observe-me" style={{ animationDelay: "600ms" }}>
                  <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent animate-gradient-text">
                    STARTS HERE
                  </span>
                </div>
              </h1>
            </div>

            <div className="animate-fade-in-up observe-me" style={{ animationDelay: "800ms" }}>
              <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
                Transform <span className="text-cyan-400 font-bold animate-pulse-text">cash into crypto</span> at your
                local store.
                <br />
                No banks. No exchanges. No complexity.
                <br />
                <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent font-bold animate-gradient-text">
                  Just pure innovation.
                </span>
              </p>
            </div>

            {/* Enhanced CTA Buttons */}
            <div
              className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fade-in-up observe-me"
              style={{ animationDelay: "1000ms" }}
            >
              <Link href="/redeem">
                <Button
                  size="lg"
                  className="text-base px-8 py-3 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 hover:from-purple-700 hover:via-blue-700 hover:to-cyan-700 text-white shadow-2xl hover:shadow-purple-500/50 transition-all duration-500 transform hover:scale-105 rounded-xl group ripple-button glow-on-hover"
                  onClick={handleRippleClick}
                >
                  <Smartphone className="mr-3 w-5 h-5 group-hover:animate-bounce" />
                  Start Your Journey
                  <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                </Button>
              </Link>
              <Link href="/agent">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-base px-8 py-3 border-2 border-purple-500/50 text-white hover:bg-purple-500/10 backdrop-blur-2xl transition-all duration-500 bg-transparent rounded-xl group hover:border-cyan-500/50 hover:shadow-2xl hover:shadow-cyan-500/25 transform hover:scale-105 glass-button"
                >
                  <Store className="mr-3 w-5 h-5 group-hover:animate-pulse" />
                  Become an Agent
                </Button>
              </Link>
            </div>

            {/* Enhanced Floating Stats */}
            <div
              className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto animate-fade-in-up observe-me"
              style={{ animationDelay: "1200ms" }}
            >
              {[
                { value: "50K+", label: "Vouchers Sold", icon: "🎫", color: "from-blue-500 to-cyan-500" },
                { value: "500+", label: "Active Agents", icon: "🏪", color: "from-green-500 to-emerald-500" },
                { value: "$2M+", label: "Volume", icon: "💎", color: "from-purple-500 to-pink-500" },
                { value: "99.9%", label: "Uptime", icon: "⚡", color: "from-orange-500 to-red-500" },
              ].map((stat, index) => (
                <div key={index} className="group hover:scale-105 transition-all duration-500 cursor-pointer">
                  <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl rounded-xl p-4 border border-white/20 hover:border-purple-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/25 glass-card stat-card">
                    <div className="text-2xl mb-2 group-hover:animate-bounce group-hover:scale-125 transition-transform duration-300">
                      {stat.icon}
                    </div>
                    <div className="text-xl font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors duration-300">
                      {stat.value}
                    </div>
                    <div className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                      {stat.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced Floating Elements */}
        <div className="absolute top-1/4 left-10 animate-float-3d">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500/30 to-blue-500/30 rounded-full blur-xl animate-pulse-glow"></div>
        </div>
        <div className="absolute bottom-1/4 right-10 animate-float-3d" style={{ animationDelay: "1s" }}>
          <div className="w-12 h-12 bg-gradient-to-r from-cyan-500/30 to-purple-500/30 rounded-full blur-xl animate-pulse-glow"></div>
        </div>
      </section>

      {/* Enhanced Supported Tokens Section */}
      <section className="relative z-10 py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fade-in-up observe-me">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent animate-gradient-text">
                Supported
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent animate-gradient-text-reverse">
                Cryptocurrencies
              </span>
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Access the most promising digital assets through physical vouchers
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                token: "ETN",
                name: "Electroneum",
                desc: "The mobile-first cryptocurrency designed for mass adoption and financial inclusion worldwide",
                color: "from-blue-500 to-cyan-500",
                stats: ["4M+ Users", "Global Reach", "Mobile First"],
                delay: "0ms",
              },
              {
                token: "XFI",
                name: "CrossFi",
                desc: "Next-generation DeFi infrastructure bridging traditional and decentralized finance seamlessly",
                color: "from-purple-500 to-pink-500",
                stats: ["High Growth", "DeFi Bridge", "Fast Transactions"],
                delay: "200ms",
              },
            ].map((crypto, index) => (
              <div
                key={index}
                className="group animate-slide-in-up observe-me"
                style={{ animationDelay: crypto.delay }}
              >
                <Card className="bg-gradient-to-br from-white/10 to-white/5 border border-white/20 backdrop-blur-2xl hover:border-purple-500/50 transition-all duration-500 group-hover:scale-105 hover:shadow-xl hover:shadow-purple-500/25 rounded-2xl overflow-hidden glass-card token-card">
                  <CardHeader className="text-center p-8 relative">
                    {/* Enhanced floating background effect */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${crypto.color} opacity-5 group-hover:opacity-10 transition-opacity duration-500`}
                    ></div>

                    <div className="relative z-10">
                      <div className="relative mb-6">
                        <div
                          className={`w-16 h-16 bg-gradient-to-r ${crypto.color} rounded-2xl flex items-center justify-center mx-auto shadow-xl group-hover:shadow-purple-500/50 transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 animate-pulse-token`}
                        >
                          <span className="text-2xl font-black text-white">{crypto.token}</span>
                        </div>
                        <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center animate-pulse">
                          <CheckCircle className="w-4 h-4 text-white" />
                        </div>
                        {/* Enhanced floating particles around token */}
                        <div className="absolute inset-0">
                          {[...Array(4)].map((_, i) => (
                            <div
                              key={i}
                              className="absolute w-1 h-1 bg-white/30 rounded-full animate-float-particle"
                              style={{
                                left: `${20 + Math.random() * 60}%`,
                                top: `${20 + Math.random() * 60}%`,
                                animationDelay: `${i * 0.5}s`,
                              }}
                            />
                          ))}
                        </div>
                      </div>

                      <CardTitle className="text-2xl text-white mb-3 group-hover:text-cyan-400 transition-colors duration-300">
                        {crypto.name}
                      </CardTitle>
                      <CardDescription className="text-gray-300 text-sm leading-relaxed mb-6 group-hover:text-gray-200 transition-colors duration-300">
                        {crypto.desc}
                      </CardDescription>

                      <div className="flex flex-wrap justify-center gap-2">
                        {crypto.stats.map((stat, statIndex) => (
                          <div
                            key={statIndex}
                            className="px-3 py-1 bg-gradient-to-r from-white/10 to-white/5 rounded-full border border-white/20 backdrop-blur-xl group-hover:border-purple-500/50 transition-all duration-300"
                          >
                            <span className="text-xs font-medium text-gray-300 group-hover:text-white transition-colors duration-300">
                              {stat}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Section */}
      <section id="product" className="relative z-10 py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fade-in-up observe-me">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent animate-gradient-text">
                Our
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent animate-gradient-text-reverse">
                Products
              </span>
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Comprehensive crypto access solutions for every need
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[
              {
                title: "VoucherChain Mobile App",
                desc: "Intuitive mobile application for instant voucher redemption. Scan, verify, and receive crypto in seconds with our user-friendly interface.",
                features: ["QR Code Scanner", "Wallet Integration", "Transaction History", "24/7 Support"],
                color: "from-blue-500 to-cyan-500",
                icon: Smartphone,
                delay: "0ms",
              },
              {
                title: "Agent Dashboard Pro",
                desc: "Professional portal for retail agents to manage inventory, track sales, and monitor performance with advanced analytics and reporting.",
                features: [
                  "Real-time Analytics",
                  "Inventory Management",
                  "Commission Tracking",
                  "Multi-location Support",
                ],
                color: "from-purple-500 to-pink-500",
                icon: Store,
                delay: "200ms",
              },
            ].map((product, index) => (
              <div
                key={index}
                className="group animate-slide-in-up observe-me"
                style={{ animationDelay: product.delay }}
              >
                <Card className="bg-gradient-to-br from-white/10 to-white/5 border border-white/20 backdrop-blur-2xl hover:border-purple-500/50 transition-all duration-500 group-hover:scale-105 hover:shadow-xl hover:shadow-purple-500/25 rounded-2xl overflow-hidden glass-card h-full">
                  <CardHeader className="p-6 relative">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${product.color} opacity-5 group-hover:opacity-10 transition-opacity duration-500`}
                    ></div>

                    <div className="relative z-10">
                      <div
                        className={`w-12 h-12 bg-gradient-to-r ${product.color} rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:shadow-purple-500/50 transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 animate-pulse-glow`}
                      >
                        <product.icon className="w-6 h-6 text-white" />
                      </div>

                      <CardTitle className="text-xl text-white mb-3 group-hover:text-cyan-400 transition-colors duration-300">
                        {product.title}
                      </CardTitle>
                      <CardDescription className="text-gray-300 text-sm leading-relaxed mb-4 group-hover:text-gray-200 transition-colors duration-300">
                        {product.desc}
                      </CardDescription>

                      <div className="space-y-2">
                        {product.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse"></div>
                            <span className="text-gray-300 group-hover:text-white transition-colors duration-300 text-sm">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section id="solutions" className="relative z-10 py-20 px-6 bg-gradient-to-r from-purple-900/10 to-cyan-900/10">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fade-in-up observe-me">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent animate-gradient-text">
                Complete
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent animate-gradient-text-reverse">
                Solutions
              </span>
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Tailored crypto access solutions for different market segments
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "For Consumers",
                desc: "Easy crypto access without technical barriers",
                features: ["Cash to Crypto", "Mobile App", "Instant Redemption", "24/7 Support"],
                color: "from-green-500 to-emerald-500",
                icon: Users,
                delay: "0ms",
              },
              {
                title: "For Retailers",
                desc: "Additional revenue stream with minimal setup",
                features: ["Agent Dashboard", "Commission System", "Training Support", "Marketing Materials"],
                color: "from-blue-500 to-cyan-500",
                icon: Store,
                delay: "200ms",
              },
              {
                title: "For Enterprises",
                desc: "White-label solutions and API integration",
                features: ["Custom Branding", "API Access", "Bulk Operations", "Dedicated Support"],
                color: "from-purple-500 to-pink-500",
                icon: Globe,
                delay: "400ms",
              },
            ].map((solution, index) => (
              <div
                key={index}
                className="group animate-slide-in-up observe-me"
                style={{ animationDelay: solution.delay }}
              >
                <Card className="bg-gradient-to-br from-white/10 to-white/5 border border-white/20 backdrop-blur-2xl hover:border-purple-500/50 transition-all duration-500 group-hover:scale-105 hover:shadow-xl hover:shadow-purple-500/25 rounded-2xl overflow-hidden glass-card h-full">
                  <CardHeader className="text-center p-6 relative">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${solution.color} opacity-5 group-hover:opacity-10 transition-opacity duration-500`}
                    ></div>

                    <div className="relative z-10">
                      <div
                        className={`w-12 h-12 bg-gradient-to-r ${solution.color} rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-purple-500/50 transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 animate-pulse-glow`}
                      >
                        <solution.icon className="w-6 h-6 text-white" />
                      </div>

                      <CardTitle className="text-lg text-white mb-3 group-hover:text-cyan-400 transition-colors duration-300">
                        {solution.title}
                      </CardTitle>
                      <CardDescription className="text-gray-300 text-sm leading-relaxed mb-4 group-hover:text-gray-200 transition-colors duration-300">
                        {solution.desc}
                      </CardDescription>

                      <div className="space-y-2">
                        {solution.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center justify-center space-x-2">
                            <div className="w-1.5 h-1.5 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse"></div>
                            <span className="text-gray-300 group-hover:text-white transition-colors duration-300 text-xs">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section id="technology" className="relative z-10 py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fade-in-up observe-me">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent animate-gradient-text">
                Advanced
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent animate-gradient-text-reverse">
                Technology
              </span>
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Built on cutting-edge blockchain technology for security and scalability
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-in-up observe-me">
              <div className="space-y-6">
                {[
                  {
                    title: "Smart Contract Security",
                    desc: "Immutable smart contracts ensure voucher authenticity and prevent fraud",
                    icon: Shield,
                    color: "from-green-500 to-emerald-500",
                  },
                  {
                    title: "Blockchain Verification",
                    desc: "Every voucher is cryptographically verified on the blockchain",
                    icon: Lock,
                    color: "from-blue-500 to-cyan-500",
                  },
                  {
                    title: "Instant Processing",
                    desc: "Lightning-fast redemption with sub-second transaction confirmation",
                    icon: Zap,
                    color: "from-purple-500 to-pink-500",
                  },
                  {
                    title: "Multi-Chain Support",
                    desc: "Compatible with multiple blockchain networks for maximum flexibility",
                    icon: Globe,
                    color: "from-orange-500 to-red-500",
                  },
                ].map((tech, index) => (
                  <div key={index} className="flex items-start space-x-3 group">
                    <div
                      className={`w-10 h-10 bg-gradient-to-r ${tech.color} rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-purple-500/25 transition-all duration-300 group-hover:scale-110 animate-pulse-glow flex-shrink-0`}
                    >
                      <tech.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors duration-300">
                        {tech.title}
                      </h3>
                      <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300 text-sm">
                        {tech.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="animate-slide-in-up observe-me" style={{ animationDelay: "200ms" }}>
              <div className="relative">
                <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl rounded-2xl p-6 border border-white/20 glass-card">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-white mb-2">Technology Stack</h3>
                    <p className="text-gray-300 text-sm">Enterprise-grade infrastructure</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { name: "Ethereum", desc: "Smart Contracts", color: "from-blue-400 to-blue-600" },
                      { name: "IPFS", desc: "Decentralized Storage", color: "from-green-400 to-green-600" },
                      { name: "Node.js", desc: "Backend API", color: "from-purple-400 to-purple-600" },
                      { name: "React", desc: "Frontend UI", color: "from-cyan-400 to-cyan-600" },
                    ].map((stack, index) => (
                      <div key={index} className="text-center group">
                        <div
                          className={`w-12 h-12 bg-gradient-to-r ${stack.color} rounded-xl flex items-center justify-center mx-auto mb-2 shadow-lg group-hover:shadow-purple-500/25 transition-all duration-300 group-hover:scale-110 animate-pulse-glow`}
                        >
                          <span className="text-white font-bold text-sm">{stack.name.charAt(0)}</span>
                        </div>
                        <h4 className="text-white font-semibold text-sm mb-1">{stack.name}</h4>
                        <p className="text-gray-400 text-xs">{stack.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Floating tech elements */}
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-float"></div>
                <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full animate-float-delayed"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enterprise Section */}
      <section id="enterprise" className="relative z-10 py-20 px-6 bg-gradient-to-r from-purple-900/10 to-cyan-900/10">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fade-in-up observe-me">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent animate-gradient-text">
                Enterprise
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent animate-gradient-text-reverse">
                Solutions
              </span>
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Scalable crypto infrastructure for large organizations and financial institutions
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
              <div className="animate-slide-in-up observe-me">
                <h3 className="text-2xl font-bold text-white mb-4">
                  <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                    White-Label Platform
                  </span>
                </h3>
                <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                  Deploy VoucherChain technology under your own brand with complete customization and control.
                </p>

                <div className="space-y-3">
                  {[
                    "Custom branding and UI/UX design",
                    "Dedicated infrastructure and support",
                    "Advanced analytics and reporting",
                    "Multi-currency and multi-region support",
                    "Compliance and regulatory assistance",
                    "24/7 enterprise-grade support",
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse"></div>
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="animate-slide-in-up observe-me" style={{ animationDelay: "200ms" }}>
                <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl rounded-2xl p-6 border border-white/20 glass-card">
                  <div className="text-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-3 animate-pulse-glow">
                      <Globe className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="text-xl font-bold text-white mb-2">Global Reach</h4>
                    <p className="text-gray-300 text-sm">Serving enterprises worldwide</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-white mb-1">50+</div>
                      <div className="text-gray-400 text-xs">Countries</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-white mb-1">100M+</div>
                      <div className="text-gray-400 text-xs">Transactions</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-white mb-1">99.99%</div>
                      <div className="text-gray-400 text-xs">Uptime SLA</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-white mb-1">24/7</div>
                      <div className="text-gray-400 text-xs">Support</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Enterprise Features Grid */}
            <div
              className="grid md:grid-cols-3 gap-6 animate-fade-in-up observe-me"
              style={{ animationDelay: "400ms" }}
            >
              {[
                {
                  title: "API Integration",
                  desc: "RESTful APIs for seamless integration with existing systems",
                  icon: Zap,
                  color: "from-blue-500 to-cyan-500",
                },
                {
                  title: "Compliance Suite",
                  desc: "Built-in KYC/AML compliance tools and regulatory reporting",
                  icon: Shield,
                  color: "from-green-500 to-emerald-500",
                },
                {
                  title: "Analytics Dashboard",
                  desc: "Real-time insights and comprehensive business intelligence",
                  icon: TrendingUp,
                  color: "from-purple-500 to-pink-500",
                },
              ].map((feature, index) => (
                <Card
                  key={index}
                  className="bg-gradient-to-br from-white/10 to-white/5 border border-white/20 backdrop-blur-2xl hover:border-purple-500/50 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/25 rounded-2xl overflow-hidden glass-card group"
                >
                  <CardHeader className="text-center p-6">
                    <div
                      className={`w-10 h-10 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg group-hover:shadow-purple-500/50 transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 animate-pulse-glow`}
                    >
                      <feature.icon className="w-5 h-5 text-white" />
                    </div>
                    <CardTitle className="text-lg text-white mb-2 group-hover:text-cyan-400 transition-colors duration-300">
                      {feature.title}
                    </CardTitle>
                    <CardDescription className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300 text-sm">
                      {feature.desc}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Features Section - 6 Feature Grid */}
      <section ref={featuresRef} className="relative z-10 py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fade-in-up observe-me">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent animate-gradient-text">
                Why Choose
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent animate-gradient-text-reverse">
                VoucherChain?
              </span>
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Revolutionary technology meets everyday accessibility
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {[
              {
                icon: Store,
                title: "Cash to Crypto",
                desc: "Walk into any participating store, buy a voucher with cash, and redeem crypto instantly. No bank account or credit card required.",
                color: "from-green-500 to-emerald-500",
                delay: "0ms",
              },
              {
                icon: Shield,
                title: "Secure & Trustless",
                desc: "Smart contract powered system ensures security, transparency, and prevents fraud. Your funds are protected by blockchain technology.",
                color: "from-blue-500 to-cyan-500",
                delay: "200ms",
              },
              {
                icon: Smartphone,
                title: "Mobile First",
                desc: "Simple mobile interface designed for everyone. Just scratch the code, scan with your phone, and receive crypto in seconds.",
                color: "from-purple-500 to-pink-500",
                delay: "400ms",
              },
              {
                icon: Globe,
                title: "Global Network",
                desc: "Access our worldwide network of retail partners. From corner stores to major retailers, crypto is always within reach.",
                color: "from-orange-500 to-red-500",
                delay: "600ms",
              },
              {
                icon: Users,
                title: "Community Driven",
                desc: "Join millions of users who trust VoucherChain for their crypto needs. Built by the community, for the community.",
                color: "from-pink-500 to-purple-500",
                delay: "800ms",
              },
              {
                icon: TrendingUp,
                title: "Future Ready",
                desc: "Stay ahead with cutting-edge technology. Regular updates and new features keep you at the forefront of crypto innovation.",
                color: "from-cyan-500 to-blue-500",
                delay: "1000ms",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="group animate-slide-in-up observe-me"
                style={{ animationDelay: feature.delay }}
              >
                <Card className="bg-gradient-to-br from-white/10 to-white/5 border border-white/20 backdrop-blur-2xl hover:border-purple-500/50 transition-all duration-500 group-hover:scale-105 hover:shadow-xl hover:shadow-purple-500/25 rounded-2xl overflow-hidden h-full glass-card feature-card">
                  <CardHeader className="text-center p-6 relative">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-5 group-hover:opacity-10 transition-opacity duration-500`}
                    ></div>

                    <div className="relative z-10">
                      <div
                        className={`w-14 h-14 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl group-hover:shadow-purple-500/50 transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 animate-pulse-glow`}
                      >
                        <feature.icon className="w-7 h-7 text-white" />
                      </div>

                      <CardTitle className="text-xl text-white mb-3 group-hover:text-cyan-400 transition-colors duration-300">
                        {feature.title}
                      </CardTitle>
                      <CardDescription className="text-gray-300 text-sm leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                        {feature.desc}
                      </CardDescription>
                    </div>
                  </CardHeader>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced How It Works */}
      <section className="relative z-10 py-20 px-6 bg-gradient-to-r from-purple-900/20 to-cyan-900/20 backdrop-blur-sm">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fade-in-up observe-me">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent animate-gradient-text">
                How It
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent animate-gradient-text-reverse">
                Works
              </span>
            </h2>
            <p className="text-lg text-gray-300 max-w-xl mx-auto">Four simple steps to crypto ownership</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "1",
                title: "Find Store",
                desc: "Locate a participating retail agent near you using our advanced store finder",
                icon: "🏪",
                color: "from-blue-500 to-cyan-500",
                delay: "0ms",
              },
              {
                step: "2",
                title: "Buy Voucher",
                desc: "Purchase a voucher card with cash in your preferred denomination",
                icon: "💳",
                color: "from-green-500 to-emerald-500",
                delay: "200ms",
              },
              {
                step: "3",
                title: "Scratch Code",
                desc: "Reveal the hidden redemption code by scratching the silver coating",
                icon: "🎫",
                color: "from-purple-500 to-pink-500",
                delay: "400ms",
              },
              {
                step: "4",
                title: "Get Crypto",
                desc: "Enter the code in our app and receive crypto directly to your wallet",
                icon: "💰",
                color: "from-orange-500 to-red-500",
                delay: "600ms",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="text-center group animate-slide-in-up observe-me"
                style={{ animationDelay: item.delay }}
              >
                <div className="relative mb-6">
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${item.color} rounded-2xl flex items-center justify-center mx-auto shadow-xl group-hover:shadow-purple-500/50 transition-all duration-500 transform group-hover:scale-110 group-hover:rotate-12 animate-pulse-glow`}
                  >
                    <span className="text-2xl group-hover:animate-bounce">{item.icon}</span>
                  </div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-white to-gray-200 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 animate-pulse">
                    <span className="text-sm font-black text-gray-900">{item.step}</span>
                  </div>

                  {/* Enhanced connecting line */}
                  {index < 3 && (
                    <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-purple-500/50 via-blue-500/50 to-cyan-500/50 animate-gradient-flow"></div>
                  )}
                </div>
                <h3 className="text-lg font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="relative z-10 py-20 px-6">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto animate-fade-in-up observe-me">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent animate-gradient-text">
                Ready to
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent animate-gradient-text-reverse">
                Transform Finance?
              </span>
            </h2>
            <p className="text-lg text-gray-300 mb-12 max-w-2xl mx-auto">
              Join the revolution and start accessing crypto with just cash and a mobile phone
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link href="/redeem">
                <Button
                  size="lg"
                  className="text-base px-10 py-4 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 hover:from-purple-700 hover:via-blue-700 hover:to-cyan-700 text-white shadow-2xl hover:shadow-purple-500/50 transition-all duration-500 transform hover:scale-105 rounded-xl group ripple-button glow-on-hover"
                  onClick={handleRippleClick}
                >
                  <Smartphone className="mr-3 w-5 h-5 group-hover:animate-bounce" />
                  Redeem Your Voucher
                  <Sparkles className="ml-3 w-5 h-5 group-hover:animate-spin" />
                </Button>
              </Link>
              <Link href="/agent">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-base px-10 py-4 border-2 border-purple-500/50 text-white hover:bg-purple-500/10 backdrop-blur-2xl transition-all duration-500 bg-transparent rounded-xl group hover:border-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/25 transform hover:scale-105 glass-button"
                >
                  <Store className="mr-3 w-5 h-5 group-hover:animate-pulse" />
                  Become a Retail Agent
                </Button>
              </Link>
            </div>

            {/* Additional CTAs */}
            <div className="grid md:grid-cols-3 gap-4 max-w-3xl mx-auto">
              {[
                { icon: Lock, title: "Secure Transactions", desc: "Bank-level security" },
                { icon: Wallet, title: "Instant Access", desc: "Get crypto in seconds" },
                { icon: Clock, title: "24/7 Support", desc: "Always here to help" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="p-4 bg-gradient-to-br from-white/10 to-white/5 rounded-xl border border-white/20 backdrop-blur-2xl hover:border-purple-500/50 transition-all duration-300 group glass-card"
                >
                  <item.icon className="w-6 h-6 text-purple-400 mx-auto mb-2 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-white font-semibold mb-1 text-sm">{item.title}</h3>
                  <p className="text-gray-400 text-xs">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="relative z-10 bg-gradient-to-r from-black/80 to-purple-900/20 backdrop-blur-2xl border-t border-white/10 py-16 px-6">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2 animate-fade-in-up observe-me">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-xl animate-pulse-glow">
                  <span className="text-white font-bold text-lg">VC</span>
                </div>
                <div>
                  <span className="text-xl font-bold text-white animate-gradient-text">VoucherChain</span>
                  <div className="text-sm bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                    Next-Gen Crypto Gateway
                  </div>
                </div>
              </div>
              <p className="text-gray-300 text-sm mb-6 max-w-md leading-relaxed">
                Making cryptocurrency accessible to everyone, everywhere. Bridging the gap between traditional cash
                economy and digital assets.
              </p>
              <div className="flex space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 bg-gradient-to-r from-white/10 to-white/5 rounded-lg flex items-center justify-center hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-cyan-500/20 transition-all duration-300 cursor-pointer group border border-white/10 hover:border-purple-500/50 glass-card"
                  >
                    <Star className="w-4 h-4 text-gray-300 group-hover:text-white transition-colors duration-300 group-hover:animate-spin" />
                  </div>
                ))}
              </div>
            </div>

            {[
              {
                title: "Product",
                links: ["Redeem Voucher", "Agent Dashboard", "Mobile App", "API Access"],
                delay: "200ms",
              },
              {
                title: "Support",
                links: ["Help Center", "Contact Us", "Agent Support", "Documentation"],
                delay: "400ms",
              },
            ].map((section, index) => (
              <div key={index} className="animate-fade-in-up observe-me" style={{ animationDelay: section.delay }}>
                <h3 className="font-bold text-white text-base mb-4">{section.title}</h3>
                <ul className="space-y-3">
                  {section.links.map((item) => (
                    <li key={item}>
                      <Link
                        href="#"
                        className="text-gray-300 hover:text-white transition-colors duration-300 text-sm hover:translate-x-1 transform transition-transform inline-block hover-glow"
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div
            className="border-t border-white/10 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center animate-fade-in-up observe-me"
            style={{ animationDelay: "600ms" }}
          >
            <p className="text-gray-400 mb-4 md:mb-0 text-sm">
              © 2024 VoucherChain. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                Privacy Policy
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                Terms of Service
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
