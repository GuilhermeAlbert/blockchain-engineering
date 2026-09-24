# Nonce

O nonce é o único campo em um cabeçalho de bloco que os mineradores variam livremente ao procurar um hash de prova de trabalho válido. Este breve capítulo centra-se especificamente no papel do nonce e suas limitações práticas, com base no layout completo do cabeçalho em [Cabeçalhos de Blocos](../blockchain/block-headers.md) e o processo de busca em [Prova de Trabalho](./proof-of-work.md).

## O que é

"Nonce" (um termo emprestado da criptografia geralmente, abreviado para "número usado uma vez") é um campo de 4-byte (32-bit) no cabeçalho do bloco sem significado além de dar aos mineradores um valor para mudar entre as tentativas de hash. Ele não tem relação com transações do bloco, timestamp, ou qualquer outro conteúdo de campo; seu único propósito é produzir bytes de cabeçalho diferentes para hash em cada tentativa, uma vez que hashing o cabeçalho idêntico duas vezes obviamente produziria o resultado idêntico (e, se já falhou uma vez, ainda falhando).

## O problema: 4 bytes não é mais suficiente

Um nonce de 32 bits fornece cerca de 4,3 bilhões (2^32) de valores distintos. Moderno equipamento de mineração ASIC (ver [ASICs](./asics.md)) pode esgotar todo este intervalo em uma pequena fração de segundo, muitas ordens de magnitude mais rápido do que o tempo médio de aproximadamente 10 minutos necessário para realmente encontrar um hash válido em dificuldade atual. Isso significa que o campo de cabeçalho nonce sozinho não pode fornecer espaço de busca suficiente por conta própria; os mineradores precisam de maneiras adicionais para gerar bytes de cabeçalho frescos uma vez que eles esgotaram todos os valores de 4,3 bilhões de nonce sem encontrar um hash válido.

## Como os mineradores conseguem mais espaço de busca

Dois mecanismos estendem o espaço de busca eficaz para além do próprio campo do cabeçalho:

1. **Extranonce**: um valor adicional, de um tamanho que o minerador ou grupo escolhe, incorporado no campo de dados de entrada da transação coinbase (ver [Transações de base de moeda](./coinbase-transactions.md#utilização-comum-do-campo-de-dados-incorporado)). Mudando a extranonce muda a transação coinbase, que muda a raiz do Merkle, que muda o cabeçalho, dando um novo conjunto de bytes de cabeçalho para pesquisar através de todo o intervalo nonce novamente.
2. **Timetamp rolando**: uma vez que o campo timestamp tem alguma flexibilidade permitida (deve ser maior do que a mediana dos últimos 11 blocos e não muito longe no futuro. Ver [Cabeçalhos de Blocos](../blockchain/block-headers.md#sob-o-capô-ordem-do-byte)), um minerador também pode incrementar o timestamp ligeiramente para obter novas variações de cabeçalho, embora isso forneça uma quantidade comparativamente pequena de espaço extra em comparação com extranonce.

Na prática, hardware de mineração de alto desempenho esgota o campo nonce, em seguida, aumenta a extranonce (desencadeando uma recomputação raiz Merkle) e esgota o campo nonce novamente, repetindo este ciclo continuamente.

## Exemplo: esgotar um pequeno espaço nonce

```typescript
function findValidNonce(headerPrefix: string, targetPrefix: string, maxNonce: number): number | null {
  const { createHash } = require("node:crypto");
  const sha256 = (s: string) => createHash("sha256").update(s).digest("hex");

  for (let nonce = 0; nonce <= maxNonce; nonce++) {
    const hash = sha256(headerPrefix + nonce);
    if (hash.startsWith(targetPrefix)) {
      return nonce;
    }
  }
  return null; // exhausted the search space without success — a real possibility!
}

const result = findValidNonce("block-header-data", "0000", 10_000_000);
console.log(result === null ? "Search space exhausted without finding a valid nonce" : `Found at nonce ${result}`);
```

Executar este código exato encontra uma correspondência no nonce `47558` (determinístico, uma vez que SHA-256 é uma função pura de sua entrada, o mesmo prefixo de cabeçalho e alvo sempre encontrará o mesmo nonce). Com um alvo de 4 horas, uma partida dentro de 10 milhões de tentativas é extremamente provável (cerca de 65.536 tentativas são esperadas em média), mas nada garante isso. Um prefixo mais longo pode facilmente esgotar `maxNonce` sem nenhuma correspondência encontrada.

Isso demonstra que o cenário exato de extranonce existe para resolver: para um prefixo de cabeçalho fixo dado, não há garantia de que qualquer nonce em um intervalo limitado produz um hash qualificado, às vezes nenhum dos 4,3 bilhões possíveis combinações header-plus-nonce funcionam, e o minerador realmente deve mudar outra coisa (a extranonce, mudando a raiz de Merkle) para obter um conjunto inteiramente novo de bytes de cabeçalho para pesquisar.

## Conceitos errôneos comuns

**Um maior valor não significa "mais trabalho" foi feito para alcançá-lo**, e nonces não são tentados em qualquer ordem necessária, qualquer valor nonce específico encontrado para ser válido é exatamente tão válido como qualquer outro; não há significância para o qual o nonce numérico acabou por funcionar, apenas que uma combinação header-plus-nonce foi encontrada cuja hash atende ao alvo.

## Outras leituras

- [Bitcoin Referência do desenvolvedor principal: cabeçalhos de bloco](https://developer.bitcoin.org/reference/block_chain.html#block-headers)

---

[← Anterior: Ajuste de dificuldade](./difficulty-adjustment.md)
·
[Voltar para Bitcoin](./README.md)
·
[Próximo: Block Rewards →](./block-rewards.md)
