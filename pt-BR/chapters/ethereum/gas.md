# Gás

Gás é a unidade de Ethereum para medir trabalho computacional, cada operação EVM custa uma quantidade específica, fixa de gás, e uma transação deve pagar por cada unidade que consome. Este capítulo cobre por que Ethereum precisa deste mecanismo em tudo, uma distinção Bitcoin não-Turing-completo [Programa](../bitcoin/script.md#o-projeto-uma-máquina-de-pilha-deliberadamente-não-turing-completo) Nunca tive de resolver.

## O gás problema resolve

Recordar de [Bitcoin Script](../bitcoin/script.md#o-projeto-uma-máquina-de-pilha-deliberadamente-não-turing-completo) que a linguagem de script do Bitcoin deliberadamente exclui loops especificamente para garantir que o tempo de execução de cada script é limitado e previsível com antecedência. Ethereum's. [EVM](../evm/README.md) faz a escolha oposta: é **Turing-completo**, suportando loops arbitrários e computação geral, que cria um problema real, um loop infinito ou extremamente longo poderia deixar qualquer um forçar cada nó na rede a gastar tempo ilimitado e recursos que validam uma única transação, um vetor de negação de serviço sem limite natural. Gás é o mecanismo que fecha esta lacuna: cada operação custa gás, uma transação especifica um gás máximo que está disposto a gastar, e execução simples **paradas** (revertendo todas as alterações de estado exceto o pagamento da taxa) o momento em que esse limite é alcançado, não importa o que o código ainda estava tentando fazer.

## Como são atribuídos os custos do gás

Cada opcode EVM (ver [Opcodes](../evm/opcodes.md)) tem um custo fixo, protocolo-definido de gás, aproximadamente calibrado para o real computacional e carga de armazenamento que a operação coloca em cada nó que tem que processá-lo e armazená-lo, uma operação aritmética simples custa muito pouco gás; escrevendo novos dados para custos de armazenamento persistentes consideravelmente mais, uma vez que cada nó completo tem que armazenar esses dados indefinidamente indo para frente, não apenas calcular algo transiente. Esta calibração não é deliberadamente "uma unidade de gás é igual a um ciclo de CPU" em qualquer sentido físico preciso. Trata-se de uma aproximação econômica, periodicamente revista e ajustada através do processo EIP (ver [EIP](../governance/eips.md)) como os custos do mundo real e padrões de ataque tornam-se mais bem compreendidos.

## Limite de gás versus gás utilizado versus preço do gás

Três quantidades relacionadas, mas distintas, fáceis de misturar:

- **Limite de gás**: o gás máximo que o remetente de uma transação o autoriza a consumir, um teto de segurança, definido pelo remetente (normalmente via estimativa de software de carteira), não um alvo.
- **Gás utilizado**: o gás real consumido durante a execução, sempre inferior ou igual ao limite de gás; qualquer gás não utilizado (limite menos utilizado) é reembolsado ao remetente, eles só pagam pelo que foi realmente consumido.
- **Preço do gás** (ou, desde EIP-1559, a combinação eficaz de taxa de base e dica, ver [Preço do gás e taxas](./fees.md)): quanto o remetente paga *por unidade de gás*, convertendo o custo de gás-denominado em uma quantidade de éter real.

```text
Total fee paid = gas used × gas price (or effective gas price, post-EIP-1559)

NOT: gas limit × gas price — unused gas is refunded, not charged
```

## O que acontece quando uma transação fica sem gás

Se a execução atingir o limite de gás antes de completar, o EVM pára imediatamente com um erro de "saída de gás", e **cada mudança de estado a transação tentada é revertida**, como se a transação nunca tivesse sido executada, com uma exceção crucial: o gás realmente consumido até esse ponto ainda é pago ao produtor do bloco, e não é reembolsado. Esta é uma escolha de projeto deliberada: o trabalho computacional de tentar (e falhar) a transação ainda era trabalho real cada nó teve que executar, e o gás existe especificamente para compensar o trabalho real feito, não só para resultados bem sucedidos.

## Conceitos errôneos comuns

**Gás não é uma criptomoeda separada**. É uma unidade de conta para o custo computacional, sempre em última análise pago em éter (denominado a qualquer preço do gás aplicável); não há "botão de gás" separado para segurar ou trocar.

**Uma transação falhando (correndo fora do gás, ou batendo um `revert`) não é livre**, o gás consumido até o ponto de falha ainda é carregado; *alterações de estado* são desfeitos, não a taxa para o cálculo já realizado. Este é um erro real, às vezes caro para desenvolvedores que assumem uma transação falhada não custa nada.

## Outras leituras

- [Papel Amarelo Ethereum](https://ethereum.github.io/yellowpaper/paper.pdf): Apêndice G (Fee Schedule)
- [ethereum.org: Gás](https://ethereum.org/en/developers/docs/gas/)

---

[← Anterior: Transações Ethereum](./transactions.md)
·
[Voltar para Ethereum](./README.md)
·
[Próximo: Preço do gás e taxas →](./fees.md)
