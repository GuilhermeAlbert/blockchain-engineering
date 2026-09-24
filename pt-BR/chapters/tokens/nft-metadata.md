# Metadados NFT

Os dados on-chain de um token ERC-721 ou ERC-1155 são, no mínimo, apenas um ID e um proprietário, a imagem, nome, descrição e atributos que as pessoas associam com um NFT quase sempre vivem em outro lugar inteiramente. Este capítulo cobre exatamente como essa conexão funciona, e os tradeoffs reais documentados onde "em outro lugar" realmente está.

## A função tokenURI

A extensão de metadados opcional do ERC-721 define uma função adicional:

```solidity
interface IERC721Metadata {
    function name() external view returns (string memory);
    function symbol() external view returns (string memory);
    function tokenURI(uint256 tokenId) external view returns (string memory);
}
```

`tokenURI` retorna um URI (um link) que carteiras, mercados e exploradores devem buscar e analisar como JSON, convencionalmente estruturado como:

```json
{
  "name": "Example NFT #1",
  "description": "A description of this specific token.",
  "image": "https://example.com/images/1.png",
  "attributes": [
    { "trait_type": "Background", "value": "Blue" },
    { "trait_type": "Rarity", "value": "Rare" }
  ]
}
```

Nada sobre esta estrutura JSON ou seu conteúdo é verificado, validado ou aplicado pelo EVM ou pelo próprio contrato de token. `tokenURI` retorna uma string; o que essa string aponta, e se ela é realmente acessível, está completamente fora da preocupação do protocolo.

## Onde os metadados e a imagem realmente vivem

Esta é a questão prática com tradeoffs reais e documentados:

- **Um URL HTTP centralizado** (`https://example.com/metadata/1.json`), mais simples de configurar, mas os metadados (e, muitas vezes, a imagem referenciada) desaparecem no momento em que o servidor fica offline ou o domínio falha, um modo de falha real e documentado para projetos NFT cuja infraestrutura de apoio foi descontinuada, deixando o token on-chain apontando para um link morto.
- **IPFS (Sistema de Arquivos InterPlanetários)**: uma rede de armazenamento de conteúdo-endereçado onde o identificador de um arquivo (seu CID, um hash do conteúdo em si) é derivado do conteúdo, não escolhido por quem o enviou, significando que o mesmo conteúdo sempre produz o mesmo CID, e alterando o conteúdo produz um CID totalmente diferente, dando uma garantia real, verificável de evidência de adulteração (o mesmo princípio de endereço de conteúdo baseado em hash por trás [Merkle Trees](../cryptography/merkle-trees.md), aplicado a uma rede geral de armazenamento de arquivos). O tradeoff: disponibilidade IPFS depende de pelo menos um nó continuar a **pino** (armazenar e servir activamente) o conteúdo. A própria infraestrutura de um projeto desaparecendo ainda pode significar que o conteúdo se torna inalcançável se ninguém mais aconteceu para piná-lo, mesmo que seu endereço IPFS em si nunca mude.
- **Metadados totalmente em cadeia**: codificando o JSON (e às vezes a própria imagem, como um SVG ou formato similar compacto) diretamente no contrato, retornado de `tokenURI` como uma `data:` URI em vez de um link para qualquer coisa externa. Esta é a única abordagem genuinamente tão duradoura como a própria blockchain, uma vez que nada externo precisa permanecer disponível, ao custo de custos de implantação de gás significativamente mais elevados (recordar [Armazenamento](../evm/storage.md)'s real, assimetria de custo medido) para qualquer coisa além de quantidades muito pequenas de dados.

## Por que isso importa além de uma curiosidade técnica

A lacuna entre "donos de um token gravado imutavelmente em Ethereum" e "a imagem e descrição associada a esse token permanecem alcançáveis" é uma distinção real, significativa, este livro bandeiras explicitamente, ecoando o tema mais amplo (já estabelecido para [Ordinais](../bitcoin/ordinals.md) e [RGB](../bitcoin-scaling/rgb.md)) que a permanência na cadeia e a disponibilidade de dados fora da cadeia são propriedades separadas, não um pacote. O registro de propriedade on-chain de um NFT pode ser perfeitamente permanente, enquanto tudo que um espectador realmente reconheceria como "o NFT" (sua imagem) depende inteiramente de decisões de infraestrutura tomadas, e possivelmente mais tarde abandonadas, por outras partes além da própria blockchain.

## Conceitos errôneos comuns

**"Owning an NFT" não significa possuir a imagem subjacente, vídeo ou outro arquivo de mídia em qualquer sentido de copyright** por omissão. O que pertence é especificamente o token on-chain (um ID e seu registro de propriedade associado); quaisquer direitos aos meios referenciados são uma questão jurídica separada, regido por quaisquer termos que o próprio projeto tenha especificado (se houver), não pelo padrão token.

**Um morto `tokenURI` o link não invalida o próprio token**. `ownerOf` e as funções de transferência continuam a funcionar exatamente como antes, independentemente de os metadados serem alcançáveis; *display* o nome, imagem e atributos em carteiras e mercados são afetados por metadados quebrados, não pelo registro de propriedade subjacente.

## Outras leituras

- [EIP-721: Norma de Token não-Fungível (extensão de metadados)](https://eips.ethereum.org/EIPS/eip-721)
- [Documentação IPFS](https://docs.ipfs.tech/)

---

[← Anterior: ERC-1155](./erc-1155.md)
·
[Voltar aos Tokens](./README.md)
·
[Próximo: Minting and Burning →](./minting-and-burning.md)
