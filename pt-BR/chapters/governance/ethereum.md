# Governança Ethereum

Ethereum muda através de um processo de coordenação off-chain envolvendo autores, pesquisadores, equipes de clientes, desenvolvedores de aplicativos, validadores, operadores de nó, provedores de infraestrutura e usuários. Os saldos de ETH na cadeia não votam diretamente atualizações de protocolo em vigor.

## EIP principais e atualizações de rede

Um EIP Core especifica um consenso ou mudança de rede. Autores desenvolver a proposta e recolher feedback. Equipes de clientes discutem implementação e coordenação, inclusive através de chamadas AllCoreDevs. As mudanças de candidatos recebem implementações e testes entre clientes antes da inclusão em uma atualização de rede chamada.

As coordenadas de ponto de ativação programadas são compatíveis. Os validadores propõem e atestam segundo as regras implementadas por seus clientes. Nós executando regras incompatíveis antigas podem seguir uma cadeia diferente ou parar de rastrear a rede atualizada corretamente.

A AllCoreDevs fornece coordenação técnica entre os implementadores. Não se trata de uma legislatura legal ou de uma votação ponderada em tokens. O seu difícil consenso pressupõe que a proposta é tecnicamente sólida e não suficientemente controversa para dividir a rede. Uma maior discordância social pode tornar insuficiente o consenso de implementação.

## Vários clientes e especificações

Ethereum separa as especificações do protocolo de vários clientes independentes de execução e consenso. Isso limita a dependência de uma base de códigos e força o comportamento ambíguo em testes e especificações compartilhados. Ele também expande o trabalho de coordenação: cada cliente de produção deve implementar transições de estado compatíveis, rede e ativação de forks.

A diversidade de clientes importa operacionalmente. Um defeito em uma cliente maioria pode ameaçar a finalidade ou criar comportamento correlacionado. Usuários e operadores de apostas influenciam esse risco através da escolha do cliente mesmo quando não participam de reuniões de protocolo.

## A fusão como um caso de coordenação

A Merge substituiu a prova de trabalho por prova de participação em anos de pesquisa, especificações, testnets, implementação do cliente, preparação de infraestrutura e uma condição de ativação coordenada. Nenhum voto inteligente de um contrato o aprovou. Trocas, aplicações, operadores de nó e validadores preparados porque eles esperavam que a cadeia atualizada para manter a adoção social e econômica.

Os participantes da prova de trabalho poderiam continuar o software incompatível, e EthereumPoW o fez. A existência desse fork mostra que as regras de software podem divergir. A adoção relativa de ativos, aplicativos, moedas estáveis, oráculos e usuários determina qual ecossistema cada fork retém.

## O que permanece fora da governança central

As aplicações podem ser implantadas sem aprovação do protocolo. Os emissores de token, os rollups, as carteiras e os DAO governam seus próprios sistemas sob regras separadas. Suas decisões podem influenciar o roteiro da Ethereum, mas não se tornam regras de protocolo a menos que clientes e usuários adotem alterações correspondentes.

## Outras leituras

- [Governança Ethereum](https://ethereum.org/governance/)
- [EIP-1](https://eips.ethereum.org/EIPS/eip-1)
- [Especificações de execução Ethereum](https://github.com/ethereum/execution-specs)
- [Especificações de consenso Ethereum](https://github.com/ethereum/consensus-specs)

---

[← Anterior: Governança de Bitcoin](./bitcoin.md)
·
[Voltar à Governança](./README.md)
·
[Próximo: BIPs →](./bips.md)
