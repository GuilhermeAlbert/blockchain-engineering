# Trie Estado

Ethereum não armazena seu estado como uma lista simples. Utiliza uma estrutura de dados específica, **Merkle Patricia Trie**, que combina a adulteração-evidência e propriedades à prova de compactos [Merkle tree](../cryptography/merkle-trees.md) com a pesquisa eficiente baseada em chaves de uma **trie** (uma estrutura de árvore organizada pelos caracteres individuais ou mordiscos de uma chave, em vez de por comparação de valor). Este capítulo cobre por que esta combinação específica, em vez de uma árvore Merkle simples, era necessária.

## Por que uma árvore Merkle não é suficiente

A [Merkle tree](../cryptography/merkle-trees.md#como-funciona), como coberto pela Criptografia, é construído a partir de uma lista fixa, ordenada de itens. Exatamente o que o Bitcoin precisa para a lista de transações de um bloco, mas não o que o Ethereum precisa para o seu estado. O estado de Ethereum é um **mapeamento do valor-chave** (endereços de conta (chaves) para dados de conta (valores)) que precisa suportar a inserção, atualização e pesquisa eficientes **por chave**, não apenas o hashing sequencial de uma lista fixa. Uma árvore Merkle simples não tem noção natural de "procurar o valor desta chave específica". Você já precisaria saber a posição de um item na lista, que não mapea para "procurar conta 0xABC... o saldo atual" em tudo.

## O que uma trie contribui: estrutura baseada em chaves

Um trie (a partir de "retrieval", historicamente pronunciado para rimar com "árvore" por alguns e "tentar" por outros) organiza dados pelos bytes reais da chave: cada nível da árvore corresponde a uma parte da chave (na implementação de Ethereum, um "bibble", 4 bits, meio byte, uma vez que as chaves são hashed endereços e hex-encoded), e olhar para cima um valor significa andar para baixo da árvore seguindo os próprios bytes da chave, um nibble de cada vez, até chegar ao valor armazenado. Isso dá uma busca eficiente e determinística baseada em chaves: o caminho para o valor de qualquer chave específica é inteiramente determinado pela própria chave.

## O que "Patricia" acrescenta: compressão

Um trie ingênuo seguindo este esquema simples de um-nibble-por-nível seria extremamente profundo e desperdiçador para chaves com trechos longos onde só existe um caminho (sem ramificação) (a maioria de um caminho de um endereço hashed 64-nibble pode não ter outras chaves compartilhando esse mesmo prefixo. **Patricia** ("Algoritmo prático para recuperar informações codificadas em alfanumérico", o mesmo acrônimo por trás do nome "Patricia" em estruturas de dados de rede geralmente) comprime essas cadeias monocrianças em uma única borda marcada com a sequência compartilhada, desbranquiçada de nibbles, ao invés de um nodo desperdiçado, na maior parte vazio por nibble) um espaço real, significativo e a melhoria da eficiência de busca em tempo sobre a versão ingênua.

## O que "Merkle" acrescenta: adulteração-evidência e provas

Cada nó no trie, das folhas até o single **raiz**, é hashed, exatamente o princípio de encadeamento de [Merkle Trees](../cryptography/merkle-trees.md#como-funciona), aplicado à estrutura de ramificação de um trie em vez de uma lista linear simples. Isto dá ao estado tentar a propriedade de núcleo idêntica uma árvore Merkle dá uma lista de transações: um único hash root de 32-bytes (o `stateRoot` campo em [Blocos Ethereum](./blocks.md#por-que-uma-raiz-de-estado-especificamente)) compromete-se a *inteiro* conteúdo de trie, e uma prova compacta (a **Merkle Patricia prova**, seguindo a mesma lógica geral [Provas de Merkle](../cryptography/merkle-proofs.md) já coberto em Cryptography, adaptado para a estrutura do caminho de ramificação do trie) pode provar qualquer valor específico da chave (ou sua ausência) contra essa raiz, sem precisar do trie inteiro.

```text
stateRoot
    │
    ▼
 [Merkle Patricia Trie]
    │
    ├── path for address 0xAB... → account data (balance, nonce, storageRoot, codeHash)
    ├── path for address 0xCD... → account data
    └── ... every account in the current state, addressable by key
```

## Múltiplas tentativas, não uma

Ethereum realmente usa vários separado Merkle Patricia Tries, não apenas um: o **trie de estado** (mapeando endereços para dados de conta, descritos acima), um separado **trie de armazenamento** *por conta de contrato* (Mapeando chaves de armazenamento desse contrato específico para valores. Isto é o que uma conta `storageRoot` campo, de [Contas Ethereum](./accounts.md#qual-a-composição-de-todas-as-contas), realmente aponta para), e o separado **transações** e **recibos** Tenta por bloco. Cada um serve o objetivo subjacente idêntico (compacto, inviolável, valor-chave demonstrável ou compromisso de lista) aplicado a um tipo diferente de dados.

## Conceitos errôneos comuns

**O trie estado não é reconstruído do zero para cada novo bloco.** Os nós mantêm e atualizam incrementalmente sua estrutura de dados de trie local à medida que novos blocos são processados, computando uma nova raiz refletindo apenas as alterações que um determinado bloco realmente fez, não recomputando o trie inteiro sobre cada conta a partir de nada cada vez.

**Uma prova Merkle Patricia não requer baixar toda a trie estatal**, exatamente como as provas Merkle cobertas em [Provas de Merkle](../cryptography/merkle-proofs.md#como-funciona), apenas os hashes irmãos ao longo do caminho específico para a chave que está sendo comprovada são necessários, crescendo logaritmicamente (aproximadamente) com o tamanho do trie, não linearmente.

## Outras leituras

- [Papel Amarelo Ethereum](https://ethereum.github.io/yellowpaper/paper.pdf): Apêndice D (Merkle Patricia Trie modificada)
- [ethereum.org: Merkle Patricia Trie](https://ethereum.org/en/developers/docs/data-structures-and-encoding/patricia-merkle-trie/)

---

[← Anterior: Estado de Ethereum](./state.md)
·
[Voltar para Ethereum](./README.md)
·
[Próximo: JSON-RPC →](./json-rpc.md)
