import { getAddress } from "viem";
import { getWalletStats } from "./stats";

async function main() {
  const input = process.argv[2];
  if (!input) {
    console.error("Usage: npm run stats -- <ethereum-address>");
    console.error("Example: npm run stats -- 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2");
    process.exit(1);
  }

  // getAddress validates the EIP-55 checksum and throws on a malformed
  // address — see chapters/wallets/addresses.md and
  // chapters/ethereum/eoa.md#address-derivation.
  const address = getAddress(input);

  console.log(`Fetching live stats for ${address}...\n`);
  const stats = await getWalletStats(address);

  console.log(`As of block ${stats.blockNumber}:`);
  console.log(`  ETH balance:       ${stats.ethBalanceFormatted} ETH`);
  console.log(`  Transaction count: ${stats.transactionCount}`);
  console.log(`  Is a contract:     ${stats.isContract}${stats.isEip7702Delegated ? "  (EIP-7702 delegated EOA, not a deployed contract)" : ""}`);
  console.log(`  Token balances:`);
  for (const token of stats.tokenBalances) {
    console.log(`    ${token.symbol.padEnd(6)} ${token.formatted}`);
  }
}

main().catch((err) => {
  console.error("Failed to fetch wallet stats:", err.message);
  process.exit(1);
});
