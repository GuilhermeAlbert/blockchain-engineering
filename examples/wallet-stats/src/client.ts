import { createPublicClient, http } from "viem";
import { mainnet } from "viem/chains";

/**
 * A single, shared read-only client — see
 * chapters/web3/viem.md#public-clients-versus-wallet-clients for why this
 * project only ever needs a public client: it never signs or sends
 * anything, only reads.
 */
export const client = createPublicClient({
  chain: mainnet,
  transport: http(),
});
