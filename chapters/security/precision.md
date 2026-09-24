# Integer and Precision Bugs

Smart contracts count indivisible integer units. A token displayed with 18 decimal places still stores an integer balance. Prices, interest rates, shares, exchange rates, percentages, and time-weighted values therefore need explicit scaling and rounding rules.

## Units belong in the design

The integer `1_000_000` can mean one USDC base unit scale, one part per million, or a price multiplied by `10^6`. The EVM does not track that distinction. A formula can type-check, compile, and execute while combining incompatible units.

Write units beside every variable and derive the result dimension before coding. If `assets` uses token base units and `price` uses dollars multiplied by `10^8`, their product uses token-dollars multiplied by the combined scale. Division must remove the correct scale at the correct point.

## Multiplication and division order

Integer division truncates toward zero. Evaluating `(a / b) * c` discards the remainder before multiplication and can produce a much smaller result than `(a * c) / b`. Multiplying first preserves precision but may create a larger intermediate value. Solidity 0.8 checks ordinary arithmetic overflow and reverts, but unchecked blocks, casts, assembly, and cross-language components can still wrap or truncate.

Full-precision multiplication and division routines compute expressions such as `a * b / denominator` without overflowing the intermediate product. They still require a chosen rounding direction.

## Rounding transfers value

Rounding is an economic decision. A vault that rounds newly minted shares up may let deposits claim more assets than they supplied. A lending protocol that rounds debt down may slowly undercharge borrowers. A fee calculation that rounds every small trade down can leak revenue through transaction splitting.

Choose the direction against the party selecting the input when possible. Deposits and withdrawals may need opposite rules. Document the maximum error and test values around scale boundaries, zero, one unit, and the largest supported amount.

Repeated conversions can accumulate error even when each operation loses less than one unit. An attacker may repeat a favorable operation thousands of times or split one action into many smaller actions. Test sequences, not only one call.

## Decimal mismatches

ERC-20 `decimals()` is a display convention and tokens do not all use the same value. Oracles also use feed-specific decimals. Assuming 18 decimals for a six-decimal token introduces a factor of one trillion. Reading a token's metadata at runtime helps only if the protocol validates supported ranges and handles unusual or reverting implementations.

Normalize at defined boundaries and retain raw units internally when possible. Name scaled values so reviewers can see the unit, such as `priceE8` or `rateRay`, rather than calling every integer `amount`.

## Tests that expose precision failures

Use property tests across the full numeric range. Assert conservation, monotonicity, bounded error, and correct rounding direction. Include tokens with 6, 8, and 18 decimals; prices below one; very large reserves; tiny deposits; first-depositor conditions; and repeated round trips. Compare the integer implementation with a high-precision reference model.

## Further reading

- [Solidity integer types](https://docs.soliditylang.org/en/latest/types.html#integers)
- [Solidity security considerations](https://docs.soliditylang.org/en/latest/security-considerations.html)
- See also: [Token Balances](../tokens/balances.md), [Constant Product Formula](../defi/constant-product.md)

---

[← Previous: Access Control](./access-control.md)
·
[Back to Security](./README.md)
·
[Next: Oracle Manipulation →](./oracle-manipulation.md)
