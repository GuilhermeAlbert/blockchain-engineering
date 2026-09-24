# Blocos

Um bloco é um lote de dados (no caso do Bitcoin, transações) agrupados juntos, carimbado com uma referência ao bloco antes dele, e garantido por prova de trabalho. Este capítulo trata o bloco puramente como uma estrutura de dados, independente das regras de consenso específicas de Bitcoin ou política monetária, porque a mesma forma básica aparece (com variações) em essencialmente cada sistema blockchain coberto mais tarde neste livro.

## O problema

[Árvores-merkle](../cryptography/merkle-trees.md) mostrar como resumir um grande conjunto de dados em um pequeno hash. [Ligação de hash](./block-linking.md) mostra como colar discos juntos, então adulterar um velho recorde quebra tudo depois dele. Um bloco é onde essas peças combinam com uma decisão de loteamento: em vez de adicionar cada transação única à cadeia individualmente (o que significaria a prova de trabalho de computação para cada transação, extremamente desperdiçada) ou esperando para lotear toda a atividade da rede em um registro enorme, raramente atualizado (o que tornaria o sistema muito lento para ser utilizável), Bitcoin lotes transações em blocos criados em um intervalo aproximadamente fixo (cerca de 10 minutos, ver [Tempo de bloco](./block-time.md)), e prova de trabalho protege cada lote como uma unidade.

## Estrutura

Um bloco Bitcoin tem duas partes principais:

1. **O cabeçalho do bloco**: uma estrutura de tamanho fixo, 80-bytes contendo metadados sobre o bloco: uma referência ao hash do bloco anterior, uma raiz de Merkle que resume as transações do bloco, um timestamp, o alvo de dificuldade atual, e um nonce. Este aspecto é abordado em pormenor. [Cabeçalhos de Blocos](./block-headers.md), porque o cabeçalho sozinho é o que prova de trabalho realmente assegura, e também é tudo um [cliente leve](../bitcoin/light-clients.md) precisa de descarregar.
2. **O corpo do bloco**: a lista completa das transações incluídas neste bloco, começando por uma transação de base de moeda especial (ver [Transações de base de moeda](../bitcoin/coinbase-transactions.md)) que cria novas moedas e as paga a quem extraiu o bloco, seguido de transações normais.

```text
┌─────────────────────────────────────────┐
│               Block Header (80 bytes)     │
│  ┌─────────────────────────────────────┐ │
│  │ Previous block hash                  │ │
│  │ Merkle root (summarizes all tx below)│ │
│  │ Timestamp                            │ │
│  │ Difficulty target                    │ │
│  │ Nonce                                │ │
│  └─────────────────────────────────────┘ │
├─────────────────────────────────────────┤
│               Block Body                  │
│  ┌─────────────────────────────────────┐ │
│  │ Coinbase transaction (new coins)     │ │
│  │ Transaction 1                        │ │
│  │ Transaction 2                        │ │
│  │ ...                                  │ │
│  │ Transaction N                        │ │
│  └─────────────────────────────────────┘ │
└─────────────────────────────────────────┘
```

## Por que o cabeçalho/corpo dividido importa

Separar um cabeçalho pequeno e de tamanho fixo de um corpo de tamanho variável é uma decisão de projeto deliberada com consequências reais: o cabeçalho é o que é hashed para verificar prova de trabalho, e é pequeno o suficiente que um minerador pode tentar bilhões de valores de nonce por segundo sem precisar tocar o corpo (potencialmente megabyte) para cada tentativa, o conteúdo do corpo só importa na medida em que eles são resumidos na raiz de Merkle, um campo no cabeçalho. Isto é também o que faz [Verificação simplificada do pagamento](../bitcoin/light-clients.md) possível: um cliente leve só precisa baixar e armazenar cabeçalhos de 80-byte (aproximadamente 4,2 MB por ano de blocos, na taxa de bloco real do Bitcoin) para verificar a cadeia de prova de trabalho, em vez de a cadeia de blocos multi-hundred-gigabyte.

## Exemplo: construir um bloco mínimo

Este exemplo constrói um bloco simplificado, não totalmente compatível com Bitcoin, mas o suficiente para demonstrar a mecânica exata de hashing um cabeçalho e confirmando-o referencia o bloco anterior direito e dados de transação:

```typescript
import { createHash } from "node:crypto";

interface Block {
  index: number;
  timestamp: number;
  transactions: string[];
  previousHash: string;
  nonce: number;
}

function sha256(input: string): string {
  return createHash("sha256").update(input).digest("hex");
}

function merkleRoot(transactions: string[]): string {
  let level = transactions.map((tx) => sha256(tx));
  while (level.length > 1) {
    const next: string[] = [];
    for (let i = 0; i < level.length; i += 2) {
      const left = level[i];
      const right = i + 1 < level.length ? level[i + 1] : level[i];
      next.push(sha256(left + right));
    }
    level = next;
  }
  return level[0] ?? sha256("");
}

function blockHash(block: Block): string {
  const header = `${block.index}|${block.timestamp}|${merkleRoot(block.transactions)}|${block.previousHash}|${block.nonce}`;
  return sha256(header);
}

const block: Block = {
  index: 1,
  timestamp: 1700000000,
  transactions: ["Alice pays Bob 1 coin", "Bob pays Carol 0.5 coin"],
  previousHash: "0000000000000000000000000000000000000000000000000000000000000",
  nonce: 0,
};

console.log("Merkle root:", merkleRoot(block.transactions));
console.log("Block hash: ", blockHash(block));
```

O exemplo deste capítulo é intencionalmente simplificado, uma implementação de construção de blocos real, com a pesquisa de prova de trabalho real, é construída em toda esta seção [Tente você mesmo](#experimenta-tu-mesmo) exercícios e em [exemplos/simples- blockchain/](../../../examples/simple-blockchain/).

## Sob o capô: o que muda se você alterar alguma coisa

Tente alterar mentalmente qualquer único campo (a lista de transações, o hash anterior, até mesmo o timestamp por um segundo) e recomputação: o root do Merkle muda (se as transações mudaram), e o hash do bloco muda independentemente de qual campo mudou, porque o cabeçalho concatena e hashes todos eles juntos. Este é o mecanismo directo por trás [Hashes e Block Linking](./block-linking.md#o-mecanismo): o hash próprio de um bloco depende de tudo dentro dele, e o cabeçalho do próximo bloco inclui explicitamente o hash deste bloco como seu `previousHash` campo, assim alterando qualquer coisa neste bloco quebra a cadeia deste ponto para frente.

## Comércio

Bater transações em blocos extraídos em um intervalo aproximadamente fixo significa que as transações individuais não recebem segurança de prova de trabalho individual e instantânea. Eles herdam a segurança de qualquer bloco em que eles estão divididos, ea posição desse bloco na cadeia (ver [Altura do Bloco](./block-height.md) e [Confirmação da transação](../bitcoin/confirmation.md)). Este é um tradeoff de transferência/segurança deliberada: loteamento amortiza o custo da prova de trabalho em muitas transações ao mesmo tempo, tornando o sistema utilizável, ao custo de transações não sendo instantaneamente, individualmente final no momento em que são transmitidos.

## Conceitos errôneos comuns

**Um bloco não precisa ser "completo" para ser válido.** Os blocos de Bitcoin podem e contêm muito menos transações do que o limite máximo de peso do bloco permite, particularmente durante períodos de baixa atividade de rede. O tamanho do bloco é um tecto, não um alvo.

**A transação de base de moeda não é opcional ou separada da lista de transações do bloco**. É a primeira transação em cada bloco válido, e um bloco sem transação de base de moeda é inválido. Ver [Transações de base de moeda](../bitcoin/coinbase-transactions.md).

## Experimenta tu mesmo.

Execute o exemplo de código acima, em seguida, modifique um caractere em uma string de transação e recompute tanto o merkle root quanto o block hash. Confirme ambas as alterações completamente. Então tente construir uma cadeia de dois blocos, onde o segundo bloco `previousHash` o campo é definido para o hash computado do primeiro bloco, e confirmar que mudar qualquer coisa no bloco 1 exigiria recomputação do hash do bloco 2 para manter a cadeia consistente (este é o mecanismo explorado [Hashes e Block Linking](./block-linking.md)).

## Outras leituras

- [Bitcoin Referência do desenvolvedor principal: Cadeia de blocos](https://developer.bitcoin.org/reference/block_chain.html)
- [Whitepaper Bitcoin, Seção 3 (Timestamp Server)](https://bitcoin.org/bitcoin.pdf)

---

[← Anterior: O que é um Blockchain?](./README.md)
·
[Voltar para Blockchain Fundamentos](./README.md)
·
[Próximo: Cabeçalhos de bloco →](./block-headers.md)
