# Armazenamento

Armazenamento é o único lugar onde os dados de um contrato sobrevivem entre chamadas separadas, tudo em [Memória](./memory.md) e o [Pilha](./stack.md) é descartado no instante em que uma chamada termina. Este capítulo executa um real `SSTORE`/`SLOAD` sequência para demonstrar tanto a persistência quanto o custo específico, deliberadamente elevado que a persistência carrega.

## Estrutura

Cada conta de contrato tem seu próprio armazenamento, organizado como um mapeamento de chaves de 256 bits ("lotes") para valores de 256 bits (ver [Contas Ethereum](../ethereum/accounts.md#qual-a-composição-de-todas-as-contas) para a `storageRoot` campo este mapas para, e [Trie Estado](../ethereum/state-trie.md) para a estrutura de dados subjacente). Ao contrário da memória, slots de armazenamento padrão para zero e, criticamente, **persistir em todos os futuros convites a esse contrato**, enquanto o contrato existir. Este é todo o mecanismo por trás do mapeamento de saldo de um token, reservas de pool de um protocolo DeFi, ou qualquer outro estado on-chain que precise sobreviver a uma única transação.

## Exemplo: um valor que sobrevive, verificado com execução real

```typescript
import { createEVM } from "@ethereumjs/evm";
import { Account, bytesToHex, createAddressFromString, hexToBytes } from "@ethereumjs/util";

const evm = await createEVM();
const caller = createAddressFromString("0x00000000000000000000000000000000000000ee");
const contract = createAddressFromString("0x00000000000000000000000000000000000000c0");

// PUSH1 0x2a PUSH1 0x00 SSTORE   -- store 42 at storage slot 0
// PUSH1 0x00 SLOAD               -- load slot 0 back
// PUSH1 0x00 MSTORE              -- put it in memory
// PUSH1 0x20 PUSH1 0x00 RETURN   -- return it
const code = hexToBytes("0x602a600055600054600052602060" + "00f3");
await evm.stateManager.putCode(contract, code);
await evm.stateManager.putAccount(caller, new Account(0n, 1_000_000_000_000n));

const result = await evm.runCall({ caller, to: contract, gasLimit: 100_000n });
console.log("Return value:", BigInt(bytesToHex(result.execResult.returnValue)));
console.log("Gas used:", result.execResult.executionGasUsed.toString());
```

Resultado verificado da execução deste código exato:

```text
Return value: 42n
Gas used: 22224
```

O valor escrito por `SSTORE` e ler de volta por `SLOAD` **dentro da mesma chamada** viagens de ida e volta corretas para 42, mas veja o custo do gás: **22,224**, dramaticamente mais do que o gás 18 o exemplo de memória quase idêntica em [Bytecode](./bytecode.md) consumido pela mesma lógica de "armazenar um valor, devolvê-lo". Essa diferença é quase inteiramente o custo de um `SSTORE` escrevendo um slot previamente zero para um valor não zero (20.000 gás, por [EIP-2929](https://eips.ethereum.org/EIPS/eip-2929)'s calendário de gás) mais um `SLOAD` em um slot "frio" (ainda não-acessado-esta-transação) (2.100 gases), real, medido, e exatamente a assimetria de custo de armazenamento-versus-memória deliberada [Memória](./memory.md#por-que-a-memória-está-separada-do-armazenamento-em-tudo) já descrito conceitualmente, agora demonstrado com um número real.

## Disposição de armazenamento para tipos complexos

Solidity (ver [Variáveis de Estado](../contracts/state.md)) atribui slots de armazenamento às variáveis de estado declaradas de um contrato em ordem de declaração para tipos simples, mas usa **hashing** para tipos mais complexos: a `mapping`valor da chave `k` é armazenado no slot `keccak256(k . p)` (em que `p` é a própria posição declarada do 'slot' do mapeamento), e os elementos de um array dinâmico são armazenados começando em `keccak256(p)`, um esquema especificamente projetado para que slots para diferentes chaves ou índices de array não colidem entre si ou com as outras variáveis declaradas do contrato, sem precisar saber com antecedência quão grande um mapeamento ou array irá eventualmente crescer.

## Conceitos errôneos comuns

**O armazenamento não é automaticamente "público" ou livremente legível por outros contratos através de algum mecanismo de acesso incorporado** (é totalmente legível por qualquer pessoa inspecionando o blockchain diretamente (nada em um blockchain público é confidencial, veja [Privacidade](../society/privacy.md)), mas outro *contrato* só pode lê-lo através do seu próprio `SLOAD` chamadas contra o seu próprio armazenamento, ou chamando uma função o contrato alvo explicitamente expõe para devolver esses dados) não há contrato cruzado `SLOAD` de outro contrato de armazenamento diretamente.

**Um slot de armazenamento padrão para zero é indistinguível, no nível EVM, de um slot que foi explicitamente definido como zero.** Isto tem implicações reais, ocasionalmente consequenciais para a lógica do contrato que precisa distinguir "nunca definido" de "explicativamente definido para o valor zero". Tal lógica tem que rastrear essa distinção em si, em uma variável separada, uma vez que o modelo de armazenamento do EVM não fornece tal distinção nativamente.

## Outras leituras

- [Papel Amarelo Ethereum](https://ethereum.github.io/yellowpaper/paper.pdf): Apêndice H (Especificação da máquina virtual)
- [EIP-2929: Aumento do custo de gás para opcodes de acesso estatal](https://eips.ethereum.org/EIPS/eip-2929)
- [Documentação de solidez: Disposição das Variáveis Estatais no Armazenamento](https://docs.soliditylang.org/en/latest/internals/layout_in_storage.html)

---

[← Anterior: Memória](./memory.md)
·
[Voltar ao EVM](./README.md)
·
[Próximo: Calldata →](./calldata.md)
