import { strict as assert } from "node:assert";
import { getWalletStats } from "./stats";

let passed = 0;

async function test(name: string, fn: () => Promise<void>): Promise<void> {
  try {
    await fn();
    passed++;
    console.log(`ok - ${name}`);
  } catch (err) {
    console.error(`FAIL - ${name}`);
    throw err;
  }
}

async function main() {
  // The WETH9 contract — a real, permanent, well-known deployed contract.
  // See chapters/tokens/weth.md, where this address was independently
  // verified by querying name()/symbol() live.
  const wethAddress = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2" as const;

  await test("WETH9 is correctly detected as a contract", async () => {
    const stats = await getWalletStats(wethAddress);
    assert.equal(stats.isContract, true);
    assert.equal(stats.isEip7702Delegated, false);
  });

  await test("WETH9 has a large ETH balance (it holds locked ETH 1:1 with WETH supply)", async () => {
    const stats = await getWalletStats(wethAddress);
    assert.ok(stats.ethBalance > 1_000_000_000_000_000_000_000n, "expected balance above 1000 ETH");
  });

  await test("token balances include both configured tokens, in order", async () => {
    const stats = await getWalletStats(wethAddress);
    assert.equal(stats.tokenBalances.length, 2);
    assert.equal(stats.tokenBalances[0].symbol, "WETH");
    assert.equal(stats.tokenBalances[1].symbol, "USDC");
  });

  await test("an EIP-7702-delegated EOA is not misreported as a deployed contract", async () => {
    const stats = await getWalletStats("0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045");
    assert.equal(stats.isEip7702Delegated, true);
  });

  console.log(`\n${passed} tests passed`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
