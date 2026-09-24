# RGB

RGB é um protocolo para a emissão e transferência de ativos smart-contrate-like (tokens, e estado programável mais geral) que armazena os dados reais e computação **fora de cadeia**, usando o Bitcoin apenas como uma camada cronometradora e ancoragem de propriedade. Este capítulo abrange o que torna essa escolha de design específica distinta, particularmente em comparação com a forma como a Ethereum lida com contratos inteligentes.

## O princípio do design principal: validação do lado do cliente

A escolha arquitetônica definida pelo RGB é **validação do lado do cliente**: em vez de cada participante de rede baixar e verificar o estado completo de cada contrato RGB e histórico (a forma como cada nó Ethereum processa o estado de cada contrato inteligente muda, veja [Estado Ethereum](../ethereum/state.md)), os dados e o histórico de transição de um contrato RGB são mantidos e validados de forma independente apenas pelas partes envolvidas nesse contrato específico. Os dados não são transmitidos ou armazenados pela rede Bitcoin mais ampla. O papel do Bitcoin é mais estreito e específico: os compromissos RGB (hashes criptográficos representando uma transição de estado de contrato) são incorporados em transações Bitcoin comuns, usando o próprio Bitcoin [Taproot](../bitcoin/taproot.md) capacidades de roteiro-caminho, dando ao RGB transições de estado uma âncora evidente e cronometrada na própria história comprovada do Bitcoin sem que a camada base do Bitcoin precise entender, armazenar ou validar o próprio conteúdo específico do RGB.

## Por que isso é diferente de como Ethereum contratos inteligentes funcionam

Isso vale a pena contrastar diretamente, já que é a maneira mais clara de entender a intenção de design do RGB: o estado completo de um contrato inteligente da Ethereum é público, armazenado e validado independentemente por cada nó completo na rede (ver [Contas Ethereum](../ethereum/contract-accounts.md)), um registro global, compartilhado, universalmente verificável do estado contratual. RGB deliberadamente inverte isso: o estado de contrato é privado por padrão, conhecido apenas pelas partes envolvidas, com Bitcoin fornecendo apenas um mecanismo de compromisso mínimo e genérico em vez de um ambiente de execução e armazenamento completo. Isto dá RGB propriedades de privacidade significativamente mais fortes (um observador externo vê apenas uma transação Bitcoin de aparência ordinária, não qualquer detalhe sobre o que RGB contrato estado mudou) ao custo de não ter um único, universalmente compartilhado, publicamente auditável livro de contrato estado da forma como Ethereum fornece, verificando o histórico legítimo de um ativo RGB requer realmente a obtenção e validação do histórico de transação privada desse ativo específico de uma contraparte, não simplesmente consultando um blockchain público.

## O que isto permite

RGB é projetado para apoiar a emissão de tokens fungíveis (comparáveis em espírito ao Ethereum's [ERC-20](../tokens/erc-20.md)) e ativos não-fungible diretamente em cima do modelo de segurança de Bitcoin, sem exigir regras de consenso de base de Bitcoin para entender nativamente semântica token em tudo, uma abordagem significativamente diferente do, por exemplo, o [Ordinais e Inscrições](../bitcoin/ordinals.md) padrão, que incorpora dados diretamente e publicamente nos dados de testemunhas do próprio Bitcoin em vez de mantê-lo fora da cadeia e detido em particular.

## Situação atual

RGB continua a ser um protocolo desenvolvido ativamente, relativamente em estágio inicial em relação ao maduro, extensivamente testado em batalha token e smart-contract ecossistema. Implementações e especificações reais existem, e algumas ferramentas de emissão e carteira foram construídas, mas adoção e uso do mundo real permanecem consideravelmente menores em escala do que os padrões estabelecidos Ethereum token a partir desta escrita. Este livro apresenta-o como uma verdadeira abordagem arquitectónica documentada que vale a pena compreender pelos seus princípios de design, e não como um sistema de produção estabelecido e amplamente adotado à escala do ecossistema token de Ethereum.

## Conceitos errôneos comuns

**Os dados do contrato RGB não são armazenados no blockchain do Bitcoin**, mesmo em uma forma compacta ou hashed além do compromisso em si. Este é o ponto inteiro da validação do lado do cliente; confundindo RGB com um esquema de armazenamento de dados on-chain como [Ordinais](../bitcoin/ordinals.md) perde o seu núcleo, distinguindo escolha de design.

**RGB não é uma cadeia lateral Bitcoin** no sentido [Cadeias laterais](./sidechains.md) descreve. Não tem nenhum blockchain separado ou mecanismo de consenso independente próprio; é um protocolo ladeado diretamente em cima de transações Bitcoin comuns e troca de dados off-chain entre as partes.

## Outras leituras

- [Documentação do protocolo RGB](https://rgb.tech/)

---

[← Anterior: Statechains](./statechains.md)
·
[Voltar para Bitcoin Scaleing](./README.md)
·
[Próximo: Propostas de Rollup Bitcoin →](./rollups.md)
