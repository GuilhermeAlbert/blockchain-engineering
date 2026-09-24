# Privacidade

Os blockchains públicos expõem gráficos de transações. Endereços são pseudônimos, não anonimato. Uma vez que um endereço está ligado a uma pessoa ou organização, a atividade passada e futura em torno dela pode tornar-se mais fácil de interpretar.

## Ligação no livro de registros

As heurísticas do cluster de Bitcoin provavelmente são controladas por um usuário e rastreiam saídas de mudança. As contas Ethereum expõem saldos, chamadas contratuais, aprovações de tokens e interações de aplicativos sob um endereço. Heurísticas são probabilísticas e podem estar erradas, especialmente em torno de custódia compartilhada, transações colaborativas, pontes e contratos.

Quantidades e timing adicionar contexto. Uma retirada de uma troca identificada seguida de uma transferência correspondente pode suportar uma ligação mesmo sem uma etiqueta explícita. Reutilizar endereços torna isto mais fácil.

## Dados da rede e da aplicação

Parceiros, provedores de RPC, carteiras, exploradores, frontends, scripts de análise e plataformas móveis observam metadados fora da cadeia. Um provedor de RPC pode associar endereços consultados com um endereço IP ou chave API. Uma carteira pode revelar seu endereço definido durante a verificação de saldos. Rastreadores de navegador conectam atividade on-chain à identidade web comum.

A privacidade, portanto, precisa de camadas. A alteração de endereços não oculta metadados de rede. O roteamento através de uma rede de privacidade não remove o linkage do gráfico de transações. Um protocolo de transferência privada não protege uma conta de câmbio que registra a propriedade de depósito e retirada.

## Técnicas de privacidade

Controle de moedas evita mesclar UTXOs Bitcoin não relacionados. Projetos de transações colaborativas podem enfraquecer heurísticas de entrada comum. Endereçamento furtivo, sistemas de conhecimento zero, quantidades confidenciais e redes focadas na privacidade protegem diferentes campos. Cada um introduz carteira, liquidez, taxa, auditoria, ou tradeoffs regulatórios.

O anonimato é importante. Quantidades incomuns, timing imediato ou um pequeno conjunto de usuários podem tornar uma transação tecnicamente privada distinguível. Os padrões geralmente importam mais do que recursos opcionais porque a privacidade enfraquece quando poucos usuários compartilham o mesmo padrão.

## Privacidade e segurança

Os saldos públicos podem tornar os indivíduos alvos de phishing, coerção ou roubo. Organizações podem expor folha de pagamento, fornecedores, estratégia de tesouraria e atividade do cliente. Privacidade é uma propriedade de segurança operacional, bem como uma preferência política.

## Outras leituras

- [Whitepaper Bitcoin, Seção 10](https://bitcoin.org/bitcoin.pdf)
- [Privacidade Ethereum](https://ethereum.org/privacy/)
- Ver também: [Endereços](../wallets/addresses.md), [Provas de Conhecimento Zero](../cryptography/zero-knowledge.md)

---

[← Anterior: KYC e AML](./kyc-aml.md)
·
[Voltar ao Regulamento e à Sociedade](./README.md)
·
[Próximo: Vigilância Financeira →](./financial-surveillance.md)
