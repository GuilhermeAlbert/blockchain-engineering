# Construindo Aplicações Web3

O leitor deste livro é um engenheiro de software, e esta seção é onde isso mais importa diretamente: ele mostra como o código TypeScript e React fala com a infraestrutura blockchain coberta em cada seção anterior. A maioria dos exemplos não dependentes de navegadores desta seção foram executados contra dados live, mainnet reais, pseudocódigo não ilustrativo, consultas reais verificadas contra contratos implantados.

## O que você precisa saber primeiro

[JSON- RPC](../ethereum/json-rpc.md), [Contas Ethereum](../ethereum/accounts.md), e [Contrato ABI](../contracts/abi.md). Esta seção constrói padrões de camada de aplicação diretamente em cima daqueles mecânicos subjacentes, e assume que você entende o que um `readContract` chamada ou uma transação assinada está realmente fazendo por baixo.

## Capítulos

1. [Fornecedores de RPC](./rpc-providers.md): o que você está realmente confiando quando você consulta um endpoint de terceiros
2. [Conectando as Carteiras](./wallet-connections.md): EIP-1193, e exatamente o que uma conexão faz e não concede
3. [WalletConnect](./walletconnect.md): ponte de um dapp para uma carteira em um dispositivo diferente inteiramente
4. [Ler o Estado da Cadeia de Blocos](./reading-state.md): porque as leituras são gratuitas, verificadas contra o fornecimento total vivo da WETH
5. [Contratos de chamada](./calling-contracts.md): call vs. transaction, e porque você simula antes de enviar
6. [Enviando Transações](./sending-transactions.md): o ciclo de vida completo, e as duas formas distintas uma transação pode falhar
7. [Assinando Mensagens](./signing-messages.md): autenticação sem gás, verificado de ponta a ponta, e o prefixo EIP-191 que o torna seguro
8. [Dados tipados e EIP-712](./eip-712.md): assinaturas estruturadas, legíveis pelo homem, verificadas com uma verdadeira viagem de ida e volta
9. [Recibos de transação](./receipts.md): um recibo real, histórico da rede principal, campo decodificado por campo
10. [Indexação de eventos](./event-indexing.md): a live eth getLogs que retorna 187 transferências WETH reais
11. [viem](./viem.md): a biblioteca por trás de cada exemplo de código nos capítulos do Ethereum-side deste livro
12. [wagmi](./wagmi.md): Reagir ganchos para os problemas de gestão do estado viem deliberadamente deixa sozinho

## Compilar um

[exemplos/estatísticas da carteira/](../../../examples/wallet-stats/) é uma aplicação pequena e executável construída diretamente nos padrões desta seção, lendo saldos reais e histórico de transações para qualquer endereço que você lhe dê.

## Próxima

Continuar a [DeFi](../defi/README.md), onde os padrões de chamada de contrato e leitura de eventos dessa seção são aplicados aos protocolos de câmbio e empréstimo descentralizados reais e vivos.
