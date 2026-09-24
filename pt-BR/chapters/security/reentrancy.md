# Reentrância

A reentrância ocorre quando um contrato convoca o código externo antes de terminar de atualizar sua própria contabilidade, e que o código externo retorna ao contrato original enquanto a primeira invocação ainda está ativa. A segunda chamada observa um estado intermediário que o desenvolvedor não pretendia usar.

## Fluxo de controle deixa o contrato

Uma chamada externa é uma transferência de controle, não um pagamento passivo. O destinatário pode executar uma função de backback, token hook ou lógica de contrato arbitrária. Esse código pode chamar o remetente novamente, chamar outra função compartilhando o mesmo estado, ou rotear através de vários contratos antes de retornar.

Considere uma função de retirada que lê um saldo, envia Ether, e então define o saldo como zero. Durante o envio, o destinatário chama `withdraw` Outra vez. O saldo armazenado ainda mostra o valor antigo, então ambas as invocações passam pela mesma verificação. O bug está na ordenação do estado e interação.

O mesmo padrão não se limita ao Éter. Os ganchos ERC-777, os callbacks de receptores NFT, os callbacks de empréstimos flash e as chamadas para integrações desconhecidas podem ser reentrados. Uma guarda em uma função pode ainda deixar reentrância de função cruzada se outra função pública ler ou alterar a mesma invariante.

## Controles, efeitos, interacções

O padrão de verificações-efeitos-interações ordena uma função em três fases:

1. validar permissões, saldos, prazos e outras condições prévias;
2. atualizar estado interno para que a operação já é contabilizada;
3. convocar contratos externos.

Se o destinatário ligar de volta durante a fase três, ele vê o saldo atualizado. Um guarda de reentrância adiciona um bloqueio que rejeita a entrada aninhada enquanto a chamada protegida está ativa. Os projetos de pull-payment registram um crédito e permitem que cada destinatário retire em vez de enviar fundos durante mudanças de estado não relacionadas.

Essas técnicas resolvem diferentes partes do problema. Um guarda pode evitar a execução aninhada, mas não repara a contabilidade incorreta. Checks-efeitos-interações protege um invariante apenas quando toda atualização relevante do estado ocorre antes da chamada. Puxar os pagamentos isolar falhas e reduzir o fluxo de controle compartilhado, mas a função de retirada ainda precisa de boa contabilidade.

## Reentrância apenas para leitura

Um callback não precisa modificar o contrato original para causar danos. Durante um estado intermediário, outro protocolo pode ler uma função de visualização e tratar seu resultado como um preço, valor de ações ou valor de garantia. A transação original termina mais tarde, mas o protocolo dependente já agiu sobre um valor que nunca foi feito para ser observável externamente.

Este é um problema de composibilidade. Um invariante que se mantém nos limites da transação pode ser temporariamente falso entre chamadas externas. Os desenvolvedores devem decidir quais estados intermediários outros contratos podem observar e se qualquer chamada externa ocorre enquanto os valores relatados são inconsistentes.

## Testando o invariante

Teste com um receptor que chama de volta através de cada caminho alcançável, não só a função nomeada no incidente original. Incluir entrada repetida, entrada através de uma função de irmão, callback após contabilidade parcial e ganchos de integração. Os testes invariantes devem impor regras de conservação em todo o gráfico de chamadas, como o total das reivindicações dos usuários que nunca excedem os ativos detidos.

## Outras leituras

- [Considerações de segurança da solidez: reentrância](https://docs.soliditylang.org/en/latest/security-considerations.html#reentrancy)
- [OpenZeppelin ReentrancyGuard API](https://docs.openzeppelin.com/contracts/5.x/api/utils#ReentrancyGuard)
- Ver também: [Funções Payable](../contracts/payable.md), [Empréstimos Flash](../defi/flash-loans.md)

---

[← Anterior: Ataques de aprovação](./approval-attacks.md)
·
[Voltar à Segurança](./README.md)
·
[Próximo: Controle de Acesso →](./access-control.md)
