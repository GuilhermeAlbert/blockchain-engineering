# Bitcoin Script

Bitcoin Script is the small, stack-based programming language used to express spending conditions, both the locking script attached to an output and the unlocking data provided to spend it. This chapter covers how the language actually executes, with a working, simplified interpreter, because "script" is one of those Bitcoin terms people use constantly without having seen the actual execution model it refers to.

## The design: a stack machine, deliberately not Turing-complete

Bitcoin Script executes on a single data stack. Each operation either pushes data onto the stack or pops some number of items off, does something with them, and pushes a result back on. Crucially, **Bitcoin Script has no loops and no way to jump backward**. Every script executes a fixed, finite sequence of operations from start to end, which means, unlike a general-purpose programming language, a Bitcoin script's execution time and behavior can always be fully analyzed in advance; there's no possibility of an infinite loop or unpredictable runtime blowup. This was a deliberate design choice by Satoshi, trading general-purpose expressiveness for predictability and safety, a direct contrast with the design choice [Ethereum's EVM](../evm/README.md) later made in the opposite direction (see [The EVM](../evm/README.md)).

## Core operations

Bitcoin Script has around 100 defined opcodes (some disabled for security reasons early in Bitcoin's history). The ones that appear constantly in ordinary transactions:

- `OP_DUP`: duplicates the top stack item
- `OP_HASH160`: pops the top item, hashes it with SHA-256 then RIPEMD-160, pushes the result (this is exactly how a public key becomes an address, see [Addresses](../wallets/addresses.md))
- `OP_EQUALVERIFY`: pops the top two items, checks they're equal, and **fails the entire script immediately** if not
- `OP_CHECKSIG`: pops a public key and a signature, checks whether the signature is valid for the current transaction under that public key, and pushes `true` or `false`
- `OP_EQUAL`: pops the top two items and pushes whether they're equal, without halting on failure the way `OP_EQUALVERIFY` does

## Example: a working, simplified Script interpreter

This implements enough of the stack machine to execute the exact opcode sequence behind P2PKH (the most common historical locking script type (see [P2PKH](./p2pkh.md))) with a simplified, illustrative signature check rather than real ECDSA, to keep the example self-contained and focused on the execution model itself:

```typescript
import { createHash } from "node:crypto";

function sha256(buf: Buffer): Buffer {
  return createHash("sha256").update(buf).digest();
}
function ripemd160(buf: Buffer): Buffer {
  return createHash("ripemd160").update(buf).digest();
}
function hash160(buf: Buffer): Buffer {
  return ripemd160(sha256(buf));
}

type StackItem = Buffer | boolean;
type Op = { type: "push"; data: Buffer } | { type: "op"; name: string };

// A drastically simplified stand-in for OP_CHECKSIG. Real Bitcoin verifies
// an ECDSA or Schnorr signature against transaction data — see
// cryptography/ecdsa.md and cryptography/digital-signatures.md. Here we
// just check the signature buffer starts with a fixed "valid" marker, to
// isolate the stack-machine execution logic this chapter is teaching.
function checkSig(signature: Buffer, publicKey: Buffer): boolean {
  return signature.toString().startsWith("valid-sig-for:") && signature.toString().endsWith(publicKey.toString("hex"));
}

function execute(script: Op[], initialStack: StackItem[] = []): StackItem[] {
  const stack: StackItem[] = [...initialStack];

  for (const op of script) {
    if (op.type === "push") {
      stack.push(op.data);
      continue;
    }

    switch (op.name) {
      case "OP_DUP": {
        const top = stack[stack.length - 1];
        stack.push(top);
        break;
      }
      case "OP_HASH160": {
        const top = stack.pop() as Buffer;
        stack.push(hash160(top));
        break;
      }
      case "OP_EQUALVERIFY": {
        const a = stack.pop();
        const b = stack.pop();
        if (!(Buffer.isBuffer(a) && Buffer.isBuffer(b) && a.equals(b))) {
          throw new Error("OP_EQUALVERIFY failed — script invalid");
        }
        break;
      }
      case "OP_CHECKSIG": {
        const publicKey = stack.pop() as Buffer;
        const signature = stack.pop() as Buffer;
        stack.push(checkSig(signature, publicKey));
        break;
      }
      default:
        throw new Error(`Unknown op: ${op.name}`);
    }
  }

  return stack;
}

// --- Build a P2PKH-style locking script and a matching unlocking script ---

const alicePublicKey = Buffer.from("alice-pubkey-02abc123");
const alicePubKeyHash = hash160(alicePublicKey);

// scriptPubKey (locking script), attached to the output when it was created:
const lockingScript: Op[] = [
  { type: "op", name: "OP_DUP" },
  { type: "op", name: "OP_HASH160" },
  { type: "push", data: alicePubKeyHash },
  { type: "op", name: "OP_EQUALVERIFY" },
  { type: "op", name: "OP_CHECKSIG" },
];

// scriptSig (unlocking data), provided by whoever is spending this output.
// Execution order is: unlocking script first, then locking script,
// operating on the same, shared stack.
const validSignature = Buffer.from(`valid-sig-for:${alicePublicKey.toString("hex")}`);
const unlockingScript: Op[] = [
  { type: "push", data: validSignature },
  { type: "push", data: alicePublicKey },
];

const combined = [...unlockingScript, ...lockingScript];
const result = execute(combined);
console.log("Script result (top of stack):", result[result.length - 1]);
console.log("Spend is valid:", result[result.length - 1] === true);

// Now try it with the WRONG public key — should fail at OP_EQUALVERIFY.
const wrongPublicKey = Buffer.from("mallory-pubkey-03xyz789");
const forgedUnlockingScript: Op[] = [
  { type: "push", data: validSignature },
  { type: "push", data: wrongPublicKey },
];
try {
  execute([...forgedUnlockingScript, ...lockingScript]);
} catch (err) {
  console.log("Forged spend correctly rejected:", (err as Error).message);
}
```

## What just happened, step by step

Execution runs the unlocking script first (pushing the signature, then the public key onto the stack), then the locking script: `OP_DUP` duplicates the public key, `OP_HASH160` hashes the duplicate, the pushed `alicePubKeyHash` is compared against it by `OP_EQUALVERIFY` (proving the provided public key actually matches the address this output was locked to, and halting immediately if not, exactly what catches the forged attempt above), and finally `OP_CHECKSIG` checks the signature against the (now-verified-correct) public key. The script is valid only if every step succeeds and the final stack item is `true`.

## Timelocks

Bitcoin Script also supports opcodes that make an output unspendable until a certain condition on time or block height is met: `OP_CHECKLOCKTIMEVERIFY` (BIP 65, an absolute timelock, unspendable until a specific block height or timestamp) and `OP_CHECKSEQUENCEVERIFY` (BIP 112, a relative timelock, unspendable until a certain amount of time or number of blocks has passed *since that specific output was confirmed*, not since any fixed date). These are the building blocks behind [multisig](../wallets/multisig.md) with time-based fallback conditions and the [HTLCs](../lightning/htlcs.md) that make the Lightning Network's trust-minimized routing possible.

## Tradeoffs

Bitcoin Script's deliberately limited expressiveness (no loops, no general computation) is a direct, considered tradeoff: it makes every script's behavior fully predictable and analyzable before execution, at the cost of not being able to express arbitrary programmable logic the way Ethereum's Turing-complete EVM can (see [The EVM](../evm/README.md)). Bitcoin can express "spendable by this key," "spendable by 2-of-3 these keys," or "spendable after this date," but not, for instance, an on-chain automated market maker's full logic (see [Automated Market Makers](../defi/amm.md)), which requires the general computation Ethereum's model supports.

## Common misconceptions

**Bitcoin Script is not Turing-complete, and this is a deliberate design choice, not a limitation Satoshi intended to fix later.** The absence of loops specifically prevents a whole category of potential denial-of-service and unpredictable-execution-time problems that a fully general-purpose scripting language would need other mechanisms (like Ethereum's [gas](../ethereum/gas.md)) to defend against.

**Most Bitcoin users never write or see raw Script directly.** Wallet software constructs standard script patterns (P2PKH, P2SH, SegWit, Taproot, covered in the next chapters) automatically; hand-writing custom scripts is a specialized, advanced use case.

## Further reading

- [Bitcoin Core developer reference: Script](https://developer.bitcoin.org/reference/script.html)
- [Bitcoin Wiki: Script](https://en.bitcoin.it/wiki/Script)

---

[← Previous: Coinbase Transactions](./coinbase-transactions.md)
·
[Back to Bitcoin](./README.md)
·
[Next: ScriptPubKey and ScriptSig →](./scripts.md)
