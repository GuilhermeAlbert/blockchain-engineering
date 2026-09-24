# Contratos de chamada

Este capítulo traça a linha [Ler o Estado da Cadeia de Blocos](./reading-state.md) já implicado, mas não soletrou completamente: a diferença entre **chamando** um contrato (simulado, livre, apenas para leitura) `eth_call`) e **enviando uma transação** a um contrato (uma ação real, de custo de gás, que exige uma assinatura). Confundir os dois é uma fonte comum de bugs e gastos desnecessários com gás.

## Duas operações fundamentalmente diferentes por detrás de um código semelhante

```typescript
// A CALL — free, instant, read-only, no signature needed.
const balance = await client.readContract({
  address: tokenAddress,
  abi: erc20Abi,
  functionName: "balanceOf",
  args: [someAddress],
});

// A TRANSACTION — costs gas, requires a signature, takes time to confirm.
const hash = await walletClient.writeContract({
  address: tokenAddress,
  abi: erc20Abi,
  functionName: "transfer",
  args: [recipientAddress, amount],
});
```

A distinção remonta diretamente a [Funções](../contracts/functions.md#ver-e-funções-puras): a `view`/`pure` função pode ser chamada com segurança com `readContract` (ou em bruto `eth_call`), uma vez que não faz alterações de estado para simular. Uma função de mudança de estado (não `view`/`pure` modificador) necessidades `writeContract`, que constrói, sinais (através da carteira conectada, veja [Conectando as Carteiras](./wallet-connections.md)), e transmite uma transação real.

## Simular uma escrita antes de a enviar

Uma aplicação bem construída em geral **simula** uma chamada de mudança de estado antes de realmente enviá-la como uma transação, usando `eth_call` contra a mesma função e argumentos exatos que a transação real usará, especificamente para capturar uma falha (um reverso, um saldo insuficiente, argumentos inválidos) **antes** pagar qualquer gás real ou esperar por uma confirmação real:

```typescript
// Simulates the write, catching failures for free, before spending real gas.
const { request } = await client.simulateContract({
  address: tokenAddress,
  abi: erc20Abi,
  functionName: "transfer",
  args: [recipientAddress, amount],
  account: senderAddress,
});

const hash = await walletClient.writeContract(request);
```

Este padrão de duas etapas (simular, em seguida, enviar exatamente o que simulação validada) é prática padrão especificamente porque uma transação na cadeia falhou ainda custa o gás consumido até seu ponto de falha (recordar [Gás](../ethereum/gas.md#o-que-acontece-quando-uma-transação-fica-sem-gás)), simulando as primeiras capturas mais falhas evitáveis de graça.

## Conceitos errôneos comuns

**Uma simulação bem sucedida não garante que a transação real também terá sucesso** (o estado pode mudar entre simulação e a transação realmente sendo minada (outra transação poderia executar primeiro, alterando um saldo ou o estado de um contrato de uma forma que faça com que a chamada originalmente simulada falhe))) simulação reduz, mas não elimina, o risco de uma transação falhada, particularmente para condições de cadeia on- [Execução frontal](../security/front-running.md)).

**Chamar um `view` a função através do fluxo de envio de transações de uma carteira (em vez de uma leitura simples) não é "mais correta" ou "mais segura"**É simplesmente desnecessário: a `view` função não faz alterações de estado para uma assinatura de carteira para autorizar significativamente, por isso roteá-lo através do fluxo de transação apenas adiciona atrito desnecessário (um popup carteira, uma espera para confirmação) para nenhum benefício adicional sobre uma planície, livre `readContract` Cubro.

## Outras leituras

- [viem documentação: writeContrato](https://viem.sh/docs/contract/writeContract)
- [documentação do viem: simularContrato](https://viem.sh/docs/contract/simulateContract)

---

[← Anterior: Lendo Blockchain Estado](./reading-state.md)
·
[Voltar para Construindo Aplicações Web3](./README.md)
·
[Próximo: Envio de Transações →](./sending-transactions.md)
