# BIP-39

[Frases de sementes](./seed-phrases.md) cobriu o próprio mecanismo entropia-mnemônico. Este capítulo abrange o BIP-39 como uma especificação, seu histórico, o recurso de frase-passe opcional que define, e uma limitação genuína e documentada que vale a pena entender antes de confiar nele.

## Origem

O BIP-39 foi proposto em 2013 por Marek Palatino, Pavol Rusnak e Aaron Voisine (os dois primeiros associados à empresa de carteiras de hardware SatoshiLabs/Trezor, o terceiro com a carteira móvel Breadwallet/BRD), com o objetivo de padronizar o backup de sementes mnemônicas em implementações de carteiras incompatíveis, antes do BIP-39, diferentes carteiras usavam esquemas de backup diferentes, muitas vezes proprietários e mutuamente incompatíveis, o que significa que uma frase de uma carteira muitas vezes não poderia ser restaurada em outra.

## A frase- senha opcional

BIP-39 define uma frase-passe opcional, misturada com a derivação PBKDF2 descrita em [Frases de sementes](./seed-phrases.md#de-mnemônico-para-semente-por-que-pbkdf2) ao lado da própria mnemónica. Esta frase- senha é **não** parte do mnemônico e é **não** checksummed ou validated de qualquer forma, criticamente, uma frase-passe diferente combinada com as palavras mnemônicas idênticas produz uma semente completamente diferente, totalmente não relacionada e, portanto, um conjunto inteiramente diferente de chaves derivadas, sem relação criptográfica entre as duas além de compartilhar as mesmas palavras iniciais. Isto dá a frase-passe dois usos práticos reais e distintos:

- **Negação plausível**: um titular de carteira pode manter uma carteira primária sob uma frase-passe e uma carteira escondida separada sob uma frase-passe diferente da *mesmo* o backup mnemônico, se coagido a revelar o mnemônico, eles podem revelá-lo (e uma frase-passe ou nenhuma) sem necessariamente revelar a frase-passe protegendo fundos que eles preferem manter ocultos.
- **Um factor de segurança adicional**: mesmo que um atacante obtenha o backup mnemônico físico (um risco real, documentado este livro cobre [Roubo de Frase de Sementes](../security/seed-phrase-theft.md)), os fundos protegidos por uma frase-passe adicional permanecem inacessíveis sem ela. Só a mnemónica é insuficiente.

Isto é às vezes informalmente chamado de "25a palavra" (para uma mnemônica de 24 palavras), embora ele não seja realmente extraído da lista de palavras BIP-39 ou sujeito a qualquer uma das estruturas dessa lista. Pode ser qualquer string que o usuário escolher.

## Um risco genuíno que o recurso de frase- senha introduz

Porque uma frase- senha produz uma *completamente diferente* carteira sem forma de verificar ou recuperar se esquecido (não há checksum na frase-passe da maneira que existe na própria mnemônica), **perder ou esquecer uma frase-passe é tão irrecuperável como perder a própria mnemónica**Ver [Moedas Perdidas](../bitcoin/lost-coins.md). Esta é uma fonte real e bem documentada de fundos perdidos permanentemente: um usuário define uma frase-passe, esquece seu valor exato (ou a capitalização de um único personagem, uma vez que as frases-passe são tipicamente sensíveis a casos sem mecanismo de correção), e não tem como distinguir esta situação de simplesmente ter o mnemônico errado, uma vez que ambas produzem uma carteira aparentemente "válida" mas errada sem nenhuma mensagem de erro em qualquer ponto.

## Listas de palavras multilingues

BIP-39 define listas de palavras em vários idiomas (inglês, japonês, espanhol, chinês e outros, listados na própria especificação), mas **o checksum e a mecânica de derivação não se importam com qual lista de palavras uma carteira exibe as palavras de**; os mesmos mapas de entropia subjacentes a uma lista de palavras 2048 apropriada para idioma, mas uma carteira precisa saber qual lista de palavras específica uma determinada mnemônica usa para convertê-la corretamente de volta para uma semente. Usando a lista de palavras errada (tentando restaurar uma mnemônica gerada pelo japonês em uma carteira esperando apenas a lista inglesa, por exemplo) normalmente falhará a validação de forma direta, em vez de produzir silenciosamente uma carteira errada, uma propriedade tranquilizadora, se estreita, de segurança.

## Conceitos errôneos comuns

**Um Mnemônico BIP-39 não é um padrão "somente para a Bitcoin"**, apesar de ser introduzido e principalmente associado com carteiras Bitcoin. Ele agora é amplamente utilizado como um mecanismo de backup de chaves geral em muitos ecossistemas blockchain, incluindo carteiras Ethereum, precisamente porque padroniza um mecanismo verdadeiramente útil, protocolo-agnóstico (tornando entropia em palavras humano-transcritíveis) que não é inerentemente específico para qualquer formato de chave de uma cadeia.

**Um checksum do Mnemonic do BIP-39 não valida que a frase é "a certa" para seus fundos**. Ele só valida que as próprias palavras formam uma frase BIP-39 estruturalmente válida (lista de palavras correta, bits corretos do checksum). Um mnemônico perfeitamente válido e de soma de cheques ainda pode ser o *errado* mnemonic (um erro de digitação que ainda produz um checksum válido, ou simplesmente uma frase válida de outra pessoa não relacionada) e deriva chaves sem fundos associados a eles.

## Outras leituras

- [BIP 39: Código mnemônico para geração de chaves determinísticas](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki)

---

[← Anterior: Frases de sementes](./seed-phrases.md)
·
[Voltar para Wallets e Key Management](./README.md)
·
[Próximo: Carteiras HD →](./hd-wallets.md)
