# Controle de acesso

O controle de acesso decide qual conta ou contrato pode realizar uma operação sensível. O código pode autenticar o chamador perfeitamente e ainda ser inseguro se o papel errado pode cunhar, atualizar, retirar, pausar, mudar um oráculo, ou atribuir-se mais autoridade.

## A autenticação é apenas a primeira questão

Verificação `msg.sender == owner` autentica um endereço. Não responde se um único proprietário é apropriado, como as transferências de propriedade, o que acontece quando o proprietário é perdido, ou se a função protegida concede mais poder do que o seu nome sugere.

Os modelos comuns incluem:

- **proprietário único:** Um endereço controla cada operação restrita;
- **Controle baseado em funções:** Funções distintas autorizam a cunhagem, pausa, atualização ou configuração;
- **Controle multiassinatura:** Vários signatários devem aprovar uma transação administrativa;
- **Governança e bloqueio de tempo:** Uma proposta passa por um processo e espera antes da execução;
- **Controle da capacidade ou do módulo:** um contrato dedicado pode chamar um conjunto restrito de funções-alvo.

Cada modelo move a confiança. Um multisig reduz a dependência de uma chave, mas adiciona coordenação singer e risco de configuração. Um bloqueio temporal dá aos observadores tempo para reagir, mas não torna inofensiva uma ação maliciosa. Governança distribui uma decisão apenas na medida em que o poder de voto, delegação e execução são distribuídos.

## Inicialização é um evento de controle de acesso

Implementações de proxy usam funções inicializador porque os construtores não definem o armazenamento proxy. Um inicializador que pode ser chamado duas vezes pode substituir o administrador. Um proxy não iniciado pode deixar o primeiro chamador reivindicar controle. O contrato de execução também pode exigir inicialização ou desativação explícita para que ninguém possa usá-lo em um contexto não intencional.

Os scripts de implantação devem afirmar o administrador, implementação, funções, limiares e propriedade após a implantação. Um recibo de transação bem sucedido não prova que o gráfico de autoridade resultante está correto.

## Administração de papéis e crescimento de privilégios

Em sistemas baseados em papéis, cada papel tem um administrador que pode conceder ou revogar. O gráfico de papel importa tanto quanto funções protegidas. Se um papel de operador de rotina administra o papel de atualização, seu poder efetivo inclui atualizações. Se o administrador padrão controlar sua própria associação, comprometer um titular pode permitir expansão permanente de privilégios.

Use o menor papel que pode executar o trabalho. Separe operações de rotina da resposta de emergência e atualizações. Adicione atrasos às mudanças de alto impacto onde a execução adiada não cria um modo de falha pior. A transferência de propriedade em duas etapas impede que um erro de endereço perca imediatamente o controle, porque o destinatário deve aceitar.

## Autorização entre chamadas

`tx.origin` Identifica a conta externa original da transação e não deve autorizar ações contratuais. Um intermediário malicioso pode levar uma vítima a originar uma transação que atinge o contrato protegido. A autorização deve normalmente ser utilizada `msg.sender`, que identifica o chamador imediato, e conta explicitamente para encaminhadores confiáveis ou pontos de entrada de abstração de conta.

Quando um gestor de acesso chama um alvo em nome de um usuário, o alvo pode ver o gestor como `msg.sender`. O chamador original não deve ser reconstruído a partir de calldata arbitrária, a menos que um esquema de encaminhamento especificado o autentice.

## O que testar

Para cada função sensível, teste de chamadas autorizadas e não autorizadas, atribuição de papel e revogação, transferência de administrador, inicialização, inicialização repetida, erros de endereço zero, execução atrasada, ações de emergência e recuperação após um assinante desaparecer. Em seguida, teste o sistema composto: um setter de configuração de aparência inofensiva pode redirecionar chamadas para um contrato controlado por atacante e tornar-se equivalente a autoridade de retirada.

## Outras leituras

- [Controle de acesso OpenZeppelin](https://docs.openzeppelin.com/contracts/5.x/access-control)
- [API de controle de acesso do OpenZeppelin](https://docs.openzeppelin.com/contracts/5.x/api/access)
- [Ethereum.org segurança inteligente contrato](https://ethereum.org/developers/docs/smart-contracts/security/)

---

[← Anterior: Reentrância](./reentrancy.md)
·
[Voltar à Segurança](./README.md)
·
[Próximo: Inteiro e Insetos de Precisão →](./precision.md)
