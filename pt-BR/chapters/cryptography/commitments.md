# Autorizações

Um esquema de compromisso permite-lhe bloquear um valor agora, provar mais tarde que você se comprometeu com ele, sem revelar o valor até que você escolher, e sem ser capaz de mudá-lo após o fato. Este é um primitivo mais geral do que poderia soar primeiro, e ele aparece, às vezes sem ser nomeado explicitamente, em todos os sistemas blockchain: uma raiz Merkle é um compromisso com um conjunto de transações, e várias técnicas de privacidade e escala em capítulos posteriores dependem da mesma ideia subjacente aplicada a valores individuais.

## O problema

Imagine duas partes que querem jogar uma moeda na internet, sem confiar no outro. Se Alice anunciar "cabeças" antes de Bob anunciar seu próprio palpite, Bob pode simplesmente dizer o que ganhar. Se Bob anunciar primeiro, o mesmo problema se aplica ao contrário. Nenhuma das partes pode revelar com segurança a sua escolha primeiro sem dar ao outro uma vantagem. Este é um problema geral. **Como você se compromete com uma escolha escondida de uma forma que o outro partido pode confiar que você não vai mudar secretamente mais tarde, sem revelar a escolha imediatamente?**

## Como funciona

Um regime de compromisso tem duas fases e duas propriedades necessárias:

1. **Enviar**: a parte responsável produz um compromisso `C = commit(value, randomness)` e acções `C`, tipicamente combinando o valor com um "fator cego" aleatório e hashthing o resultado, usando uma construção como `C = H(value || randomness)`.
2. **Revelar**: mais tarde, a parte comprometedora divulga ambos `value` e `randomness`, e qualquer um pode verificar isso `H(value || randomness) = C` para confirmar o valor revelado corresponde ao que foi originalmente cometido.

As duas propriedades exigidas, ambas seguem diretamente das propriedades da função de hash subjacente (ver [Funções do Hash](./hashes.md)):

- **Escondendo**: a autorização `C` Não revela nada sobre `value` antes da fase de revelação. Isto depende da resistência da pré-imagem da função hash (ver [Resistência à Preimagem](./preimage-resistance.md)) e em incluir o fator de cegamento aleatório, uma vez que sem ele, um atacante com um pequeno número de palpites (como "cabeças" ou "caudas") poderia simplesmente hash cada valor possível e comparar contra `C` diretamente.
- **Encadernação**: uma vez `C` é publicado, a parte comprometedora não pode encontrar um diferente `(value', randomness')` par que também hashes para `C`. Isto depende da resistência de colisão da função hash (ver [Colisões de Hash](./collisions.md)).

## Exemplo: um flip de moeda verificável

```typescript
import { createHash, randomBytes } from "node:crypto";

function sha256(data: Buffer): Buffer {
  return createHash("sha256").update(data).digest();
}

function commit(value: string): { commitment: string; randomness: string } {
  const randomness = randomBytes(32).toString("hex");
  const commitment = sha256(Buffer.from(value + randomness)).toString("hex");
  return { commitment, randomness };
}

function verify(value: string, randomness: string, commitment: string): boolean {
  return sha256(Buffer.from(value + randomness)).toString("hex") === commitment;
}

// Alice commits to her guess without revealing it
const alice = commit("heads");
console.log("Alice publishes commitment:", alice.commitment);
// Bob now announces his own guess in the open, since Alice's is already locked in and hidden
console.log("Bob announces:", "tails");

// Later, Alice reveals
console.log("Alice reveals: heads, randomness =", alice.randomness);
console.log("Commitment checks out:", verify("heads", alice.randomness, alice.commitment));
console.log("Alice cannot claim she said 'tails':", verify("tails", alice.randomness, alice.commitment));
```

Este código foi executado e verificado diretamente. Porque... `commit()` usa aleatoriedade fresca cada vez, o hash de compromisso exato difere em cada corrida, mas o comportamento é consistente: `verify("heads", alice.randomness, alice.commitment)` retorna sempre `true`, e `verify("tails", alice.randomness, alice.commitment)` retorna sempre `false`, Alice não pode reinterpretar seu compromisso como um valor diferente depois do fato, e ninguém vendo apenas o compromisso publicado poderia dizer que era "cabeças" em vez de "caudas" antes de ela revelar sua aleatoriedade.

## Onde isto aparece neste livro

- **Raízes de merkle** (ver [Merkle Trees](./merkle-trees.md)) são compromissos para um conjunto de dados inteiro, o root não esconde nada intencionalmente (dados de bloco é público), mas a mesma lógica oculta / vinculante subjacente porque uma root não pode ser forjada para corresponder a uma transação diferente definida após o fato.
- **Contratos temporários (HTLC)**, utilizado em toda a [Lightning Network](../lightning/htlcs.md), use um compromisso (um hash de um segredo "preimage") para ligar o lançamento de um pagamento através de múltiplos saltos à revelação desse segredo compartilhado.
- **Transações confidenciais e protocolos de privacidade**, discutido em [Privacidade](../society/privacy.md), estender os compromissos simples baseados em hash em construções criptográficas mais avançadas (compromissos Pedersen e similares) que podem esconder a quantidade de um valor, enquanto ainda permitindo que a rede verifique que entradas e saídas se equilibram corretamente, sem revelar os números reais, uma aplicação mais avançada da mesma ideia oculta / vinculativa, coberta a um nível introdutório em [Provas de Conhecimento Zero](./zero-knowledge.md).

## Comércio

Um compromisso baseado em hash simples (como no exemplo acima) é fácil de implementar e raciocinar sobre, mas não é, por si só, útil para esconder um valor de alguém capaz de adicioná-lo de um pequeno conjunto de possibilidades (os dois resultados de uma moeda flip, por exemplo) sem o fator de cegamento aleatório adicionado, um detalhe fácil de omitir por engano, e fazê-lo silenciosamente quebra a propriedade oculta ao olhar idêntico em código. Esquemas de compromisso mais avançados (compromissos de Petersen, utilizados em vários protocolos centrados na privacidade e de escala) oferecem propriedades adicionais, tais como **Aditivamente homomórfico** (deixando você verificar que um conjunto de valores comprometidos soma corretamente sem revelar qualquer valor individual) ao custo de matemática subjacente mais complexa do que um simples hash.

## Conceitos errôneos comuns

**Um compromisso não é o mesmo que criptografia.** Um compromisso é especificamente concebido para *aberto* revelando o valor e a aleatoriedade originais para qualquer pessoa verificar. Não se destina a manter algo em segredo indefinidamente, somente até a fase de revelação que o protocolo define.

**Omitir o fator cego aleatório não apenas enfraquece um esquema de compromisso ligeiramente. Pode quebrar completamente a propriedade escondida.** para qualquer valor extraído de um conjunto pequeno ou adivinho, uma vez que um observador pode simplesmente hash cada valor candidato e comparar com o compromisso publicado.

## Outras leituras

- [Whitepaper Bitcoin, Seção 7](https://bitcoin.org/bitcoin.pdf): Merkle trees como uma forma de compromisso, em seu contexto original
- [Pedersen, T. (1991). Compartilhamento secreto verificável seguro não interativo e teórico-da informação](https://link.springer.com/chapter/10.1007/3-540-46766-1_9): o documento de compromisso original Pedersen

---

[← Anterior: Provas Merkle](./merkle-proofs.md)
·
[Voltar à Criptografia](./README.md)
·
[Próximo: Provas de Conhecimento Zero →](./zero-knowledge.md)
