# Auditoria inteligente de contratos

Uma auditoria de contrato inteligente é uma revisão limitada de código, configuração, pressupostos e documentação especificados em uma revisão específica. Pode encontrar defeitos e desafiar o design. Ele não pode provar que o código implantado permanecerá seguro sob cada integração, decisão de governança, condição de mercado ou atualização posterior.

## Âmbito define o resultado

Um relatório de auditoria deve identificar hashes, contratos, versões do compilador, dependências, pressupostos de implantação, componentes excluídos e o período de revisão. Um relatório para um contrato simbólico não cobre a ponte que o menta. Um relatório para uma implementação não estabelece que o proxy aponta para essa implementação ou que a inicialização utiliza os valores pretendidos.

A revisão começa com invariantes e autoridade. Que equilíbrios devem reconciliar-se? Quem pode menta, retirar, pausar, atualizar ou mudar um oráculo? Os usuários podem sempre sair sob condições definidas? Quais contratos externos e serviços off-chain o sistema confia?

Sem essas declarações, os revisores podem encontrar erros de codificação locais enquanto faltam um projeto que implementa fielmente a regra errada.

## Técnicas de revisão

Revisão manual traça mudanças de estado, caminhos de acesso, chamadas externas, aritmética, transições do ciclo de vida e recuperação de falhas. Testes unitários verificam exemplos nomeados. Testes Fuzz exploram entradas geradas. Testes invariantes executam sequências e afirmam propriedades como conservação ou solvência. Analisadores estáticos detectam padrões conhecidos. Razões simbólicas de execução sobre caminhos usando entradas simbólicas. Testes diferenciais comparam duas implementações ou um contrato com um modelo de referência.

As ferramentas produzem provas, não um veredicto. Uma advertência estática pode ser irrelevante no contexto. Uma corrida limpa pode significar que o detector carece de uma regra para o bug real. Relatórios de cobertura mostram qual código executado durante testes, não quais estados econômicos foram compreendidos.

## Conclusões e reparação

Um achado útil indica o código e versão afetados, pré-requisitos, mecanismo de falha, impacto, evidência reprodutível e um reparo específico. A gravidade combina impacto com probabilidade sob o modelo de ameaça declarado. As equipas devem acompanhar se fixaram, atenuaram, aceitaram ou contestaram cada conclusão e fornecer provas para a decisão.

Consertos precisam de revisão. Um patch pode introduzir um novo bug, mover o limite de confiança ou invalidar a análise anterior. Reexecutar testes e pedir ao revisor para confirmar remediação contra o commit real destinado à implantação.

## Verificação da implantação

Após revisão, verifique configurações do compilador, bibliotecas vinculadas, argumentos do construtor ou inicializador, slots proxy, administradores, funções, endereços oráculo, limiares multisig, bloqueios de tempo e publicação de código fonte. Uma árvore de origem segura implantada com o administrador errado é um sistema inseguro.

As auditorias também envelhecem. Novas integrações, alterações de parâmetros, descobertas de compiladores, atualizações e mudanças na liquidez do mercado podem invalidar suposições sem alterar o arquivo auditado.

## Outras leituras

- [Ethereum.org segurança inteligente contrato](https://ethereum.org/developers/docs/smart-contracts/security/)
- [Considerações relativas à segurança da solidez](https://docs.soliditylang.org/en/latest/security-considerations.html)
- [Contratos OpenZeppelin](https://docs.openzeppelin.com/contracts/)
- Ver também: [Teste](../contracts/testing.md), [Verificação formal](./formal-verification.md)

---

[← Anterior: Riscos de atualização](./upgrade-risks.md)
·
[Voltar à Segurança](./README.md)
·
[Próximo: Verificação formal →](./formal-verification.md)

