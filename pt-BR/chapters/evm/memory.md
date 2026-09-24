# Memória

A memória é o espaço de trabalho temporário, acessível por byte, usado e descartado dentro de uma única chamada, ao contrário do permanente [Armazenamento](./storage.md) Coberto a seguir. A `MSTORE` e a memória implícita lida em `RETURN` de [Bytecode](./bytecode.md#exemplo-um-contrato-completo-mínimo-byte-by-byte) memória já demonstrada diretamente; este capítulo abrange suas propriedades específicas.

## Estrutura

A memória EVM é um array linear, endereçável por byte, iniciando conceitualmente vazio e expandindo conforme necessário. `MSTORE` escreve uma palavra completa de 32-bytes em um determinado byte offset; `MSTORE8` escreve um único byte; `MLOAD` lê uma palavra de 32-byte começando em um determinado offset. Porque é endereçável por byte em vez de alinhado por palavras, offsets não precisam ser múltiplos de 32. `MSTORE` no offset 1 escreve bytes de 1 a 32, sobrepondo-se o que quer que estivesse em bytes 1-31 anteriormente, um detalhe que importa quando fortemente empacotando dados para eficiência de gás.

## A expansão da memória custa gás, e cresce quadricamente

Ao contrário do limite de 1024 itens fixo da pilha, a memória não tem limite superior rígido no protocolo em si, mas acessar a memória em um deslocamento mais alto do que os gatilhos usados anteriormente **expansão da memória**, e o custo do gás dessa expansão cresce **quadricaticamente**, não linearmente, com o tamanho total da memória (ver [Contabilidade de gás](./gas-accounting.md#expansão-da-memória-um-custo-específico-e-não-linear) para a fórmula exata). Este é um projeto anti-abuso deliberado: memória de custo linear tornaria barato, em relação ao seu impacto de recursos, para alocar enormes quantidades de memória; o custo quadrático torna o uso de memória muito grande desproporcional, deliberadamente caro, desencorajando exatamente o tipo de medição de padrão de exaustão de recursos de gás existe para prevenir (ver [Gás](../ethereum/gas.md#o-gás-problema-resolve)).

## Por que a memória está separada do armazenamento em tudo

Esta divisão existe pela mesma razão subjacente que um computador convencional separa RAM do disco: a maioria dos cálculos intermediários (construindo uma string, montando argumentos para uma chamada, espaço de arranhão temporário) não precisa persistir além da chamada atual, e usando memória mais barata, chamada-escopada para ele em vez do mais caro, permanentemente persistido [armazenamento](./storage.md) é uma redução directa e significativa dos custos do gás, `SSTORE`Custo do gás (ver [Contabilidade de gás](./gas-accounting.md)) é dramaticamente maior do que as operações de memória, especificamente porque o armazenamento escreve impor um fardo permanente e contínuo em cada nó completo que tem que continuar a armazenar esses dados indefinidamente, onde o custo da memória é pago uma vez e, em seguida, o espaço é recuperado inteiramente uma vez que a chamada termina.

## Conceitos errôneos comuns

**A memória não é compartilhada entre chamadas separadas, mesmo dentro da mesma transação**Cada chamada (incluindo uma chamada de um contrato para outro via [Chamadas de Mensagens](./message-calls.md)) obtém seu próprio espaço de memória fresco e vazio; passar dados entre chamadas requer que ele seja explicitamente incluído em [calldata](./calldata.md) ou devolver dados, não simplesmente deixados em uma região de memória compartilhada.

**A memória não é gratuita só porque é mais barato do que o armazenamento**. O custo de expansão quadrática significa uso de memória muito grande (carregando enormes arrays, por exemplo) pode se tornar uma despesa genuinamente significativa, deliberadamente desencorajada bem antes de quaisquer operações de armazenamento estão mesmo envolvidos.

## Outras leituras

- [Papel Amarelo Ethereum](https://ethereum.github.io/yellowpaper/paper.pdf): Apêndice H (Especificação da máquina virtual)

---

[← Anterior: Pilha](./stack.md)
·
[Voltar ao EVM](./README.md)
·
[Próximo: Armazenamento →](./storage.md)
