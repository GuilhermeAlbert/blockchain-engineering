# Provas de Merkle

Uma prova Merkle (também chamada de Branch Merkle ou caminho de autenticação) permite provar que um dado específico está incluído em uma árvore Merkle, dado apenas a raiz Merkle e um pequeno número de hashes irmãos, sem precisar do resto do conjunto de dados. Este é o mecanismo que faz [Verificação simplificada do pagamento](../bitcoin/light-clients.md) possível: uma carteira Bitcoin leve pode confirmar que uma transação específica é incluída em um bloco específico baixando apenas o cabeçalho do bloco (80 bytes) e uma prova curta, em vez de todo o bloco.

## O problema

Tendo construído uma [Merkle tree](./merkle-trees.md) e computou sua raiz, a pergunta seguinte natural é: como alguém que só tem a raiz (não o conjunto de dados completo) verifica que um item específico foi realmente incluído? Recomputar toda a árvore do zero requer cada folha, derrotando o propósito de um resumo compacto. Uma prova de Merkle resolve isso com um pedaço muito menor de dados: apenas o hash irmão em cada nível da árvore ao longo do caminho de sua folha específica até a raiz.

## Como funciona

Para provar a inclusão de uma folha, forneça:

1. O hash próprio da folha (ou os dados originais, se o verificador é esperado para hash ele próprio).
2. Em cada nível da árvore, o **hash irmão** precisava recomputar o pai, não os filhos do próprio irmão, apenas o seu haxixe.
3. Um indicador esquerdo/direita em cada nível, assim que o verificador sabe se concatenar o irmão antes ou depois do hash em execução.

O verificador recompõe o caminho da folha para a raiz usando apenas estes hashes irmãos, e verifica se o resultado final corresponde ao conhecido, confiável Merkle root.

```text
                    Root
                   /    \
                  H12    H34   ← for proving tx1: need H(tx2) and H34
                 /  \    /  \
              H(tx1) H(tx2) H(tx3) H(tx4)
                │
              tx1  ← the leaf being proven

Proof for tx1 = [ H(tx2) (sibling, on the right), H34 (sibling, on the right) ]
Verifier computes:
  step 1: H12' = SHA256( H(tx1) || H(tx2) )   ← should equal H12
  step 2: Root' = SHA256( H12' || H34 )        ← should equal Root
  if Root' == Root, tx1 is proven included
```

Observe o tamanho da prova: para uma árvore com `N` folhas, uma prova requer exatamente `log2(N)` irmão hashes, para um bloco com 2.048 transações, que são apenas 11 hashes (352 bytes), independentemente do tamanho dos dados do bloco completo realmente é. Esta escala logarítmica é todo o valor prático da estrutura.

## Exemplo: construir e verificar uma prova, verificada do fim ao fim

Continuando diretamente da árvore construída [Merkle Trees](./merkle-trees.md):

```typescript
import { createHash } from "node:crypto";

function sha256(data: Buffer): Buffer {
  return createHash("sha256").update(data).digest();
}

interface ProofStep {
  hash: Buffer;
  isRight: boolean; // true if the sibling goes on the right during concatenation
}

function buildProof(levels: Buffer[][], leafIndex: number): ProofStep[] {
  const proof: ProofStep[] = [];
  let idx = leafIndex;
  for (let level = 0; level < levels.length - 1; level++) {
    const currentLevel = levels[level];
    const isRightNode = idx % 2 === 1;
    const siblingIndex = isRightNode ? idx - 1 : idx + 1;
    const sibling = siblingIndex < currentLevel.length ? currentLevel[siblingIndex] : currentLevel[idx];
    proof.push({ hash: sibling, isRight: !isRightNode });
    idx = Math.floor(idx / 2);
  }
  return proof;
}

function verifyProof(leaf: string, proof: ProofStep[], root: Buffer): boolean {
  let computed = sha256(Buffer.from(leaf));
  for (const step of proof) {
    computed = step.isRight
      ? sha256(Buffer.concat([computed, step.hash]))
      : sha256(Buffer.concat([step.hash, computed]));
  }
  return computed.equals(root);
}

// Using the same four-transaction tree from the previous chapter:
// const levels = buildMerkleTree(transactions);
const proof = buildProof(levels, 0); // prove transactions[0] ("tx1: Alice pays Bob 1 BTC")
const root = levels[levels.length - 1][0];

console.log("Proof verifies for the real transaction:", verifyProof(transactions[0], proof, root));
console.log("Proof fails for a tampered transaction:  ", verifyProof("tx1: Alice pays Bob 100 BTC", proof, root));
```

Resultado verificado da execução deste código exato (continuando a árvore de [Merkle Trees](./merkle-trees.md)):

```text
Proof verifies for the real transaction: true
Proof fails for a tampered transaction:   false
```

Observe precisamente o que isso demonstra e o que faz *não*: a prova confirma que `"tx1: Alice pays Bob 1 BTC"` é incluído sob a raiz conhecida. Ele não diz nada sobre se essa transação é válida de outra forma (assinado corretamente, gastando fundos reais, e assim por diante). Uma prova Merkle só prova **inclusão**, nunca corrigir. Validar a legitimidade real de uma transação é um processo separado, coberto em [Nós Completos](../bitcoin/full-nodes.md), e é precisamente o processo que um cliente leve usando apenas provas Merkle faz *não* executar, que é o tradeoff núcleo abaixo.

## Comércio

Merkle proofs permite que um cliente leve verifique a inclusão em um bloco específico usando uma pequena fração dos dados que um nó completo precisa, que é toda a proposição de valor de carteiras SPV (ver [Clientes leves](../bitcoin/light-clients.md)). O custo, declarado explicitamente em [Seção 8 do whitepaper Bitcoin](../origins/bitcoin-whitepaper.md#8-verificação-de-pagamento-simplificada-spv), é que isso só prova que uma transação é *incluído em um bloco que algumas reivindicações de nó faz parte da cadeia*Não verifica de forma independente que as transações do bloco são realmente válidas, ou que a cadeia que o cliente está sendo mostrado é realmente a cadeia honesta, mais longa do que uma fabricada por um atacante com recursos suficientes para enganar brevemente um cliente leve. Um nó completo verifica a inclusão e a correção; um cliente leve usando apenas as provas da Merkle verifica a inclusão e confia que a maioria da rede a que está conectado está se comportando honestamente.

## Conceitos errôneos comuns

**Uma prova Merkle não requer confiar no partido que a fornece, para a alegação específica que faz.** Como o verificador recomputa o caminho e verifica-o contra uma raiz independentemente conhecida, um provador desonesto não pode fabricar uma prova falsa de inclusão. Eles só podem deixar de produzir um válido para algo que não foi realmente incluído. O que ainda deve ser confiável é a própria raiz (ou seja, que veio de um cabeçalho de bloco legítimo na cadeia honesta). O mecanismo de prova em si não é confiável, mas de onde a raiz vem não é automaticamente verificado pela prova.

**Uma prova curta de Merkle não é evidência de que o bloco ou corrente que referencia é legítimo.** Só prova consistência interna (esta folha pertence a esta raiz), veja [Comércio](#comércio) acima.

## Experimenta tu mesmo.

Estender o código de [Merkle Trees](./merkle-trees.md) com as funções de prova acima. Compila provas para cada uma das quatro transações por sua vez e confirma cada uma verifica contra a mesma raiz. Em seguida, tente adulterar um hash irmão dentro de uma prova (flip um caractere hex) e confirmar a verificação corretamente falha.

## Outras leituras

- [Whitepaper Bitcoin, Seção 8 (Verificação de pagamento simplificado)](https://bitcoin.org/bitcoin.pdf)
- [A dissertação original de Ralph Merkle 1979](https://www.merkle.com/papers/Thesis1979.pdf)

---

[← Anterior: Merkle Trees](./merkle-trees.md)
·
[Voltar à Criptografia](./README.md)
·
[Próximo: Compromissos →](./commitments.md)
