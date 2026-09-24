# Roubo de Chave Privada

Uma chave privada está assinando autoridade codificada como um número. Qualquer pessoa que obtenha uma cópia utilizável pode produzir as mesmas assinaturas que o proprietário. A rede não pode dizer se uma transação veio do dispositivo original, um backup, malware ou um ladrão. Verifica a assinatura e aplica a transição de estado.

## Roubo geralmente acontece fora da criptografia

Quebrar secp256k1 não é a rota prática para uma carteira. Os atacantes visam os sistemas que armazenam, exibem ou usam a chave:

- malware lê uma chave de um arquivo, memória de processo, área de transferência ou armazenamento do navegador;
- uma atualização comprometida da carteira exporta segredos ou altera a transação que está sendo assinada;
- um atacante rouba um dispositivo desbloqueado ou observa um código de acesso fraco;
- um backup em nuvem sincroniza um arquivo de carteira não criptografado com uma conta protegida por uma senha reutilizada;
- um administrador, funcionário ou prestador de alojamento copia uma chave de assinatura do lado do servidor;
- um usuário insere uma chave em uma ferramenta de recuperação falsa ou formulário de suporte.

A criptografia em repouso estreita a janela, mas não a elimina. O software deve descriptografar uma chave antes de assinar. Malware rodando com acesso suficiente pode esperar por esse momento, solicitar assinaturas através da carteira, ou substituir dados de transação antes de chegar ao assinante.

## Limites quentes e frios

Existe uma chave quente num sistema ligado à rede. Pode assinar rapidamente, o que também torna o compromisso remoto útil para um atacante. Uma chave fria fica longe de dispositivos conectados à rede. Isso remove muitos caminhos remotos, mas a transação ainda cruza um limite: um dispositivo online prepara dados, o sinal offline exibe ou assina, e a transação assinada retorna online.

O assinante deve deixar o usuário verificar o destino, quantidade, rede, contrato e método. Uma carteira de hardware que exibe apenas um hash pode proteger a chave ao assinar uma transação que o proprietário não entendeu. Armazenamento seguro e autorização clara são requisitos separados.

## Uma chave, muitas consequências

O dano depende do que a chave controla. Uma chave de carteira pode transferir ativos e conceder aprovações. Uma chave de administração do contrato pode substituir o código de implementação, pausar retiradas, alterar um oráculo ou atribuir funções. Uma chave de validação de ponte pode atestar mensagens cruzadas. Uma chave de implantação comprometida pode não importar depois que a propriedade foi renunciada, enquanto uma chave de atualização comprometida pode expor todos os ativos detidos por trás do proxy.

Autoridade de inventário por efeito, não por etiqueta de endereço. Para cada chave, registre quais funções pode chamar, quais contratos confiam nele, se as ações têm um atraso, e como pode ser substituído. Isso transforma uma lista vaga de carteiras em um mapa de domínios de falha.

## Contenção e recuperação

Uma vez copiada uma chave privada, alterar uma senha na carteira original não invalida a cópia. Recuperação requer a transferência de autoridade on-chain: ativos de transferência, revogar funções, rotacionar sinalizadores, substituir guardiões, ou atualizar a conta se o seu projeto permite rotação. Mempools públicos criam uma corrida porque o atacante pode ver e executar a transação de recuperação.

Os sistemas podem reduzir o raio de explosão antes de um incidente:

- separar as chaves operacionais diárias da autoridade de tesouraria e de atualização;
- exigir múltiplos sinais independentes para ações de alto impacto;
- utilizar bloqueios de tempo para que a monitorização possa detectar uma acção administrativa em fila de espera;
- aplicar limites de retirada ou aprovações escalonadas sempre que o produto lhes permita;
- manter os procedimentos de rotação e emergência testados;
- monitorar alterações de funções, atualizações, grandes aprovações e locais de assinatura incomuns.

O controle multiassinatura só ajuda quando os sinalizadores falham de forma independente. Cinco chaves armazenadas no mesmo gerenciador de senhas, conta na nuvem, escritório ou pipeline de implantação não fornecem cinco barreiras independentes.

## Outras leituras

- [Ethereum.org orientação de segurança carteira](https://ethereum.org/security/)
- [Documentação do controle de acesso do OpenZeppelin](https://docs.openzeppelin.com/contracts/5.x/access-control)
- Ver também: [Armazenamento a frio](../wallets/cold-storage.md), [Carteira de Hardware](../wallets/hardware-wallets.md), [Multisig](../wallets/multisig.md)

---

[← Anterior: Segurança Blockchain](./README.md)
·
[Voltar à Segurança](./README.md)
·
[Próximo: Frase de sementes Roubo →](./seed-phrase-theft.md)
