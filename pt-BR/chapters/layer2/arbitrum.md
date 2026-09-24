# Arbitrum

Arbitrum, construído pela Offchain Labs, é o mais alto volume de lançamento otimista de Ethereum e estudo de caso para [Rollups Optimistas](./optimistic-rollups.md) e [Provas de Fraude](./fraud-proofs.md) na produção real. Sua história inclui uma diferença honesta e digna de nome entre o modelo teórico de segurança à prova de fraude e o que foi efetivamente implantado nos seus primeiros anos.

## Lançar e reescrever o Nitro

Arbitrum Um lançado na mainnet Ethereum em beta em maio de 2021, abrindo para uso geral em agosto. Em agosto de 2022, Arbitrum migrou para **Nitro**, uma reescrita substancial de sua pilha de tecnologia subjacente que compila o próprio cliente do Ethereum Geth diretamente no ambiente WebAssembly O sistema à prova de fraude da Arbitrum usa para verificar interativamente as etapas de execução disputadas (ver [Provas de Fraude](./fraud-proofs.md#provas-de-fraude-interactivas-limitar-a-uma-etapa-contestada)), melhorando significativamente tanto a compatibilidade EVM e desempenho sobre o ambiente de execução anterior, personalizado Arbitrum originalmente lançado com.

## A lacuna de validação autorizada, e BOLD

Por anos após o lançamento, o sistema de disputas à prova de fraude da Arbitrum, enquanto projetava o caminho [Provas de Fraude](./fraud-proofs.md) descreve geralmente, era apenas realmente utilizável por um conjunto autorizado, Offchain-Labs-aprovado de validadores, não genuinamente aberto a ninguém, porque o protocolo de disputa como originalmente construído era vulnerável a ataques de negação de serviço se aberto a participantes arbitrários. Essa é uma lacuna real e honesta que vale a pena nomear diretamente: para um trecho significativo da história da Arbitrum, o modelo de segurança à prova de fraude estava mais perto do teórico do que totalmente operacional na prática, uma vez que uma parte não autorizada não poderia realmente apresentar um desafio, mesmo que eles detectassem fraude. **OURO** (Bounded Liquidity Delay), o protocolo de disputa redesenhado da Offchain Labs que resolve essa vulnerabilidade específica de negação de serviço, foi ao vivo na rede principal da Arbitrum One, permitindo a validação genuinamente sem permissão pela primeira vez desde o lançamento.

## Conceitos errôneos comuns

**A segurança à prova de fraude da Arbitrum não foi uniformemente "permissão" ao longo de toda a sua história.** A validação genuinamente aberta e sem permissão é uma adição comparativamente recente (via BOLD); qualquer pessoa que avalie o modelo de segurança da Arbitrum em um ponto específico no tempo deve verificar se esse período antecede ou pós-data esta atualização específica, em vez de assumir o modelo de disputa totalmente descentralizado descrito em [Provas de Fraude](./fraud-proofs.md) Foi sempre um agente.

**"Arbitrum" não se refere a uma única cadeia.** O Offchain Labs opera várias cadeias de Arbitrum (Arbitrum One e Arbitrum Nova, com diferentes tradeoffs de disponibilidade de dados) e a pilha de tecnologia subjacente da Arbitrum também é usada por inúmeras cadeias de Arbitrum Orbit operadas independentemente, semelhante em espírito ao ecossistema OP Stack coberto em [Optimism](./optimism.md).

## Outras leituras

- [Documentação Arbitrum](https://docs.arbitrum.io/)
- [Whitepaper Nitro Arbitrum](https://github.com/OffchainLabs/nitro/blob/master/docs/Nitro-whitepaper.pdf)
- Ver também: [Rollups Optimistas](./optimistic-rollups.md), [Provas de Fraude](./fraud-proofs.md)

---

[← Anterior: Mensagens Cross-Chain](./cross-chain-messaging.md)
·
[Voltar à Camada 2](./README.md)
·
[Próximo: Optimism →](./optimism.md)
