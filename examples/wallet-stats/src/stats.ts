import { formatEther, formatUnits, parseAbi, type Address } from "viem";
import { client } from "./client";
import { KNOWN_TOKENS } from "./tokens";

const erc20Abi = parseAbi(["function balanceOf(address) view returns (uint256)"]);

export interface TokenBalance {
  symbol: string;
  address: Address;
  raw: bigint;
  formatted: string;
}

export interface WalletStats {
  address: Address;
  ethBalance: bigint;
  ethBalanceFormatted: string;
  transactionCount: number;
  isContract: boolean;
  /**
   * True if this address has code specifically because of an EIP-7702
   * delegation (a "0xef0100" + 20-byte-address designator) rather than an
   * ordinary CREATE/CREATE2-deployed contract — see the note in this
   * project's README. Such an address remains an EOA at protocol level
   * (see chapters/ethereum/eoa.md) even though getBytecode() now returns
   * non-empty data for it, which is why isContract alone is no longer a
   * fully reliable "is this address key-controlled" check post-Pectra.
   */
  isEip7702Delegated: boolean;
  blockNumber: bigint;
  tokenBalances: TokenBalance[];
}

const EIP7702_DELEGATION_PREFIX = "0xef0100";

/**
 * Reads real, live wallet statistics for a given address — every field
 * here is a genuine, verifiable eth_call or eth_getTransactionCount
 * result, not derived or estimated data.
 */
export async function getWalletStats(address: Address): Promise<WalletStats> {
  const [ethBalance, transactionCount, code, blockNumber] = await Promise.all([
    client.getBalance({ address }),
    client.getTransactionCount({ address }),
    client.getBytecode({ address }),
    client.getBlockNumber(),
  ]);

  const tokenBalances = await Promise.all(
    KNOWN_TOKENS.map(async (token): Promise<TokenBalance> => {
      const raw = await client.readContract({
        address: token.address,
        abi: erc20Abi,
        functionName: "balanceOf",
        args: [address],
      });
      return {
        symbol: token.symbol,
        address: token.address,
        raw,
        formatted: formatUnits(raw, token.decimals),
      };
    }),
  );

  return {
    address,
    ethBalance,
    ethBalanceFormatted: formatEther(ethBalance),
    transactionCount,
    isContract: code !== undefined,
    isEip7702Delegated: code !== undefined && code.startsWith(EIP7702_DELEGATION_PREFIX),
    blockNumber,
    tokenBalances,
  };
}
