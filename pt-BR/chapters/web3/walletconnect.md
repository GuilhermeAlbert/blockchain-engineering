# WalletConnect

[Conectando as Carteiras](./wallet-connections.md) EIP-1193 coberto, o modelo de conexão navegador-extensão. Esse modelo tem uma lacuna óbvia: não faz nada para um aplicativo de carteiras móveis, que não está funcionando dentro do mesmo navegador que o dapp. WalletConnect resolve este problema específico.

## O problema: dois dispositivos separados, ou dois aplicativos separados

Um aplicativo de carteira móvel e um navegador de desktop rodando um dapp são dois processos inteiramente separados, sem contexto de navegador compartilhado para injetar um `window.ethereum` Objectar para dentro. WalletConnect as pontes: o dapp exibe um código QR (ou um link profundo, em conexões móveis para móveis) codificando uma proposta de sessão; o aplicativo carteira verifica ou abre, estabelecendo um canal de comunicação encriptado e direto entre os dois, retransmitido através da própria infraestrutura de relé do WalletConnect sem que essa infraestrutura nunca veja o conteúdo assinado em texto simples.

## A ligação e o fluxo de assinatura

1. O dapp gera uma proposta de sessão e o exibe como um código QR.
2. O aplicativo carteira do usuário verifica o código, estabelecendo uma sessão criptografada com o dapp.
3. O dapp agora pode enviar solicitações (ver um endereço, solicitar uma assinatura, solicitar uma transação) durante esta sessão.
4. O aplicativo carteira recebe cada pedido, exibe-o ao usuário para aprovação explícita (exatamente o mesmo requisito de aprovação por ação [Conectando as Carteiras](./wallet-connections.md#o-que-conectar-realmente-concede-e-não)), e envia o resultado assinado de volta sobre o mesmo canal criptografado.

## Por que a criptografia importa aqui especificamente

Como o dapp e a carteira são dispositivos genuinamente separados que se comunicam através da internet aberta (relacionados através da infraestrutura do WalletConnect, não uma conexão direta), a sessão é de ponta a ponta criptografada especificamente de modo que a infraestrutura do relé em si (um terceiro nem o autor do dapp nem o usuário da carteira necessariamente tem qualquer relação direta com) não pode ler a transação real ou dados de assinatura passando por ele, apenas que *alguns* O tráfego criptografado está fluindo entre duas sessões emparelhadas.

## O que WalletConnect faz e não muda sobre o modelo de confiança subjacente

Isso vale a pena afirmar precisamente, uma vez que é fácil assumir um novo mecanismo de conexão altera as propriedades de segurança subjacentes: WalletConnect changes **como** Uma assinatura ou um pedido de transação chega à carteira para aprovação. Não muda **O quê?** essa solicitação realmente contém, ou a responsabilidade fundamental do usuário de revê-la cuidadosamente antes de aprovar. Os mesmos riscos de phishing e de assinatura maliciosa abrangidos [Conectando as Carteiras](./wallet-connections.md#por-que-esta-distinção-importa-para-a-segurança) aplicar idênticamente sobre uma sessão WalletConnect como eles fazem sobre uma conexão de extensão de navegador direto, um pedido disfarçado, malicioso parece o mesmo, independentemente de qual transporte o levou para a carteira para aprovação.

## Conceitos errôneos comuns

**WalletConnect não é uma carteira**. É um protocolo de conexão; a assinatura real, custódia da chave e aprovação da transação acontecem inteiramente dentro de qualquer aplicativo carteira que o usuário tenha escolhido usar, exatamente como com uma conexão navegador-extensão.

**Uma sessão do WalletConnect sendo "encriptada" não significa que um dapp malicioso não possa enviar um pedido malicioso através dele**. A criptografia protege o *transporte* da escuta pela infraestrutura do relé; não diz nada sobre se o *conteúdo* ser transportado (um pedido específico de transação ou assinatura) por si só é honesto ou seguro de aprovar, o que permanece inteiramente a responsabilidade do usuário de avaliar.

## Outras leituras

- [Documentação da CarteiraConectar](https://docs.walletconnect.com/)

---

[← Anterior: Conectando carteiras](./wallet-connections.md)
·
[Voltar para Construindo Aplicações Web3](./README.md)
·
[Próximo: Lendo Blockchain Estado →](./reading-state.md)
