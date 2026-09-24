# Oráculos

Um contrato inteligente não pode consultar uma API externa, ler uma página web ou perguntar qualquer coisa fora do blockchain diretamente. Um oráculo é a infraestrutura que recebe dados do mundo real, na maioria das vezes preços de ativos, na cadeia de uma forma que um contrato pode confiar. Este capítulo aborda por que razão este é um problema verdadeiramente difícil, e as duas abordagens dominantes para resolvê-lo.

## Por que este é um problema difícil, não apenas um encanamento

Cada nó que executa o código de um contrato inteligente deve chegar ao resultado idêntico, uma vez que o consenso depende de cada nó que computa o mesmo estado de transição (ver [Consenso](../distributed-systems/consensus.md)). Uma solicitação HTTP para uma API externa quebra isso imediatamente: nós diferentes poderiam receber respostas diferentes dependendo do tempo, condições de rede ou a API estar indisponível para alguns nós e não outros, tornando impossível o consenso determinístico. É por isso que o EVM não tem opcode para fazer um pedido de rede externa; o problema não é que ninguém construiu um, é que todo o modelo de consenso requer evitar este tipo de não-determinismo.

O problema real que um oráculo resolve é: obter dados externos na cadeia através de um mecanismo que *é* determinístico uma vez que ele está lá, significando que os dados tem que chegar através de uma transação comum, enviado por alguém (ou algo), e incluído em um bloco da mesma forma que qualquer outra transação é.

## Push oracles: uma parte designada publica atualizações

O modelo dominante, e o único Chainlink (a rede de oráculo mais amplamente integrada) usa, tem uma rede descentralizada de operadores de nó independentes cada um obter um preço de várias fontes externas, em seguida, enviar que o preço on-chain através de transações ordinárias, agregada (normalmente uma mediana entre os nós de comunicação) em um único valor um contrato pode ler a partir de um **preços de alimentação** contrato. Atualizações acontecem em um cronograma, ou sempre que o preço se move além de algum limite desde a última atualização, não em cada bloco:

```typescript
// Reading Chainlink's ETH/USD price feed on mainnet.
import { createPublicClient, http } from "viem";
import { mainnet } from "viem/chains";

const client = createPublicClient({ chain: mainnet, transport: http() });

const chainlinkEthUsdFeed = "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419" as const;
const aggregatorAbi = [
  {
    name: "latestRoundData",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [
      { name: "roundId", type: "uint80" },
      { name: "answer", type: "int256" },
      { name: "startedAt", type: "uint256" },
      { name: "updatedAt", type: "uint256" },
      { name: "answeredInRound", type: "uint80" },
    ],
  },
] as const;

const [, answer, , updatedAt] = await client.readContract({
  address: chainlinkEthUsdFeed,
  abi: aggregatorAbi,
  functionName: "latestRoundData",
});

console.log("ETH/USD:", Number(answer) / 1e8); // Chainlink feeds use 8 decimals
console.log("last updated:", new Date(Number(updatedAt) * 1000));
```

Avaliação das garantias de um protocolo de empréstimo (ver [Garantia](./collateral.md)) normalmente lê diretamente de um feed como este em vez de calcular um preço em si.

## Oráculos TWAP: preço derivado do histórico comercial de uma AMM

A alternativa, usada quando um ativo não tem um feed Chainlink ou como uma salvaguarda adicional, deriva de um preço diretamente da história comercial de um AMM pool em vez de uma rede externa de repórteres. A **Preço médio ponderado em tempo (PCT)** média do preço de uma pool sobre alguma janela (frequentemente 30 minutos) em vez de ler o seu preço spot instantâneo, especificamente porque o preço spot instantâneo de uma pool AMM (ver [Fórmula constante do produto](./constant-product.md)) pode ser movido substancialmente dentro de uma única transação, exatamente o mecanismo [Manipulação do Oracle](../security/oracle-manipulation.md) explora quando um contrato confia ingenuamente em um preço pontual. A média sobre uma janela mais longa torna a manipulação muito mais cara, uma vez que um atacante precisaria manter um preço distorcido em muitos blocos, não apenas um, para mover significativamente a média.

## Conceitos errôneos comuns

**Um oráculo não é uma única parte confiável por padrão em um sistema bem projetado.** O preço do Chainlink alimenta relatórios agregados de muitos operadores de nó independentes especificamente para que nenhum repórter possa corromper o preço publicado; um design de oráculo ingênuo usando uma única fonte de dados reintroduz exatamente o tipo de dependência de confiança centralizada protocolos DeFi geralmente tentar minimizar.

**Ler diretamente o preço spot de uma pool AMM não é a mesma coisa que usar um oráculo TWAP**, apesar de ambos derivarem do mesmo pool subjacente. Um preço de ponto de leitura de contrato diretamente é exposto à manipulação de preço de transação única de uma forma que um TWAP devidamente janelado é projetado especificamente para resistir.

## Outras leituras

- [Documentação da ligação em cadeia: feeds de preço](https://docs.chain.link/data-feeds)
- [Uniswap v3: documentação do oráculo](https://docs.uniswap.org/contracts/v3/concepts/oracle)
- Ver também: [Garantia](./collateral.md), [Manipulação do Oracle](../security/oracle-manipulation.md)

---

[← Anterior: Empréstimos Flash](./flash-loans.md)
·
[Voltar para DeFi](./README.md)
·
[Próximo: Rendimento →](./yield.md)
