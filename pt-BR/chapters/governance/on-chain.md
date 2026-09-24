# Governança em curso

A governança on-chain registra propostas e votos em contratos e pode executar ações aprovadas sem um assinante humano separado. O contrato torna a contagem e execução inspecionáveis, mas o design ainda escolhe quem tem poder e quais ações estão dentro dele.

## Ciclo de vida da proposta

Um ciclo de vida comum é a criação de propostas, atraso de votação, instantâneo, período de votação, verificação de quórum e limiar, fila de espera, atraso no tempo, em seguida, execução. A proposta contém calldata e metas, de modo que os eleitores autorizam mudanças concretas do estado em vez de um resumo de prosa sozinho.

Interfaces devem decodificar todas as ações. Uma proposta intitulada “atualização de parâmetros de rotina” também pode conceder uma função ou transferir ativos se os calldata empacotados permitirem.

## Potência de votação

A votação pode usar saldos de tokens, saldos delegados, posições em jogo, NFTs, reputação ou registros de um membro e um voto. Sistemas ponderados em token são fáceis de compor com ativos on-chain e herdam sua concentração, empréstimo, custódia e comportamento de delegação.

Instantâneos fixam o poder de voto em um bloco e impedem transferências de votar repetidamente. O quórum requer um nível mínimo de participação. Os limites de uma proposta podem ser apresentados. Esses controles moldam o acesso e a vida; nenhum estabelece que a maioria escolheu uma ação segura.

## Fechamentos do tempo e vias de emergência

Um bloqueio de tempo separa a decisão da execução. Os usuários podem inspecionar chamadas, sair ou coordenar uma resposta durante o atraso. O bloqueio temporal deve manter as funções relevantes. Se outro administrador pode atualizar ou transferir imediatamente, o atraso é cosmético.

Conselhos de emergência podem parar ou vetar ataques mais rápido do que o voto simbólico. Sua adesão, limiar, escopo, duração e processo de remoção precisam de definição pública. Poder de emergência que nunca expira torna-se a camada de governança eficaz.

## Ataques de governança

As ameaças incluem poder de voto emprestado, delegados comprometidos, cargas úteis de propostas maliciosas, captura de baixa rentabilidade, negação de quórum, erros de execução e atualizações para o próprio governador. Teste todo o ciclo de vida e gráfico de autoridade. Monitore a criação da proposta, as alterações de votação onde permitido, fila, cancelamento e execução.

## Outras leituras

- [Governança do OpenZeppelin](https://docs.openzeppelin.com/contracts/5.x/governance)
- [API de Governador do OpenZeppelin](https://docs.openzeppelin.com/contracts/5.x/api/governance)
- Ver também: [Flash Empréstimo Ataca](../security/flash-loan-attacks.md), [Controle de acesso](../security/access-control.md)

---

[← Anterior: DAOs](./daos.md)
·
[Voltar à Governança](./README.md)
·
[Próximo: Governança Off-Chain →](./off-chain.md)
