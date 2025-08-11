import { ethers } from 'ethers'

// Contract ABI - only the functions we need
export const VOUCHER_CHAIN_ABI = [
  // Voucher redemption
  "function redeemVoucher(string memory voucherCode, address recipient) external",
  
  // Voucher status checking
  "function getVoucherStatus(string memory voucherCode) external view returns (bool exists, bool isRedeemed, address token, uint256 tokenValue, address issuer, uint256 expiryTimestamp)",
  
  // Agent voucher minting
  "function mintVoucher(bytes32 voucherHash, address token, uint256 tokenValue, uint256 expiryDays) external",
  
  // Agent statistics
  "function getAgentStats(address agent) external view returns (bool isActive, uint256 totalMinted, uint256 totalValue, uint256 commissionRate, uint256 lastSettlement)",
  
  // Contract statistics
  "function getContractStats() external view returns (uint256 totalMinted, uint256 totalRedeemed, uint256 mintingFeeRate, uint256 redemptionFeeRate)",
  
  // Token support
  "function isTokenSupported(address token) external view returns (bool)",
  
  // Events
  "event VoucherRedeemed(bytes32 indexed voucherHash, address indexed token, address indexed recipient, uint256 tokenValue, uint256 fee)",
  "event VoucherMinted(bytes32 indexed voucherHash, address indexed token, uint256 tokenValue, address indexed issuer, uint256 expiryTimestamp)"
]

// ERC20 ABI for token approvals
export const ERC20_ABI = [
  "function approve(address spender, uint256 amount) external returns (bool)",
  "function allowance(address owner, address spender) external view returns (uint256)",
  "function balanceOf(address account) external view returns (uint256)",
  "function decimals() external view returns (uint8)",
  "function symbol() external view returns (string)",
  "function name() external view returns (string)"
]

// Contract configuration
export const CONTRACT_CONFIG = {
  address: '0x52C84043CD9c865236f11d9Fc9F56aa003c1f922' as const,
  abi: VOUCHER_CHAIN_ABI,
}

// Token addresses (you'll need to add the actual token addresses)
export const SUPPORTED_TOKENS = {
  ETN: '0x0000000000000000000000000000000000000000', // Replace with actual ETN token address
  XFI: '0x0000000000000000000000000000000000000000', // Replace with actual XFI token address
}

// Error handling
export const CONTRACT_ERRORS = {
  VoucherNotFound: 'Invalid voucher code',
  VoucherAlreadyRedeemed: 'Voucher has already been redeemed',
  VoucherExpired: 'Voucher has expired',
  TokenNotSupported: 'Token not supported',
  UnauthorizedMinter: 'Not authorized to mint vouchers',
  InsufficientBalance: 'Insufficient token balance',
  InvalidFee: 'Invalid fee amount',
  InvalidExpiry: 'Invalid expiry date',
  DuplicateVoucherCode: 'Voucher code already exists',
  VoucherNotExpired: 'Voucher has not expired yet',
  AgentNotActive: 'Agent account is not active',
  InvalidBatchSize: 'Invalid batch size',
  TokenTransferFailed: 'Token transfer failed',
}

// Contract utility functions
export class VoucherChainContract {
  private contract: ethers.Contract
  private signer: ethers.Signer

  constructor(signer: ethers.Signer) {
    this.signer = signer
    this.contract = new ethers.Contract(CONTRACT_CONFIG.address, CONTRACT_CONFIG.abi, signer)
  }

  // Check voucher status
  async getVoucherStatus(voucherCode: string) {
    try {
      const status = await this.contract.getVoucherStatus(voucherCode)
      return {
        exists: status.exists,
        isRedeemed: status.isRedeemed,
        token: status.token,
        tokenValue: status.tokenValue.toString(),
        issuer: status.issuer,
        expiryTimestamp: status.expiryTimestamp.toString(),
        isExpired: status.expiryTimestamp > 0 && Date.now() > status.expiryTimestamp * 1000
      }
    } catch (error) {
      console.error('Error getting voucher status:', error)
      throw new Error('Failed to check voucher status')
    }
  }

  // Redeem voucher
  async redeemVoucher(voucherCode: string, recipientAddress: string) {
    try {
      const tx = await this.contract.redeemVoucher(voucherCode, recipientAddress)
      return await tx.wait()
    } catch (error: any) {
      console.error('Error redeeming voucher:', error)
      
      // Handle specific contract errors
      if (error.message.includes('VoucherNotFound')) {
        throw new Error(CONTRACT_ERRORS.VoucherNotFound)
      }
      if (error.message.includes('VoucherAlreadyRedeemed')) {
        throw new Error(CONTRACT_ERRORS.VoucherAlreadyRedeemed)
      }
      if (error.message.includes('VoucherExpired')) {
        throw new Error(CONTRACT_ERRORS.VoucherExpired)
      }
      
      throw new Error('Failed to redeem voucher')
    }
  }

  // Mint voucher (for agents)
  async mintVoucher(voucherCode: string, tokenAddress: string, tokenValue: string, expiryDays: number) {
    try {
      const voucherHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(voucherCode))
      const value = ethers.utils.parseEther(tokenValue)
      
      const tx = await this.contract.mintVoucher(voucherHash, tokenAddress, value, expiryDays)
      return await tx.wait()
    } catch (error: any) {
      console.error('Error minting voucher:', error)
      
      if (error.message.includes('UnauthorizedMinter')) {
        throw new Error(CONTRACT_ERRORS.UnauthorizedMinter)
      }
      if (error.message.includes('TokenNotSupported')) {
        throw new Error(CONTRACT_ERRORS.TokenNotSupported)
      }
      if (error.message.includes('InsufficientBalance')) {
        throw new Error(CONTRACT_ERRORS.InsufficientBalance)
      }
      
      throw new Error('Failed to mint voucher')
    }
  }

  // Get agent statistics
  async getAgentStats(agentAddress: string) {
    try {
      const stats = await this.contract.getAgentStats(agentAddress)
      return {
        isActive: stats.isActive,
        totalMinted: stats.totalMinted.toString(),
        totalValue: ethers.utils.formatEther(stats.totalValue),
        commissionRate: stats.commissionRate.toString(),
        lastSettlement: new Date(stats.lastSettlement * 1000)
      }
    } catch (error) {
      console.error('Error getting agent stats:', error)
      throw new Error('Failed to get agent statistics')
    }
  }

  // Get contract statistics
  async getContractStats() {
    try {
      const stats = await this.contract.getContractStats()
      return {
        totalMinted: stats.totalMinted.toString(),
        totalRedeemed: stats.totalRedeemed.toString(),
        mintingFeeRate: stats.mintingFeeRate.toString(),
        redemptionFeeRate: stats.redemptionFeeRate.toString()
      }
    } catch (error) {
      console.error('Error getting contract stats:', error)
      throw new Error('Failed to get contract statistics')
    }
  }

  // Check if token is supported
  async isTokenSupported(tokenAddress: string) {
    try {
      return await this.contract.isTokenSupported(tokenAddress)
    } catch (error) {
      console.error('Error checking token support:', error)
      return false
    }
  }
}

// Token utility functions
export class TokenContract {
  private contract: ethers.Contract
  private signer: ethers.Signer

  constructor(tokenAddress: string, signer: ethers.Signer) {
    this.signer = signer
    this.contract = new ethers.Contract(tokenAddress, ERC20_ABI, signer)
  }

  // Approve tokens for voucher minting
  async approve(spenderAddress: string, amount: string) {
    try {
      const amountWei = ethers.utils.parseEther(amount)
      const tx = await this.contract.approve(spenderAddress, amountWei)
      return await tx.wait()
    } catch (error) {
      console.error('Error approving tokens:', error)
      throw new Error('Failed to approve tokens')
    }
  }

  // Check allowance
  async allowance(ownerAddress: string, spenderAddress: string) {
    try {
      const allowance = await this.contract.allowance(ownerAddress, spenderAddress)
      return ethers.utils.formatEther(allowance)
    } catch (error) {
      console.error('Error checking allowance:', error)
      return '0'
    }
  }

  // Get balance
  async balanceOf(address: string) {
    try {
      const balance = await this.contract.balanceOf(address)
      return ethers.utils.formatEther(balance)
    } catch (error) {
      console.error('Error getting balance:', error)
      return '0'
    }
  }

  // Get token info
  async getTokenInfo() {
    try {
      const [name, symbol, decimals] = await Promise.all([
        this.contract.name(),
        this.contract.symbol(),
        this.contract.decimals()
      ])
      return { name, symbol, decimals }
    } catch (error) {
      console.error('Error getting token info:', error)
      return { name: 'Unknown', symbol: 'UNK', decimals: 18 }
    }
  }
} 