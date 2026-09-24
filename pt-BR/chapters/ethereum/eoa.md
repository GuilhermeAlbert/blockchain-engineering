# Contas de propriedade externa

Uma Conta Externamente Propriedade (EOA) é o tipo de conta Ethereum controlado por uma chave privada, o tipo que cada usuário humano detém diretamente, e o único tipo de conta capaz de iniciar uma transação. Este capítulo abrange exatamente o que isso significa, com base na estrutura geral da conta a partir de [Contas Ethereum](./accounts.md).

## As propriedades definidoras

Um EOA não tem um código próprio (o seu `codeHash` campo é um hash de código vazio fixo, universal) e é controlado inteiramente por quem detém sua chave privada correspondente, o mesmo [ECDSA](../cryptography/ecdsa.md) mecânica de par de chaves coberta na criptografia, usando o mesmo [secp256k1](../cryptography/secp256k1.md) curva Bitcoin usa, embora Ethereum deriva seus endereços de forma diferente (veja abaixo) e, a partir desta escrita, usa ECDSA exclusivamente para assinaturas de conta padrão em vez de oferecer uma alternativa baseada em Schnorr da forma como o pós-Taproot Bitcoin faz.

Desde a atualização de Pectra (maio de 2025), [EIP-7702](https://eips.ethereum.org/EIPS/eip-7702) permite um EOA temporariamente ou persistentemente *delegado* execução para a lógica de um contrato, uma consulta para que o código de EOA agora retorna um designador curto apontando para o delegado, em vez do hash universal de código vazio. A conta continua a ser uma EOA ao nível do protocolo (ainda controlada pela sua chave privada, ainda o único tipo de conta que pode originar uma transação). A delegação só altera o que acontece quando *outros* contratos de chamada para ele, deixando um EOA ganhar comportamento de contrato (chamadas batedas, lógica de validação personalizada) sem se tornar uma conta de contrato na [Contas Ethereum](./accounts.md#os-dois-tipos-de-conta) Sentido. Isto significa que "não tem código" é agora uma abreviatura ligeiramente imprecisa para "não tem código próprio"; ver [exemplos/estatísticas da carteira](../../../examples/wallet-stats/) para um exemplo real, vivo de detectar essa distinção corretamente.

## Derivação do endereço

Um endereço Ethereum é derivado de uma chave pública diferente de um endereço Bitcoin é: em vez da construção RIPEMD-160-after-SHA-256 "hash160" coberta em [Endereços](../wallets/addresses.md), Ethereum calcula `Keccak-256(publicKey)` e toma o **últimos 20 bytes** desse hash, nenhum esquema adicional de codificação de soma de cheques incluído no próprio formato de endereço da forma como o Bitcoin's Base58Check fornece (o Ethereum usa, em vez disso, uma convenção opcional, separada de cheques mistos, [EIP-55](https://eips.ethereum.org/EIPS/eip-55), aplicado em cima do endereço hex bruto para detecção de erros de digitação, em vez de o checksum ser fundamental para a codificação do próprio endereço).

## O nonce, e porque importa mais do que poderia parecer primeiro

O nonce de um EOA (um contador de incremento simples de transações enviadas) resolve um problema específico: sem ele, uma transação assinada validamente poderia ser retransmitida e reexecutada várias vezes (a **repetir o ataque**), uma vez que somente uma assinatura prova que "o titular da chave autorizou esta transação específica", mas não diz nada sobre se ela deve ser executada apenas uma vez. A regra de Ethereum de que uma transação só é válida se seu nonce exatamente corresponder ao nonce on-chain atual do remetente, incrementando por exatamente um com cada transação bem sucedida, fecha este gap, uma transação assinada torna-se permanentemente inutilizável para replay no momento em que é processado com sucesso, uma vez que o nonce da conta passa pelo valor especificado pela transação.

Isto também significa **as transações da mesma conta devem ser processadas por ordem de nonce**, uma transação com nonce 5 não pode ser incluída antes que a transação com nonce 4 da mesma conta tenha sido processada, o que é uma consideração real, prática para qualquer um que constrói software que envia múltiplas transações do mesmo EOA em rápida sucessão (ver [Enviando Transações](../web3/sending-transactions.md)).

## Cada transação remonta a um EOA

Restabelecer o ponto estrutural de [Contas Ethereum](./accounts.md#os-dois-tipos-de-conta): as contas de contrato podem chamar outros contratos, e essas chamadas podem encadear arbitrariamente profunda, mas o rastreamento de qualquer tal cadeia para trás sempre termina na transação de origem assinada diretamente por alguns EOA. Não há caminho para execução em cadeia que não comece com a assinatura de um EOA.

## Conceitos errôneos comuns

**Um EOA não é a mesma coisa que um "endereço de carteira" em algum sentido vago, informal**. É um tipo de conta definido com precisão (sem código, controlado por uma chave privada) dentro do modelo de conta de nível de protocolo de Ethereum, distinto especificamente de contas de contrato, que também pode receber e manter fundos em seus próprios endereços, de origem diferente.

**Os endereços Ethereum não são sensíveis ao nível do protocolo**. O checksum de caso misto (EIP-55) é uma convenção de leitura humana, do lado do cliente, em camadas em cima para detecção de tipo; o endereço subjacente de 20-byte o protocolo na verdade processos não tem conceito de letra caso.

## Outras leituras

- [Papel Amarelo Ethereum](https://ethereum.github.io/yellowpaper/paper.pdf): Apêndice F (Transações Assinantes)
- [EIP-55: Codificação do endereço da casa de verificação mista](https://eips.ethereum.org/EIPS/eip-55)

---

[← Anterior: Contas Ethereum](./accounts.md)
·
[Voltar para Ethereum](./README.md)
·
[Próximo: Contas de contrato →](./contract-accounts.md)
