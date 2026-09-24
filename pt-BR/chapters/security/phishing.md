# Phishing

O Phishing substitui o contexto confiável. O atacante não precisa derrotar um algoritmo de assinatura se o usuário assinar através de um site falso, enviar fundos para um endereço substituído, ou instalar uma carteira apresentada como uma atualização oficial.

## A interface está fora do consenso

Uma blockchain verifica sintaxe de transação, assinaturas, saldos e regras de contrato. Não verifica o site que preparou a transação ou a história contada ao assinante. Uma transação válida gerada por uma interface clonada é indistinguível de uma gerada pela aplicação real uma vez que ambos chegam à rede.

Essa lacuna suporta várias formas de phishing:

- um domínio parecido copia uma carteira, troca, ponte ou menta;
- uma conta social comprometida coloca uma ligação de migração ou reivindicação limitada no tempo;
- um anúncio de busca aparece acima do site legítimo;
- uma extensão falsa ou uma aplicação móvel importa uma frase de semente;
- malware da área de transferência substitui um endereço de destino;
- um endereço envenenado aparece no histórico das transações, pelo que um usuário copia o prefixo e o sufixo familiares;
- uma conta de suporte falsa move a conversa em mensagens diretas e solicita um segredo ou assinatura.

HTTPS confirma uma conexão criptografada ao domínio na barra de endereços. Não estabelece que o domínio pertença ao projeto previsto.

## A ligação não é o passo perigoso

Conectar uma carteira normalmente revela contas e informações de cadeia para o site. As etapas consequenciais são a assinatura de mensagens, assinatura de dados digitados, envio de transações, ou divulgação de material de recuperação. Interfaces geralmente borram esses limites com uma sequência de diálogos. Um usuário que espera um login inofensivo pode aprovar uma licença token ou uma ordem de mercado.

O software de carteira pode reduzir a ambiguidade através da decodificação de chamadas, mostrando o endereço do contrato, identificando o gastador, exibindo quantidades de tokens em unidades humanas e alertando sobre aprovações ilimitadas. Simulação pode mostrar mudanças de equilíbrio previstas. Nenhum dos mecanismos está completo. Uma simulação usa um determinado estado e modelo; um contrato hostil pode se comportar de forma diferente após mudanças de estado ou quando chamado por outro caminho.

## Hábitos de verificação que alteram o resultado

Favoritos e documentação do projeto verificada independentemente reduzem a dependência em resultados de pesquisa e mensagens diretas. Os livros de endereços reduzem a cópia repetida. Os ecrãs de carteira de hardware só ajudam se o usuário os ler e compreender. Para ações de alto valor, verifique o endereço do contrato e a função através de uma segunda fonte confiável, em seguida, envie uma pequena transação quando o protocolo permitir.

As organizações precisam de controles que não dependem de uma pessoa notar um defeito visual. Separar a preparação da transação da aprovação, exigir múltiplos signatários para ações de tesouraria, restringir chamadas administrativas para alvos conhecidos e ensaiar procedimentos de compromisso. Um multisig não pode ajudar se cada assinante seguir o mesmo link falso e aprovar a mesma transação hostil sem verificação independente.

## Após interação com um local de phishing

A resposta depende do que aconteceu. Simplesmente abrir uma página difere de conectar uma carteira, assinar uma mensagem de login, conceder uma permissão, assinar uma ordem de saída, enviar uma transação ou inserir uma frase de semente. Reveja a atividade da carteira e aprovações de uma interface confiável. Revogar autoridade desnecessária, cancelar ordens suportadas, mover ativos se as chaves ou a semente foram expostas, e preservar domínios, hashes de transação, endereços e imagens para relatórios.

A revogação é uma nova transação on-chain. Não pode reverter transferências já executadas, e pode correr um atacante que ainda tem autoridade utilizável.

## Outras leituras

- [Ethereum.org ajuda fraude e relatórios](https://ethereum.org/community/support/scams/)
- [Segurança Ethereum.org](https://ethereum.org/security/)
- Ver também: [Conexões de Carteira](../web3/wallet-connections.md), [Assinando Mensagens](../web3/signing-messages.md)

---

[← Anterior: Frase de semente Roubo](./seed-phrase-theft.md)
·
[Voltar à Segurança](./README.md)
·
[Próximo: Assinaturas maliciosas →](./malicious-signatures.md)
