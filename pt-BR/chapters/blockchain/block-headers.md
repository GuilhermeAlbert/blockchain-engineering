# Cabeçalhos de Blocos

O cabeçalho do bloco é a estrutura de 80-bytes que a prova de trabalho realmente protege, e é a única parte de um bloco que um cliente leve precisa baixar para verificar a prova de trabalho da cadeia. Este capítulo vai campo a campo através do formato de cabeçalho real do Bitcoin.

## Os seis campos

O cabeçalho do bloco do Bitcoin consiste em exatamente seis campos, totalizando 80 bytes:

| Campo | Tamanho | Objecto |
| --- | --- | --- |
| Versão | 4 bytes | Indica qual o conjunto de regras de consenso que o bloco segue (utilizado historicamente para sinalização da ativação do soft fork, ver [Sinalização Miner](../forks/miner-signaling.md)) |
| Hash do bloco anterior | 32 bytes | Hash SHA-256d do cabeçalho do bloco anterior, ligando este bloco à cadeia (veja [Hashes e Block Linking](./block-linking.md)) |
| Raízes de merkle | 32 bytes | Baseada em SHA-256d Merkle root resumindo cada transação no bloco (ver [Raízes de Merkle](./merkle-roots.md)) |
| Timetamp | 4 bytes | Data limite de quando o minerador começou a hashing este bloco (aproximado, e livremente limitado por regras de consenso, não exatas) |
| Alvo de dificuldade (bits) | 4 bytes | Uma forma codificada de forma compacta do limiar alvo atual um hash de bloco válido deve estar abaixo (ver [Dificuldade em Mineração](../bitcoin/difficulty.md)) |
| Nonce | 4 bytes | Os mineradores de valor variam ao procurar um hash de prova de trabalho válido |

```text
┌──────────┬──────────────────┬─────────────┬───────────┬──────┬───────┐
│ Version  │ Previous block   │ Merkle root │ Timestamp │ Bits │ Nonce │
│ 4 bytes  │ hash (32 bytes)  │ (32 bytes)  │ (4 bytes) │ (4B) │ (4B)  │
└──────────┴──────────────────┴─────────────┴───────────┴──────┴───────┘
                                  = 80 bytes total
```

## Por que exatamente estes seis campos, e nada mais

Cada campo ganha seu lugar por ser necessário para encadear (hash bloco anterior), necessário para comprometer-se com o conteúdo do bloco sem incluí-los diretamente (Merkle root), ou necessário para a própria prova de trabalho pesquisa (timestamp, bits, nonce. Versão é usada mais incidentalmente, principalmente para sinalização). Notavelmente, os dados de transação em si são **não** no cabeçalho. Só a sua raiz Merkle é. Esta é a razão pela qual o cabeçalho pode permanecer um pequeno, fixo 80 bytes, não importa quantas transações o bloco contém: adicionar mais transações muda a raiz do Merkle, mas nunca o tamanho do cabeçalho, que é o que mantém somente verificação de cabeçalho (SPV, veja [Clientes leves](../bitcoin/light-clients.md)) barato, independentemente de quão grandes blocos eles mesmos obter.

## O problema do nonce, e extranonce

O campo nonce é apenas 4 bytes, um número de 32 bits, dando cerca de 4,3 bilhões de valores possíveis. O hardware de mineração moderno pode esgotar toda esta gama em uma pequena fração de segundo, muito mais rápido do que o tempo de bloqueio de alvo de aproximadamente 10 minutos (ver [Tempo de bloco](./block-time.md)) exige. Para continuar a procurar um hash válido além de esgotar o campo nonce, os mineradores também variam um **extranonce** valor incorporado na transação de base de moedas (ver [Transações de base de moeda](../bitcoin/coinbase-transactions.md)). A alteração da extranonce altera a transação coinbase, que muda a raiz do Merkle, que efetivamente dá aos mineradores acesso a um espaço de busca muito maior do que o campo nonce do cabeçalho. Este é um detalhe prático que se torna necessário no momento em que o hardware de mineração excede cerca de 4 bilhões de hashes por segundo, o que aconteceu no início da era ASIC do Bitcoin.

## Exemplo: serialização e hashing de um cabeçalho

```typescript
import { createHash } from "node:crypto";

interface BlockHeader {
  version: number;
  previousBlockHash: string; // hex
  merkleRoot: string;        // hex
  timestamp: number;         // unix seconds
  bits: string;               // compact difficulty target, hex
  nonce: number;
}

function sha256d(buf: Buffer): Buffer {
  const once = createHash("sha256").update(buf).digest();
  return createHash("sha256").update(once).digest();
}

function serializeHeader(h: BlockHeader): Buffer {
  const version = Buffer.alloc(4);
  version.writeUInt32LE(h.version);

  const timestamp = Buffer.alloc(4);
  timestamp.writeUInt32LE(h.timestamp);

  const nonce = Buffer.alloc(4);
  nonce.writeUInt32LE(h.nonce);

  return Buffer.concat([
    version,
    Buffer.from(h.previousBlockHash, "hex").reverse(), // Bitcoin serializes hashes little-endian
    Buffer.from(h.merkleRoot, "hex").reverse(),
    timestamp,
    Buffer.from(h.bits, "hex").reverse(),
    nonce,
  ]);
}

const header: BlockHeader = {
  version: 1,
  previousBlockHash: "0".repeat(64),
  merkleRoot: "3d086d8d96bd2bb74c257636b0ae07fe7d3d4c02a9b4ace7f1af21e6c6ba0aa8",
  timestamp: 1700000000,
  bits: "1d00ffff",
  nonce: 0,
};

const serialized = serializeHeader(header);
console.log("Serialized length (should be 80 bytes):", serialized.length);
console.log("SHA-256d hash:", sha256d(serialized).reverse().toString("hex"));
```

Resultado verificado da execução deste código exato:

```text
Serialized length (should be 80 bytes): 80
SHA-256d hash: fa6881fa2de15ecd5cce9c877420f00794e64fd2d1f68551d06486e29ce65754
```

Confirmando o cabeçalho serializa para exatamente 80 bytes, independentemente dos valores de campo (arbitrário, ilustrativo) usados aqui.

## Sob o capô: ordem do byte

A serialização do Bitcoin usa **little-endian** bytes de ordem para a maioria dos campos numéricos e, confusamente para os recém-chegados, as lojas hashes inverteu em relação a como eles são exibidos convencionalmente (os exploradores de bloco mostram hashes em uma cadeia hex-endiana de leitura humana, mas os bytes brutos no fio e no armazenamento são o inverso disso). Esta é uma peculiaridade histórica bem conhecida, se estranha, da implementação original do Bitcoin C++ em vez de uma escolha de design deliberada com uma lógica mais profunda, e é uma fonte comum de bugs sutis para qualquer um implementando a serialização do Bitcoin do zero. Obter ordem de byte errada produz um hash completamente diferente e incorreto, mesmo que cada valor de byte individual seja "correto".

## Comércio

Manter o cabeçalho em um fixo, pequeno 80 bytes (deliberadamente excluindo os dados reais da transação) é o que permite a verificação leve em escala, ao custo do cabeçalho sozinho ser insuficiente para verificar que as próprias transações são individualmente válidas (apenas que *alguns* conjunto de transações, resumido pela raiz de Merkle, foi comprometido). Esta é a base precisa e mecânica para o tradeoff de segurança da SPV discutido em [Clientes leves](../bitcoin/light-clients.md) e [Provas de Merkle](../cryptography/merkle-proofs.md#comércio).

## Conceitos errôneos comuns

**O campo timestamp não é um registro confiável e preciso de exatamente quando um bloco foi criado.** As regras de consenso só exigem que seja maior do que a mediana das datas dos 11 blocos anteriores e não mais de duas horas antes do tempo ajustado à rede, uma restrição solta, não um relógio preciso, que é um detalhe que ocasionalmente surpreende os desenvolvedores construindo aplicações sensíveis ao tempo em cima dos dados do bloco.

**O hash de um bloco não é armazenado dentro do seu próprio cabeçalho.** Os campos do cabeçalho, juntos, *Produção* O haxixe do bloco. O hash é uma propriedade calculada do conteúdo do cabeçalho, não um campo dentro dele.

## Outras leituras

- [Bitcoin Referência do desenvolvedor principal: cabeçalhos de bloco](https://developer.bitcoin.org/reference/block_chain.html#block-headers)

---

[← Anterior: Blocos](./blocks.md)
·
[Voltar para Blockchain Fundamentos](./README.md)
·
[Próximo: Transações →](./transactions.md)
