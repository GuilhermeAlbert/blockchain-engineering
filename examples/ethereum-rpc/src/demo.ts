import { RpcClient } from "./client.js";
import { parseQuantity } from "./validation.js";

const rpcUrl = process.env.RPC_URL;

if (rpcUrl) {
  const client = new RpcClient(rpcUrl);
  const [chainId, blockNumber] = await client.batch([
    { method: "eth_chainId", params: [] },
    { method: "eth_blockNumber", params: [] },
  ]);
  console.log({ chainId: parseQuantity(chainId).toString(), blockNumber: parseQuantity(blockNumber).toString() });
} else {
  console.log("Set RPC_URL to query eth_chainId and eth_blockNumber from a read-only endpoint.");
}
