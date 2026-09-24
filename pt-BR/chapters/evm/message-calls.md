# Chamadas de Mensagens

Uma chamada de mensagem é como um pedaço de código de execução invoca outro contrato, o mecanismo por trás de cada interação entre contratos no Ethereum, de uma transferência token para um protocolo DeFi roteando uma troca através de vários pools. Este capítulo abrange os quatro códigos de chamada e uma distinção, `DELEGATECALL` versus `CALL`, que tudo mais neste capítulo constrói em direção.

## CALL: o caso comum

`CALL` invoca outro contrato com um endereço especificado, quantidade de éter para enviar, e calldata, executando o **código próprio do alvo no contexto próprio do alvo**O armazenamento do alvo é o que é lido e escrito, `msg.sender` (como visto pelo alvo) é o endereço do contrato de chamada, e qualquer éter enviado de chamada para alvo. Este é o caso padrão, intuitivo: chamando outro contrato executado *que* lógica do contrato contra *que* O próprio estado do contrato.

## ESTATICCALL: CALL com uma garantia somente de leitura

`STATICCALL` comporta- se de forma idêntica à `CALL` excepto **obriga, ao nível do protocolo, que o código chamado não pode modificar nenhum estado**, qualquer tentativa do alvo para executar `SSTORE`, emitir um log, enviar éter, ou criar um contrato durante um `STATICCALL` faz toda a chamada reverter. Isso dá a um chamador uma garantia forte, protocolo-forçada (não apenas uma convenção ou uma suposição de confiança) ao chamar um contrato não confiável puramente para ler dados dele, uma propriedade de segurança real Solidity `view` e `pure` modificadores de função (ver [Ver/Pura](../contracts/functions.md#ver-e-funções-puras)) compilar para baixo para usar.

## DELEGATALL: código emprestado, seu próprio contexto

Este é o opcode que vale a pena entender precisamente, porque é genuinamente intuitivo no primeiro encontro e está subjacente a um dos padrões mais importantes de Ethereum (contratos upgradeable (ver [Contratos de proxy](../contracts/proxies.md)). `DELEGATECALL` executa o **código do alvo**, mas usando o **armazenamento próprio do ouvinte, próprio `msg.sender`, próprios `msg.value`, e endereço próprio**) como se o código do alvo tivesse sido copiado diretamente no contrato de chamada e executado lá, em vez de como um contrato independente com seu próprio estado.

```text
CALL:
  Contract A calls Contract B
  → B's code runs, reading/writing B's own storage
  → msg.sender (as B sees it) = A

DELEGATECALL:
  Contract A delegatecalls Contract B
  → B's code runs, but reading/writing A's storage
  → msg.sender (as B's code sees it, executing "as A") = whoever called A
  → address(this) inside B's running code = A's address, not B's
```

## Por que DELEGATECALL permite contratos atualizáveis

Esta propriedade de armazenamento próprio-código emprestado é exatamente o que permite um **contrato proxy** trabalho padrão: um contrato proxy detém todo o estado persistente real (balanços de usuário, configuração) mas contém lógica mínima própria. Cada chamada a ela é encaminhada via `DELEGATECALL` para um separado **Contrato de execução** mantendo a lógica real. Porque o código da implementação é executado contra o *proxy' s* armazenamento, atualização do sistema significa simplesmente apontar o proxy para um novo endereço de contrato de implementação, o próprio endereço do proxy (com o qual usuários e outros contratos interagem) e todo o armazenamento acumulado permanece exatamente o mesmo; somente qual código corre contra esse armazenamento muda. Esta dotação destina-se a cobrir, nomeadamente, os seus riscos reais e documentados. [Contratos de proxy](../contracts/proxies.md) e [Contratos Actualizáveis](../contracts/upgrades.md).

## CALLCODE: antecessor desactualizado da DELEGATECALL

`CALLCODE` anteriores `DELEGATECALL` e compartilha sua propriedade "executar código alvo contra o armazenamento do chamador", mas faz **não** preservar o original `msg.sender` (ele define-o para o contrato de chamada em vez), uma diferença sutil que o tornou estranho e propensa a erros para o padrão proxy especificamente, que é exatamente por isso `DELEGATECALL` foi introduzido (via [EIP-7](https://eips.ethereum.org/EIPS/eip-7), entre os primeiros EIPs de Ethereum) como uma substituição corrigida. Código de Solidity Moderna essencialmente nunca usa `CALLCODE` diretamente.

## Conceitos errôneos comuns

**`DELEGATECALL` não significa que o contrato de chamada ganha o armazenamento do alvo** (o inverso: o *código do alvo* opera sobre a *ouvinte* armazenamento, que é precisamente por isso que os contratos proxy e seus contratos de implementação devem [Contratos de proxy](../contracts/proxies.md#risco-de-colisão-de-armazenamento))) layouts inigualáveis entre proxy e implementação são uma categoria real, documentada e séria de bug de contrato inteligente.

**A `STATICCALL`a restrição somente de leitura é imposta pelo próprio EVM, não apenas uma convenção de nível de Solidity**, mesmo um `DELEGATECALL` fabricado *a partir de dentro* a `STATICCALL`o contexto de execução herda e continua aplicando essa mesma restrição; não há como o código chamado escapar da garantia de um contexto estático através de qualquer combinação de tipos de chamadas.

## Outras leituras

- [Papel Amarelo Ethereum](https://ethereum.github.io/yellowpaper/paper.pdf): Seção 9 (Modelo de execução)
- [EIP-7: DELEGATECALL](https://eips.ethereum.org/EIPS/eip-7)
- [EIP-214: ESTATICCALL](https://eips.ethereum.org/EIPS/eip-214)

---

[← Anterior: Calldata](./calldata.md)
·
[Voltar ao EVM](./README.md)
·
[Próximo: Criação de contratos →](./contract-creation.md)
