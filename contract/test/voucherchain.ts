import { expect } from "chai";
import { ethers } from "hardhat";
import { Contract, Signer } from "ethers";

describe("VoucherChain", function () {
  let voucherChain: any;
  let mockToken1: any;
  let mockToken2: any;
  let mockToken3: any;
  let owner: Signer;
  let agent: Signer;
  let user: Signer;
  let treasury: Signer;
  let ownerAddress: string;
  let agentAddress: string;
  let userAddress: string;
  let treasuryAddress: string;

  const voucherCode = "SECRET123";
  const voucherHash = ethers.keccak256(ethers.toUtf8Bytes("SECRET123"));
  const tokenValue = ethers.parseEther("100"); // 100 tokens
  const mintingFee = 200; // 2%
  const redemptionFee = 100; // 1%
  const defaultExpiryDays = 30;

  beforeEach(async function () {
    [owner, agent, user, treasury] = await ethers.getSigners();
    ownerAddress = await owner.getAddress();
    agentAddress = await agent.getAddress();
    userAddress = await user.getAddress();
    treasuryAddress = await treasury.getAddress();

    // Deploy mock tokens
    const MockTokenFactory = await ethers.getContractFactory("MockToken");
    mockToken1 = await MockTokenFactory.deploy("Token 1", "TK1");
    mockToken2 = await MockTokenFactory.deploy("Token 2", "TK2");
    mockToken3 = await MockTokenFactory.deploy("Token 3", "TK3");

    // Deploy VoucherChain
    const VoucherChainFactory = await ethers.getContractFactory("VoucherChain");
    voucherChain = await VoucherChainFactory.deploy(treasuryAddress, mintingFee, redemptionFee, defaultExpiryDays);

    // Add supported tokens
    await voucherChain.addSupportedToken(mockToken1.target);
    await voucherChain.addSupportedToken(mockToken2.target);
    await voucherChain.addSupportedToken(mockToken3.target);

    // Register agent
    await voucherChain.registerAgent(agentAddress, 100); // 1% commission

    // Fund agent with tokens for minting vouchers
    await mockToken1.transfer(agentAddress, ethers.parseEther("10000"));
    await mockToken2.transfer(agentAddress, ethers.parseEther("10000"));
    await mockToken3.transfer(agentAddress, ethers.parseEther("10000"));

    // Fund treasury
    await mockToken1.transfer(treasuryAddress, ethers.parseEther("1000"));
    await mockToken2.transfer(treasuryAddress, ethers.parseEther("1000"));
    await mockToken3.transfer(treasuryAddress, ethers.parseEther("1000"));
  });

  describe("Voucher Minting", function () {
    it("should mint voucher by agent", async function () {
      await voucherChain.addAuthorizedMinter(agentAddress);

      const agentBalanceBefore = await mockToken1.balanceOf(agentAddress);
      const contractBalanceBefore = await mockToken1.balanceOf(voucherChain.target);
      const treasuryBalanceBefore = await mockToken1.balanceOf(treasuryAddress);

      await mockToken1.connect(agent).approve(voucherChain.target, ethers.MaxUint256);
      await voucherChain.connect(agent).mintVoucher(voucherHash, mockToken1.target, tokenValue, 0);

      const agentBalanceAfter = await mockToken1.balanceOf(agentAddress);
      const contractBalanceAfter = await mockToken1.balanceOf(voucherChain.target);
      const treasuryBalanceAfter = await mockToken1.balanceOf(treasuryAddress);
      const fee = tokenValue * BigInt(mintingFee) / BigInt(10000);
      const totalPaid = tokenValue + fee;

      expect(agentBalanceAfter).to.equal(agentBalanceBefore - totalPaid);
      expect(contractBalanceAfter).to.equal(contractBalanceBefore + tokenValue); // Only voucher value stays in contract
      expect(treasuryBalanceAfter).to.equal(treasuryBalanceBefore + fee); // Fee goes to treasury

      const voucherStatus = await voucherChain.getVoucherStatus(voucherCode);
      expect(voucherStatus.exists).to.be.true;
      expect(voucherStatus.isRedeemed).to.be.false;
      expect(voucherStatus.token).to.equal(mockToken1.target);
      expect(voucherStatus.tokenValue).to.equal(tokenValue);
      expect(voucherStatus.issuer).to.equal(agentAddress);
    });

    it("should not allow unauthorized minter", async function () {
      await expect(
        voucherChain.connect(user).mintVoucher(voucherHash, mockToken1.target, tokenValue, 0)
      ).to.be.revertedWithCustomError(voucherChain, "UnauthorizedMinter");
    });

    it("should not allow duplicate voucher code", async function () {
      await voucherChain.addAuthorizedMinter(agentAddress);
      await mockToken1.connect(agent).approve(voucherChain.target, ethers.MaxUint256);
      await voucherChain.connect(agent).mintVoucher(voucherHash, mockToken1.target, tokenValue, 0);

      await expect(
        voucherChain.connect(agent).mintVoucher(voucherHash, mockToken1.target, tokenValue, 0)
      ).to.be.revertedWithCustomError(voucherChain, "DuplicateVoucherCode");
    });

    it("should not allow unsupported token", async function () {
      const MockTokenFactory = await ethers.getContractFactory("MockToken");
      const unsupportedToken = await MockTokenFactory.deploy("Unsupported", "UNS");
      await voucherChain.addAuthorizedMinter(agentAddress);

      await unsupportedToken.connect(agent).approve(voucherChain.target, ethers.MaxUint256);
      await expect(
        voucherChain.connect(agent).mintVoucher(voucherHash, unsupportedToken.target, tokenValue, 0)
      ).to.be.revertedWithCustomError(voucherChain, "TokenNotSupported");
    });
  });

  describe("Voucher Redemption", function () {
    beforeEach(async function () {
      await voucherChain.addAuthorizedMinter(agentAddress);
      await mockToken1.connect(agent).approve(voucherChain.target, ethers.MaxUint256);
      await voucherChain.connect(agent).mintVoucher(voucherHash, mockToken1.target, tokenValue, 0);
    });

    it("should redeem voucher successfully", async function () {
      const userBalanceBefore = await mockToken1.balanceOf(userAddress);
      const treasuryBalanceBefore = await mockToken1.balanceOf(treasuryAddress);

      await voucherChain.connect(user).redeemVoucher(voucherCode, userAddress);

      const userBalanceAfter = await mockToken1.balanceOf(userAddress);
      const treasuryBalanceAfter = await mockToken1.balanceOf(treasuryAddress);
      const fee = tokenValue * BigInt(redemptionFee) / BigInt(10000);

      expect(userBalanceAfter).to.equal(userBalanceBefore + tokenValue - fee);
      expect(treasuryBalanceAfter).to.equal(treasuryBalanceBefore + fee);

      const voucherStatus = await voucherChain.getVoucherStatus(voucherCode);
      expect(voucherStatus.isRedeemed).to.be.true;
    });

    it("should not allow redeeming twice", async function () {
      await voucherChain.connect(user).redeemVoucher(voucherCode, userAddress);

      await expect(
        voucherChain.connect(user).redeemVoucher(voucherCode, userAddress)
      ).to.be.revertedWithCustomError(voucherChain, "VoucherAlreadyRedeemed");
    });

    it("should not allow redeeming non-existent voucher", async function () {
      await expect(
        voucherChain.connect(user).redeemVoucher("INVALID_CODE", userAddress)
      ).to.be.revertedWithCustomError(voucherChain, "VoucherNotFound");
    });

    it("should not allow redeeming expired voucher", async function () {
      // Mint voucher with 1 day expiry
      await voucherChain.connect(agent).mintVoucher(
        ethers.keccak256(ethers.toUtf8Bytes("EXPIRED_CODE")),
        mockToken1.target,
        tokenValue,
        1
      );

      // Fast forward 2 days
      await ethers.provider.send("evm_increaseTime", [2 * 24 * 60 * 60]);
      await ethers.provider.send("evm_mine", []);

      await expect(
        voucherChain.connect(user).redeemVoucher("EXPIRED_CODE", userAddress)
      ).to.be.revertedWithCustomError(voucherChain, "VoucherExpired");
    });
  });

  describe("Voucher Expiry and Reclaim", function () {
    beforeEach(async function () {
      await voucherChain.addAuthorizedMinter(agentAddress);
      await mockToken1.connect(agent).approve(voucherChain.target, ethers.MaxUint256);
    });

    it("should allow reclaiming expired voucher", async function () {
      // Mint a voucher with 1 day expiry
      await voucherChain.connect(agent).mintVoucher(voucherHash, mockToken1.target, tokenValue, 1);

      const agentBalanceBefore = await mockToken1.balanceOf(agentAddress);
      const contractBalanceBefore = await mockToken1.balanceOf(voucherChain.target);

      // Fast forward past expiry
      await ethers.provider.send("evm_increaseTime", [2 * 24 * 60 * 60]);
      await ethers.provider.send("evm_mine", []);

      // Agent reclaims expired voucher
      await voucherChain.connect(agent).reclaimExpiredVoucher(voucherCode);

      const agentBalanceAfter = await mockToken1.balanceOf(agentAddress);
      const contractBalanceAfter = await mockToken1.balanceOf(voucherChain.target);

      expect(agentBalanceAfter).to.equal(agentBalanceBefore + tokenValue);
      expect(contractBalanceAfter).to.equal(contractBalanceBefore - tokenValue);

      const voucherStatus = await voucherChain.getVoucherStatus(voucherCode);
      expect(voucherStatus.isRedeemed).to.be.true;
    });

    it("should not allow reclaiming unexpired voucher", async function () {
      // Mint a voucher with 30 day expiry
      await voucherChain.connect(agent).mintVoucher(voucherHash, mockToken1.target, tokenValue, 30);

      // Try to reclaim before expiry
      await expect(
        voucherChain.connect(agent).reclaimExpiredVoucher(voucherCode)
      ).to.be.revertedWithCustomError(voucherChain, "VoucherNotExpired");
    });

    it("should not allow other agent to reclaim voucher", async function () {
      const otherAgent = (await ethers.getSigners())[4];
      await voucherChain.addAuthorizedMinter(await otherAgent.getAddress());

      // Agent mints voucher
      await voucherChain.connect(agent).mintVoucher(voucherHash, mockToken1.target, tokenValue, 1);

      // Fast forward past expiry
      await ethers.provider.send("evm_increaseTime", [2 * 24 * 60 * 60]);
      await ethers.provider.send("evm_mine", []);

      // Other agent tries to reclaim
      await expect(
        voucherChain.connect(otherAgent).reclaimExpiredVoucher(voucherCode)
      ).to.be.revertedWithCustomError(voucherChain, "UnauthorizedMinter");
    });

    it("should not allow reclaiming already redeemed voucher", async function () {
      // Mint a voucher with 1 day expiry
      await voucherChain.connect(agent).mintVoucher(voucherHash, mockToken1.target, tokenValue, 1);

      // Fast forward past expiry
      await ethers.provider.send("evm_increaseTime", [2 * 24 * 60 * 60]);
      await ethers.provider.send("evm_mine", []);

      // Agent reclaims expired voucher
      await voucherChain.connect(agent).reclaimExpiredVoucher(voucherCode);

      // Try to reclaim again
      await expect(
        voucherChain.connect(agent).reclaimExpiredVoucher(voucherCode)
      ).to.be.revertedWithCustomError(voucherChain, "VoucherAlreadyRedeemed");
    });
  });

  describe("Batch Operations", function () {
    beforeEach(async function () {
      await voucherChain.addAuthorizedMinter(agentAddress);
      await mockToken1.connect(agent).approve(voucherChain.target, ethers.MaxUint256);
      await mockToken2.connect(agent).approve(voucherChain.target, ethers.MaxUint256);
    });

    it("should mint voucher batch successfully", async function () {
      const hashes = [
        ethers.keccak256(ethers.toUtf8Bytes("CODE1")),
        ethers.keccak256(ethers.toUtf8Bytes("CODE2")),
        ethers.keccak256(ethers.toUtf8Bytes("CODE3"))
      ];

      const tokens = [mockToken1.target, mockToken2.target, mockToken1.target];
      const values = [tokenValue, tokenValue * BigInt(2), tokenValue / BigInt(2)];
      const expiries = [0, 30, 60];

      const batch = {
        voucherHashes: hashes,
        tokens: tokens,
        tokenValues: values,
        expiryDays: expiries
      };

      // Record balances before
      const agentBalanceBefore = [
        await mockToken1.balanceOf(agentAddress),
        await mockToken2.balanceOf(agentAddress)
      ];
      const contractBalanceBefore = [
        await mockToken1.balanceOf(voucherChain.target),
        await mockToken2.balanceOf(voucherChain.target)
      ];
      const treasuryBalanceBefore = [
        await mockToken1.balanceOf(treasuryAddress),
        await mockToken2.balanceOf(treasuryAddress)
      ];

      await voucherChain.connect(agent).mintVoucherBatch(batch);

      // Record balances after
      const agentBalanceAfter = [
        await mockToken1.balanceOf(agentAddress),
        await mockToken2.balanceOf(agentAddress)
      ];
      const contractBalanceAfter = [
        await mockToken1.balanceOf(voucherChain.target),
        await mockToken2.balanceOf(voucherChain.target)
      ];
      const treasuryBalanceAfter = [
        await mockToken1.balanceOf(treasuryAddress),
        await mockToken2.balanceOf(treasuryAddress)
      ];

      // Calculate expected values
      const totalValue1 = tokenValue + (tokenValue / BigInt(2)); // Two vouchers for token1
      const totalValue2 = tokenValue * BigInt(2); // One voucher for token2
      const totalFee1 = totalValue1 * BigInt(mintingFee) / BigInt(10000);
      const totalFee2 = totalValue2 * BigInt(mintingFee) / BigInt(10000);
      const totalPaid1 = totalValue1 + totalFee1;
      const totalPaid2 = totalValue2 + totalFee2;

      // Check balances
      expect(agentBalanceAfter[0]).to.equal(agentBalanceBefore[0] - totalPaid1);
      expect(agentBalanceAfter[1]).to.equal(agentBalanceBefore[1] - totalPaid2);
      expect(contractBalanceAfter[0]).to.equal(contractBalanceBefore[0] + totalValue1);
      expect(contractBalanceAfter[1]).to.equal(contractBalanceBefore[1] + totalValue2);
      expect(treasuryBalanceAfter[0]).to.equal(treasuryBalanceBefore[0] + totalFee1);
      expect(treasuryBalanceAfter[1]).to.equal(treasuryBalanceBefore[1] + totalFee2);

      // Verify all vouchers were minted
      const voucher1 = await voucherChain.getVoucherStatus("CODE1");
      const voucher2 = await voucherChain.getVoucherStatus("CODE2");
      const voucher3 = await voucherChain.getVoucherStatus("CODE3");

      expect(voucher1.exists).to.be.true;
      expect(voucher2.exists).to.be.true;
      expect(voucher3.exists).to.be.true;
    });

    it("should handle multiple tokens in batch", async function () {
      const hashes = [
        ethers.keccak256(ethers.toUtf8Bytes("CODE1")),
        ethers.keccak256(ethers.toUtf8Bytes("CODE2"))
      ];

      const tokens = [mockToken1.target, mockToken2.target];
      const values = [tokenValue, tokenValue * BigInt(2)];
      const expiries = [0, 30];

      const batch = {
        voucherHashes: hashes,
        tokens: tokens,
        tokenValues: values,
        expiryDays: expiries
      };

      await voucherChain.connect(agent).mintVoucherBatch(batch);

      // Verify vouchers were minted with correct tokens
      const voucher1 = await voucherChain.getVoucherStatus("CODE1");
      const voucher2 = await voucherChain.getVoucherStatus("CODE2");

      expect(voucher1.exists).to.be.true;
      expect(voucher2.exists).to.be.true;
      expect(voucher1.isRedeemed).to.be.false;
      expect(voucher2.isRedeemed).to.be.false;
      expect(voucher1.token).to.equal(mockToken1.target);
      expect(voucher2.token).to.equal(mockToken2.target);
      expect(voucher1.tokenValue).to.equal(tokenValue);
      expect(voucher2.tokenValue).to.equal(tokenValue * BigInt(2));
    });

    it("should reject invalid batch size", async function () {
      const hashes = [
        ethers.keccak256(ethers.toUtf8Bytes("CODE1")),
        ethers.keccak256(ethers.toUtf8Bytes("CODE2"))
      ];

      const tokens = [mockToken1.target, mockToken2.target, mockToken3.target]; // Mismatch
      const values = [tokenValue, tokenValue];
      const expiries = [0, 0];

      const batch = {
        voucherHashes: hashes,
        tokens: tokens,
        tokenValues: values,
        expiryDays: expiries
      };

      await expect(
        voucherChain.connect(agent).mintVoucherBatch(batch)
      ).to.be.revertedWithCustomError(voucherChain, "InvalidBatchSize");
    });
  });

  describe("Agent Management", function () {
    it("should only allow owner to register agent", async function () {
      await expect(
        voucherChain.connect(user).registerAgent(userAddress, 100)
      ).to.be.revertedWithCustomError(voucherChain, "OwnableUnauthorizedAccount");
    });

    it("should get agent stats correctly", async function () {
      const stats = await voucherChain.getAgentStats(agentAddress);

      expect(stats.isActive).to.be.true;
      expect(stats.totalMinted).to.equal(0);
      expect(stats.totalValue).to.equal(0);
      expect(stats.commissionRate).to.equal(100);
      expect(stats.lastSettlement).to.equal(0);
    });

    it("should get agent token balance", async function () {
      const balance = await voucherChain.getAgentTokenBalance(agentAddress, mockToken1.target);
      expect(balance).to.equal(0);
    });
  });

  describe("Token Management", function () {
    it("should add supported token", async function () {
      const MockTokenFactory = await ethers.getContractFactory("MockToken");
      const newToken = await MockTokenFactory.deploy("New Token", "NEW");
      
      await voucherChain.addSupportedToken(newToken.target);
      expect(await voucherChain.isTokenSupported(newToken.target)).to.be.true;
    });

    it("should remove supported token", async function () {
      await voucherChain.removeSupportedToken(mockToken1.target);
      expect(await voucherChain.isTokenSupported(mockToken1.target)).to.be.false;
    });

    it("should get token stats", async function () {
      const totalRedeemed = await voucherChain.getTokenStats(mockToken1.target);
      expect(totalRedeemed).to.equal(0);
    });

    it("should get contract token balance", async function () {
      const balance = await voucherChain.getContractTokenBalance(mockToken1.target);
      expect(balance).to.equal(0); // Contract starts with 0 balance
    });
  });

  describe("Fee Management", function () {
    it("should update fees", async function () {
      await voucherChain.updateFees(300, 200);
      expect(await voucherChain.mintingFee()).to.equal(300);
      expect(await voucherChain.redemptionFee()).to.equal(200);
    });
  });

  describe("Contract Statistics", function () {
    it("should get contract stats", async function () {
      const stats = await voucherChain.getContractStats();

      expect(stats.totalMinted).to.equal(0);
      expect(stats.totalRedeemed).to.equal(0);
      expect(stats.mintingFeeRate).to.equal(mintingFee);
      expect(stats.redemptionFeeRate).to.equal(redemptionFee);
    });

    it("should track multiple vouchers", async function () {
      await voucherChain.addAuthorizedMinter(agentAddress);

      await mockToken1.connect(agent).approve(voucherChain.target, ethers.MaxUint256);
      await mockToken2.connect(agent).approve(voucherChain.target, ethers.MaxUint256);
      await mockToken3.connect(agent).approve(voucherChain.target, ethers.MaxUint256);

      // Mint multiple vouchers with different tokens
      await voucherChain.connect(agent).mintVoucher(
        ethers.keccak256(ethers.toUtf8Bytes("CODE1")),
        mockToken1.target,
        tokenValue,
        0
      );
      await voucherChain.connect(agent).mintVoucher(
        ethers.keccak256(ethers.toUtf8Bytes("CODE2")),
        mockToken2.target,
        tokenValue * BigInt(2),
        0
      );
      await voucherChain.connect(agent).mintVoucher(
        ethers.keccak256(ethers.toUtf8Bytes("CODE3")),
        mockToken3.target,
        tokenValue / BigInt(2),
        0
      );

      // Redeem all vouchers
      await voucherChain.connect(user).redeemVoucher("CODE1", userAddress);
      await voucherChain.connect(user).redeemVoucher("CODE2", userAddress);
      await voucherChain.connect(user).redeemVoucher("CODE3", userAddress);

      const stats = await voucherChain.getContractStats();
      expect(stats.totalMinted).to.equal(3);
      expect(stats.totalRedeemed).to.equal(3);
    });
  });
});
