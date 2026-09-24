# Verificação formal

Verificação formal verifica se um modelo matemático de um programa satisfaz uma especificação escrita. O resultado é condicional: o modelo, especificação, pressupostos de ferramenta e ambiente definem o que foi provado.

## O caderno de especificações contém o pedido de garantia

Um verificador não consegue descobrir o que o protocolo deveria fazer sem propriedades. Os engenheiros escrevem invariantes, pré-condições, pós-condições, propriedades temporais ou reivindicações de equivalência. Os exemplos incluem:

- os créditos totais nunca excedam os ativos detidos;
- apenas um administrador pode alterar uma implementação;
- uma retirada bem sucedida reduz o direito do usuário e o passivo do sistema no mesmo montante;
- um nonce não pode ser consumido duas vezes;
- os ativos não podem tornar-se permanentemente inalcançáveis através de uma transição autorizada.

Provar uma propriedade incompleta pode criar falsa confiança. Um contrato simbólico pode provar que os saldos nunca transbordam, omitindo o fato de que qualquer um pode cunhar. Uma ponte pode provar a singularidade da mensagem ao modelar um conjunto de validadores honestos que a implantação real não mantém.

## Modelos e técnicas

Verificação de modelos explora estados de um sistema de transição abstrato contra propriedades temporais ou lógicas. A execução simbólica segue os caminhos do programa com entradas simbólicas e pergunta a um solucionador de restrições se existe uma entrada de violação. A prova teórica deriva de uma propriedade através de inferência formal, muitas vezes com orientação humana. A verificação da equivalência questiona se duas implementações se comportam da mesma forma sob observações declaradas.

O SMTChecker da Solidity pode analisar as afirmações e as propriedades de segurança durante a compilação. Outras ferramentas fornecem linguagens de especificação para regras de nível de contrato ou semântica formal EVM. Diferentes ferramentas modelam chamadas externas, gás, hashing, armazenamento e código desconhecido de forma diferente. Leia os pressupostos da ferramenta antes de interpretar “provado”.

## Segurança, vida e acessibilidade

Uma propriedade de segurança diz que um estado ruim nunca ocorre, como a cunhagem não autorizada. Uma propriedade de vida diz que um estado desejado pode eventualmente ocorrer, como um usuário honesto ser capaz de retirar. Um sistema pode preservar perfeitamente os equilíbrios congelando para sempre, de modo que a segurança por si só não captura a exatidão utilizável.

Questões de acessibilidade para sistemas de atualização e governança. Pode ser seguro para um administrador pausar, mas a especificação deve estabelecer qual caminho restaura o serviço e quem o controla.

## O ambiente continua a fazer parte da prova

Um modelo de contrato pode tratar uma resposta de oráculo como uma entrada sem restrições, um valor confiável, ou um valor dentro de um intervalo. Cada escolha prova algo diferente. Comportamento externo de token, reentrância, armazenamento de proxy, chamadas de delegados, pré-compilações criptográficas, reorganizações de cadeias e limiares de sinais off-chain podem ficar fora do modelo analisado.

A verificação formal complementa o teste e a revisão. Os ensaios tornam o comportamento do concreto fácil de inspecionar e cobrir integrações que o modelo pode omitir. A revisão manual questiona se a especificação corresponde à intenção do produto. A verificação explora um espaço de estado mais amplo para as propriedades que pode expressar.

## Um fluxo de trabalho prático

Escreva invariantes antes de otimizar o código. Mantenha os componentes verificados pequenos. Prove propriedades aritméticas e de autorização, inspecione contraexemplos, adicione suposições explicitamente e reexecute provas sobre a revisão exata de código e configuração do compilador destinada à implantação. Especificações de versão ao lado do código porque uma propriedade alterada é uma reivindicação de segurança alterada.

## Outras leituras

- [Ethereum.org verificação formal de contratos inteligentes](https://ethereum.org/developers/docs/smart-contracts/formal-verification/)
- [Solidity SMTChecker](https://docs.soliditylang.org/en/latest/smtchecker.html)
- [Documentação do Certora Prover](https://docs.certora.com/en/latest/)

---

[← Anterior: Auditoria inteligente contrato](./auditing.md)
·
[Voltar à Segurança](./README.md)
·
[Próximo: Infraestrutura Blockchain →](../infrastructure/README.md)
