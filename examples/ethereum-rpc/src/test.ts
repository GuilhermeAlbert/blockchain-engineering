import assert from "node:assert/strict";
import { RpcClient, RpcError } from "./client.js";
import { parseQuantity } from "./validation.js";

type FetchCall = { url: string; body: unknown };

function fakeFetch(response: unknown, status = 200) {
  const calls: FetchCall[] = [];
  const fetcher: typeof fetch = async (input, init) => {
    calls.push({ url: String(input), body: JSON.parse(String(init?.body)) });
    return new Response(JSON.stringify(response), {
      status,
      headers: { "content-type": "application/json" },
    });
  };
  return { fetcher, calls };
}

async function test(name: string, run: () => void | Promise<void>) {
  await run();
  console.log(`ok - ${name}`);
}

await test("serializes requests and increments IDs", async () => {
  const { fetcher, calls } = fakeFetch({ jsonrpc: "2.0", id: 1, result: "0x10" });
  const client = new RpcClient("http://rpc.local", fetcher);
  assert.equal(await client.call("eth_blockNumber", []), "0x10");
  assert.deepEqual(calls[0]?.body, { jsonrpc: "2.0", id: 1, method: "eth_blockNumber", params: [] });
});

await test("rejects HTTP failures", async () => {
  const { fetcher } = fakeFetch({ message: "busy" }, 503);
  await assert.rejects(() => new RpcClient("http://rpc.local", fetcher).call("eth_chainId", []), /HTTP 503/);
});

await test("exposes JSON-RPC errors", async () => {
  const { fetcher } = fakeFetch({ jsonrpc: "2.0", id: 1, error: { code: -32601, message: "missing" } });
  await assert.rejects(
    () => new RpcClient("http://rpc.local", fetcher).call("missing_method", []),
    (error) => error instanceof RpcError && error.code === -32601,
  );
});

await test("rejects malformed responses", async () => {
  const { fetcher } = fakeFetch({ jsonrpc: "2.0", id: 1, result: "0x1", error: { code: 1, message: "bad" } });
  await assert.rejects(() => new RpcClient("http://rpc.local", fetcher).call("eth_chainId", []), /both result and error/);
});

await test("parses exact hex quantities", () => {
  assert.equal(parseQuantity("0x0"), 0n);
  assert.equal(parseQuantity("0x20000000000001"), 9007199254740993n);
  assert.throws(() => parseQuantity("0x01"), /canonical/);
  assert.throws(() => parseQuantity("12"), /hex quantity/);
});

await test("matches batch responses by ID instead of position", async () => {
  const { fetcher } = fakeFetch([
    { jsonrpc: "2.0", id: 2, result: "0x2" },
    { jsonrpc: "2.0", id: 1, result: "0x1" },
  ]);
  const client = new RpcClient("http://rpc.local", fetcher);
  assert.deepEqual(await client.batch([
    { method: "eth_chainId", params: [] },
    { method: "eth_blockNumber", params: [] },
  ]), ["0x1", "0x2"]);
});

await test("rejects duplicate batch response IDs", async () => {
  const { fetcher } = fakeFetch([
    { jsonrpc: "2.0", id: 1, result: "0x1" },
    { jsonrpc: "2.0", id: 1, result: "0x2" },
  ]);
  await assert.rejects(
    () => new RpcClient("http://rpc.local", fetcher).batch([
      { method: "eth_chainId", params: [] },
      { method: "eth_blockNumber", params: [] },
    ]),
    /duplicate response ID/,
  );
});

console.log("7 tests passed");
