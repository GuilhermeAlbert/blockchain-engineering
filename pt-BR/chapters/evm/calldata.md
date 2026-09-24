# Dados de chamadas

Calldata são os dados de entrada anexados a uma chamada, o mesmo `data` campo introduzido em [Transações Ethereum](../ethereum/transactions.md#campos-principais) para uma transação de alto nível, e os dados de entrada equivalentes passaram [chamada de mensagem](./message-calls.md) entre contratos. Este capítulo cobre o que realmente contém e por que é tratado diferentemente da memória.

## O que os calldata realmente detém

Para uma chamada contratual ordinária, calldata é [Código ABI](../contracts/abi.md) dados: os primeiros 4 bytes identificam qual função está sendo chamada **seletor de funções**, derivado da assinatura da função. Ver [Seletores](../contracts/abi.md#selectores-de-funções)), seguido pelos argumentos codificados pelo ABI para essa função. A `CALLDATALOAD`, `CALLDATASIZE`, e `CALLDATACOPY` Os opcodes permitem que o código de execução leia estes dados. `CALLDATALOAD` lê uma palavra de 32-bytes começando em um determinado offset, `CALLDATACOPY` copia uma gama de bytes de chamadas para a memória para processamento posterior.

## Por que calldata é somente leitura e separado da memória

Calldata é explicitamente **somente leitura** da perspectiva do contrato de execução. Não há `CALLDATASTORE` opcode, porque calldata representa a entrada do chamador, corrigido no momento em que a chamada foi feita, não algo que o chamado deve ser capaz de mutar. Mantendo-a estruturalmente separada de [Memória](./memory.md) (em vez de simplesmente copiá-lo na memória automaticamente) também tem um verdadeiro benefício de eficiência de gás: um contrato que só precisa ler alguns campos específicos de uma grande carga útil calldata pode fazê-lo diretamente através `CALLDATALOAD` sem pagar o custo de expansão da memória de copiar toda a carga útil para a memória primeiro, a menos que realmente precise.

## Calldata custo de gás, e porque EIP-4844 blob preço importa aqui indiretamente

Calldata em si tem um custo real, direto do gás, historicamente maior por byte não-zero do que por byte zero, especificamente porque não-zero bytes foram julgados mais propensos a representar dados significativos, comprimíveis-ruimmente vale a pena preço superior (um detalhe mais tarde revisado por [EIP-2028](https://eips.ethereum.org/EIPS/eip-2028), que reduziu o custo não-zero-byte especificamente para tornar os casos de uso de dados pesados, incluindo rolups iniciais da camada 2 postando dados de transação via calldata, mais econômico). Esta é a ligação directa para [Camada 2](../layer2/README.md)Capítulos posteriores: antes [EIP-4844](../layer2/eip-4844.md) introduziu espaço blob dedicado, com preço separado, rollups postando seus dados de transação de volta para Ethereum para [disponibilidade de dados](../layer2/data-availability.md) não teve melhor opção do que pagar custos comuns de gás calldata para esses dados, uma despesa real e significativa do custo de gás calldata desta seção explica diretamente a origem de.

## Conceitos errôneos comuns

**Calldata não é livre apenas porque não é "armazenamento" no sentido de estado persistente**. Ele tem um custo de gás real, direto proporcional ao seu tamanho, que é exatamente por isso eficiente codificação ABI (embalando argumentos firmemente, evitando enchimento desnecessário) assuntos para o contrato consciente de gás e design dapp.

**Calldata não é a mesma coisa que os dados de um registro de eventos** (ver [Eventos e Registros](../contracts/events.md)). Calldata é o *entrada* para uma chamada, consumida durante a execução; logs são *saída*, emitido durante a execução e armazenado separadamente nas receitas do bloco (ver [Blocos Ethereum](../ethereum/blocks.md#campos-de-cabeçalho-para-além-do-que-o-cabeçalho-do-bitcoin-carrega)), para que os observadores externos consultem posteriormente.

## Outras leituras

- [Papel Amarelo Ethereum](https://ethereum.github.io/yellowpaper/paper.pdf): Apêndice H (Especificação da máquina virtual)
- [EIP-2028: Redução do custo do gás de dados de transação](https://eips.ethereum.org/EIPS/eip-2028)

---

[← Anterior: Armazenamento](./storage.md)
·
[Voltar ao EVM](./README.md)
·
[Próximo: Chamadas de mensagem →](./message-calls.md)
