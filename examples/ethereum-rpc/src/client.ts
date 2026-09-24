import { isRecord } from "./validation.js";

type RpcRequest = { jsonrpc: "2.0"; id: number; method: string; params: unknown[] };
type BatchCall = { method: string; params: unknown[] };

export class RpcError extends Error {
  constructor(public readonly code: number, message: string, public readonly data?: unknown) {
    super(message);
    this.name = "RpcError";
  }
}

export class RpcClient {
  private nextId = 1;

  constructor(private readonly url: string, private readonly fetcher: typeof fetch = fetch) {}

  async call(method: string, params: unknown[]): Promise<unknown> {
    const request = this.request(method, params);
    const payload = await this.post(request);
    return this.readResponse(payload, request.id);
  }

  async batch(calls: BatchCall[]): Promise<unknown[]> {
    const requests = calls.map(({ method, params }) => this.request(method, params));
    const payload = await this.post(requests);
    if (!Array.isArray(payload)) throw new Error("Batch response must be an array");
    const byId = new Map<number, unknown>();
    for (const response of payload) {
      if (!isRecord(response) || typeof response.id !== "number") throw new Error("Malformed batch response");
      if (byId.has(response.id)) throw new Error(`duplicate response ID: ${response.id}`);
      byId.set(response.id, response);
    }
    return requests.map((request) => {
      if (!byId.has(request.id)) throw new Error(`Missing response ID: ${request.id}`);
      return this.readResponse(byId.get(request.id), request.id);
    });
  }

  private request(method: string, params: unknown[]): RpcRequest {
    return { jsonrpc: "2.0", id: this.nextId++, method, params };
  }

  private async post(body: RpcRequest | RpcRequest[]): Promise<unknown> {
    const response = await this.fetcher(this.url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response.json();
  }

  private readResponse(value: unknown, expectedId: number): unknown {
    if (!isRecord(value) || value.jsonrpc !== "2.0" || value.id !== expectedId) {
      throw new Error(`Malformed JSON-RPC response for ID ${expectedId}`);
    }
    const hasResult = Object.hasOwn(value, "result");
    const hasError = Object.hasOwn(value, "error");
    if (hasResult && hasError) throw new Error("Response contains both result and error");
    if (!hasResult && !hasError) throw new Error("Response contains neither result nor error");
    if (hasError) {
      if (!isRecord(value.error) || typeof value.error.code !== "number" || typeof value.error.message !== "string") {
        throw new Error("Malformed JSON-RPC error");
      }
      throw new RpcError(value.error.code, value.error.message, value.error.data);
    }
    return value.result;
  }
}
