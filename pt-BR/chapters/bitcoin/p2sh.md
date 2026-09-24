# P2SH

Pay-to-Script-Hash, padronizado em [BIP 16](https://github.com/bitcoin/bips/blob/master/bip-0016.mediawiki) e ativado em 2012, permite que uma saída seja bloqueada para o hash de um script arbitrário, com o script real apenas revelado e executado quando a saída é gasta. Este capítulo abrange o mecanismo e por que ele importa especificamente para o caso de uso dominante do P2SH.

## O problema que ele resolve

Antes do P2SH, um script de bloqueio tinha que conter o *inteiro* usando a lógica diretamente, para uma saída multisig 2 de 3, isso significava incorporar todas as três chaves públicas e o opcode multisig-checking diretamente no script de saídaPubKey. Isto tem dois custos reais: **remetente** criar a saída paga por todo o peso dos dados do script (mesmo que o destinatário seja o único que realmente se beneficia do arranjo multisig), e o remetente precisa saber e corretamente construir o script de gastos exato, potencialmente complexo com antecedência, impraticável para qualquer coisa além dos casos mais simples.

## Como funciona

Um script de bloqueio P2SH é curto e genérico, independentemente do quão complexo seja a lógica de gasto real:

```text
OP_HASH160 <scriptHash> OP_EQUAL
```

Onde `<scriptHash>` é `RIPEMD160(SHA256(redeemScript))`, um hash do script de despesa real (chamado **Redefine o script**), que é *não* incluído na saída em tudo. Para gastar essa saída, os dados de desbloqueio devem fornecer o próprio script redime, além de quaisquer dados satisfeitos *que* script:

```text
<data satisfying the redeem script...> <serialized redeem script>
```

Execução acontece em duas etapas: primeiro, a verificação P2SH externa confirma o script redime fornecido realmente hashes para `<scriptHash>` (provando que o gastador não está substituindo um script diferente do que a saída estava realmente bloqueada); então, por regra especial do BIP 16, o próprio script é executado contra os dados restantes da pilha, exatamente como se tivesse sido o script de bloqueio original o tempo todo.

```text
Output creation (sender only needs to know the scriptHash, not the full logic):
  scriptPubKey: OP_HASH160 <scriptHash> OP_EQUAL

Spending (spender provides and reveals the actual logic):
  scriptSig: <sig1> <sig2> <redeemScript: OP_2 <pubA> <pubB> <pubC> OP_3 OP_CHECKMULTISIG>
                                            ↑ this is a 2-of-3 multisig script, only
                                              revealed now, at spend time
```

## Por que isso importa especificamente para multisig

Um remetente que paga em um endereço multisig P2SH não precisa saber nada sobre os detalhes internos do arranjo multisig. Eles só precisam do endereço P2SH (um hash), exatamente tão simples de pagar como um endereço P2PKH comum. Toda a complexidade de "quais três chaves, e quantas delas são necessárias" permanece oculta até gastar tempo, e o custo de armazenar e validar essa complexidade é suportado pelos participantes multisig quando eles realmente gastam os fundos, não imposta a cada remetente que já paga. Isto é coberto ainda mais, com a estrutura real do script multisig, em [Multisig](../wallets/multisig.md).

## SegWit embrulhado com P2SH: um padrão de transição

Quando o SegWit for ativado (2017, veja [SegWit](./segwit.md)), carteira antiga e software de troca que ainda não entendiam endereços nativos SegWit (bech32-codificado, começando com `bc1`) não podiam enviar fundos diretamente para eles. **SegWit embrulhado com P2SHName** endereços (começando com `3`, o prefixo padrão de endereço P2SH) deixou uma saída SegWit ser paga para usar um endereço P2SH com aparência normal, enquanto o script de resgate real dentro é um programa SegWit mínimo, dando a taxa e funcionalidade do SegWit beneficia alguma compatibilidade atrasada com software que ainda não tinha adicionado suporte nativo SegWit, ao custo de uma pequena quantidade de dados extras (o embrulho) em comparação com uma saída SegWit totalmente nativa.

## Comércio

A flexibilidade do P2SH (complexidade de script de resgate arbitrário, revelada apenas no tempo despendido) vem a um custo real, se geralmente modesto: o próprio script de resgate, uma vez revelado, conta para o tamanho e a taxa da transação de gasto, o P2SH adia esse custo para gastar tempo em vez de eliminá-lo, que é exatamente o tradeoff pretendido (pago por quem se beneficia da complexidade, no momento em que eles realmente o usam, em vez de por cada remetente na frente).

## Conceitos errôneos comuns

**Os endereços P2SH (começando com "3") não são inerentemente "endereços multisig".** P2SH pode embrulhar qualquer script válido. Multisig é o seu uso histórico mais comum, mas as saídas SegWit (que não são multisig em tudo) embrulhadas com P2SH também usam o mesmo formato de endereço "3...", o que significa que o prefixo de endereço sozinho não lhe diz o que a lógica de gasto está realmente por trás dele.

**O script remir não é visível on-chain até que a saída seja gasta.** Antes de gastar, apenas seu hash é público, um benefício real, se modesto, de privacidade para arranjos de gastos complexos que ainda não foram usados.

## Outras leituras

- [BIP 16: Pagar a Hash de Script](https://github.com/bitcoin/bips/blob/master/bip-0016.mediawiki)

---

[← Anterior: P2PKH](./p2pkh.md)
·
[Voltar para Bitcoin](./README.md)
·
[Próximo: SegWit →](./segwit.md)
