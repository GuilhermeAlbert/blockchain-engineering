# Contas de Contrato

Uma conta de contrato é uma conta Ethereum cujo comportamento é definido por código, bytecode EVM, executado sempre que a conta é chamada. Este capítulo abrange o modo como as contas contratuais diferem das contas [EOAs](./eoa.md), como eles entram em existência, e a limitação específica que molda quase todas as outras decisões de design abrangidas pelo [Contratos Inteligentes](../contracts/README.md) seção mais tarde neste livro.

## O que o torna uma conta de contrato

Lembrar a estrutura compartilhada de quatro campos de [Contas Ethereum](./accounts.md#qual-a-composição-de-todas-as-contas): uma conta de contrato tem os campos idênticos que um EOA tem, mas o seu `codeHash` aponta para um bytes EVM real e não vazio (ver [Bytecode](../evm/bytecode.md)), e normalmente tem armazenamento persistente não-vazio (suas `storageRoot` apontando para um real [Merkle Patricia Trie](./state-trie.md) de dados de valor-chave armazenados), o código de contrato da conta e estado armazenado são o que implementa qualquer lógica que o contrato fornece.

## Como uma conta de contrato entra em existência

Uma conta de contrato é criada por uma transação especial (ou uma chamada interna usando o `CREATE` ou `CREATE2` Opcode. Ver [Criação de Contratos](../evm/contract-creation.md)) que inclui: **código de inicialização**, um pedaço de código EVM que funciona exatamente uma vez, no momento da criação, e cujo *valor de retorno* torna-se o novo contrato de código permanente, armazenado em andamento. Esta estrutura de dois passos (código inicial que roda uma vez e retorna o código para armazenar de fato) é o que permite que a lógica construtora de um contrato (configurando valores iniciais de armazenamento, por exemplo) funcione sem que a lógica construtora se torne parte do bytecode permanente do contrato.

```text
Contract creation transaction:
  data: <init code>
           │
           │  init code executes once, at creation
           ▼
      returns: <runtime code>
           │
           ▼
  new contract account's codeHash now points to <runtime code>
  (the init code itself is discarded, not stored)
```

## A limitação central: um contrato não pode agir por conta própria

Isto vale a pena afirmar o mais claramente e diretamente possível, porque molda uma enorme quantidade de design a jusante no [DeFi](../defi/README.md) e um ecossistema de contratos inteligentes mais amplo: **Uma conta de contrato não tem capacidade para iniciar qualquer acção por si só.** Ele só pode executar em resposta a ser chamado, por uma transação originada de um EOA, ou por uma chamada de outro contrato que é ele próprio, rastreando de volta através da cadeia de chamadas, em última instância desencadeada pela transação de um EOA (ver [EOAs](./eoa.md#cada-transação-remonta-a-um-eoa)). Um contrato não pode "despertar" e agir em um horário futuro programado, não pode monitorar as condições externas e reagir automaticamente, e não pode decidir espontaneamente fazer nada. É inteiramente, estruturalmente **passivo** até ligarmos.

É precisamente por isso que os sistemas que necessitam de algo para acontecer automaticamente (liquidar um empréstimo sub-garantido no momento em que se torna elegível (ver [Liquidações](../defi/liquidations.md)), por exemplo) dependem de participantes externos, off-chain (muitas vezes chamados de "keepers" ou "bots") que observam as condições on-chain e submetem a transação desencadeante eles mesmos, normalmente ganhando uma taxa para fazê-lo, em vez de qualquer mecanismo interno ao contrato iniciando a ação sem prompção.

## Conceitos errôneos comuns

**Uma conta de contrato não está "executando" continuamente no fundo** como um processo de servidor convencional faz. Seu código executa apenas para a duração específica de uma única chamada, em seguida, pára completamente até que a próxima chamada chegue; não há persistente, sempre-em execução acontecendo entre chamadas, apenas persistente *armazenamento* (ver [Armazenamento](../evm/storage.md)) reter estado de uma chamada para a próxima.

**A implantação de um contrato não requer que o implementador mantenha qualquer relação permanente com ele** a menos que o próprio código do contrato conceda especificamente privilégios especiais e em curso (uma função de proprietário, por exemplo, ver [Controle de acesso](../security/access-control.md)), um contrato sem tais papéis privilegiados incorporados em seu código opera inteiramente de acordo com sua própria lógica fixa, independente de quem o implantou originalmente.

## Outras leituras

- [Papel Amarelo Ethereum](https://ethereum.github.io/yellowpaper/paper.pdf): Seção 7 (Criação de contratos)
- [ethereum.org: Contas](https://ethereum.org/en/developers/docs/accounts/#contract-accounts)

---

[← Anterior: Contas de propriedade externa](./eoa.md)
·
[Voltar para Ethereum](./README.md)
·
[Próximo: Transações Ethereum →](./transactions.md)
