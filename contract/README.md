# VoucherChain

A decentralized voucher management system built on Electronum blockchain.

## Features

- **Voucher Minting**: Agents can mint vouchers with different tokens and expiry dates
- **Voucher Redemption**: Users can redeem vouchers with automatic fee collection
- **Batch Operations**: Support for minting multiple vouchers in a single transaction
- **Expiry Management**: Automatic expiry handling with reclaim functionality
- **Agent Management**: Register and manage agents with commission rates
- **Fee System**: Configurable minting and redemption fees
- **Multi-Token Support**: Support for multiple ERC20 tokens

## Contract Architecture

### VoucherChain.sol
Main contract that handles:
- Voucher minting and redemption
- Agent registration and management
- Fee collection and treasury management
- Token support management
- Batch operations

### MockToken.sol
Test ERC20 token for development and testing.

## Installation

```bash
npm install
```

## Testing

```bash
npm test
```

## Deployment

### Prerequisites

1. **Environment Variables**: Create a `.env` file with:
   ```env
   PRIVATE_KEY=your_private_key_here
   TREASURY_ADDRESS=your_treasury_address_here
   MINTING_FEE=200
   REDEMPTION_FEE=100
   DEFAULT_EXPIRY_DAYS=30
   ```

2. **Network Configuration**: Update `hardhat.config.ts` with correct Electronum RPC URLs and chain IDs.

### Deploy to Electronum Mainnet

```bash
npm run deploy:electronum
```

### Deploy to Electronum Testnet

```bash
npm run deploy:electronum-testnet
```

### Deploy to Local Network

```bash
# Start local node
npm run node

# In another terminal, deploy
npm run deploy:local
```

## Deployment Parameters

- **Treasury Address**: Address that receives fees
- **Minting Fee**: Fee for minting vouchers (basis points, default: 200 = 2%)
- **Redemption Fee**: Fee for redeeming vouchers (basis points, default: 100 = 1%)
- **Default Expiry Days**: Default expiry period for vouchers (default: 30 days)

## Post-Deployment Setup

After deployment, you need to:

1. **Add Supported Tokens**:
   ```javascript
   await voucherChain.addSupportedToken(tokenAddress);
   ```

2. **Register Agents**:
   ```javascript
   await voucherChain.registerAgent(agentAddress, commissionRate);
   ```

3. **Add Authorized Minters**:
   ```javascript
   await voucherChain.addAuthorizedMinter(minterAddress);
   ```

## Usage Examples

### Minting a Voucher
```javascript
// Agent mints a voucher
await voucherChain.mintVoucher(
  ethers.keccak256(ethers.toUtf8Bytes("VOUCHER_CODE")),
  tokenAddress,
  ethers.parseEther("100"),
  30 // expiry days
);
```

### Redeeming a Voucher
```javascript
// User redeems a voucher
await voucherChain.redeemVoucher("VOUCHER_CODE", recipientAddress);
```

### Batch Minting
```javascript
const batch = {
  voucherHashes: [hash1, hash2, hash3],
  tokens: [token1, token2, token3],
  tokenValues: [value1, value2, value3],
  expiryDays: [30, 60, 90]
};
await voucherChain.mintVoucherBatch(batch);
```

## Contract Functions

### Core Functions
- `mintVoucher(bytes32 voucherHash, address token, uint256 tokenValue, uint256 expiryDays)`
- `redeemVoucher(string memory voucherCode, address recipient)`
- `reclaimExpiredVoucher(string memory voucherCode)`
- `mintVoucherBatch(VoucherBatch memory batch)`

### Management Functions
- `registerAgent(address agent, uint256 commissionRate)`
- `addSupportedToken(address token)`
- `addAuthorizedMinter(address minter)`
- `updateFees(uint256 _mintingFee, uint256 _redemptionFee)`

### View Functions
- `getVoucherStatus(string memory voucherCode)`
- `getContractStats()`
- `getAgentStats(address agent)`
- `getTokenStats(address token)`

## Security Features

- **Reentrancy Protection**: All external functions are protected
- **Ownable Access Control**: Only owner can perform administrative functions
- **Fee Limits**: Maximum 5% fees (500 basis points)
- **Expiry Limits**: Maximum 365 days expiry
- **Input Validation**: Comprehensive parameter validation

## Gas Optimization

- Optimized for 200 runs
- Efficient batch operations
- Minimal storage operations
- Gas-efficient error handling

## License

MIT License
