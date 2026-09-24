# Bitcoin Script

Bitcoin Script é a pequena linguagem de programação baseada em pilhas usada para expressar as condições de gasto, tanto o script de bloqueio anexado a uma saída e os dados de desbloqueio fornecidos para gastá-lo. Este capítulo cobre como a linguagem realmente executa, com um intérprete trabalhando, simplificado, porque "script" é um daqueles termos Bitcoin que as pessoas usam constantemente sem ter visto o modelo de execução real a que se refere.

## O projeto: uma máquina de pilha, deliberadamente não Turing-completo

O Bitcoin Script executa numa única pilha de dados. Cada operação empurra dados para a pilha ou solta algum número de itens, faz algo com eles e empurra um resultado de volta. Crucialmente, **Bitcoin Script não tem loops e nenhuma maneira de saltar para trás**. Cada script executa uma sequência fixa e finita de operações do início ao fim, o que significa, ao contrário de uma linguagem de programação de propósito geral, que o tempo e o comportamento de execução de um script Bitcoin podem sempre ser totalmente analisados com antecedência; não há possibilidade de um loop infinito ou imprevisíveis blowup de tempo de execução. Esta foi uma escolha de design deliberada por Satoshi, negociando expressividade de propósito geral para previsibilidade e segurança, um contraste direto com a escolha de design [Ethereum's EVM](../evm/README.md) mais tarde feita na direcção oposta (ver [O EVM](../evm/README.md)).

## Operações principais

O Bitcoin Script tem cerca de 100 opcodes definidos (algumas desabilitadas por razões de segurança no início do histórico do Bitcoin). Os que aparecem constantemente em transações ordinárias:

- `OP_DUP`: duplica o item da pilha superior
- `OP_HASH160`: pops o item superior, hashes-lo com SHA-256 em seguida, RIPEMD-160, empurra o resultado (isto é exatamente como uma chave pública torna-se um endereço, veja [Endereços](../wallets/addresses.md))
- `OP_EQUALVERIFY`: aparece os dois itens principais, verifica se são iguais, e **falha o script inteiro imediatamente** se não
- `OP_CHECKSIG`: mostra uma chave pública e uma assinatura, verifica se a assinatura é válida para a transação atual sob essa chave pública, e empurra `true` ou `false`
- `OP_EQUAL`: pops os dois primeiros itens e empurra se eles são iguais, sem parar na falha o caminho `OP_EQUALVERIFY` faz

## Exemplo: um interpretador de script simplificado e funcional

Isto implementa o suficiente da máquina de pilha para executar a sequência exata de opcode por trás do P2PKH (o tipo de script de bloqueio histórico mais comum (ver [P2PKH](./p2pkh.md)) com uma verificação de assinatura simplificada e ilustrativa, em vez de ECDSA real, para manter o exemplo auto-suficiente e focado no próprio modelo de execução:

```typescript
import { createHash } from "node:crypto";

function sha256(buf: Buffer): Buffer {
  return createHash("sha256").update(buf).digest();
}
function ripemd160(buf: Buffer): Buffer {
  return createHash("ripemd160").update(buf).digest();
}
function hash160(buf: Buffer): Buffer {
  return ripemd160(sha256(buf));
}

type StackItem = Buffer | boolean;
type Op = { type: "push"; data: Buffer } | { type: "op"; name: string };

// A drastically simplified stand-in for OP_CHECKSIG. Real Bitcoin verifies
// an ECDSA or Schnorr signature against transaction data — see
// cryptography/ecdsa.md and cryptography/digital-signatures.md. Here we
// just check the signature buffer starts with a fixed "valid" marker, to
// isolate the stack-machine execution logic this chapter is teaching.
function checkSig(signature: Buffer, publicKey: Buffer): boolean {
  return signature.toString().startsWith("valid-sig-for:") && signature.toString().endsWith(publicKey.toString("hex"));
}

function execute(script: Op[], initialStack: StackItem[] = []): StackItem[] {
  const stack: StackItem[] = [...initialStack];

  for (const op of script) {
    if (op.type === "push") {
      stack.push(op.data);
      continue;
    }

    switch (op.name) {
      case "OP_DUP": {
        const top = stack[stack.length - 1];
        stack.push(top);
        break;
      }
      case "OP_HASH160": {
        const top = stack.pop() as Buffer;
        stack.push(hash160(top));
        break;
      }
      case "OP_EQUALVERIFY": {
        const a = stack.pop();
        const b = stack.pop();
        if (!(Buffer.isBuffer(a) && Buffer.isBuffer(b) && a.equals(b))) {
          throw new Error("OP_EQUALVERIFY failed — script invalid");
        }
        break;
      }
      case "OP_CHECKSIG": {
        const publicKey = stack.pop() as Buffer;
        const signature = stack.pop() as Buffer;
        stack.push(checkSig(signature, publicKey));
        break;
      }
      default:
        throw new Error(`Unknown op: ${op.name}`);
    }
  }

  return stack;
}

// --- Build a P2PKH-style locking script and a matching unlocking script ---

const alicePublicKey = Buffer.from("alice-pubkey-02abc123");
const alicePubKeyHash = hash160(alicePublicKey);

// scriptPubKey (locking script), attached to the output when it was created:
const lockingScript: Op[] = [
  { type: "op", name: "OP_DUP" },
  { type: "op", name: "OP_HASH160" },
  { type: "push", data: alicePubKeyHash },
  { type: "op", name: "OP_EQUALVERIFY" },
  { type: "op", name: "OP_CHECKSIG" },
];

// scriptSig (unlocking data), provided by whoever is spending this output.
// Execution order is: unlocking script first, then locking script,
// operating on the same, shared stack.
const validSignature = Buffer.from(`valid-sig-for:${alicePublicKey.toString("hex")}`);
const unlockingScript: Op[] = [
  { type: "push", data: validSignature },
  { type: "push", data: alicePublicKey },
];

const combined = [...unlockingScript, ...lockingScript];
const result = execute(combined);
console.log("Script result (top of stack):", result[result.length - 1]);
console.log("Spend is valid:", result[result.length - 1] === true);

// Now try it with the WRONG public key — should fail at OP_EQUALVERIFY.
const wrongPublicKey = Buffer.from("mallory-pubkey-03xyz789");
const forgedUnlockingScript: Op[] = [
  { type: "push", data: validSignature },
  { type: "push", data: wrongPublicKey },
];
try {
  execute([...forgedUnlockingScript, ...lockingScript]);
} catch (err) {
  console.log("Forged spend correctly rejected:", (err as Error).message);
}
```

## O que acabou de acontecer, passo a passo

A execução executa o script de desbloqueio primeiro (empurrando a assinatura, em seguida, a chave pública na pilha), em seguida, o script de bloqueio: `OP_DUP` duplica a chave pública, `OP_HASH160` hashes a duplicata, o empurrado `alicePubKeyHash` é comparado com `OP_EQUALVERIFY` (provando que a chave pública fornecida corresponde realmente ao endereço para o qual esta saída foi bloqueada, e parando imediatamente se não, exatamente o que pega a tentativa forjada acima), e finalmente `OP_CHECKSIG` Verifica a assinatura em relação à chave pública (agora verificada e correcta). O script só é válido se cada passo tiver sucesso e o item de pilha final for `true`.

## Calendário

O Bitcoin Script também suporta opcodes que tornam uma saída inspecionável até que uma determinada condição com o tempo ou altura do bloco seja cumprida: `OP_CHECKLOCKTIMEVERIFY` (BIP 65, um bloqueio de tempo absoluto, inspecionável até uma altura de bloco específica ou uma marca temporal) e `OP_CHECKSEQUENCEVERIFY` (BIP 112, um período relativo, inspecionável até que um determinado período de tempo ou número de blocos tenha passado *uma vez que essa produção específica foi confirmada*, desde qualquer data fixa). Estes são os blocos de construção atrás [multisig](../wallets/multisig.md) com condições de retrocesso baseadas no tempo e [HTLCs](../lightning/htlcs.md) que tornam possível o roteamento minimizado da Rede Lightning.

## Comércio

A expressividade deliberadamente limitada do Bitcoin Script (sem loops, sem computação geral) é um tradeoff direto, considerado: torna o comportamento de cada script totalmente previsível e analisável antes da execução, ao custo de não ser capaz de expressar a lógica programável arbitrária da maneira como o EVM Turing-completo de Ethereum pode (ver [O EVM](../evm/README.md)). Bitcoin pode expressar "gastável por esta chave", "gastável por duas destas três chaves", ou "gastável depois desta data", mas não, por exemplo, uma lógica completa do fabricante de mercado automatizado on-chain (ver [Criadores de Mercado Automatizados](../defi/amm.md)), que requer o cálculo geral do modelo de Ethereum suporta.

## Conceitos errôneos comuns

**Bitcoin Script não é Turing-completo, e esta é uma escolha de design deliberada, não uma limitação Satoshi pretende corrigir mais tarde.** A ausência de loops especificamente impede toda uma categoria de potenciais problemas de negação de serviço e de execução-tempo imprevisível que uma linguagem de script de propósito geral precisaria de outros mecanismos (como Ethereum's [gás](../ethereum/gas.md)) para defender contra.

**A maioria dos usuários de Bitcoin nunca escreve ou vê o script bruto diretamente.** O software de carteira constrói padrões de script padrão (P2PKH, P2SH, SegWit, Taproot, coberto nos próximos capítulos) automaticamente; scripts personalizados de escrita manual é um caso de uso especializado e avançado.

## Outras leituras

- [Bitcoin Referência do desenvolvedor principal: Script](https://developer.bitcoin.org/reference/script.html)
- [Wiki do Bitcoin: Script](https://en.bitcoin.it/wiki/Script)

---

[← Anterior: Transações de base de moeda](./coinbase-transactions.md)
·
[Voltar para Bitcoin](./README.md)
·
[Próximo: ScriptPubKey e ScriptSig →](./scripts.md)
