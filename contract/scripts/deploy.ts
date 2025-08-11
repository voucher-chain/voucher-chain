import { ethers } from "hardhat";
import * as fs from "fs";
import * as path from "path";

async function main() {
  console.log("🚀 Starting VoucherChain deployment on Electronum...");

  // Check environment variables
  const privateKey = process.env.PRIVATE_KEY;
  if (!privateKey) {
    throw new Error("PRIVATE_KEY environment variable is required");
  }

  // Get the deployer account
  const [deployer] = await ethers.getSigners();
  console.log("📋 Deploying contracts with account:", await deployer.getAddress());
  
  const balance = await ethers.provider.getBalance(await deployer.getAddress());
  console.log("💰 Account balance:", ethers.formatEther(balance), "ETL");

  if (balance === 0n) {
    throw new Error("Insufficient balance for deployment");
  }

  // Deployment parameters - can be overridden by environment variables
  const treasuryAddress = process.env.TREASURY_ADDRESS || "0x..."; // TODO: Replace with actual treasury address
  const mintingFee = parseInt(process.env.MINTING_FEE || "200"); // 2% (200 basis points)
  const redemptionFee = parseInt(process.env.REDEMPTION_FEE || "100"); // 1% (100 basis points)
  const defaultExpiryDays = parseInt(process.env.DEFAULT_EXPIRY_DAYS || "30"); // 30 days default expiry

  console.log("\n📊 Deployment parameters:");
  console.log("- Treasury address:", treasuryAddress);
  console.log("- Minting fee:", mintingFee, "basis points (", mintingFee / 100, "%)");
  console.log("- Redemption fee:", redemptionFee, "basis points (", redemptionFee / 100, "%)");
  console.log("- Default expiry days:", defaultExpiryDays);

  // Validate parameters
  if (treasuryAddress === "0x...") {
    throw new Error("Please set TREASURY_ADDRESS environment variable or update the script");
  }

  if (mintingFee > 500 || redemptionFee > 500) {
    throw new Error("Fees cannot exceed 500 basis points (5%)");
  }

  // Deploy VoucherChain contract
  console.log("\n🔨 Deploying VoucherChain contract...");
  const VoucherChainFactory = await ethers.getContractFactory("VoucherChain");
  
  const deploymentTx = await VoucherChainFactory.deploy(
    treasuryAddress,
    mintingFee,
    redemptionFee,
    defaultExpiryDays
  );

  console.log("⏳ Waiting for deployment transaction...");
  await deploymentTx.waitForDeployment();
  
  const voucherChainAddress = await deploymentTx.getAddress();
  console.log("✅ VoucherChain deployed to:", voucherChainAddress);

  // Verify deployment
  console.log("\n🔍 Verifying deployment...");
  const deployedVoucherChain = await ethers.getContractAt("VoucherChain", voucherChainAddress);
  
  // Check initial state
  const treasury = await deployedVoucherChain.treasury();
  const deployedMintingFee = await deployedVoucherChain.mintingFee();
  const deployedRedemptionFee = await deployedVoucherChain.redemptionFee();
  const deployedDefaultExpiryDays = await deployedVoucherChain.defaultExpiryDays();
  const owner = await deployedVoucherChain.owner();

  console.log("📋 Deployment verification:");
  console.log("- Treasury:", treasury);
  console.log("- Minting fee:", deployedMintingFee.toString());
  console.log("- Redemption fee:", deployedRedemptionFee.toString());
  console.log("- Default expiry days:", deployedDefaultExpiryDays.toString());
  console.log("- Owner:", owner);

  // Verify owner is correct
  if (owner !== await deployer.getAddress()) {
    throw new Error("❌ Owner verification failed");
  }

  // Get network info
  const network = await ethers.provider.getNetwork();
  const blockNumber = await ethers.provider.getBlockNumber();

  console.log("\n🎉 VoucherChain deployment successful!");
  console.log("📍 Contract address:", voucherChainAddress);
  console.log("🌐 Network:", network.name);
  console.log("🔢 Chain ID:", network.chainId);
  console.log("📦 Block number:", blockNumber);

  // Save deployment info to file
  const deploymentInfo = {
    network: network.name,
    chainId: network.chainId.toString(),
    contract: "VoucherChain",
    address: voucherChainAddress,
    deployer: await deployer.getAddress(),
    treasury: treasuryAddress,
    mintingFee: mintingFee,
    redemptionFee: redemptionFee,
    defaultExpiryDays: defaultExpiryDays,
    blockNumber: blockNumber.toString(),
    timestamp: new Date().toISOString(),
    transactionHash: deploymentTx.deploymentTransaction()?.hash
  };

  // Create deployments directory if it doesn't exist
  const deploymentsDir = path.join(__dirname, "..", "deployments");
  if (!fs.existsSync(deploymentsDir)) {
    fs.mkdirSync(deploymentsDir, { recursive: true });
  }

  // Save deployment info
  const deploymentFile = path.join(deploymentsDir, `deployment-${network.chainId}-${Date.now()}.json`);
  fs.writeFileSync(deploymentFile, JSON.stringify(deploymentInfo, null, 2));
  console.log("💾 Deployment info saved to:", deploymentFile);

  console.log("\n📄 Deployment info:", JSON.stringify(deploymentInfo, null, 2));

  // Next steps
  console.log("\n📝 Next steps:");
  console.log("1. Verify the contract on Electronum block explorer");
  console.log("2. Add supported tokens using addSupportedToken()");
  console.log("3. Register agents using registerAgent()");
  console.log("4. Add authorized minters using addAuthorizedMinter()");

  return voucherChainAddress;
}

// Handle errors
main().catch((error) => {
  console.error("❌ Deployment failed:", error);
  process.exit(1);
}); 