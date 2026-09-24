# Funções Payable

[Funções](./functions.md#funções-a-pagar) já introduzido `payable` como o modificador que permite uma função aceitar éter. Este capítulo vai mais fundo no que acontece com aquele éter, o especial `receive` e `fallback` funções que manuseiam o éter enviado sem chamar qualquer função específica, e um detalhe relevante para a segurança vale a pena saber antes de escrever qualquer contrato que contenha fundos.

## receive() e fallback()

Um contrato pode definir duas funções especiais, sem nome especificamente para lidar com chamadas que não correspondem a nenhuma função regular:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract PayableDemo {
    event Received(address sender, uint256 amount);

    // Called when ether is sent with empty calldata.
    receive() external payable {
        emit Received(msg.sender, msg.value);
    }

    // Called when calldata is non-empty but doesn't match any function selector,
    // or when receive() doesn't exist and calldata is empty.
    fallback() external payable {
        emit Received(msg.sender, msg.value);
    }
}
```

Verificado: isso compila-se de forma limpa com solc 0.8.26 (Solidity permite que ambos coexistam, com `receive()` lidar especificamente com a caixa de dados de chamadas vazias e `fallback()` lidar com tudo o resto, exatamente como comentado acima).

## Por que ambos existem, e a regra de encaminhamento entre eles

Esta divisão existe porque "éter enviado sem dados" (uma transferência simples, o caso comum) e "um chamado para um seletor de função não reconhecido" (o que pode indicar um erro, ou pode ser intencional, ver o [Contratos de proxy](./proxies.md) padrão, que se baseia inteiramente em `fallback()` para encaminhar chamadas não reconhecidas) são situações genuinamente diferentes que um contrato pode querer lidar de forma diferente. Regra exata de roteamento da solidez: se calldata estiver vazia e `receive()` existe, `receive()` funciona; caso contrário, se `fallback()` existe (e está marcado `payable`, para uma chamada carregando éter), `fallback()` corre; se nenhum existir e apropriado, a transação reverte, recusando-se a aceitar o éter ou a chamada não reconhecida.

## As três maneiras de enviar éter, e porque eles diferem

A solidez oferece três maneiras de enviar o éter para outro endereço, cada um com comportamento significativamente diferente que vale a pena saber exatamente:

- **`transfer(amount)`**: envia éter, encaminhando um fixo **2.300 salários de gás** ao destinatário `receive`/`fallback` função, e automaticamente **reverte** toda a transação se o envio falhar. O pequeno salário fixo do gás era originalmente destinado como uma medida de segurança (muito pouco gás para o destinatário fazer muito além de uma atualização mínima do estado, limitando o risco de reentrância. Ver [Reentrância](../security/reentrancy.md)) mas tornou-se uma fonte de problemas reais de compatibilidade, uma vez que os custos do gás para certas operações mudaram ao longo do tempo, causando, por vezes, `transfer` Falhar contra contratos de outra forma legítimos que necessitem de mais de 2.300 gás para processar o recibo corretamente.
- **`send(amount)`**: o equivalente mais antigo, de baixo nível de `transfer`, mas retorna a `bool` indicando sucesso ao invés de reverter automaticamente, significando um desenvolvedor usando `send` deve lembrar-se de verificar explicitamente o seu valor de retorno, ou uma transferência falhada pode passar silenciosamente despercebida.
- **`call{value: amount}("")`**: a abordagem moderna, geralmente recomendada: **todos os gases remanescentes** por padrão (evitando o problema de compatibilidade de 2.300 gases `transfer` e `send` compartilhamento) e retorna a `bool` indicador de sucesso que deve ser explicitamente verificado, exatamente como `send`.

## Conceitos errôneos comuns

**Utilização `call` para enviar éter não é automaticamente menos seguro do que `transfer`**, apesar `transfer`O comportamento limitador de gás foi originalmente enquadrado como uma característica de segurança. As orientações atuais sobre a solidez geralmente recomendam `call` especificamente *combinado com* a [padrão de verificação-efeitos-interações](../security/reentrancy.md#controles-efeitos-interacções) como a abordagem global mais segura, em vez de confiar em um salário arbitrário, cada vez mais não confiável para evitar reentrância.

**Um contrato com não `receive()` ou `payable fallback()` não é necessariamente imune a manter o éter**, embora rejeite as transferências normais de éter, o éter ainda pode alcançar tal contrato através de outros meios (sendo o alvo de `SELFDESTRUCT` a partir de outro contrato, ou sendo pré-financiado antes da implantação através de um `CREATE2` endereço, ver [Criação de Contratos](../evm/contract-creation.md#conceitos-errôneos-comuns)), um detalhe que ocasionalmente surpreende os desenvolvedores que assumiram "sem função a pagar" significava "nunca pode manter um equilíbrio".

## Outras leituras

- [Documentação de solidez: Funções Especiais](https://docs.soliditylang.org/en/latest/contracts.html#special-functions)
- [Documentação de solidez: Enviando Éter](https://docs.soliditylang.org/en/latest/security-considerations.html#sending-and-receiving-ether)

---

[← Anterior: Erros e Reversões](./errors.md)
·
[Voltar aos contratos inteligentes](./README.md)
·
[Próximo: Herança →](./inheritance.md)
