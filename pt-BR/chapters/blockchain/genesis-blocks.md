# Blocos de Gênesis

Cada blockchain precisa de um ponto de partida sem antecessor. Este capítulo cobre o requisito estrutural geral e como ele é tratado como um problema de estrutura de dados; bloco de gênese específico, historicamente significativo de Bitcoin (seu conteúdo exato, mensagem incorporada, e o que é conhecido sobre sua criação) é coberto em profundidade em [O Bloco de Gênesis](../origins/genesis-block.md).

## O problema estrutural

[Hashes e Block Linking](./block-linking.md) estabelece que cada bloco referencia o hash do bloco antes dele. Isso cria uma pergunta óbvia para o primeiro bloco em qualquer cadeia: o que ele faz referência, dado que não há nada antes dele? Cada protocolo blockchain tem que definir, e código rígido, uma resposta específica.

## A solução geral

O primeiro bloco em uma cadeia (convencionalmente chamado **bloqueio de gênese**, em altura (ou número de bloco) 0) é definido diretamente no software do protocolo em vez de ser descoberto através do processo normal de extensão de uma cadeia existente. Seu campo "previous block hash" é convencionalmente definido para um valor fixo de placeholder, tipicamente todos os zeros, sinalizando explicitamente que não há antecessor. O software de cada nó inclui esse bloco de gênese exato, codificado, e o primeiro passo de validação de cada nó na inicialização está confirmando que seu próprio hash calculado desse bloco corresponde ao valor esperado, codificado, estabelecendo um ponto de partida inequívoco, compartilhado e universalmente acordado antes que qualquer outra validação possa prosseguir.

```text
Genesis Block (height 0)
  previousHash: 0000...0000   (placeholder — no real predecessor)
  hash: <computed from this block's own contents>
        │
        ▼
Block 1 (height 1)
  previousHash: <genesis block's hash>
        │
        ▼
Block 2 (height 2)
  previousHash: <Block 1's hash>
        │
       ...
```

## Por que esta é uma exceção necessária e deliberada à falta de confiança

Todos os outros blocos da cadeia são validados através do processo ordinário: verifique sua prova de trabalho, verifique suas transações, verifique-a corretamente referencia seu antecessor. O bloco de gênese não pode ser validado desta forma, porque não há antecessor para verificar e, na maioria dos projetos, nenhum requisito de prova de trabalho é mesmo significativamente aplicável para ele (não há nada para comparar sua dificuldade contra). Isso significa confiar no bloco de gênese é confiar na própria distribuição de software, uma pequena, específica e inevitável exceção ao princípio geral de que o projeto de Bitcoin de outra forma minimiza os requisitos de confiança. Na prática, essa confiança é bem ancorada: o bloco de gênese é público, imutável e idêntico em todas as cópias legítimas do software, então verificar se corresponde ao que o resto do mundo usa é simples e não requer nenhuma confiança contínua em qualquer partido em particular.

## Correntes diferentes, abordagens diferentes

Nem todos os blocos de gênese funcionam de forma idêntica. O bloco de gênese do Bitcoin contém uma transação de base de moeda com uma mensagem incorporada, legível pelo homem e uma recompensa inesgotável (ver [O Bloco de Gênesis](../origins/genesis-block.md) para os pormenores). O bloco de gênese de Ethereum define uma inicial **estado**, uma alocação inicial de saldos de éter para endereços específicos (em grande parte a partir da venda de tokens de 2014 que financiou o desenvolvimento de Ethereum), refletindo o modelo de conta de Ethereum (ver [Estado Ethereum](../ethereum/state.md)) em vez do modelo UTXO de Bitcoin. Um blockchain que mais tarde forks de uma cadeia existente (ver [Forks](../forks/README.md)) não recebe um novo bloco de gênese. Ele herda toda a história até o ponto do fork, incluindo o bloco de gênese original, e apenas diverge daquele ponto compartilhado para frente.

## Conceitos errôneos comuns

**O bloco de gênese de uma cadeia não necessariamente bloqueia "número 1".** Por convenção quase universal, é bloco (ou altura) 0, um detalhe importante ao escrever código que indexa em altura de bloco, uma vez que um erro off-by-one aqui é um erro comum e fácil.

**Genesis blocos em diferentes blockchains não são intercambiáveis ou comparáveis em qualquer sentido funcional**, cada um define as condições específicas de partida (fornecimento inicial, estado inicial, dados incorporados) para sua própria cadeia independente, e não há nenhuma relação protocolo-nível entre, digamos, bloco de gênese de Bitcoin e Ethereum.

## Outras leituras

- [O Bloco de Gênesis](../origins/genesis-block.md): Bloco de gênese específico de Bitcoin em detalhes históricos e técnicos completos

---

[← Anterior: Raízes de Merkle](./merkle-roots.md)
·
[Voltar para Blockchain Fundamentos](./README.md)
·
[Próximo: Altura do bloco →](./block-height.md)
