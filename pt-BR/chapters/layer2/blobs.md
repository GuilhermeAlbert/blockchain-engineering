# Blobs

Um blob é o tipo de dados dedicado da Ethereum para dados de lote de rollup, introduzido especificamente para tornar os dados disponíveis (ver [Disponibilidade de Dados](./data-availability.md)) barato sem inchar permanentemente cada armazenamento de nó Ethereum. Este capítulo cobre o que uma bolha realmente é e como é preço, separadamente do gás de transação comum.

## O que uma bolha realmente contém

Uma bolha é um bloco fixo de dados: 4.096 elementos de campo de 32 bytes cada, para um total de aproximadamente 128 KB. Um rollup embala seu lote de dados de transação em uma ou mais blobs e os liga a uma transação normal Ethereum (a **transação de transporte de blob**), juntamente com um compromisso compacto com o conteúdo da blob que a própria camada de execução de Ethereum pode verificar sem precisar dos dados completos da blob no momento da execução.

## Blobs são preços separados do gás comum

Os dados da Blob têm o seu próprio mercado de taxas, totalmente separado, com a sua própria taxa de base que se adapta com base na procura de espaço blob, independentemente da taxa normal de base de gás EIP-1559 já estabelecida para operações regulares (ver [Preço do gás e taxas](../ethereum/fees.md)). Esta separação é deliberada: execução de transações ordinárias e publicação de dados blob competem por recursos genuinamente diferentes, independentemente restringidos (capacidade de execução EVM versus largura de banda de dados), e precificando-os juntos em um mercado de gás compartilhado significaria um aumento em um tipo de demanda impulsionando custos para o outro, tipo não relacionado de uso.

```typescript
// Reading a transaction's blob-related fields with viem.
import { createPublicClient, http } from "viem";
import { mainnet } from "viem/chains";

const client = createPublicClient({ chain: mainnet, transport: http() });

// A blob-carrying transaction has a distinct "blobVersionedHashes" field
// and pays a separate "maxFeePerBlobGas" alongside ordinary gas fields.
const block = await client.getBlock({ blockTag: "latest" });
console.log("blob gas used this block:", block.blobGasUsed);
console.log("excess blob gas:", block.excessBlobGas);
```

## Porque os blobs não ficam aqui para sempre

Ao contrário dos calldata comuns, que se torna uma parte permanente da história de Ethereum que cada nó completo retém indefinidamente, os dados de blob são deliberadamente de curta duração: os nós de consenso Ethereum retêm-no por uma janela fixa, 4.096 épocas, aproximadamente 18 dias, antes de podá-lo, em vez de para sempre. Esta é uma escolha de design deliberada que corresponde ao objetivo real dos dados: os dados blob só precisam estar disponíveis o suficiente para o período de desafio à prova de fraude de um rollup para executar o seu curso, ou para uma prova de validade a ser gerada e verificada, não permanentemente, uma vez que o próprio fardo de armazenamento de longo prazo de Ethereum foi exatamente o que fez a publicação de dados de rolagem pré-blob tão caro em primeiro lugar. Qualquer pessoa que precise de acesso a longo prazo a dados históricos de blob depende de serviços de arquivo separados e off-protocol em vez de nós de consenso próprios de Ethereum.

## O alvo e o máximo já mudaram desde o lançamento

EIP-4844 [EIP-4844](./eip-4844.md)) lançado com um alvo deliberadamente conservador de 3 blobs e um máximo de 6 blobs por bloco na atualização de Ethereum março 2024 Dencun. Desde então, novas atualizações de rede (Blob Parameter Only forks, que ajustam esses números específicos sem exigir mudanças mais amplas de um hard fork completo) levantaram ambos os números substancialmente, com o roadmap de longo prazo (full danksharding) visando ainda mais, em torno de 128 blobs por bloco. Este padrão de crescimento, começar conservador e escalar-se gradualmente como a rede prova que pode lidar mais, espelha como o tamanho do bloco próprio de Bitcoin tem sido historicamente abordado com cautela (ver [Tamanho do Bloco](../bitcoin-scaling/block-size.md)), em vez de se comprometer com um aumento de capacidade agressivo antes de ser testado na produção.

## Conceitos errôneos comuns

**Um blob não é a mesma coisa que calldata, mesmo que ambos possam carregar dados em lote.** Os Blobs têm seu próprio mercado de taxas, seu próprio formato de tamanho, e seu próprio período de retenção limitado; um rollup escolhe publicar dados como calldata em vez de uma blob paga preços comuns de gás e recebe a garantia de armazenamento permanente da Ethereum, um significativamente diferente custo e troca de durabilidade.

**A capacidade do bloco por bloco não é uma constante fixa e permanente do protocolo.** Ele já foi levantado várias vezes desde o lançamento inicial do EIP-4844 através de forks Blob Parâmetro Only, e espera-se que continue subindo conforme o roadmap de Ethereum em direção ao completo Danksharding progride; uma figura específica de contagem de blobs deve ser tratada como atual para um determinado ponto no tempo, não como uma propriedade imutável do protocolo.

## Outras leituras

- [EIP-4844.com](https://www.eip4844.com/)
- Ver também: [EIP-4844](./eip-4844.md), [Disponibilidade de Dados](./data-availability.md)

---

[← Anterior: Disponibilidade de dados](./data-availability.md)
·
[Voltar à Camada 2](./README.md)
·
[Próximo: EIP-4844 →](./eip-4844.md)
