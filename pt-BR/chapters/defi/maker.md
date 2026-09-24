# MakerDAO / Sky

O MakerDAO é o protocolo por trás do DAI, a chave estável criptolateralizada desta seção [Moedas estáveis garantidas](./collateralized-stablecoins.md) capítulo usado como seu exemplo trabalhado. Sua história inclui tanto o teste de estresse mais claro do mundo real que qualquer moeda estável cripto-colateralizada enfrentou e um rebrand recente, substancial, ambos valem a pena cobrir diretamente.

## Origens e lançamento de uma garantia única

O MakerDAO foi fundado por Rune Christensen, com desenvolvimento a partir de 2014. O sistema DAI original (agora referido como DAI monocolateral, ou "Sai") lançado na mainnet Ethereum em 18 de dezembro de 2017, aceitando apenas ETH como garantia. O sistema deste livro [Moedas estáveis garantidas](./collateralized-stablecoins.md) o capítulo descreve, com um conjunto mais amplo de ativos de garantia aprovados, **DAI multicolateral**, que o protocolo atualizou para em 2019.

## Quinta-feira preta: 12 de março de 2020

Em 12 de março de 2020, o preço da ETH caiu cerca de 43% em um único dia, parte de um colapso de mercado mais amplo e repentino em ambos os mercados cripto e tradicionais. Isso desencadeou liquidações em massa através dos cofres da MakerDAO, e expôs uma fraqueza específica no mecanismo de liquidação de leilões como projetado na época: a própria rede de Ethereum ficou severamente congestionada com o aumento dos preços do gás, que tanto atrasou as atualizações de preço oráculo e tornou difícil para os detentores (os liquidatários cobertos em geral em [Liquidações](./liquidations.md#quem-realiza-liquidações-e-porquê)) participar normalmente nos leilões de garantias. Com pouca atividade de licitação concorrente, pelo menos um participante foi capaz de ganhar leilões de liquidação para grandes quantidades de garantias ETH em licitações perto de zero DAI, em vez de qualquer coisa perto do valor de mercado real da garantia. Estimativas relatadas do déficit resultante variam de fonte, mas o evento deixou vários milhões de dólares de DAI em todo o sistema de garantia, um caso genuíno, documentado de um mecanismo de liquidação de uma moeda estável criptolateralizada não funcionar como pretendido sob condições de mercado extremas, congestionadas, exatamente o tipo de cenário sinalizado em geral [Moedas estáveis garantidas](./collateralized-stablecoins.md#conceitos-errôneos-comuns).

A governança do MakerDAO respondeu, cunhando e leiloando o novo MKR (toque de governança do protocolo na época) para cobrir o déficit, e depois retrabalhando o próprio mecanismo de liquidação para reduzir o mesmo modo de falha recorrente.

## O Sky rebrand

Em 27 de agosto de 2024, o MakerDAO foi renomeado como **Protocolo Sky**, o primeiro lançamento sob um plano multi-ano mais amplo o projeto chama Endgame. A DAI tornou-se actualizável para uma nova stablecoin, **USDS**, a uma taxa fixa de 1:1, e MKR tornou-se atualizável para um novo token de governança, **SKY**, a uma taxa fixa de 24.000 SKY por MKR. Nenhuma atualização é obrigatória: DAI e MKR continuam a existir e funcionam como tokens legados para titulares que optam por não converter, com os próprios contratos de conversão do protocolo cunhando e queimando entre os tokens antigos e novos sob demanda em qualquer direção.

## Conceitos errôneos comuns

**A quinta-feira negra não foi causada por uma falha no próprio conceito de super-colateralização.** Foi causada por uma fraqueza específica, já modificada, na forma como o mecanismo de liquidação de leilões se comportou sob congestionamento de rede extremo, uma falha de nível de mecanismo e de condições de mercado, não evidenciando que as moedas estáveis super-colateralizadas são fundamentalmente insensatas; o protocolo continuou operando e o peg da DAI recuperou depois.

**"DAI" e "USDS" não são duas diferentes, competindo stealcoins.** São dois nomes para tokens que o mesmo protocolo torna livremente conversíveis a uma taxa fixa de 1:1; um detentor de um pode sempre trocá-lo pelo outro através de contratos próprios da Sky, e ambos permanecem parte do mesmo sistema subjacente.

## Outras leituras

- [Documentação do Protocolo Sky](https://docs.sky.money/)
- [Whitepaper do MakerDAO](https://makerdao.com/en/whitepaper/)
- Ver também: [Moedas estáveis garantidas](./collateralized-stablecoins.md), [Liquidações](./liquidations.md)

---

[← Anterior: Aave](./aave.md)
·
[Voltar para DeFi](./README.md)
·
[Próximo: Curve →](./curve.md)
