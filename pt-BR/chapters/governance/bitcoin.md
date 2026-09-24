# Governança do Bitcoin

O Bitcoin não tem administrador de protocolos. Mudanças surgem através de discussão, especificações, implementações, lançamentos, comportamento minerador, aplicação de nó, carteira e suporte de troca, e escolha do usuário. Esses grupos se sobrepõem, mas nenhum pode obrigar qualquer outro grupo a adotar regras incompatíveis.

## Da ideia à regra imposta

Uma mudança de consenso pode começar na pesquisa ou discussão de lista de discussão, tornar-se um BIP, receber implementações e testes, enviar em software de nó, e usar um mecanismo de ativação. Cada etapa responde a uma pergunta diferente. Um BIP documenta uma proposta. O código torna-o executável. A ativação determina quando os nós o obrigam. A adoção determina quanto da economia a segue.

Soft forks apertar regras de validade. Nós atualizados rejeitam alguns blocos de nós antigos aceitariam. Esta compatibilidade permite a implantação sem qualquer atualização de nó ao mesmo tempo, mas não elimina o risco de coordenação. Se os mineradores produzem blocos que os nós econômicos atualizados rejeitam, a rede pode dividir na prática, mesmo que software mais antigo aceita ambos os ramos.

Forques duros afrouxar ou de outra forma mudar regras de uma maneira nós velhos rejeitar. A adoção requer migração explícita para as novas regras e pode criar uma rede separada persistente quando os usuários discordam.

## Influência e recusa

Os desenvolvedores influenciam quais mudanças têm implementações seguras. Os críticos influenciam se os defeitos são encontrados. Os mantenedores decidem o que entra em um determinado repositório. Os mineradores escolhem modelos de bloco e podem sinalizar prontidão. As empresas decidem quais depósitos, saques e símbolos suportam. Operadores de nós escolhem quais regras seu software impõe.

Estes poderes são reais, mas limitados. Um mantenedor não pode alterar um nó já em execução. Um minerador não pode tornar um bloco inválido aceitável para um nó de validação completa. Uma grande troca pode influenciar a nomeação e liquidez sem reescrever o consenso em outras máquinas.

## SegWit como um caso de coordenação

A SegWit combinou uma proposta técnica, implementação de clientes, sinalização de mineradores, pressão econômica e planos de ativação concorrentes. BIP 9 originalmente definida ativação versão-bit. O BIP 148 descreveu posteriormente a aplicação ativada pelo usuário numa data fixa. O episódio mostrou que a sinalização dos mineradores era um mecanismo de coordenação, não um voto constitucional que atribuisse autoridade final aos mineradores.

A lição não é que um grupo “ganhou” governança. Os diferentes intervenientes mantiveram diferentes formas de influência e a possibilidade credível de uma aplicação incompatível alterou os incentivos antes do prazo.

## Conservatismo e saída

O elevado limiar de coordenação do Bitcoin faz com que a mudança de consenso contenciosa seja lenta. Isso protege pressupostos monetários e de validação, tornando também mais difícil a reparação ou experimentação. Os participantes podem bifurcar código e regras, mas manter segurança, liquidez, infraestrutura e reconhecimento para uma rede separada é caro. A permissão formal para sair não garante o sucesso econômico.

## Outras leituras

- [BIP 3: Processo actualizado de BIP](https://github.com/bitcoin/bips/blob/master/bip-0003.md)
- [BIP 9: bits da versão](https://github.com/bitcoin/bips/blob/master/bip-0009.mediawiki)
- [BIP 148: Activação obrigatória do SegWit](https://github.com/bitcoin/bips/blob/master/bip-0148.mediawiki)
- Ver também: [Governança do Bitcoin](../forks/governance.md), [Debate sobre o Tamanho do Bloco](../forks/block-size-war.md)

---

[← Anterior: Governança](./README.md)
·
[Voltar à Governança](./README.md)
·
[Próximo: Governança Ethereum →](./ethereum.md)
