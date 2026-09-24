# Manipulação do Oracle

Um oráculo transforma informações de fora de um contrato em estado que o contrato pode ler. O contrato não pode saber se esse estado representa um preço de mercado justo, um pool fino movido por um bloco, uma atualização antiga, uma fonte quebrada, ou um valor publicado por um operador comprometido. Ele só pode impor as regras de validação que os desenvolvedores escreveram em torno do feed.

## Um preço é um procedimento de medição

“Use o preço ETH” deixa questões importantes sem resposta:

- Que mercado ou conjunto de mercados?
- O valor é um preço à vista, mediana ou média ponderada pelo tempo?
- Com que frequência pode ser actualizado?
- Que idade tem a última resposta?
- O que acontece quando as fontes discordam?
- Que unidade e escala decimal usa?
- Alguém pode mover o mercado fonte barato em relação ao valor protegido?

Um preço spot de um fabricante de mercado automatizado é a atual relação de reserva do pool. Uma troca pode movê-lo. Se um protocolo de concessão de empréstimos utilizar esse rácio para a garantia de valor na mesma transação, um atacante pode negociar contra o pool, desencadear a avaliação, contrair empréstimos ou liquidar sob o preço distorcido, em seguida, reverter o comércio.

## Custo de manipulação versus valor extraível

A comparação relevante não é se mover um mercado custa dinheiro. É se o atacante pode recuperar esse custo e extrair mais valor do protocolo dependente. O empréstimo atômico pode fornecer capital temporário, e o atacante pode descontrair a manipulação antes do fim da transação. Taxas e impacto de preços tornam-se custos de ataque dentro de um cálculo maior.

A maior liquidez aumenta o custo de manipulação. Os preços ponderados no tempo obrigam um atacante a manter a distorção entre as observações, expondo o capital à arbitragem e ao movimento do mercado. Várias fontes independentes reduzem a dependência de um local. Nenhuma dessas escolhas cria um oráculo universal seguro. O valor protegido, frequência de atualização, condições de cadeia e comportamento de falha determinam se o custo é suficiente.

## Frescura e vida

Uma resposta assinada corretamente pode ser velha. Os contratos devem inspecionar o calendário de atualização do feed e rejeitar valores mais antigos do que um limiar específico do protocolo. O limiar deve reflectir o mercado e a aplicação. Um mercado de garantias em rápida evolução e um processo de liquidação lento requerem limites diferentes.

A rejeição de dados obsoletos preserva a integridade dos preços, mas pode impedir liquidações ou retiradas. Aceitar o último valor preserva a vida, mas pode criar má dívida. Este tradeoff precisa de um estado de emergência explícito, não uma consequência acidental de um horário não controlado.

## Validação no consumidor

Validar valores positivos, decimais, timestamps, completude redonda onde a interface o expõe, e desvio razoável de outra observação quando existe uma comparação. Tratar endereços de alimentação e setters de configuração como controle de acesso de alto impacto. Um feed seguro encaminhado através de um ponteiro mutável é tão confiável quanto a conta que pode mudar o ponteiro.

Os disjuntores podem conter a rapidez com que um valor muda ou pausa ações sensíveis. Eles também criam casos de borda durante verdadeiras lacunas de mercado. Um limite máximo que atrasa a realidade pode proteger contra a manipulação, atrasando as liquidações necessárias e aumentando a insolvência.

## Outras leituras

- [Documentação de fontes de dados de ligação em cadeia](https://docs.chain.link/data-feeds)
- [Whitepaper Uniswap v2](https://uniswap.org/whitepaper.pdf), incluindo os preços cumulativos para as observações ponderadas no tempo
- Ver também: [Oráculos](../defi/oracles.md), [Liquidações](../defi/liquidations.md)

---

[← Anterior: Inteiro e Insetos de Precisão](./precision.md)
·
[Voltar à Segurança](./README.md)
·
[Próximo: Flash Empréstimo Ataques →](./flash-loan-attacks.md)
