# P2PKH

Pay-to-Public-Key-Hash é original do Bitcoin, e para a maior parte de sua história mais comum, maneira padrão de bloquear uma saída para uma única chave. Este capítulo percorre a sua estrutura de script exata (já demonstrou execução em [Bitcoin Script](./script.md)) e cobre o formato de endereço construído especificamente em torno dele.

## O script de bloqueio

```text
OP_DUP OP_HASH160 <pubKeyHash> OP_EQUALVERIFY OP_CHECKSIG
```

Onde `<pubKeyHash>` é `RIPEMD160(SHA256(publicKey))`, a mesma operação "hash160" demonstrada em [Bitcoin Script](./script.md#exemplo-um-interpretador-de-script-simplificado-e-funcional). A construção de dois hash (SHA-256, em seguida, RIPEMD-160) em vez de uma única função hash é uma escolha deliberada de defesa em profundidade: um endereço permanece seguro, mesmo se uma fraqueza foi mais tarde encontrada em apenas uma das duas funções hash, enquanto o outro permanece sólido.

## O programa de desbloqueio (scriptSig)

```text
<signature> <publicKey>
```

Apenas dois impulsos: a assinatura do gastador sobre a transação, e sua chave pública. Enquanto caminhava passo a passo [Bitcoin Script](./script.md#o-que-acabou-de-acontecer-passo-a-passo), a execução combinada prova duas coisas simultaneamente: a chave pública fornecida genuinamente hashes para o endereço em que esta saída foi bloqueada (`OP_EQUALVERIFY`), e a assinatura fornecida é válida para essa chave pública específica sobre esta transação específica (`OP_CHECKSIG`).

## Endereços: codificando um pubKeyHash P2PKH para humanos

Um endereço P2PKH é uma codificação humana do pubKeyHash, usando **Base58Verificar**, Base58 (um alfabeto de 58 caracteres deliberadamente excluindo caracteres visualmente semelhantes como `0`/`O` e `l`/`I`, para reduzir erros de transcrição) combinado com uma versão byte (identificando o tipo de endereço e rede. Principalnet P2PKH endereços convencionalmente começar com `1`) e um checksum de 4 bytes (os quatro primeiros bytes de `SHA256(SHA256(versionByte + pubKeyHash))`, anexado antes da codificação), permitindo que o software de carteira detectar a maioria dos erros de digitação ou transcrição antes de transmitir uma transação para um endereço que realmente não corresponde a qualquer chave válida. Isto é totalmente coberto, ao lado do novo formato Bech32 usado para SegWit, em [Endereços](../wallets/addresses.md).

## Por que isso se tornou o padrão histórico

A vantagem específica do P2PKH sobre o formato anterior P2PK (não revelando a chave pública real até que a saída seja gasta) é coberta em [ScriptPubKey e ScriptSig](./scripts.md#por-que-p2pk-deu-lugar-a-p2pkh). Seu custo, em relação a uma chave pública nua, são alguns bytes extras (as operações de hash e a comparação), uma sobrecarga negligenciável em troca de uma real melhoria de segurança, razão pela qual ele deslocou P2PK quase imediatamente após os primeiros dias de Bitcoin.

## Tradeoffs em relação aos formatos mais recentes

As transações P2PKH são maiores, e, portanto, mais caras de gastar, do que seu equivalente SegWit (P2WPKH), porque a assinatura e chave pública estão no `scriptSig` campo, que é contado em peso total em vez de receber o desconto de testemunha descrito em [Taxas de transação](./fees.md#tamanho-e-peso-da-transação). Modern software carteira geralmente padrão para SegWit ou Taproot formatos de endereço por esta razão, embora P2PKH permanece totalmente válido, suportado, e em uso ativo. O Bitcoin não deprecate ou remova suporte para tipos de script mais antigos, ainda-consensus-válidos.

## Conceitos errôneos comuns

**Um endereço P2PKH não é a mesma coisa que uma chave pública**, e não pode ser invertido de volta em um. É um hash único de uma chave pública, codificada para legibilidade. A chave pública em si só se torna visível on-chain no momento em que o resultado correspondente é realmente gasto.

**Os endereços "1" não são obsoletos ou inseguros**. Eles permanecem endereços Bitcoin totalmente válidos; a mudança para formatos SegWit e Taproot é impulsionada pela eficiência de custo e recursos adicionais, não por qualquer deprecação de segurança do P2PKH em si.

## Outras leituras

- [Bitcoin Referência do desenvolvedor principal: Transações](https://developer.bitcoin.org/devguide/transactions.html)

---

[← Anterior: ScriptPubKey e ScriptSig](./scripts.md)
·
[Voltar para Bitcoin](./README.md)
·
[Próximo: P2SH →](./p2sh.md)
