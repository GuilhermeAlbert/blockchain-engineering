# Roubo de Frase de Sementes

Uma frase de semente é uma codificação de entropia legível por humanos usada para derivar as chaves de uma carteira. Em uma carteira típica BIP-39 e BIP-32, a mesma frase pode recriar cada conta em cada cadeia suportada. É um backup, mas também é um segredo mestre portátil.

## Por que a frase é mais valiosa do que uma chave

Uma carteira pode derivar milhares de chaves privadas de uma semente. Roubar uma chave privada compromete uma conta ou endereço. Roubar a semente pode expor toda a árvore de derivação, incluindo contas que o proprietário ainda não usou. Um atacante pode importá-lo em software de carteira não relacionado e digitalizar caminhos de derivação comuns sem tocar no dispositivo da vítima novamente.

A frase-passe opcional BIP-39 altera a semente derivada. Às vezes é chamada de vinte e cinco palavras, embora possa ser qualquer corda. Não é um checksum extra e não pode ser recuperado do mnemônico. Cada frase- senha produz uma carteira válida, de modo que um erro de digitação silenciosamente abre um conjunto diferente de contas. A frase e frase-passe devem ser copiadas separadamente se a separação fizer parte do modelo de ameaça.

## Caminhos comuns de exposição

Frases de sementes vazam através de comportamento que parece backup:

- fotografias entram em backups de telefone e de nuvem-foto;
- as notas sincronizam entre os dispositivos;
- impressoras, scanners e armazenamento de rede retêm cópias;
- formulários de navegador e extensões falsas de carteira capturam palavras em ordem;
- os imitadores de suporte pedem ao usuário para “verificar” ou “sincronizar” uma carteira;
- um backup de papel ou metal é encontrado, fotografado ou coagido de seu proprietário.

Uma carteira legítima pode solicitar a frase durante a importação ou recuperação inicial. Isso não torna todas as frases imediatamente legítimas. O usuário deve verificar o software e o ambiente antes de digitar. Nenhum agente de suporte, airdrop, migração token, ou conversa de solução de problemas precisa da frase.

## O design de backup é uma decisão de modelo de ameaça

Uma cópia cria um risco de perda. Muitas cópias criam um risco de roubo. Um cofre doméstico protege contra descobertas casuais, mas não todos os incêndios, inundações, roubos ou cenários de coerção. Uma caixa de depósito bancário altera a ameaça de acesso às regras e disponibilidade institucional. O compartilhamento secreto pode distribuir material de recuperação, mas introduz risco de procedimento: os detentores podem perder ações, combiná-las incorretamente ou expor ações suficientes durante um ensaio.

Não divida uma frase BIP-39 em grupos de palavras informais e assuma que ela se comporta como compartilhamento secreto criptográfico. As restantes palavras e estrutura de controle podem deixar muito menos incerteza do que o esperado. Use um esquema especificado e teste a recuperação com uma carteira que suporta esse esquema exato.

## O que fazer após a suspeita de exposição

Trate uma frase fotografada, digitada, copiada ou brevemente sem acompanhamento como comprometida. A criação de uma nova senha na mesma carteira não altera as chaves derivadas. Gerar uma nova semente em um dispositivo confiável, verificar o novo backup, e mover ativos e autoridades para contas derivadas da nova semente. As aprovações de token, as funções contratuais, as funções de validador e as identidades vinculadas a endereços antigos podem exigir migração separada.

A prática de recuperação é importante. Um backup que nunca foi testado é uma suposição. Teste com uma carteira vazia ou de baixo valor, confirme os endereços esperados, depois documento o procedimento sem gravar o próprio segredo.

## Outras leituras

- [BIP 39: Código mnemônico para geração de chaves determinísticas](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki)
- [BIP 32: carteiras determinísticas hierárquicas](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki)
- Ver também: [Frases de sementes](../wallets/seed-phrases.md), [BIP-39](../wallets/bip-39.md), [Chave de backup e recuperação](../wallets/recovery.md)

---

[← Anterior: Roubo de chave privada](./private-key-theft.md)
·
[Voltar à Segurança](./README.md)
·
[Próximo: Phishing →](./phishing.md)
