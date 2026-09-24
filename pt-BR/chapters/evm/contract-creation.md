# Criação de Contratos

Dois opcodes criam novos contratos: `CREATE` e `CREATE2`Este capítulo abrange tanto, e especificamente, a propriedade endereço-determinismo `CREATE2` adiciona. A capacidade específica que torna possíveis vários padrões DeFi e Layer 2.

## CREATE: endereço determinado pelo remetente e nonce

Um contrato criado através `CREATE` (ou, no nível superior, através de uma transação comum de criação de contratos. Ver [Transações Ethereum](../ethereum/transactions.md#campos-principais)) é atribuído um endereço calculado como `keccak256(rlp_encode(senderAddress, senderNonce))`, truncado aos habituais 20 bytes. Isto significa `CREATE`- o endereço do contrato em curso é **previsível com antecedência**, mas somente se você souber o nonce exato da conta de implantação no momento da implantação, uma vez que o nonce incrementa com cada transação que a conta envia, isso é muitas vezes estranho para prever de forma confiável em cenários complexos e multi-passos onde a ordem exata de outras transações da mesma conta não é totalmente conhecida antes do tempo.

## CREATE2: endereço determinado por um sal escolhido

[EIP-1014](https://eips.ethereum.org/EIPS/eip-1014) introduzido `CREATE2`, computando o novo endereço como `keccak256(0xff . senderAddress . salt . keccak256(initCode))`, onde **sal** é um valor arbitrário de 32-bytes que o implementador escolhe. A diferença crítica em relação `CREATE`: este endereço depende do sal e do conteúdo próprio do código init, **não** no nonce atual do remetente, o que significa que o contrato de implantação pode computar, e qualquer outra pessoa pode verificar de forma independente, exatamente qual endereço `(sender, salt, initCode)` a combinação produzirá, *antes* realmente implantar qualquer coisa lá, e independentemente de quantas outras transações a conta remetente envia entretanto.

```text
CREATE:   address = f(senderAddress, senderNonce)
                     — depends on deployment order/timing

CREATE2:  address = f(senderAddress, salt, keccak256(initCode))
                     — depends only on values the deployer chooses directly,
                       fully predictable and independently verifiable in advance
```

## Por que os endereços previsíveis importam

Esta propriedade permite padrões que, de outra forma, exigiriam uma etapa de implantação on-chain para mesmo saber qual endereço para referência. Alguns casos de uso real documentados: **implantação contrafactual** (um sistema Layer 2 ou State-channel pode calcular e referenciar um endereço para um contrato que ainda não existe, implantando-o apenas mais tarde, se e quando realmente necessário, usado em alguma abstração de conta e designs baseados em canais); e **implantação determinística de cadeias múltiplas** (um projeto que implante o contrato idêntico no endereço idêntico em várias cadeias diferentes, útil para ferramentas de cadeia cruzada que assume um endereço consistente, alcançável porque o mesmo remetente, salt, e código init produzem o mesmo endereço em qualquer cadeia compartilhando a mesma fórmula de derivação de endereço).

## O processo de criação de duas etapas, reafirmado

De acordo com o [Contas de Contrato](../ethereum/contract-accounts.md#como-uma-conta-de-contrato-entra-em-existência), ambos `CREATE` e `CREATE2` executar fornecido **código init** uma vez, e qualquer que seja esse código de init *retorna* torna-se o código de execução permanentemente armazenado do novo contrato, o próprio código init, incluindo qualquer lógica de implantação-tempo (argumentos do construtor, configuração única), nunca é ele mesmo armazenado on-chain, apenas executado uma vez e então descartado.

## Conceitos errôneos comuns

**`CREATE2` não permite implantar o mesmo contrato exato (mesmo código, mesmo armazenamento) para o mesmo endereço em duas ocasiões diferentes** sem primeiro destruir o original (um endereço calculado por `CREATE2` só pode conter o código de um contrato de cada vez; reinstalar para um endereço que já tenha o código implantado falha, e se esse contrato se autodestruiu (um cenário muito mais raro desde [EIP-6780](https://eips.ethereum.org/EIPS/eip-6780) restrito `SELFDESTRUCT`efeitos, ver [Opcodes](./opcodes.md#conceitos-errôneos-comuns)), a realocação começa com armazenamento genuinamente fresco e vazio) não herda ou reutiliza nada do que estava lá antes.

**A `CREATE2`-o endereço calculado não é "reservado" ou protegido de receber fundos antes de o contrato ser efectivamente aplicado**. Ether pode ser enviado para um `CREATE2`- endereço calculado a qualquer momento, mesmo antes de qualquer contrato existir lá, uma vez que é apenas um endereço comum no que diz respeito ao protocolo até que o código seja realmente implantado nele.

## Outras leituras

- [EIP-1014: CREADO Magro2](https://eips.ethereum.org/EIPS/eip-1014)
- [Papel Amarelo Ethereum](https://ethereum.github.io/yellowpaper/paper.pdf): Seção 7 (Criação de contratos)

---

[← Anterior: Chamadas de mensagem](./message-calls.md)
·
[Voltar ao EVM](./README.md)
·
[Próximo: Contabilidade de gás →](./gas-accounting.md)
