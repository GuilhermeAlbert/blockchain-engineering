# Indexação de eventos

[Eventos e Registros](../contracts/events.md) cobriu por que os contratos emitem eventos em vez de depender do armazenamento de registros históricos. Este capítulo abrange o lado da aplicação: consultando e decodificando esses eventos, verificados contra uma consulta real e real.

## Consultar os logs diretamente

```typescript
import { createPublicClient, http, parseAbiItem, formatUnits } from "viem";
import { mainnet } from "viem/chains";

const client = createPublicClient({ chain: mainnet, transport: http() });
const weth = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2" as const;

const latest = await client.getBlockNumber();

const logs = await client.getLogs({
  address: weth,
  event: parseAbiItem("event Transfer(address indexed from, address indexed to, uint256 value)"),
  fromBlock: latest - 5n,
  toBlock: latest,
});

console.log("number of Transfer events in the last 5 blocks:", logs.length);
if (logs.length > 0) {
  const first = logs[0];
  console.log("from:", first.args.from);
  console.log("to:", first.args.to);
  console.log("value:", formatUnits(first.args.value, 18));
}
```

Resultado verificado da execução deste código exato contra os dados da mainnet ao vivo:

```text
number of Transfer events in the last 5 blocks: 187
from: 0x000000000004444c5dc75cB358380D2e3dE08A90
to: 0x0000000aa232009084Bd71A5797d089AA4Edfad4
value: 0.796016784344761129
```

187 Transferências WETH em apenas cinco blocos (cerca de um minuto de tempo real), uma noção concreta de quanto volume de eventos brutos até mesmo um único contrato popular gera, e por que consultar logs de forma eficiente (usando [parâmetros indexados](../contracts/events.md#parâmetros-indexados) filtrar, como `parseAbiItem`'s `indexed` marcadores sobre `from`/`to` habilitar aqui) assuntos para qualquer aplicação tentando trabalhar com estes dados em escala.

## Por que aplicativos reais não consultam `eth_getLogs` ao vivo, em cada carga de página

Este exemplo consulta um intervalo estreito de cinco blocos diretamente, prático para uma pequena consulta, mas `eth_getLogs` tem limitações reais e comuns para consultas históricas mais amplas: muitos provedores de RPC cap o quão grande um intervalo de blocos ou quantos resultados uma única chamada pode retornar, e reconstruir um histórico completo (cada transferência que um endereço específico já fez, por exemplo) por consultar repetidamente intervalos estreitos é lento e ineficiente para qualquer coisa além de olhares ocasionais e pequenos. Esta é exatamente a lacuna dedicada **indexadores** (ver [Indexadores](../infrastructure/indexers.md) e [The Graph](../infrastructure/the-graph.md)) existem para fechar: um serviço que assiste continuamente para novos eventos, armazena-os em um banco de dados questionável eficientemente (em vez de exigir uma consulta blockchain fresca, potencialmente lenta cada vez), e expõe uma interface de consulta rápida, flexível, negociando acesso bruto, não indexado da camada RPC para consultabilidade pré-processada, construída com propósito.

## Tratamento de reorgs para dados indexados

Porque os troncos vêm de blocos minados, e os blocos minados podem (raramente, mas genuinamente) ser reorganizados antes da finalização (ver [Reorganizações da Cadeia](../blockchain/reorgs.md) e [Finalidade](../ethereum/finality.md)), qualquer evento de processamento de aplicativo ou indexador precisa de uma estratégia para isso: ou esperando por confirmações suficientes (ou finalidade real) antes de tratar um evento como permanente, ou implementando lógica para detectar e corrigir um reorg que invalida eventos previamente processados, uma consideração real, não opcional para indexar pipelines, [Manuseamento Reorg](../infrastructure/reorg-handling.md).

## Conceitos errôneos comuns

**Eventos emitidos por um contrato não são automaticamente empurrados para cada aplicativo de escuta**. Um aplicativo tem que pesquisar ativamente para eles (via `eth_getLogs`, uma assinatura WebSocket, ou um indexador de terceiros), não há nenhum mecanismo de notificação de push integrado no nível de protocolo base que atinge aplicações sem que eles polling ou subscrever através de algum mecanismo específico.

**Um grande `logs.length` a partir de uma consulta ampla não significa que uma aplicação deve sempre buscar e processar cada uma**, dependendo do caso de uso, filtrar mais precisamente (por parâmetros indexados, por um intervalo de blocos mais estreitos, ou por delegar para um indexador construído para o padrão específico de consulta) é geralmente a abordagem mais prática e escalável do que buscar tudo e filtrar o lado do cliente.

## Outras leituras

- [documentação do viem: getLogs](https://viem.sh/docs/actions/public/getLogs)
- [Ethereum JSON- RPC: eth  getLogs](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getlogs)

---

[← Anterior: Receitas de transação](./receipts.md)
·
[Voltar para Construindo Aplicações Web3](./README.md)
·
[Próximo: viem →](./viem.md)
