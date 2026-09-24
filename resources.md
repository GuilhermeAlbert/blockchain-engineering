# Resources

A curated list of primary sources, specifications, and books referenced throughout the book. Quality over quantity. This list favors original material over secondary summaries and blog posts.

## Bitcoin

- [Bitcoin: A Peer-to-Peer Electronic Cash System](https://bitcoin.org/bitcoin.pdf): the whitepaper
- [Bitcoin Core repository](https://github.com/bitcoin/bitcoin)
- [Bitcoin Core developer documentation](https://developer.bitcoin.org/)
- [Bitcoin Improvement Proposals (BIPs)](https://github.com/bitcoin/bips)
- [Satoshi Nakamoto Institute](https://nakamotoinstitute.org/): archive of Satoshi's writings and related cypherpunk history
- [Cryptography mailing list archive](https://www.metzdowd.com/pipermail/cryptography/): where the whitepaper was first announced
- [bitcointalk.org](https://bitcointalk.org/): the original Bitcoin forum, active since 2009
- [BIP 16: Pay to Script Hash](https://github.com/bitcoin/bips/blob/master/bip-0016.mediawiki)
- [BIP 34: Block v2, Height in Coinbase](https://github.com/bitcoin/bips/blob/master/bip-0034.mediawiki)
- [BIP 125: Opt-in Full Replace-by-Fee](https://github.com/bitcoin/bips/blob/master/bip-0125.mediawiki)
- [BIP 141: Segregated Witness](https://github.com/bitcoin/bips/blob/master/bip-0141.mediawiki)
- [BIP 340/341/342: Taproot](https://github.com/bitcoin/bips)
- [Cambridge Bitcoin Electricity Consumption Index](https://ccaf.io/cbnsi/cbeci)
- [BIP 9: Version bits with timeout and delay](https://github.com/bitcoin/bips/blob/master/bip-0009.mediawiki)
- [BIP 148: Mandatory activation of segwit deployment](https://github.com/bitcoin/bips/blob/master/bip-0148.mediawiki)
- [Crypto Open Patent Alliance v Craig Wright, UK High Court judgment, March 2024](https://www.judiciary.uk/wp-content/uploads/2024/05/Crypto-Open-Patent-Alliance-v-Wright-judgment-140524.pdf)

## Ethereum

- [ethereum.org](https://ethereum.org/en/)
- [Ethereum Yellow Paper](https://ethereum.github.io/yellowpaper/paper.pdf)
- [Ethereum execution specs](https://github.com/ethereum/execution-specs)
- [Ethereum consensus specs](https://github.com/ethereum/consensus-specs)
- [Ethereum Improvement Proposals (EIPs)](https://eips.ethereum.org/)
- [EIP-1559: Fee market change](https://eips.ethereum.org/EIPS/eip-1559)
- [Ethereum JSON-RPC specification](https://ethereum.org/en/developers/docs/apis/json-rpc/)
- [Casper the Friendly Finality Gadget](https://arxiv.org/abs/1710.09437): Buterin & Griffith, 2017
- [Solidity documentation](https://docs.soliditylang.org/)
- [`viem` documentation](https://viem.sh/): used throughout this book's Web3 examples
- [`wagmi` documentation](https://wagmi.sh/)
- [EIP-712: Typed structured data hashing and signing](https://eips.ethereum.org/EIPS/eip-712)
- [EIP-1193: Ethereum Provider JavaScript API](https://eips.ethereum.org/EIPS/eip-1193)
- [WalletConnect documentation](https://docs.walletconnect.com/)

## Cryptography

- [A Cypherpunk's Manifesto](https://www.activism.net/cypherpunk/manifesto.html): Eric Hughes, 1993
- [Security Without Identification](https://www.chaum.com/publications/Security_Wthout_Identification.html): David Chaum, 1985
- [Blind Signatures for Untraceable Payments](https://www.chaum.com/publications/Chaum-blind-signatures.PDF): David Chaum, 1982
- [Hashcash](http://www.hashcash.org/papers/hashcash.pdf): Adam Back, 2002
- [NIST FIPS 180-4: Secure Hash Standard](https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.180-4.pdf)
- [SEC 2: Recommended Elliptic Curve Domain Parameters](https://www.secg.org/sec2-v2.pdf): Certicom Research
- [New Directions in Cryptography](https://ee.stanford.edu/~hellman/publications/24.pdf): Diffie & Hellman, 1976
- [BIP 340: Schnorr Signatures for secp256k1](https://github.com/bitcoin/bips/blob/master/bip-0340.mediawiki)
- [RFC 6979: Deterministic Usage of DSA and ECDSA](https://www.rfc-editor.org/rfc/rfc6979)
- [The Knowledge Complexity of Interactive Proof Systems](https://doi.org/10.1145/22145.22178): Goldwasser, Micali, Rackoff, 1985
- [`@noble/curves`](https://github.com/paulmillr/noble-curves): the audited TypeScript library used in this book's cryptography examples
- [`@scure/bip39`](https://github.com/paulmillr/scure-bip39) and [`@scure/bip32`](https://github.com/paulmillr/scure-bip32), used in the Wallets section's derivation examples
- [BIP 32: Hierarchical Deterministic Wallets](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki)
- [BIP 39: Mnemonic code for generating deterministic keys](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki)
- [BIP 44: Multi-Account Hierarchy for Deterministic Wallets](https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki)

## Distributed systems

- [The Byzantine Generals Problem](https://lamport.azurewebsites.net/pubs/byz.pdf): Lamport, Shostak, Pease, 1982
- [Practical Byzantine Fault Tolerance](http://pmg.csail.mit.edu/papers/osdi99.pdf): Castro & Liskov, 1999
- [The Part-Time Parliament](https://lamport.azurewebsites.net/pubs/lamport-paxos.pdf): Leslie Lamport, 1998
- [The Sybil Attack](https://www.microsoft.com/en-us/research/wp-content/uploads/2002/01/IPTPS2002.pdf): John R. Douceur, 2002
- [Brewer's Conjecture and the Feasibility of Consistent, Available, Partition-Tolerant Web Services](https://groups.csail.mit.edu/tds/papers/Gilbert/Brewer2.pdf): Gilbert & Lynch, 2002

## Economics

- [On the Origin of Money](https://mises.org/library/origin-money): Carl Menger, 1892
- [The General Theory of Employment, Interest and Money](https://www.marxists.org/reference/subject/economics/keynes/general-theory/): John Maynard Keynes, 1936
- [A Monetary History of the United States, 1867–1960](https://press.princeton.edu/books/paperback/9780691003542/a-monetary-history-of-the-united-states-1867-1960): Milton Friedman & Anna Schwartz, 1963
- [Money Creation in the Modern Economy](https://www.bankofengland.co.uk/-/media/boe/files/quarterly-bulletin/2014/money-creation-in-the-modern-economy.pdf): Bank of England Quarterly Bulletin, 2014
- [The Deficit Myth](https://www.publicaffairsbooks.com/titles/stephanie-kelton/the-deficit-myth/9781541736191/): Stephanie Kelton, 2020 (Modern Monetary Theory)
- [The State Theory of Money](https://archive.org/details/statetheoryofmon00knapuoft): Georg Friedrich Knapp, 1905

## Austrian economics

- [On the Origin of Money](https://mises.org/library/origin-money): Carl Menger, 1892
- [Principles of Economics](https://mises.org/library/principles-economics): Carl Menger, 1871
- [The Theory of Money and Credit](https://mises.org/library/theory-money-and-credit): Ludwig von Mises, 1912
- [Denationalisation of Money: The Argument Refined](https://mises.org/library/denationalisation-money-argument-refined): Friedrich Hayek, 1976/1978
- [What Has Government Done to Our Money?](https://mises.org/library/what-has-government-done-our-money): Murray Rothbard, 1963
- [Bitcoin, the Regression Theorem, and the Emergence of a New Medium of Exchange](https://mises.org/quarterly-journal-austrian-economics/bitcoin-regression-theorem-and-emergence-new-medium-exchange): Konrad Graf, 2013
- [b-money](http://www.weidai.com/bmoney.txt): Wei Dai, 1998
- [Bit gold](https://unenumerated.blogspot.com/2005/12/bit-gold.html): Nick Szabo, 2005
- [Shelling Out: The Origins of Money](https://nakamotoinstitute.org/library/shelling-out/): Nick Szabo

## Smart contracts

- [Solidity documentation](https://docs.soliditylang.org/)
- [Foundry Book](https://book.getfoundry.sh/)
- [OpenZeppelin Contracts](https://github.com/OpenZeppelin/openzeppelin-contracts)
- [EIP-1967: Standard Proxy Storage Slots](https://eips.ethereum.org/EIPS/eip-1967)
- [EIP-2535: Diamonds, Multi-Facet Proxy](https://eips.ethereum.org/EIPS/eip-2535)

## Tokens

- [EIP-20: Token Standard](https://eips.ethereum.org/EIPS/eip-20)
- [EIP-721: Non-Fungible Token Standard](https://eips.ethereum.org/EIPS/eip-721)
- [EIP-1155: Multi Token Standard](https://eips.ethereum.org/EIPS/eip-1155)
- [WETH9 (verified live on mainnet)](https://etherscan.io/address/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2)

## DeFi

- [Uniswap v2 whitepaper](https://uniswap.org/whitepaper.pdf)
- [Uniswap v3 whitepaper](https://uniswap.org/whitepaper-v3.pdf)
- [Uniswap v2 core contracts](https://github.com/Uniswap/v2-core)
- [Curve StableSwap whitepaper](https://curve.fi/files/stableswap-paper.pdf): Michael Egorov
- [Aave V2 whitepaper](https://github.com/aave/aave-protocol/blob/master/docs/Aave_Protocol_Whitepaper_v1_0.pdf)
- [Aave documentation](https://aave.com/docs)
- [MakerDAO whitepaper](https://makerdao.com/en/whitepaper/)
- [Sky Protocol documentation](https://docs.sky.money/)
- [Chainlink documentation: price feeds](https://docs.chain.link/data-feeds)

## Layer 2

- [EIP-4844: Shard Blob Transactions](https://eips.ethereum.org/EIPS/eip-4844)
- [EIP-7892: Blob Parameter Only Hardforks](https://eips.ethereum.org/EIPS/eip-7892)
- [Ethereum: a rollup-centric roadmap](https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698): Vitalik Buterin, 2020
- [Arbitrum Nitro whitepaper](https://github.com/OffchainLabs/nitro/blob/master/docs/Nitro-whitepaper.pdf)
- [Arbitrum documentation](https://docs.arbitrum.io/)
- [OP Stack specification](https://specs.optimism.io/)
- [Optimism documentation](https://docs.optimism.io/)
- [Base documentation](https://docs.base.org/)
- [L2Beat: rollup stages framework](https://l2beat.com/scaling/stages)
- [zkSync documentation](https://docs.zksync.io/)
- [StarkNet documentation](https://docs.starknet.io/)
- [LayerZero documentation](https://docs.layerzero.network/)
- [Wormhole documentation](https://docs.wormhole.com/)

## Security

- [Solidity security considerations](https://docs.soliditylang.org/en/latest/security-considerations.html)
- [Ethereum.org smart contract security](https://ethereum.org/developers/docs/smart-contracts/security/)
- [Ethereum.org security and scam prevention](https://ethereum.org/security/)
- [OpenZeppelin Contracts documentation](https://docs.openzeppelin.com/contracts/)
- [OpenZeppelin access control](https://docs.openzeppelin.com/contracts/5.x/access-control)
- [OpenZeppelin upgrades documentation](https://docs.openzeppelin.com/upgrades)
- [Ethereum.org formal verification](https://ethereum.org/developers/docs/smart-contracts/formal-verification/)
- [Solidity SMTChecker](https://docs.soliditylang.org/en/latest/smtchecker.html)
- [Flashbots documentation](https://docs.flashbots.net/)
- [Ronin Network: Community Alert, Ronin Validators Compromised](https://blog.roninchain.com/p/community-alert-ronin-validators)
- [Wormhole incident report, 2 February 2022](https://wormholecrypto.medium.com/wormhole-incident-report-02-02-22-ad9b8f21eec6)
- [Verichains Ronin Bridge audit, June 2022](https://docs.roninchain.com/assets/files/Verichains-Audit-Ronin-Bridge-v1.1-8d4913ed1f3197a108f80de1de4c4407.pdf)

## Infrastructure

- [Ethereum nodes and clients](https://ethereum.org/developers/docs/nodes-and-clients/)
- [Running an Ethereum node](https://ethereum.org/developers/docs/nodes-and-clients/run-a-node/)
- [Ethereum archive nodes](https://ethereum.org/developers/docs/nodes-and-clients/archive-nodes/)
- [Ethereum JSON-RPC](https://ethereum.org/developers/docs/apis/json-rpc/)
- [Bitcoin Core RPC](https://bitcoincore.org/en/doc/)
- [Geth documentation](https://geth.ethereum.org/docs/)
- [The Graph subgraphs](https://thegraph.com/docs/en/subgraphs/overview/)
- [The Graph indexing overview](https://thegraph.com/docs/en/indexing/overview/)
- [Graph Node documentation](https://thegraph.com/docs/en/indexing/tooling/graph-node/)
- [CloudEvents specification](https://cloudevents.io/)

## Governance

- [BIP 3: Updated BIP Process](https://github.com/bitcoin/bips/blob/master/bip-0003.md)
- [Bitcoin Improvement Proposals repository](https://github.com/bitcoin/bips)
- [Bitcoin Core contribution guidelines](https://github.com/bitcoin/bitcoin/blob/master/CONTRIBUTING.md)
- [EIP-1: EIP Purpose and Guidelines](https://eips.ethereum.org/EIPS/eip-1)
- [Ethereum governance](https://ethereum.org/governance/)
- [Ethereum execution specifications](https://github.com/ethereum/execution-specs)
- [Ethereum consensus specifications](https://github.com/ethereum/consensus-specs)
- [OpenZeppelin governance documentation](https://docs.openzeppelin.com/contracts/5.x/governance)

## Regulation and society

- [FATF guidance for virtual assets and VASPs](https://www.fatf-gafi.org/content/dam/fatf-gafi/guidance/Updated-Guidance-VA-VASP.pdf.coredownload.inline.pdf)
- [Regulation (EU) 2023/1114 on markets in crypto-assets](https://eur-lex.europa.eu/legal-content/EN/ALL/?uri=CELEX%3A32023R1114)
- [Banco Central do Brasil: regulation of virtual assets](https://www.bcb.gov.br/meubc/faqs/p/guarda-e-negociacao-de-moedas-virtuais)
- [BCB Resolution 520](https://www.bcb.gov.br/estabilidadefinanceira/exibenormativo?numero=520&tipo=Resolu%C3%A7%C3%A3o+BCB)
- [BIS CBDC publications](https://www.bis.org/topic/cbdc.htm)
- [IMF CBDC Virtual Handbook](https://www.imf.org/en/Topics/fintech/central-bank-digital-currency/virtual-handbook)
- [Ethereum privacy](https://ethereum.org/privacy/)

## Books

- Andreas M. Antonopoulos, *Mastering Bitcoin*, for Bitcoin transaction, script, wallet, and network mechanics
- Andreas M. Antonopoulos and Gavin Wood, *Mastering Ethereum*, for Ethereum accounts, transactions, the EVM, and smart contracts
- Ross Anderson, *Security Engineering*, for threat modeling, authentication, access control, and system failure analysis beyond blockchain-specific code

## Papers

- [Blind Signatures for Untraceable Payments](https://www.chaum.com/publications/Chaum-blind-signatures.PDF): David Chaum, CRYPTO '82
- [Pricing via Processing or Combatting Junk Mail](https://www.wisdom.weizmann.ac.il/~naor/PAPERS/pvp.pdf): Dwork & Naor, CRYPTO '92

## Specifications

- [Bitcoin Improvement Proposals](https://github.com/bitcoin/bips)
- [Ethereum Improvement Proposals](https://eips.ethereum.org/)

## Source-code repositories

- [bitcoin/bitcoin](https://github.com/bitcoin/bitcoin): Bitcoin Core
- [ethereum/go-ethereum](https://github.com/ethereum/go-ethereum): Geth, an Ethereum execution client
