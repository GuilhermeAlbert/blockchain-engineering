# NFT Metadata

An ERC-721 or ERC-1155 token's on-chain data is, at minimum, just an ID and an owner — the image, name, description, and attributes people associate with an NFT almost always live somewhere else entirely. This chapter covers exactly how that connection works, and the real, documented tradeoffs in where "somewhere else" actually is.

## The tokenURI function

ERC-721's optional metadata extension defines one additional function:

```solidity
interface IERC721Metadata {
    function name() external view returns (string memory);
    function symbol() external view returns (string memory);
    function tokenURI(uint256 tokenId) external view returns (string memory);
}
```

`tokenURI` returns a URI — a link — that wallets, marketplaces, and explorers are expected to fetch and parse as JSON, conventionally structured as:

```json
{
  "name": "Example NFT #1",
  "description": "A description of this specific token.",
  "image": "https://example.com/images/1.png",
  "attributes": [
    { "trait_type": "Background", "value": "Blue" },
    { "trait_type": "Rarity", "value": "Rare" }
  ]
}
```

Nothing about this JSON structure or its contents is checked, validated, or enforced by the EVM or the token contract itself — `tokenURI` returns a string; what that string points to, and whether it's ever actually reachable, is entirely outside the protocol's concern.

## Where the metadata and the image actually live

This is the practical question with real, documented tradeoffs:

- **A centralized HTTP URL** (`https://example.com/metadata/1.json`) — simplest to set up, but the metadata (and, often, the referenced image) disappears the moment that server goes offline or the domain lapses, a real, documented failure mode for NFT projects whose backing infrastructure was discontinued, leaving the on-chain token pointing at a dead link.
- **IPFS (InterPlanetary File System)** — a content-addressed storage network where a file's identifier (its CID, a hash of the content itself) is derived from the content, not chosen by whoever uploaded it — meaning the same content always produces the same CID, and altering the content produces a different CID entirely, giving a real, checkable tamper-evidence guarantee (the same hash-based content-addressing principle behind [Merkle Trees](../cryptography/merkle-trees.md), applied to a general-purpose file storage network). The tradeoff: IPFS availability depends on at least one node continuing to **pin** (actively store and serve) the content — a project's own infrastructure disappearing can still mean the content becomes unreachable if no one else happened to pin it, even though its IPFS address itself never changes.
- **Fully on-chain metadata** — encoding the JSON (and sometimes the image itself, as an SVG or similarly compact format) directly in the contract, returned from `tokenURI` as a `data:` URI rather than a link to anything external. This is the only approach genuinely as durable as the blockchain itself, since nothing external needs to remain available — at the cost of significantly higher deployment gas costs (recall [Storage](../evm/storage.md)'s real, measured cost asymmetry) for anything beyond very small amounts of data.

## Why this matters beyond a technical curiosity

The gap between "owns a token recorded immutably on Ethereum" and "the image and description associated with that token remain reachable" is a real, meaningful distinction this book flags explicitly, echoing the broader theme (already established for [Ordinals](../bitcoin/ordinals.md) and [RGB](../bitcoin-scaling/rgb.md)) that on-chain permanence and off-chain data availability are separate properties, not a package deal — an NFT's on-chain ownership record can be perfectly permanent while everything a viewer would actually recognize as "the NFT" (its image) depends entirely on infrastructure decisions made, and possibly later abandoned, by parties other than the blockchain itself.

## Common misconceptions

**"Owning an NFT" does not mean owning the underlying image, video, or other media file in any copyright sense** by default — what's owned is specifically the on-chain token (an ID and its associated ownership record); any rights to the referenced media are a separate legal question, governed by whatever terms the project itself specified (if any), not by the token standard.

**A dead `tokenURI` link does not invalidate the token itself** — `ownerOf` and the transfer functions continue working exactly as before regardless of whether the metadata is reachable; only the *display* of name, image, and attributes in wallets and marketplaces is affected by broken metadata, not the underlying ownership record.

## Further reading

- [EIP-721: Non-Fungible Token Standard (Metadata extension)](https://eips.ethereum.org/EIPS/eip-721)
- [IPFS documentation](https://docs.ipfs.tech/)

---

[← Previous: ERC-1155](./erc-1155.md)
·
[Back to Tokens](./README.md)
·
[Next: Minting and Burning →](./minting-and-burning.md)
