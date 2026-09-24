# Raízes de Merkle

Este capítulo é curto por design. O mecanismo em si está totalmente coberto [Merkle Trees](../cryptography/merkle-trees.md) e [Provas de Merkle](../cryptography/merkle-proofs.md). Aqui, o foco é mais estreito: exatamente que papel a raiz de Merkle desempenha dentro de um cabeçalho de bloco, e por que esse papel específico importa para a cadeia como um todo.

## O que a raiz do Merkle compromete

Cada cabeçalho de bloco contém um campo, o Merkle root, que resume cada transação nesse bloco em um único hash de 32-bytes (ver [Merkle Trees](../cryptography/merkle-trees.md) para exatamente como esse resumo é construído). Isto é... **autorização** no sentido preciso coberto em [Compromissos criptográficos](../cryptography/commitments.md): uma vez que um bloco é minado, sua raiz de Merkle fixa, permanentemente e de forma verificação, exatamente quais transações são incluídas e em que ordem. Ninguém mais tarde pode alegar que uma transação diferente era "realmente" parte desse bloco sem que a alegação fosse imediatamente detectável, porque produziria uma raiz diferente.

## Por que não apenas hash todas as transações junto diretamente?

Uma alternativa mais simples (que tem a concatenação de cada transação em um hash combinado, sem a estrutura da árvore) também produziria um pequeno compromisso de tamanho fixo com o conteúdo do bloco. A razão pela qual o Bitcoin usa uma árvore Merkle inteira, em vez disso, desce inteiramente para o que está coberto de [Provas de Merkle](../cryptography/merkle-proofs.md#o-problema): uma estrutura de árvore permite a qualquer um provar a inclusão de uma única transação usando apenas `log2(N)` irmão hashes, sem precisar de qualquer outra transação no bloco. Um hash simples e simples combinado não oferece tal atalho. Provar a inclusão de qualquer transação exigiria fornecer qualquer outra transação no bloco, derrotando o propósito de um cliente leve que especificamente quer evitar baixar blocos completos.

## Onde isso se conecta aos clientes leves

Esta é a ligação directa entre um detalhe de design de nível de bloco e a usabilidade do Bitcoin em dispositivos restritos: porque a raiz do Merkle está no cabeçalho 80-byte (ver [Cabeçalhos de Blocos](./block-headers.md)), a [cliente leve](../bitcoin/light-clients.md) que tem sincronizado apenas cabeçalhos ainda pode verificar (através de uma prova Merkle solicitado de um nó completo) que uma transação específica que se preocupa com foi verdadeiramente incluído em um bloco específico, sem nunca baixar outras transações desse bloco. O root do Merkle é o que torna isso possível; sem ele, a sincronização somente do cabeçalho não forneceria nenhuma maneira de verificar a inclusão individual da transação em tudo.

## Conceitos errôneos comuns

**A raiz Merkle de um bloco não revela quantas transações o bloco contém**, ou qualquer outra coisa sobre o seu conteúdo, por si só. É um hash de tamanho fixo, independentemente de o bloco ter uma transação ou milhares. Conhecer a contagem de transações e conteúdo requer baixar o bloco completo ou receber provas específicas da Merkle.

**A raiz de Merkle não é a mesma que o haxixe de bloco.** O hash de bloco é calculado sobre o *cabeçalho inteiro* (que inclui a raiz de Merkle como um dos vários campos, juntamente com o bloco anterior hash, timestamp, e assim por diante), a raiz de Merkle e o bloco hash são dois valores distintos servindo dois propósitos distintos, abrangidos respectivamente neste capítulo e no [Hashes e Block Linking](./block-linking.md).

## Outras leituras

- [Merkle Trees](../cryptography/merkle-trees.md) e [Provas de Merkle](../cryptography/merkle-proofs.md), o mecanismo completo, construído e verificado em código
- [Whitepaper Bitcoin, Seção 7 (Recuperando o Espaço em Disco)](https://bitcoin.org/bitcoin.pdf)

---

[← Anterior: Hashes e Block Linking](./block-linking.md)
·
[Voltar para Blockchain Fundamentos](./README.md)
·
[Próximo: Genesis Blocks →](./genesis-blocks.md)
