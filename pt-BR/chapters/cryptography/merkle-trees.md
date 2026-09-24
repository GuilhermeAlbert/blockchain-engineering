# Merkle Trees

Uma árvore Merkle (nomeada depois de Ralph Merkle, que patenteou a estrutura em 1979) é uma forma de resumir um grande conjunto de itens de dados em um único hash pequeno, de modo que qualquer inclusão de um único item no conjunto pode ser comprovada com uma pequena quantidade de dados adicionais, sem precisar de todo o conjunto. Bitcoin usa uma árvore Merkle para resumir as transações de cada bloco em um valor de 32-byte, a raiz Merkle, armazenada no cabeçalho do bloco. Este capítulo constrói um do zero; o próximo capítulo, [Provas de Merkle](./merkle-proofs.md), abrange a prova da adesão individual.

## O problema

Um bloco Bitcoin pode conter milhares de transações. Se um cabeçalho de bloco necessário para incluir diretamente cada transação para provar o que o bloco contém, os cabeçalhos seriam enormes, e um [cliente leve](../bitcoin/light-clients.md) (uma carteira leve que não baixa o blockchain completo) precisaria de todo o conjunto de transações apenas para verificar se uma transação de juros foi incluída em um bloco. Juntar todas as transações num único hash (um único `H(tx1 || tx2 || ... || txN)`) produziria um resumo pequeno, de tamanho fixo, mas tem o mesmo problema: provar qualquer transação é parte desse hash ainda requer ter qualquer outra transação para recomputá-lo. Uma árvore Merkle resolve ambos os problemas ao mesmo tempo: um pequeno hash de raiz de tamanho fixo, e provas pequenas e eficientes de adesão individual.

## Como funciona

Compilar a árvore de baixo para cima:

1. **Hash cada item de dados (folha) individualmente.** Para Bitcoin, cada folha é o hash de uma transação.
2. **Emparelhar hashes de folhas adjacentes e hash cada par juntos**, produzindo um hash pai por par. Se houver um número ímpar de itens em um nível, o último é emparelhado com si mesmo (convenção específica de Bitcoin, descrita no [Fonte do núcleo do Bitcoin](https://github.com/bitcoin/bitcoin)), um detalhe que vale a pena nomear porque diferentes implementações Merkle árvore lidar com o caso odd-leaf de forma diferente, e obtê-lo errado produz uma raiz que não coincide com outras implementações.
3. **Repetir**, hashing pares de hashes do novo nível juntos, até que apenas um hash permanece: **Raízes de merkle**.

```text
Level 2 (root):              fc388a91...
                             /          \
Level 1:              8e4e9385...      70f239cb...
                      /        \       /        \
Level 0 (leaves): H(tx1)     H(tx2)  H(tx3)     H(tx4)
                     │           │      │           │
                    tx1         tx2    tx3         tx4
```

## Exemplo: building um, verificado fim a fim

```typescript
import { createHash } from "node:crypto";

function sha256(data: Buffer): Buffer {
  return createHash("sha256").update(data).digest();
}

function buildMerkleTree(leaves: string[]): Buffer[][] {
  let level = leaves.map((leaf) => sha256(Buffer.from(leaf)));
  const levels: Buffer[][] = [level];
  while (level.length > 1) {
    const next: Buffer[] = [];
    for (let i = 0; i < level.length; i += 2) {
      const left = level[i];
      const right = i + 1 < level.length ? level[i + 1] : level[i]; // duplicate last if odd
      next.push(sha256(Buffer.concat([left, right])));
    }
    level = next;
    levels.push(level);
  }
  return levels;
}

const transactions = [
  "tx1: Alice pays Bob 1 BTC",
  "tx2: Bob pays Carol 0.5 BTC",
  "tx3: Carol pays Dave 0.2 BTC",
  "tx4: Dave pays Alice 0.1 BTC",
];

const levels = buildMerkleTree(transactions);
console.log("Merkle root:", levels[levels.length - 1][0].toString("hex"));
```

Resultado verificado da execução deste código exato:

```text
Level 0 (leaves, 4 hashes):
  tx1 → f5313c6b2e182ae19bf51aa5429560e324e7a17e3c486997afef7c9e47d20734
  tx2 → a57c4412c96e96f2ef4dd45359c3eda660da18c4511138e7fb9e9440ba60092a
  tx3 → 2172cc90f79cee70b3cc91ccfb53be868a300d92a8aeea10a18623b9035a8505
  tx4 → 26fcf3bcb0d488fc5be1ad65389420c31c894b0705c592d1b2dcbc6001e61b97

Level 1 (2 hashes):
  8e4e9385f04d619560996d38aabc81618c7b70ee60b1156f4864d4537047b788
  70f239cb90cfbb78007febcacf938225859e8c4bc924c4ea04c5e8d90d8c84a4

Merkle root: fc388a918a6360ad4ec764159c5b44ff954aea5d722a53ea9b611681aba1ae2c
```

Mude um único caracter em qualquer transação (mesmo que apenas o valor) e a raiz muda completamente e imprevisivelmente (o efeito avalanche descrito em [Funções do Hash](./hashes.md)), que é exatamente a propriedade de adulteração-evidência em que um cabeçalho de bloco depende: uma única transação alterada em qualquer lugar em um bloco altera a raiz armazenada no cabeçalho desse bloco, que altera o próprio hash do bloco, que quebra o link para cada bloco subsequente (ver [Hashes e Block Linking](../blockchain/block-linking.md)).

## Sob o capô: Construção específica do Bitcoin

Merkle árvore do Bitcoin, como implementado no Bitcoin Core, usa **SHA-256d** (duplo SHA-256, ver [SHA-256](./sha-256.md#sha-256d-escolha-real-do-bitcoin)) em todos os níveis, não SHA-256 como no exemplo simplificado acima. Também tem uma peculiaridade histórica documentada que vale a pena saber: a regra "duplicar o último nó se estranho" foi o assunto de uma vulnerabilidade real, **CVE-2012-2459**. Porque um nível de tamanho ímpar duplica seu último hash antes de emparelhar, uma lista de transações como `[1,2,3,4,5,6]` e uma lista diferente, mais longa `[1,2,3,4,5,6,5,6]` (que duplica o último par) pode produzir o *idêntico* Raíz Merkle. Isso permitiu que um nó fosse enviado um bloco contendo uma lista de transações duplicadas que hashed para a mesma raiz, e o mesmo hash de bloco, como o bloco legítimo. Uma negação de serviço de processamento de bloco que poderia causar um nó afetado para parar em um fork inválido em vez de um roubo de fundos. O bug foi corrigido adicionando uma verificação explícita para transações duplicadas durante a validação do bloco. Esta é uma boa ilustração concreta de uma lição mais ampla: mesmo uma estrutura criptográfica conceitualmente simples como uma árvore Merkle pode ter casos de borda sutis e exploráveis em seus detalhes precisos de implementação, razão pela qual usar código bem revisto e testado para a lógica consenso-crítica importa mais do que a elegância da ideia subjacente.

## Comércio

Uma árvore Merkle negocia uma pequena quantidade de computação extra hashing (construindo a árvore) e uma pequena quantidade de dados extras (necessários para provas, cobertos em seguida) para uma redução dramática no que um verificador precisa baixar e verificar para confirmar a inclusão de um único item, de todo o conjunto de dados para um punhado de hashes, crescendo apenas logaritmicamente (como `log2(N)`) com o número total de itens, em vez de linearmente.

## Conceitos errôneos comuns

**Uma raiz Merkle não permite que você reconstrua os dados subjacentes.** É um resumo unidirecional (considerando na resistência da pré-imagem da função hash, veja [Resistência à Preimagem](./preimage-resistance.md)), sabendo que a raiz não lhe diz nada sobre as transações individuais a menos que alguém separadamente fornece-los.

**Construir uma árvore Merkle não é o mesmo que criptografar os dados que resume.** Cada transação em um bloco Bitcoin permanece totalmente visível no bloco em si; o Merkle root no cabeçalho é uma impressão digital compacta e evidente desses dados já públicos, não uma forma de escondê-lo.

## Experimenta tu mesmo.

Execute o código acima e modifique um caractere em `transactions[1]` e repetir. Confirme as alterações de raiz completamente. Em seguida, tente construir a árvore com um número ímpar de transações (três ou cinco) e confirme que a regra "duplicar a última folha" ainda produz uma única raiz.

## Outras leituras

- [Whitepaper Bitcoin, Seção 7 (Recuperando o Espaço em Disco)](https://bitcoin.org/bitcoin.pdf): Merkle árvores em seu contexto Bitcoin original
- [A dissertação original de Ralph Merkle 1979, "Secrecy, Authentication, and Public Key Systems"](https://www.merkle.com/papers/Thesis1979.pdf)
- [CVE-2012-2459](https://nvd.nist.gov/vuln/detail/CVE-2012-2459): a vulnerabilidade documentada de duplicação de árvores Bitcoin Merkle

---

[← Anterior: Assinaturas Schnorr](./schnorr.md)
·
[Voltar à Criptografia](./README.md)
·
[Próximo: Provas Merkle →](./merkle-proofs.md)
