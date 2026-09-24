# Validadores e Mineradores

Produtores de blocos escolhem transações e estendem uma cadeia sob regras aplicadas pela validação de nós. Eles podem influenciar ordenação, inclusão, sinalização, e que ramo válido eles constroem. Eles não podem tornar uma transição de estado inválida válida para nós que verificam independentemente as regras.

## Sinalização é coordenação

Bitcoin bits de versão deixar mineradores sinal prontidão para um soft fork. O sinal ajuda a coordenar a ativação e estimar a implantação. Não é prova de que usuários, trocas, carteiras ou todos os nós suportem a mudança, e não concede autoridade aos mineradores sobre decisões de protocolo não relacionadas.

Os validadores Ethereum atestam bloqueios e finalidades segundo suas regras de cliente. Atualizações de protocolo são coordenadas através de versões do cliente e ativação programada, não uma votação geral do validador. Validadores escolher se instalar software compatível e pode continuar outro fork, sujeito a corte e consequências de mercado dentro de cada sistema.

## Ordem e censura

O proponente atual pode incluir, omitir ou ordenar transações dentro de restrições de protocolo. A censura persistente requer uma influência repetida entre proponentes ou infraestruturas como construtores e relés. Os mercados de taxas e o MEV criam incentivos para encomendas específicas.

Os usuários podem encaminhar em torno de um censura através de outros pares, caminhos de submissão privados, ou mais tarde proponentes. Isso não torna a censura de curto prazo inofensiva para leilões, liquidações ou governança sensível ao tempo.

## A maioria tem limites.

O poder do hash da maioria pode reorganizar o histórico recente da prova do trabalho e censurar transações, mas não pode gastar moedas sem assinaturas ou criar blocos que violem regras impostas por nós. Uma supermaioria de prova de participação pode finalizar comportamentos conflitantes ou censurantes em condições de protocolo, com penalizações e considerações de recuperação social definidas pelo sistema.

Os atores econômicos podem responder rejeitando um ramo, mudando software ou coordenando um fork. Tais respostas são dispendiosas e incertas. A capacidade técnica e a legitimidade da governança são questões distintas.

## Outras leituras

- [BIP 9](https://github.com/bitcoin/bips/blob/master/bip-0009.mediawiki)
- [Ethereum prova de participação](https://ethereum.org/developers/docs/consensus-mechanisms/pos/)
- Ver também: [Sinalização Miner](../forks/miner-signaling.md), [Validadores](../ethereum/validators.md)

---

[← Anterior: Desenvolvedores Principais](./core-developers.md)
·
[Voltar à Governança](./README.md)
·
[Próximo: Usuários e Operadores de Nós →](./users.md)
