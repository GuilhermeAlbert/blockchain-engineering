# Riscos de atualização

Um proxy atualizável mantém estado e endereço em um contrato enquanto delega execução para código de implementação substituível. Isso torna os reparos possíveis, mas transforma a autoridade de atualização e compatibilidade de armazenamento em limites de segurança permanentes.

## O proxy executa o código no armazenamento do proxy

Com `delegatecall`, o código de implementação é executado no contexto do proxy. Lê e escreve afecta o armazenamento de proxy, `msg.sender` permanece o chamador externo, e os ativos permanecem no endereço proxy. Mudar a implementação muda a lógica que pode operar em todos os estados e fundos existentes.

A nova implementação deve interpretar o antigo armazenamento exatamente. Reordenar variáveis, alterar tipos incompatíveis, ou inserir campos no lugar errado pode fazer um slot de equilíbrio parecer ser um endereço ou sobrescrever uma semente de mapeamento. As lacunas de armazenamento e os layouts de espaços de nomes suportam a extensão planejada, mas as ferramentas ainda precisam dos layouts antigos e novos para comparar.

## A inicialização substitui a construção

Um construtor de implementação não inicializa o armazenamento de proxy. Contratos atualizáveis usam funções inicializador guardadas para que eles funcionem uma vez para a versão pretendida. Um guarda desaparecido permite a reiniciação. Uma implantação que deixe o proxy não iniciado pode deixar outra conta se tornar administrador. Uma implementação posterior pode adicionar estado e precisa de um reinicializador versionado sem reabrir inicialização anterior.

Os contratos de implementação devem desativar seus próprios inicializadores quando a inicialização direta criar um estado explorável ou confuso.

## Autoridade de atualização é autoridade de código

Quem pode alterar a implementação pode geralmente instalar lógica que transfere ativos, altera a contabilidade, desativa retiradas, ou destrói suposições que outros contratos dependem. Um multisig, DAO ou bloqueio temporal altera a forma como essa autoridade é exercida, não o seu âmbito.

Proxies transparentes e UUPS colocam lógica de atualização diferente. Em um proxy transparente, o proxy separa chamadas de administrador da delegação de usuários. Em UUPS, a implementação contém a função de autorização e atualização. Uma atualização UUPS com defeito pode remover ou expor o caminho em si. O padrão escolhido deve corresponder ao modelo de ferramentas e autorização utilizado na implantação.

## Operações de atualização mais seguras

Tratar uma atualização como uma migração, não uma substituição de código. Compare layouts de armazenamento, execute jogos antigos contra nova lógica, teste a inicialização exatamente uma vez, verifique o bytecode de implementação, simule a execução da governança e verifique cada integração cujos pressupostos mudaram. A fila atualiza através de um bloqueio de tempo quando os usuários precisam de uma janela de retirada, mantendo um processo de emergência governado separadamente somente se o produto precisar de um.

O monitoramento deve cobrir as propostas de atualização, mudanças de implementação, mudanças de administração, chamadas inicializadoras e alterações de papel. Grave as configurações de commit e compilador de código fonte para cada implementação para que o bytecode implantado possa ser reproduzido.

## Imutabilidade e caminhos de fuga

Remover a autoridade de atualização elimina uma superfície de ataque e um mecanismo de recuperação. Alguns sistemas fazem apenas módulos periféricos substituíveis, poderes de atualização de tampa, ou deixar os usuários sair durante um atraso. O design apropriado depende de quão caro é um bug congelado, quão confiável o administrador é, e se os usuários podem sair antes que uma alteração contestada seja executada.

## Outras leituras

- [OpenZeppelin atualiza a documentação](https://docs.openzeppelin.com/upgrades)
- [EIP-1967: slots de armazenamento de proxy](https://eips.ethereum.org/EIPS/eip-1967)
- [EIP-1822: Padrão de Proxy Atualizável Universal](https://eips.ethereum.org/EIPS/eip-1822)
- Ver também: [Contratos de proxy](../contracts/proxies.md), [Contratos Actualizáveis](../contracts/upgrades.md)

---

[← Anterior: Explorações de ponte](./bridge-exploits.md)
·
[Voltar à Segurança](./README.md)
·
[Próximo: Auditoria de contrato inteligente →](./auditing.md)

