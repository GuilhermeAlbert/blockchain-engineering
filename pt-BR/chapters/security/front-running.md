# Execução frontal

A propagação de transações públicas revela intenção pendente antes da execução. Um participante que vê uma transação rentável pode enviar outra transação projetada para executar primeiro. A capacidade de escolher ou influenciar a ordenação transforma visibilidade em uma superfície de ataque.

## Ordenação faz parte da execução

Duas transações individualmente válidas podem produzir resultados diferentes dependendo da ordem. Uma troca descentralizada muda reservas e, portanto, o preço visto pelo próximo comércio. Uma liquidação consome uma posição disponível. Um registro de nome, menta NFT, ou oportunidade de arbitragem pode ir para o primeiro chamador bem sucedido.

Usuários enviam ofertas de espaço de bloco através de taxas. Validadores ou construtores montam blocos sob restrições de protocolo, mas essas restrições não requerem ordenação pela primeira vez. Uma transação com uma taxa efectiva mais elevada pode ser efectuada mais cedo. Mudanças de fluxo de ordem privada que podem observar a transação antes da inclusão, não o fato de que alguma parte eventualmente decide sua posição.

## Ataques de sanduíches

Num sanduíche, um atacante coloca uma troca diante de uma vítima e outra depois dela. A primeira troca move o preço da pool contra a vítima. O comércio da vítima executa a um preço pior dentro do seu limite de deslizamento. O segundo atacante relaxa a posição às custas da vítima.

A configuração de deslizamento da vítima define quanto movimento adverso a transação vai tolerar antes de reverter. Um limite desnecessariamente largo deixa mais espaço extraível. Um limite zero ou extremamente apertado pode falhar sob a circulação normal do mercado. O limite correto depende da profundidade do pool, do tamanho do comércio, da volatilidade, do custo do gás e da tolerância do usuário à falha.

## Outros ataques de ordem

Um operador de cópia pode reproduzir uma transação pública rentável com uma taxa mais elevada. Um liquidante pode ultrapassar outro liquidatário. Um atacante pode colocar uma transação após uma mudança de estado conhecida, às vezes chamada de volta em execução, sem prejudicar a transação original. Os atacantes também podem preencher blocos ou direcionar uma conta específica com transações que revertam sua operação.

Nem toda reordenação é roubo. Arbitragem e liquidações podem manter os mercados alinhados e sistemas de empréstimo solvente. A questão de engenharia é se o protocolo aloca uma oportunidade intencionalmente ou vaza valor porque entradas pendentes revelam um resultado antes de qualquer pessoa compromete recursos.

## Mitigações e seus custos

Esquemas de submissão separam o compromisso da divulgação entre as transações, o que aumenta a latência e exige que os usuários retornem. Leilões em lote reduzem vantagens dentro de um lote, mas precisam de uma regra para a construção e limpeza de lotes. Submissão criptografada ou privada esconde intenção do mempool público, mas introduz confiança em relés, construtores, ou descriptografia limiar. Os projetos de preço-frequente ou uniforme mudam a economia da aplicação em vez de apenas o transporte de transações.

No nível de aplicação, aplicar prazos, produção mínima ou máximo entrada, nonces, e movimento de preços limitado. Esses campos limitam danos; eles não controlam a ordenação de blocos.

## Outras leituras

- [Documentação dos Flashbots](https://docs.flashbots.net/)
- [Operações Ethereum.org](https://ethereum.org/developers/docs/transactions/)
- Ver também: [Slippage](../defi/slippage.md), [O Mempool](../bitcoin/mempool.md)

---

[← Anterior: Flash Empréstimo Ataques](./flash-loan-attacks.md)
·
[Voltar à Segurança](./README.md)
·
[Próximo: MEV →](./mev.md)
