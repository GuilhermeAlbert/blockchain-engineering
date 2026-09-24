# Bitcoin Governance

Bitcoin has no protocol administrator. Changes emerge through discussion, specifications, implementations, releases, miner behavior, node enforcement, wallet and exchange support, and user choice. Those groups overlap, but none can compel every other group to adopt incompatible rules.

## From idea to enforced rule

A consensus change may begin in research or mailing-list discussion, become a BIP, receive implementations and tests, ship in node software, and use an activation mechanism. Each stage answers a different question. A BIP documents a proposal. Code makes it runnable. Activation determines when nodes enforce it. Adoption determines how much of the economy follows it.

Soft forks tighten validity rules. Upgraded nodes reject some blocks older nodes would accept. This compatibility permits deployment without every node upgrading at once, but it does not remove coordination risk. If miners produce blocks that upgraded economic nodes reject, the network can split in practice even though older software accepts both branches.

Hard forks loosen or otherwise change rules in a way old nodes reject. Adoption requires explicit migration to the new rules and may create a persistent separate network when users disagree.

## Influence and refusal

Developers influence which changes have safe implementations. Reviewers influence whether defects are found. Maintainers decide what enters a particular repository. Miners choose block templates and can signal readiness. Businesses decide what deposits, withdrawals, and symbols they support. Node operators choose which rules their software enforces.

These powers are real but bounded. A maintainer cannot change an already running node. A miner cannot make an invalid block acceptable to a fully validating node. A large exchange can influence naming and liquidity without rewriting consensus on other machines.

## SegWit as a coordination case

SegWit combined a technical proposal, client implementation, miner signaling, economic pressure, and competing activation plans. BIP 9 originally defined version-bit activation. BIP 148 later described user-activated enforcement on a fixed date. The episode showed that miner signaling was one coordination mechanism, not a constitutional vote assigning miners final authority.

The lesson is not that one group “won” governance. Different actors held different forms of influence, and the credible possibility of incompatible enforcement changed incentives before the deadline.

## Conservatism and exit

Bitcoin's high coordination threshold makes contentious consensus change slow. That protects monetary and validation assumptions, while also making repair or experimentation harder. Participants can fork code and rules, but maintaining security, liquidity, infrastructure, and recognition for a separate network is costly. Formal permission to exit does not guarantee economic success.

## Further reading

- [BIP 3: Updated BIP Process](https://github.com/bitcoin/bips/blob/master/bip-0003.md)
- [BIP 9: Version bits](https://github.com/bitcoin/bips/blob/master/bip-0009.mediawiki)
- [BIP 148: Mandatory activation of SegWit](https://github.com/bitcoin/bips/blob/master/bip-0148.mediawiki)
- See also: [Bitcoin Governance](../forks/governance.md), [The Block Size Debate](../forks/block-size-war.md)

---

[← Previous: Governance](./README.md)
·
[Back to Governance](./README.md)
·
[Next: Ethereum Governance →](./ethereum.md)
