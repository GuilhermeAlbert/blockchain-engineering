# Escala de Bitcoin

A camada base do Bitcoin deliberadamente limita o espaço de bloqueio, uma escolha de design coberta [Tamanho do Bloco](./block-size.md) e defendida em [Debate sobre o Tamanho do Bloco](../forks/block-size-war.md)Esta seção abrange as duas grandes famílias de resposta: obter mais do espaço de bloco existente, e mover o volume de transação para fora da camada de base inteiramente, através de um espectro de sistemas com modelos de confiança verdadeiramente diferentes vale a pena distinguir cuidadosamente.

## O que você precisa saber primeiro

[Debate sobre o Tamanho do Bloco](../forks/block-size-war.md), [Multisig](../wallets/multisig.md), e [Taproot](../bitcoin/taproot.md), os sistemas nesta seção constroem diretamente sobre os três.

## Capítulos

### Obtendo mais da camada base

1. [Tamanho do Bloco](./block-size.md): o limite máximo de rendimento, e porque é uma troca deliberada, não um descuido
2. [SegWit como uma atualização de escala](./segwit.md): quanta capacidade ele realmente adicionou, isolado de sua correção maleabilidade
3. [Correcção de Transações](./batching.md): poupanças quantificadas de taxas resultantes da combinação de pagamentos

### Saindo da camada base

4. [Canais de pagamento](./payment-channels.md): o mecanismo geral bipartidário da Rede Lightning baseia-se

### Outras camadas e sistemas de Bitcoin

Apresentado em ordem de diminuir a minimização da confiança, preste atenção ao que assegura o peg ou a transferência em cada caso, não apenas o que o próprio mecanismo interno de cada sistema faz.

5. [Cadeias laterais](./sidechains.md): o padrão geral, e por que o mecanismo de peg é o que realmente importa
6. [Rede líquida](./liquid.md): uma cadeia lateral federada construída para a velocidade de liquidação institucional e privacidade
7. [Federações](./federations.md): o modelo de confiança generalizada, e onde mais se repete
8. [Cadeias Estatais](./statechains.md): transferência de propriedade off-chain UTXO, ea exclusão semi-confiante que depende
9. [RGB](./rgb.md): validação do lado do cliente, contrastado diretamente com como Ethereum contratos inteligentes funcionam
10. [Propostas de Rollup de Bitcoin](./rollups.md): BitVM, e por que rolagem genuína são mais difíceis de construir em Bitcoin do que Ethereum

## Próxima

Continuar a [Lightning Network](../lightning/README.md) para a rede completa, multi-hop construída sobre o mecanismo de canal de pagamento introduzido nesta seção.
