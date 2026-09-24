# SegWit

Testemunha Segregada (SegWit) é uma atualização de protocolo de 2017 que mudou onde os dados da assinatura vivem dentro de uma transação. Parece um pequeno detalhe técnico. Ele fixou um problema de maleabilidade de longa data, mudou como o tamanho da transação é medido e as taxas são calculadas, efetivamente aumentou a capacidade prática do bloco de Bitcoin, e tornou-se o centro da disputa de governança mais controversa na história do Bitcoin (ver [Debate sobre o Tamanho do Bloco](../forks/block-size-war.md)). Este capítulo abrange o mecanismo; a história política é abordada separadamente em [Atualizações de forks e protocolos](../forks/README.md).

## Por que o SegWit existe

Dois problemas distintos e reais motivaram-no:

1. **Maleabilidade de transação.** De acordo com o [Assinaturas digitais](../cryptography/digital-signatures.md#maleabilidade-uma-sutileza-que-vale-a-pena-nomear-aqui), o ID de uma transação (txid) é computado *inteiro* conteúdo serializado, incluindo o scriptSig, que contém dados de assinatura. Como as assinaturas do ECDSA têm alguma flexibilidade em sua codificação exata de byte sem alterar sua validade (uma forma de maleabilidade de assinatura), um terceiro poderia ter uma transação válida e não confirmada e produzir uma codificação de assinatura diferente, igualmente válida para ele, mudando o txid sem alterar o que a transação realmente faz. Isto complicou qualquer protocolo que necessitasse referenciar uma transação não confirmada pelo seu txid antes da confirmação, mais notavelmente os primeiros projetos de canal Lightning Network (ver [Lightning Network](../lightning/README.md)).
2. **Capacidade do bloco**, discutidos em profundidade em [Debate sobre o Tamanho do Bloco](../forks/block-size-war.md), a contabilidade baseada em peso da SegWit efetivamente aumentou a quantidade de dados de transação que se encaixa em um bloco, como subproduto de seu projeto principal, em vez de através de um simples aumento do limite de tamanho de bloco direto, que foi o ponto específico de contenção na disputa de governança circundante.

## Como funciona

SegWit **move os dados das testemunhas (assinaturas e, para scripts mais complexos, o script de desbloqueio completo) para fora da estrutura de transação tradicional e para um campo de testemunhas separado e anexado**, que não está incluído no cálculo do txid da transação. Isso resolve diretamente a maleabilidade: uma vez que o txid não depende mais dos dados de assinatura, nenhuma quantidade de manipulação de codificação de assinatura pode alterá-lo.

```text
Pre-SegWit transaction (signature data is part of what's hashed for txid):

  [ version | inputs (incl. scriptSig) | outputs | locktime ]
                     ↑
              signature data lives here,
              and affects the txid


SegWit transaction (signature data moved out, excluded from txid):

  [ version | marker+flag | inputs (scriptSig now empty for SegWit inputs) |
    outputs | witness data | locktime ]
                                  ↑
                          signature data lives here now,
                          does NOT affect the txid
```

## txid e wtxid

Uma transação SegWit realmente tem dois identificadores: o **txid**, computado sobre a transação com dados de testemunhas excluídos (como descrito acima, e combinando o que um nó pré-SegWit iria calcular, preservando compatibilidade backward para qualquer coisa referente às transações pelo txid), e o **wtxid**, computado sobre o *inteiro* transação serializada, incluindo dados de testemunhas. O wtxid é usado internamente para deduplicação do relé e no [Merkle tree](../cryptography/merkle-trees.md) que se compromete a testemunhar dados (uma estrutura separada, o compromisso de testemunha, armazenado na transação de base de moeda de um bloco contendo transações SegWit, um detalhe adicionado especificamente para preservar a compatibilidade com a lógica de validação do bloco pré-SegWit).

## Peso e aumento da capacidade efetiva

Coberto com a fórmula real em [Taxas de transação](./fees.md#tamanho-e-peso-da-transação): SegWit introduzido **unidades de peso**, descontando os dados das testemunhas para um quarto do peso do seu bytes. A regra do consenso mudou de um limite de tamanho restrito de 1 MB para um limite unitário de 4 milhões de peso (desde que os dados das testemunhas (normalmente uma grande parte dos bytes totais de uma transação, dado que as assinaturas são grandes em relação ao resto de uma transação típica) agora conta menos, mais transações totais se encaixam dentro do mesmo orçamento de peso do que teria se encaixado sob o antigo limite de 1 MB baseado em byte, sem tocar diretamente o número "1 MB" como um valor literal, único nas regras de consenso) uma escolha de design técnico que também foi, deliberadamente, parte de como SegWit foi estruturado como um soft fork (ver [Soft forks](../forks/soft-forks.md)) em vez de um hard fork.

## SegWit como um soft fork

SegWit foi implantado como um **soft fork**: dados de testemunha são colocados em uma parte da transação que nós antigos, não-atualizados simplesmente não analisam ou validam em tudo, para um nó antigo, uma transação SegWit se parece com uma transação comum com um script vazio (e, portanto, sob regras antigas, trivialmente "ninguém pode gastar")Sig. Isto é possível especificamente porque as saídas do SegWit usam um padrão de script (`OP_0 <20-or-32-byte-hash>`) que os nós velhos tratam como "qualquer um pode gastar" (**qualquer-pode- gastar** significando que nós antigos não impõem nenhuma restrição lá, uma vez que o padrão não corresponde a nada que eles reconhecem como precisando de uma verificação de assinatura) enquanto nós atualizados corretamente impõem que apenas uma testemunha válida satisfazendo que o hash pode realmente gastá-lo, significando que nós antigos, não-atualizados permanecem capazes de ver e retransmitir transações SegWit como válidas (se permissive) sem eles mesmos serem capazes de aplicar independentemente as novas regras de verificação de testemunhas da forma como um nó atualizado faz. Este mecanismo de compatibilidade de forquilha mole é examinado de forma mais geral em [Soft forks](../forks/soft-forks.md).

## Formatos de endereço: Bech32

O SegWit introduziu uma nova codificação de endereços, **Bech32** (BIP 173), distinto do formato Base58Check abrangido [P2PKH](./p2pkh.md#endereços-codificando-um-pubkeyhash-p2pkh-para-humanos). Endereços Bech32 (começando com `bc1` na mainnet) utilizar um código de detecção de erros capaz de detectar essencialmente todos os erros de transcrição comuns (uma garantia mais forte do que o checksum da Base58Check) e são insensíveis a casos, entre outras melhorias práticas, cobertos integralmente em [Endereços](../wallets/addresses.md).

## Conceitos errôneos comuns

**SegWit não é "blocos menores".** Mudou. *como* a capacidade do bloco é medida (peso em vez do tamanho do bytes bruto) e, como efeito dessa mudança, aumenta a capacidade prática, descrevendo-a como uma redução do tamanho do bloco, um enquadramento utilizado por alguns críticos durante o debate de governança circundante, inverte o que realmente aconteceu com o rendimento disponível da transação.

**Uma transação SegWit não é um "tipo diferente de Bitcoin"** ou um ativo separado. É uma transação Bitcoin comum usando um formato de script mais novo e eficiente; os tipos de transação SegWit e pré-SegWit coexistem na mesma cadeia e podem pagar livremente um ao outro.

## Outras leituras

- [BIP 141: Testemunha Segregada (camada de Consenso)](https://github.com/bitcoin/bips/blob/master/bip-0141.mediawiki)
- [BIP 173: Formato de endereço base32 para saídas de testemunhas nativas v0-16](https://github.com/bitcoin/bips/blob/master/bip-0173.mediawiki)

---

[← Anterior: P2SH](./p2sh.md)
·
[Voltar para Bitcoin](./README.md)
·
[Próximo: Taproot →](./taproot.md)
