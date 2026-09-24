# Flash Empréstimo Ataca

Um empréstimo flash empresta ativos sem garantia na condição de que o capital e taxa retorno antes da transação termina. Se o reembolso falhar, toda a transação reverte. A liquidez em flash pode ampliar uma exploração, mas não cria o preço vulnerável, regra de contabilidade, processo de governança ou verificação de acesso.

## O reembolso atómico altera o risco do mutuante

O credor chama a chamada do mutuário depois de transferir fundos. O mutuário pode negociar, liquidar posições, refinanciar dívida, ou realizar arbitragem em vários protocolos. Antes de retornar, o credor verifica o reembolso. A execução atómica de Ethereum significa que um empréstimo não pago volta com todas as acções intermédias.

O credor evita o risco de crédito normal porque nenhum estado final contém um empréstimo não remunerado. O mutuário recebe poder de compra temporário dentro de uma transação. Isso importa para protocolos cujas defesas assumem que um atacante não pode comandar capital suficiente para mover um mercado ou adquirir uma posição grande rapidamente.

## A causa raiz fica em outro lugar

Uma sequência comum é:

1. pedir emprestado uma grande quantidade atomicamente;
2. mover um preço fino on-chain ou adquirir peso de voto temporário;
3. convocar um protocolo que confie nesse estado;
4. extrair ativos sob a condição distorcida;
5. Inverter trocas suficientes para reembolsar o empréstimo;
6. manter o restante.

Remover o empréstimo flash pode aumentar o custo de financiamento do atacante, mas deixa a dependência inseguro. Um atacante rico ou grupo coordenado poderia executar a mesma lógica com capital próprio. O reparo pertence ao design de oráculo, contabilidade, instantâneos de governança, suposições de liquidez, ou qualquer regra convertida estado temporário em um privilégio valioso.

## Por que uma transação importa

A atomidade reduz a exposição ao mercado. O atacante não precisa manter uma posição manipulada através dos blocos, esperar por outro participante, ou arriscar ser incapaz de relaxar após a ação do protocolo. Cada perna é bem sucedida ou nenhuma é. Isso permite que um atacante avalie toda a rota antes de pagar mais do que gás para uma tentativa de reverter.

Os protocolos devem assumir que qualquer operação de carácter público pode ser composta por capital emprestado e outros contratos na mesma transação. Os cheques baseados no saldo inicial de uma conta, reservas instantâneas de um pool ou tokens detidas no momento de uma votação podem não representar compromisso econômico duradouro.

## Defesas apontam para a suposição

Use oráculos resistentes à manipulação, janelas de observação adequadas e múltiplas fontes para preços de alto valor. Basear o poder de governança em instantâneos tomados antes de uma proposta ou período de votação. Aplicar fatores de garantia conservadores e limites máximos de empréstimos a ativos com liquidez superficial. Validar invariantes após callbacks e através do caminho completo da transação.

Bloquear chamadas de contratos não é uma defesa duradoura. Contas inteligentes, chamadas proxy, construtores e modelos de conta em evolução tornam as restrições “somente de propriedade externa” frágeis, ao mesmo tempo que exclui a composabilidade legítima.

## Outras leituras

- [Aave flash empréstimos documentação](https://aave.com/docs/developers/flash-loans)
- [EIP-3156: Empréstimos Flash](https://eips.ethereum.org/EIPS/eip-3156)
- Ver também: [Empréstimos Flash](../defi/flash-loans.md), [Manipulação do Oracle](./oracle-manipulation.md)

---

[← Anterior: Manipulação Oracle](./oracle-manipulation.md)
·
[Voltar à Segurança](./README.md)
·
[Próximo: Front Running →](./front-running.md)
