# Contrato ABI

O ABI (Application Binary Interface) é como qualquer coisa fora de um contrato (uma carteira, outro contrato, um aplicativo frontend) sabe como codificar corretamente uma chamada para ele e decodificar o que ele retorna. Este capítulo cobre exatamente como uma chamada de função se torna bytes, verificado contra um valor real, independentemente computável.

## O que o ABI realmente é

Um ABI é uma descrição JSON das funções de um contrato, seus tipos de parâmetros, tipos de retorno e eventos, gerados automaticamente pelo compilador a partir da fonte do contrato (visível diretamente no `abi` campo da saída do compilador demonstrado em [Solidity](./solidity.md#um-contrato-completo-mínimo)). Ele não é implantado on-chain ao lado do contrato; é metadados usados pela ferramenta off-chain para construir calldata formatado corretamente e para interpretar os bytes brutos retorna um contrato.

## Selectores de funções

Todas as chamadas de função [calldata](../evm/calldata.md#o-que-os-calldata-realmente-detém) começa com um 4-byte **seletor de funções**, os primeiros 4 bytes de `keccak256(functionSignature)`, onde a assinatura é o nome e os tipos de parâmetros da função, sem espaços, sem nomes de parâmetros, sem tipo de retorno (`transfer(address,uint256)`, não `transfer(address to, uint256 amount)`).

```typescript
import { keccak256, toBytes } from "viem";

const selector = keccak256(toBytes("transfer(address,uint256)")).slice(0, 10);
console.log("selector:", selector);
```

Resultado verificado da execução deste código exato:

```text
selector: 0xa9059cbb
```

Este é o seletor atual, bem conhecido para ERC-20 `transfer(address,uint256)` função (ver [ERC-20](../tokens/erc-20.md)), reconhecível através essencialmente de cada explorador de bloco e contrato token em Ethereum, calculado aqui de forma independente em vez de simplesmente afirmado.

## Argumentos de codificação

Seguindo o seletor de 4-byte, os argumentos são codificados de acordo com regras fixas: `address` e `uint256`) são codificados diretamente, acolchoados a 32 bytes cada; tipos dinâmicos (como `string`, `bytes`, ou arrays) são codificados como um deslocamento apontando para onde seus dados reais aparecem mais tarde nos calldata, com os dados em si incluindo um prefixo de comprimento. Este esquema de codificação é precisa e formalmente especificado, não uma convenção diferentes ferramentas podem implementar um pouco diferente, mas um padrão estrito cada codificador/decodificador ABI correto deve seguir idênticamente, que é exatamente o que permite um script Python, um `viem`- com base no aplicativo TypeScript e na própria codificação interna de chamadas da Solidity, todos interoperam corretamente ao chamar o mesmo contrato.

## Exemplo: uma chamada codificada completa, decodificada peça por peça

```typescript
import { encodeFunctionData, decodeFunctionData, parseAbi } from "viem";

const abi = parseAbi(["function transfer(address to, uint256 amount) returns (bool)"]);

const data = encodeFunctionData({
  abi,
  functionName: "transfer",
  args: ["0x000000000000000000000000000000000000dEaD", 1000000000000000000n],
});

console.log("encoded calldata:", data);

const decoded = decodeFunctionData({ abi, data });
console.log("decoded function:", decoded.functionName);
console.log("decoded args:", decoded.args);
```

Resultado verificado da execução deste código exato:

```text
encoded calldata: 0xa9059cbb000000000000000000000000000000000000000000000000000000000000dead0000000000000000000000000000000000000000000000000de0b6b3a7640000
decoded function: transfer
decoded args: [ '0x000000000000000000000000000000000000dEaD', 1000000000000000000n ]
```

Reparem nos primeiros 4 bytes. `a9059cbb`, exatamente o selector deste capítulo calculado de forma independente acima, confirmando `viem`o codificador e o manual `keccak256` Computação concorda, como a especificação ABI exige que eles.

## Conceitos errôneos comuns

**Uma colisão seletor de função (duas assinaturas de função diferentes produzindo o mesmo seletor de 4-bytes) é uma possibilidade real, se extremamente rara,** dado apenas 4 bytes (2^32 valores possíveis). Verificação do compilador de solidez para e rejeita colisões de seletores *num único contrato* no momento da compilação, mas uma colisão com o seletor *em dois contratos diferentes, não relacionados* é possível e foi ocasionalmente explorado ou discutido como uma consideração de segurança, particularmente para padrões de proxy (ver [Contratos de proxy](./proxies.md)) que chamadas de rota baseado em selector correspondência.

**O ABI não é obrigado a ser publicado ou verificado para que um contrato funcione**Um contrato funciona puramente com base na lógica do seu próprio bytecode implantado, independentemente de alguém ter publicado um ABI correspondente; o ABI é uma conveniência para *interacção* com um contrato corretamente, não é algo que o próprio EVM verifica ou obriga no momento da chamada.

## Outras leituras

- [Documentação de solidez: Especificação ABI do contrato](https://docs.soliditylang.org/en/latest/abi-spec.html)

---

[← Anterior: Solidity](./solidity.md)
·
[Voltar aos contratos inteligentes](./README.md)
·
[Próximo: Funções →](./functions.md)
