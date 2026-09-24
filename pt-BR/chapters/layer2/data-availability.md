# Disponibilidade de Dados

A disponibilidade de dados é a garantia de que os dados brutos por trás das transações de um rollup são realmente, verificávelmente publicados em algum lugar qualquer um pode recuperá-lo, não apenas referenciado ou resumido. Este capítulo cobre por que esta propriedade específica, distinta da própria correção, é do que depende todo o modelo de segurança de um rollup.

## Por que a disponibilidade é uma preocupação separada da correção

Uma prova de validade (ver [Provas de Validade](./validity-proofs.md)) ou uma janela à prova de fraude (ver [Provas de Fraude](./fraud-proofs.md)) diz que uma transição de estado foi calculada corretamente, dado algum lote de dados de transação. Nenhum deles, por si só, diz-lhe que os dados foram realmente disponibilizados para que alguém verificasse. Um operador de liquidação poderia, em princípio, publicar apenas um compromisso (um hash) com os dados de um lote, provar ou alegar que a execução do lote estava correta e simplesmente reter os dados subjacentes. Ninguém pôde verificar a reivindicação de forma independente, reconstruir o estado do rollup a partir do zero, ou, criticamente, sair do rollup com seu próprio equilíbrio correto se o operador mais tarde desaparece ou age maliciosamente, porque as informações necessárias para fazer nada disso nunca foi realmente publicado. Este modo de falha específico é chamado de **problema de disponibilidade de dados**, e é exatamente por isso que "publica dados para L1" é a propriedade definidora de um rollup, não um detalhe incidental.

## O que "publicar para L1" realmente garante

Quando um rollup publica seus dados em lote para Ethereum L1, esses dados tornam-se parte do próprio histórico de consenso verificado por Ethereum: cada nó Ethereum que processa esse bloco tem acesso a ele, pelo menos por algum período de retenção, o que significa que os dados genuinamente foram disponibilizados no momento da publicação, verificável, sem confiar na palavra do operador de rollup para ele. É por isso que os rollups herdam especificamente segurança significativamente forte de Ethereum: não só porque Ethereum é a camada de liquidação que verifica a exatidão, mas porque Ethereum é também onde os dados subjacentes realmente se torna público, deixando qualquer um reconstruir o estado do rollup independentemente se eles alguma vez precisaram.

## Por que a disponibilidade de dados costumava ser cara, e o que mudou

Antes da atualização da Dencun da Ethereum em março de 2024, as rollups publicaram seus dados de lote como calldata comum da Ethereum, um campo de transação de propósito geral que tinha que competir por espaço e preços com todos os outros tipos de transação da Ethereum, e que cada nó completo mantém permanentemente como parte do histórico regular da Ethereum. Isso tornou a disponibilidade de dados o componente de maior custo único para a maioria dos rollups. EIP-4844 introduziu um tipo de dados dedicado, com preços separados, blobs (coberto totalmente em [Blobs](./blobs.md) e [EIP-4844](./eip-4844.md)), especificamente projetado para ser barato, abundante, e apenas temporariamente retido, uma vez que os dados de rollup só precisa estar disponível tempo suficiente para quem quiser verificar ou contestar para realmente fazê-lo, não permanentemente, a maneira como Ethereum próprio histórico de transação é.

## Conceitos errôneos comuns

**A disponibilidade de dados não é a mesma garantia que a exatidão dos dados.** Um rollup pode disponibilizar dados totalmente disponíveis que acabam por descrever uma transição de estado inválida; disponibilidade e correção são aplicadas separadamente, por diferentes mecanismos (publicação para L1, e provas de fraude ou validade, respectivamente), e ambos são necessários juntos para que o modelo de segurança completo de um rollup seja mantido.

**Uma sidechain que publique apenas ocasionalmente um ponto de controle de raiz do estado para L1, sem os dados subjacentes da transação, não tem a mesma disponibilidade de dados que garante que uma rolagem genuína tenha.** Sem os dados subjacentes, ninguém fora dos próprios operadores do sidechain pode verificar como essa raiz de estado foi realmente alcançada, que é precisamente a distinção [L1 vs. L2](./l1-vs-l2.md#nem-todos-os-l2-herdam-segurança-da-mesma-forma) desenha entre um rollup e outros desenhos L2.

## Outras leituras

- [Ethereum.org: disponibilidade de dados](https://ethereum.org/en/developers/docs/data-availability/)
- Ver também: [Rollups](./rollups.md), [Blobs](./blobs.md), [EIP-4844](./eip-4844.md)

---

[← Anterior: Sequenciadores](./sequencers.md)
·
[Voltar à Camada 2](./README.md)
·
[Próximo: Blobs →](./blobs.md)
