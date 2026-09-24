# Prova de Trabalho

Este capítulo responde, concretamente, a uma pergunta colocada na introdução deste livro: o que um minerador realmente calcula? A matemática subjacente (pesquisa de imagem, probabilidade de hash) é geralmente coberta em [Resistência à Preimagem](../cryptography/preimage-resistance.md); este capítulo aplica-se precisamente ao laço de mineração real de Bitcoin.

## O alvo

O requisito de prova de trabalho de Bitcoin é indicado como: um cabeçalho de bloco válido, quando hashed com SHA-256d, deve produzir um valor numericamente **inferior ou igual a um alvo**, um número específico de 256 bits que muda ao longo do tempo através do [ajuste de dificuldade](./difficulty-adjustment.md)Um alvo menor significa que menos saídas possíveis de hash se qualificam, o que significa que mais tentativas são necessárias em média para encontrar um. Este é o significado literal de "dificuldade".

## O loop de mineração

```text
1. Assemble a candidate block: select transactions from the mempool,
   build the coinbase transaction, compute the Merkle root.
2. Build the 80-byte header (version, previous hash, Merkle root,
   timestamp, difficulty bits, nonce).
3. Compute SHA-256d(header).
4. Is the result ≤ target?
     YES → broadcast the block. Done.
     NO  → increment the nonce (and/or extranonce, and/or timestamp,
           and/or transaction selection/order, to get fresh header
           bytes), go back to step 3.
```

Este loop é, exatamente, a pesquisa de pré-imagem descrita geralmente em [Resistência à Preimagem](../cryptography/preimage-resistance.md#por-que-isso-importa-a-mineração-é-uma-busca-de-preimagem)Não há atalho, nem esperteza que reduz o número esperado de tentativas abaixo do que o tamanho do alvo implica. A fórmula do whitepaper aplica-se diretamente:

```text
P(a single hash attempt succeeds) = target / 2^256
```

## Exemplo: computação das probabilidades aproximadas de hoje

A dificuldade de Bitcoin é frequentemente expressa em relação à primeira dificuldade da rede (1.0). Se a dificuldade de hoje é, digamos, 90 trilhões (uma ordem real de magnitude nos últimos anos, embora este número específico muda aproximadamente a cada duas semanas e não deve ser tratado como atual, ver [Dificuldade em Mineração](./difficulty.md) para encontrar o valor vivo, o número esperado de hash tenta encontrar um bloco válido é aproximadamente `difficulty × 2^32` (uma relação padrão entre unidades de dificuldade de Bitcoin e hashes esperados, derivada de como o alvo dificuldade-1 é definido):

```typescript
function expectedHashesForDifficulty(difficulty: number): number {
  return difficulty * Math.pow(2, 32);
}

const illustrativeDifficulty = 90_000_000_000_000; // ~90 trillion — illustrative, not live
const expected = expectedHashesForDifficulty(illustrativeDifficulty);
console.log("Expected hash attempts:", expected.toExponential(3));

const networkHashrateHz = 500_000_000_000_000_000_000; // ~500 EH/s — illustrative, not live
console.log("Expected time to find a block (seconds):", expected / networkHashrateHz);
console.log("Expected time to find a block (minutes):", expected / networkHashrateHz / 60);
```

Os números acima são deliberadamente ilustrativos. Para uma observação ao vivo, consulte um nó Bitcoin Core com [`getmininginfo`](https://developer.bitcoin.org/reference/rpc/getmininginfo.html), que relata a dificuldade atual, e [`getnetworkhashps`](https://developer.bitcoin.org/reference/rpc/getnetworkhashps.html), que estima a taxa de hash de rede de blocos recentes.

Executando isso com números realistas de ordem de grandeza produz um tempo esperado perto do alvo de 10 minutos de Bitcoin, que não é uma coincidência, mas todo o ponto de [ajuste de dificuldade](./difficulty-adjustment.md): a rede recupera continuamente o alvo especificamente para manter este tempo esperado perto de 10 minutos, independentemente de quanta potência de hash total está realmente competindo.

## Por que prova de trabalho, especificamente, protege a cadeia

Recordar a ligação a [Ataques de Sybil](../distributed-systems/sybil-attacks.md): porque encontrar um hash válido requer um trabalho computacional real e externo sem atalho, a influência sobre qual cadeia se estende está ligada a um recurso (poder hash) que não pode ser fabricado de graça criando mais instâncias de software ou identidades de rede. Isto é também o que faz [Hashes e Block Linking](../blockchain/block-linking.md#o-custo-que-isso-impõe-refazer-prova-de-trabalho) significativa: alterar um bloco passado requer literalmente refazer esta pesquisa exata, do zero, para esse bloco e cada bloco depois dele.

## Conceitos errôneos comuns

**A mineração não é "resolver um problema matemático" no sentido de trabalhar para uma solução incremental.** Cada tentativa é um julgamento independente e sem memória. Encontrar um hash que começa com, digamos, 19 zero bits não lhe dá nenhuma informação que faça encontrar 20 zero bits mais fácil; cada tentativa tem exatamente a mesma probabilidade, inalterada de sucesso, independentemente de quantas tentativas falhadas vieram antes dele, uma propriedade às vezes chamada de "memorylessness" e diretamente implícita pela imprevisibilidade de uma função hash bem projetada (ver [Funções do Hash](../cryptography/hashes.md)).

**Um minerador não precisa de tentar todos os valores possíveis nonce em ordem**Nonces pode ser tentado em qualquer ordem, incluindo em paralelo através de muitas unidades de processamento independentes, uma vez que cada tentativa é uma tentativa totalmente independente, sem dependência de qualquer outro.

## Outras leituras

- [Documento branco Bitcoin, Seção 4 (Prova de trabalho) e Seção 11 (Calculações)](https://bitcoin.org/bitcoin.pdf)
- Ver também: [Hashcash](../origins/hashcash.md), [Resistência à Preimagem](../cryptography/preimage-resistance.md)

---

[← Anterior: Ordinais e Inscrições](./ordinals.md)
·
[Voltar para Bitcoin](./README.md)
·
[Próximo: Mineração →](./mining.md)
