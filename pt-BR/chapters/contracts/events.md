# Eventos e Registros

Eventos são como um contrato se comunica com o mundo exterior *após* uma transação completa, não retornando um valor (que apenas o chamador imediato vê), mas escrevendo um registro nos logs do bloco, que qualquer aplicativo off-chain pode assistir e consultar mais tarde. Este capítulo cobre como eles são declarados, o que realmente é armazenado, e porque eles são dramaticamente mais baratos do que o armazenamento de dados que não precisa ser lido de volta on-chain.

## Declaração e emissão

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract EventDemo {
    event Transfer(address indexed from, address indexed to, uint256 value);

    function send(address to, uint256 value) external {
        emit Transfer(msg.sender, to, value);
    }
}
```

Verificado: isto compila de forma limpa com solc 0.8.26, e a saída do ABI lista corretamente `Transfer` como um evento com `from` e `to` marcado `indexed`.

## Onde os logs realmente vivem

Recordar de [Blocos Ethereum](../ethereum/blocks.md#campos-de-cabeçalho-para-além-do-que-o-cabeçalho-do-bitcoin-carrega) que os registros emitidos estão autorizados a `receiptsRoot`, não `stateRoot`. Os registros são **não** armazenamento de contrato, e um contrato não pode ler seus próprios ou eventos emitidos de qualquer outro contrato passado de dentro do EVM em tudo. Os eventos existem puramente para o consumo fora da cadeia: uma aplicação de frontend, um indexador (ver [Indexação de eventos](../web3/event-indexing.md)), ou um explorador bloco observa e consulta-los através `eth_getLogs` (ver [JSON- RPC](../ethereum/json-rpc.md#alguns-dos-métodos-mais-utilizados)), totalmente fora da execução do próprio EVM.

## parâmetros indexados

Marcando um parâmetro `indexed` (até três por evento) torna-o pesquisável como filtro. Uma consulta off-chain pode pedir "cada `Transfer` evento onde `to` igual a este endereço específico" eficientemente, porque os parâmetros indexados são armazenados em uma parte separada da estrutura de log (chamada **tópicos**) especificamente projetado para este tipo de pesquisa filtrada, em vez de exigir uma consulta para buscar e inspecionar manualmente todos os dados completos de cada registro. Parâmetros não indexados ainda estão totalmente registrados (no log's `data` campo) e ainda legível por qualquer pessoa consultando o evento, apenas não filtrado eficientemente pelo seu valor específico da forma como os indexados são.

## Por que os eventos são dramaticamente mais baratos do que o armazenamento

Isto liga-se diretamente à diferença real, medida do custo do gás demonstrada em [Armazenamento](../evm/storage.md#exemplo-um-valor-que-sobrevive-verificado-com-execução-real): a `SSTORE` custa até 20.000 gás para uma escrita fresca, não-zero, enquanto `LOG` opcode (o mecanismo subjacente por trás `emit`) custa um valor relativamente modesto, principalmente proporcional ao tamanho, porque os logs nunca são lidos de volta pelo próprio EVM e nunca contribuem para o [trie de estado](../ethereum/state-trie.md) que cada nó deve manter indo para frente, apenas para os recibos do bloco (ainda permanentemente retidos, mas de forma diferente estruturada). É precisamente por isso que os logs de eventos, não o armazenamento de contratos, são a maneira padrão de registrar uma trilha histórica completa (cada transferência que já aconteceu com um token, por exemplo), armazenar esse histórico completo diretamente no armazenamento de contratos seria tanto mais caro quanto, dado que os mapeamentos não têm enumeração nativa (ver [Mapeamentos](./mappings.md#o-que-os-mapeamentos-não-podem-fazer)), estranho para consultar de qualquer maneira.

## Conceitos errôneos comuns

**Um contrato não pode ler eventos ou qualquer outro contrato previamente emitido**. Esta é uma limitação dura, de nível de protocolo, não uma restrição de Solidity que poderia ser trabalhada com sintaxe diferente; qualquer coisa que a própria lógica de um contrato precisa reagir mais tarde deve ser armazenada em real [armazenamento](../evm/storage.md), não deixado em um log de evento.

**Eventos não são grátis, mesmo que eles são muito mais baratos do que armazenamento**, a `LOG` as escalas de custos do opcode com a quantidade de dados registrados e o número de tópicos indexados, o que significa que um evento com muitos campos ou volume excessivo de emissão por transação ainda representa uma despesa de gás real, mensurável, apenas substancialmente menor do que os dados equivalentes escritos para armazenamento.

## Outras leituras

- [Documentação de solidez: Eventos](https://docs.soliditylang.org/en/latest/contracts.html#events)
- [Ethereum JSON- RPC: eth  getLogs](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getlogs)

---

[← Anterior: Mapeamentos](./mappings.md)
·
[Voltar aos contratos inteligentes](./README.md)
·
[Próximo: Modificadores →](./modifiers.md)
