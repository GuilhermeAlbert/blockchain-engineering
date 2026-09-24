# Assinaturas Maléficas

Uma assinatura digital prova que uma chave autorizou uma sequência de byte específica. Não prova que o assinante tenha compreendido esses bytes, visto uma explicação precisa, ou que o contrato permita a ação a jusante.

## As mensagens podem ter autoridade

Usuários de carteira frequentemente tratam uma assinatura de mensagem como mais segura do que uma transação porque não custa gás e não muda imediatamente o estado da cadeia. Essa distinção está incompleta. Protocolos usam assinaturas como autorização portátil para licenças token, ordens de mercado, ações de governança, logins de conta, transações retransmitidas e operações de conta inteligente. Outra parte pode enviar a carga útil assinada mais tarde e pagar o gás.

O risco vem da semântica. Uma instrução de login de texto simples ligada a um domínio e nonce concede pouca autoridade reutilizável. Uma licença pode autorizar um gastador a mover tokens. Uma ordem pode oferecer um NFT por um preço indicado. Uma assinatura de conta inteligente pode validar um pacote de chamadas arbitrária. Todos são “mensagens” na camada da carteira.

## Separação e repetição de domínios

EIP-712 estrutura dados assinados e inclui um separador de domínio. Um domínio de som identifica o contexto da aplicação com campos como nome, versão, chain ID e verificação de contrato. O tipo assinado descreve campos nomeados em vez de uma string de byte opaca. Isto permite que uma carteira mostre um significado útil e limites onde uma assinatura deve ser válida.

O contrato ainda deve impor proteção replay. Os desenhos comuns incluem um nonce consumido após o uso, um prazo, um identificador de ordem, ou um bitmap de autorizações usadas. Se os dados assinados omitirem a cadeia, contrato, nonce ou ação pretendida, a mesma assinatura pode funcionar em outro contexto. Se o cancelamento mudar apenas um banco de dados off-chain, uma assinatura previamente copiada pode permanecer executável on-chain.

Prefixos EIP-191 assinados para que uma mensagem assinada arbitrária não seja interpretada como uma transação Ethereum bruto. Não fornece o significado específico da aplicação ou a proteção de repetição por si só.

## Assinatura cega

A assinatura cega ocorre quando o dispositivo não pode exibir a operação em termos que o usuário pode verificar. Pode mostrar um hash, dados hexadecimais brutos, ou um aviso genérico. O dispositivo ainda pode proteger a chave privada da extração, mas a decisão de autorização volta para a interface de host comprometida ou confusa.

A assinatura clara requer cooperação em toda a pilha: o protocolo define dados estruturados, o aplicativo solicita o domínio correto e os campos, a carteira os decodifica e o assinante verifica o resultado. Uma falha em qualquer camada pode transformar uma assinatura criptograficamente correta em autoridade não intencional.

## Concepção de autorização mais segura

Tornar a autoridade assinada estreita e de curta duração. Prenda-o à cadeia, verificando contrato, operação, ativo, quantia, destinatário ou gastador, nonce, e prazo onde esses campos pertencem. Mostra os mesmos valores na interface e na carteira. Consuma nonces atomicamente e fornecer um caminho de cancelamento on-chain para encomendas pendentes quando o protocolo precisa de um.

Os usuários devem rejeitar assinaturas que não podem explicar em termos simples. Os desenvolvedores devem testar replay de cadeia cruzada, replay de contrato cruzado, assinaturas expiradas, nonces reutilizados, destinatários alterados, quantidades alteradas e assinaturas produzidas para uma versão anterior do contrato.

## Outras leituras

- [EIP-712: Hashing e assinatura de dados estruturados digitados](https://eips.ethereum.org/EIPS/eip-712)
- [EIP-191: Norma de dados assinados](https://eips.ethereum.org/EIPS/eip-191)
- [EIP-2612: Prorrogação da autorização para aprovações assinadas pelo ERC-20](https://eips.ethereum.org/EIPS/eip-2612)
- Ver também: [Dados tipados e EIP-712](../web3/eip-712.md), [Assinaturas digitais](../cryptography/digital-signatures.md)

---

[← Anterior: Phishing](./phishing.md)
·
[Voltar à Segurança](./README.md)
·
[Próximo: Ataques de aprovação →](./approval-attacks.md)
