# BIP-44

BIP-32 define *como* para derivar uma árvore de chaves; não diz nada sobre *que caminhos específicos dentro dessa árvore* deve significar "o primeiro endereço de recepção Bitcoin" ou "a quinta conta Ethereum." O BIP-44 preenche essa lacuna: uma estrutura padronizada para organizar a árvore de derivação de uma carteira HD para que diferentes softwares de carteira, dada a mesma semente, derivem o conjunto idêntico de endereços para fins idênticos.

## O problema BIP-44 resolve

Sem uma convenção acordada, duas carteiras diferentes poderiam implementar [BIP-32](./bip-32.md) derivação e ainda produzir conjuntos completamente diferentes, incompatíveis de endereços a partir da mesma frase semente, simplesmente porque eles escolheram caminhos diferentes, arbitrários dentro da árvore para "o primeiro endereço receptor". Isso tornaria as frases de sementes muito menos portáteis em todo o software de carteira na prática do que eles afirmam ser em princípio. BIP-44 (construindo na estrutura multi-contas que o BIP-43 introduziu) corrige isso padronizando a própria estrutura do caminho.

## A estrutura de cinco níveis

```text
m / purpose' / coin_type' / account' / change / address_index
```

- **finalidade'**: sempre `44'` para carteiras estruturadas com BIP-44 (outros valores de finalidade sinalizam normas diferentes, BIP-49 para `49'`, BIP-84 para `84'`, e BIP-86 para `86'`, coberto abaixo).
- **tipo moeda»**: identifica para que criptomoeda este ramo é, por um registro mantido em [SLIP- 44](https://github.com/satoshilabs/slips/blob/master/slip-0044.md) (uma especificação conexa de SatoshiLabs), `0'` para Bitcoin, `60'` para Ethereum, e assim por diante para centenas de outras cadeias registradas, deixando uma única frase de semente gerenciar chaves para muitas cadeias de blocos diferentes simultaneamente, cada uma em seu próprio ramo dedicado.
- **conta'**: um índice arbitrário escolhido pelo usuário, permitindo que uma semente gerencie contas múltiplas, logicamente separadas (para fins organizacionais ou contabilísticos) dentro do mesmo tipo de moeda.
- **alteração**: `0` para os endereços de recepção normais, `1` para endereços de alterações internas (as saídas de valores restantes descritas em [O Modelo UTXO](../bitcoin/utxo.md#como-funciona-a-despesa)). Mantendo endereços de mudança em um ramo logicamente separado de receber endereços, embora ambos são endereços comuns funcionalmente.
- **endereço índice**: um contador sequencial, incrementando para cada novo endereço gerado dentro desse ramo.

Observe os apóstrofos nos três primeiros níveis. Estes indicam **derivação endurecida** (ver [BIP-32](./bip-32.md#derivação-endurecida-versus-derivação-não-endurecida)), enquanto `change` e `address_index` usar derivação ordinária, não endurecida, especificamente para que um xpub no nível da conta possa gerar todos os endereços de recepção e mudança abaixo dele sem nunca precisar da chave privada, de acordo com o padrão somente de observação demonstrado em [BIP-32](./bip-32.md#exemplo-um-xpub-derivando-chaves-públicas-infantis-sem-qualquer-chave-privada-presente).

## Variantes de campo de propósito para diferentes tipos de scripts do Bitcoin

Porque o Bitcoin tem vários tipos de script padrão (ver [ScriptPubKey e ScriptSig](../bitcoin/scripts.md#os-tipos-de-script-padrão-de-relance)), o ecossistema estendeu o campo de propósito do BIP-44 com padrões relacionados para formatos de endereço mais novos, em vez de sobrecarregar `44'` significando coisas diferentes dependendo do contexto:

| Objecto | Padrão | Tipo de endereço |
| --- | --- | --- |
| `44'` | BIP-44 | Legado P2PKH |
| `49'` | BIP-49 | SegWit embrulhado com P2SHName |
| `84'` | BIP-84 | SegWit nativo (P2WPKH) |
| `86'` | BIP-86 | Taporot (P2TR) |

Uma carteira suportando vários tipos de endereço para a mesma semente subjacente normalmente deriva cada tipo de seu próprio ramo, separado de nível de propósito, o que significa que uma única frase de semente pode simultaneamente voltar legado, SegWit, e endereços Taproot, cada um independentemente derivável e independente, do mesmo backup original.

## Exemplo: o caminho completo para um caso real e comum

"O terceiro endereço de recepção na primeira conta Bitcoin, usando SegWit nativo" seria:

```text
m/84'/0'/0'/0/2
```

Lendo da esquerda para a direita: BIP-84 proposite (native SegWit), tipo de moeda Bitcoin, primeira conta, recebendo (não alterar) branch, terceiro endereço (índice 2, uma vez que a indexação começa em 0).

## Conceitos errôneos comuns

**BIP-44 não define nada sobre a criptografia subjacente**Esse é inteiramente o trabalho do BIP-32; o BIP-44 só padroniza o *significado* de posições específicas dentro de uma árvore BIP-32, uma convenção puramente organizacional em camadas no topo.

**Duas carteiras ambas implementando corretamente o BIP-44 para a mesma semente só irão derivar endereços idênticos se eles também concordarem com a mesma variante de campo de propósito (44' vs 84', por exemplo) para o tipo de endereço que você está olhando**, restaurando uma semente em uma carteira que defaults para um campo de propósito diferente do que o que seus fundos foram originalmente derivados sob é uma fonte real, documentada de "meus fundos desapareceram" confusão, quando na verdade os fundos estão sentados em um caminho diferente, correto-mas-indisplayed a nova carteira não está verificando por padrão.

## Outras leituras

- [BIP 44: Hierarquia Multi-Account para carteiras determinísticas](https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki)
- [SLIP-44: Tipos de moedas registados](https://github.com/satoshilabs/slips/blob/master/slip-0044.md)
- [BIP 84: Esquema de derivação para P2WPKH](https://github.com/bitcoin/bips/blob/master/bip-0084.mediawiki)

---

[← Anterior: BIP-32](./bip-32.md)
·
[Voltar para Wallets e Key Management](./README.md)
·
[Próximo: Caminhos de Derivação →](./derivation-paths.md)
