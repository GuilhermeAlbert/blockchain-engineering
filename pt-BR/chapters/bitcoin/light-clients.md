# Clientes leves

Um cliente leve (também chamado de cliente SPV (Simplified Payment Verification) verifica pagamentos Bitcoin sem baixar ou validar toda a blockchain. Este capítulo cobre exatamente o que verifica, o que não verifica, e por que essa lacuna importa, construindo diretamente sobre [Provas de Merkle](../cryptography/merkle-proofs.md) e seção 8 do whitepaper, que [O whitepaper Bitcoin](../origins/bitcoin-whitepaper.md#8-verificação-de-pagamento-simplificada-spv) já introduzido.

## Como funciona

Um cliente leve baixa e armazena apenas [cabeçalhos de bloco](../blockchain/block-headers.md) (80 bytes cada, aproximadamente 4,2 MB por ano de blocos) em vez de blocos completos. Para verificar uma transação específica, pede um nó completo (ou vários) para [Prova de Merkle](../cryptography/merkle-proofs.md) mostrando que a transação está incluída na raiz Merkle de um bloco específico. Como o cliente leve independentemente tem o cabeçalho desse bloco (e pode verificar a prova de trabalho do próprio cabeçalho e seu link para a cadeia que ele tem seguido), ele pode confirmar a inclusão da transação sem nunca baixar as outras transações não relacionadas desse bloco.

## O que isso realmente verifica

Um cliente leve usando este método pode confirmar, com certeza criptográfica real: esta transação específica está incluída em um bloco que faz parte de uma cadeia com uma quantidade específica de prova cumulativa de trabalho por trás dele. Trata-se de uma garantia significativa, não trivial. Ninguém pode forjar uma prova de inclusão falsa para uma transação que não estava no bloco, porque fazer isso exigiria quebrar a resistência de colisão da árvore Merkle (ver [Provas de Merkle](../cryptography/merkle-proofs.md#comércio)).

## O que não verifica

Este é o tradeoff declarado explicitamente no whitepaper em si: um cliente leve não verifica independentemente que cada transação em cada bloco em que está construindo confiança era realmente válida sob regras de consenso. Confia que a maioria da rede que estende a cadeia que segue está se comportando honestamente e rejeitaria blocos inválidos. Um cliente leve conectado a uma maioria desonesta (ou um atacante temporariamente capaz de isolá-lo e alimentá-lo com uma cadeia fabricada. An **ataque do eclipse**) poderia, em princípio, ser mostrada uma cadeia contendo transações inválidas que um nó completo teria rejeitado.

> "[SPV] verification is reliable as long as honest nodes control the network, but is more vulnerable if the network is overpowered by an attacker."
> Satoshi Nakamoto, [Bitcoin whitepaper](https://bitcoin.org/bitcoin.pdf), Section 8

## Filtros Bloom e seu custo de privacidade

Implementações de SPV precoces (via BIP 37) permitem que um cliente leve peça nós completos para filtrar quais transações enviar usando um **Filtro Bloom**, uma estrutura de dados compacta e probabilística que permite que um nó requisite "transações correspondentes aproximadamente a esses endereços" sem revelar exatamente quais endereços ele se preocupa. Na prática, filtros Bloom vazaram mais informações do que o pretendido (um nó completo suficientemente motivado poderia muitas vezes estreitar, com confiança razoável, que endereços específicos de um determinado cliente leve estava realmente interessado), e esta abordagem tem sido substancialmente deprecada em favor de projetos mais novos.

## Filtros compactos de blocos (BIP 157/158)

Designs de clientes leves modernos cada vez mais usam **filtros compactos de bloco**: em vez de o cliente leve dizer a um nó completo o que ele está procurando (que vaza informações), o nó completo publica um filtro compacto para o conteúdo de cada bloco, e o cliente leve baixa e verifica filtros *localmente* contra seus próprios endereços, apenas solicitando dados de bloco completo para blocos que plausivelmente correspondem, melhorando significativamente a privacidade, uma vez que o nó completo nunca aprende quais endereços específicos o cliente está verificando.

## Comércio

Os clientes leves tornam prática a execução de uma carteira Bitcoin em dispositivos restritos aos recursos (telefones, extensões de navegador) ao custo direto da garantia de confiança-minimização que a validação completa fornece. Este é um tradeoff de segurança quantificável-versus-conveniência, não um detalhe de implementação menor, e é por isso que este livro trata "executando um nó completo" e "usando uma carteira leve" como posturas de segurança significativamente diferentes ao longo de, ao invés de formas intercambiáveis de "usar Bitcoin".

## Conceitos errôneos comuns

**Um cliente leve não é "menos seguro" contra roubo de fundos já recebidos** da mesma forma que é menos seguro verificar pagamentos recebidos, o modelo de segurança da chave privada (ver [Chaves particulares e públicas](../cryptography/keys.md)) é independente de se uma carteira faz a validação completa ou SPV; o risco específico que o SPV introduz é de confiar na *histórico e validade* É mostrado, não sobre a custódia da chave.

**SPV não é a mesma coisa que uma carteira de "custodial".** Um cliente leve ainda detém suas próprias chaves privadas e constrói suas próprias transações. Ele simplesmente depende de outros nós para dados blockchain em vez de validar esses dados totalmente em si. Carteiras de custódia, por contraste, não segure as chaves do usuário em tudo (ver [Custodial vs Carteiras Não- Personalizadas](../wallets/custody.md)).

## Outras leituras

- [Whitepaper Bitcoin, Seção 8](https://bitcoin.org/bitcoin.pdf)
- [BIP 157: Filtragem de bloco lateral do cliente](https://github.com/bitcoin/bips/blob/master/bip-0157.mediawiki)
- [BIP 37: Filtragem Bloom de conexão](https://github.com/bitcoin/bips/blob/master/bip-0037.mediawiki)

---

[← Anterior: Nós Completos](./full-nodes.md)
·
[Voltar para Bitcoin](./README.md)
·
[Próximo: Bitcoin Core →](./bitcoin-core.md)
