# Hashes e Block Linking

Este capítulo responde diretamente à pergunta na lista de objetivos deste livro: por que alguém não pode simplesmente mudar um bloco Bitcoin antigo? A resposta é inteiramente mecânica, e vem de um simples fato declarado em [Cabeçalhos de Blocos](./block-headers.md): o cabeçalho de cada bloco inclui o hash do bloco antes dele.

## O mecanismo

Cada cabeçalho de bloco contém um campo, `previousBlockHash`, segurando o hash SHA-256d de todo o cabeçalho do bloco anterior. Porque uma função hash é sensível a cada bit de sua entrada (o efeito avalanche, veja [Funções do Hash](../cryptography/hashes.md)), qualquer mudança para um bloco (mesmo uma única transação alterada) muda o hash do cabeçalho do bloco completamente e imprevisivelmente.

```text
Block 100                Block 101                Block 102
hash: A                  hash: B                   hash: C
previous: Z               previous: A               previous: B
     │                         │                         │
     └────────────────────────►│                         │
                                └────────────────────────►│
```

Suponhamos que alguém tente alterar uma transação dentro do Bloco 100, anos depois do fato. Isto muda a raiz Merkle do bloco 100 (ver [Raízes de Merkle](./merkle-roots.md)), que muda o cabeçalho do bloco 100, que muda o hash do bloco 100 de `A` para algum valor novo `A'`Mas o cabeçalho do bloco 101 ainda contém o *antigo* valor `A` na sua `previousBlockHash` Campo. A cadeia está agora quebrada: Bloco 101 não mais referencia corretamente o Bloco 100 (agora alterado). Para corrigir isso, o atacante também precisaria atualizar Block 101's `previousHash` campo para `A'`, que muda o hash próprio do bloco 101 de `B` para `B'`, que quebra a referência do Bloco 102, e assim por diante, para cada bloco do alterado para a ponta atual da corrente.

## O custo que isso impõe: refazer prova de trabalho

Mudar um cabeçalho não é apenas uma correção de contabilidade. O hash de cada bloco tem de satisfazer o requisito de prova de trabalho ativo no momento em que foi extraído (ver [Prova de Trabalho](../bitcoin/proof-of-work.md)): o hash deve ser inferior a um objetivo específico, que (por [Resistência à Preimagem](../cryptography/preimage-resistance.md)) requer tentar muitos valores de nonce em média. Então um atacante que altera o Bloco 100 não precisa apenas de recompilar hashes para cada bloco subsequente. Eles precisam de... **re- mina** cada um deles, buscando um novo nonce válido para cada, exatamente como se criando cada um desses blocos do zero. Se uma centena de blocos foram minados em cima do alterado, o atacante precisa refazer, desde um início em pé, o equivalente a uma centena de blocos do esforço computacional combinado de toda a rede, e fazê-lo mais rápido do que a rede honesta continua estendendo a cadeia real nesse meio tempo, ou sua cadeia alternativa nunca se tornará a mais longa e será simplesmente ignorada (ver [Escolha do fork](./fork-choice.md)).

## Exemplo: quantificar o custo

Se toda a rede do Bitcoin está atualmente encontrando blocos aproximadamente a cada 10 minutos usando sua taxa de hash combinada completa, um atacante tentando alterar um bloco 100 blocos de profundidade precisaria sozinho out-produzir esse esforço combinado para o equivalente a 100 blocos de trabalho, enquanto a rede honesta continua adicionando novos blocos em cima da ponta atual durante o mesmo período, o que significa que a saída realmente necessária do atacante é ainda maior do que "100 blocos de valor", já que eles estão correndo contra um alvo em movimento. Este é precisamente o cálculo formalizado em [Finalidade Probabilística](../distributed-systems/probabilistic-finality.md): quanto mais profundo um bloco é enterrado, mais trabalho computacional precisaria ser refeito para alterá-lo, razão pela qual "6 confirmações" e limiares de profundidade semelhantes funcionam como uma margem de segurança prática e quantificável.

## Sob o capô: este é Merkle–Damgård aplicado no nível do bloco

Há um eco estrutural que vale a pena nomear aqui: assim como cadeias SHA-256 juntas 512 bits blocos de mensagens internamente, o processamento de cada bloco depende do estado intermediário do bloco anterior (ver [SHA-256](../cryptography/sha-256.md#como-funciona-passo-a-passo)), a própria blockchain junta blocos completos, a validade de cada um dependendo de um hash do anterior. A blockchain é, estruturalmente, uma cadeia de cadeias de haxixe, o mesmo "tamper em qualquer lugar quebra tudo a jusante" propriedade aparece tanto no nível de função de haxixe interno individual e no nível de todo o livro de contabilidade, pela mesma razão subjacente.

## Comércio

O hash-cadeamento de cada bloco torna detectável adulteração com história antiga e, após uma profundidade superficial, computacionalmente impraticável. Esta é toda a propriedade de segurança que faz de uma blockchain uma estrutura de dados significativamente diferente de uma tabela de log ou banco de dados comum somente de apêndices, que não oferece provas de adulteração comparáveis por conta própria. O custo é inteiramente suportado e contínuo: cada bloco, honesto ou não, requer prova real do trabalho para criar em primeiro lugar, que é o custo de recursos discutido em todo o [Bitcoin](../bitcoin/README.md) e especificamente em [Consumo de Energia](../bitcoin/energy.md).

## Conceitos errôneos comuns

**Hash-cadeamento não torna blocos velhos literalmente impossível de alterar**. Faz com que a alteração deles exija uma redefinição específica, quantificável, e (para qualquer coisa menos os poucos blocos mais recentes) enorme quantidade de trabalho computacional, mais rápido do que a rede honesta pode estender a cadeia real. "Impossível" é uma abreviatura útil para "computacionalmente inviável com quaisquer recursos realistas", não uma impossibilidade matemática literal.

**A segurança que isso fornece não é realmente sobre o bloco individual hashes ser "inquebrável".** Vem da *associação* de correntes de hash (o que torna qualquer alteração detectável) e prova de trabalho (o que torna a produção de uma cadeia alternativa válida de comprimento suficiente proibitivamente caro). O hash encadeamento sozinho, sem uma prova dispendiosa de produção anexada a cada elo, deixaria um atacante simplesmente recompilar toda a cadeia instantaneamente, uma vez que o hashing comum é rápido.

## Outras leituras

- [Documento branco Bitcoin, Seção 3 (Timestamp Server) e Seção 4 (Proof-of-Work)](https://bitcoin.org/bitcoin.pdf)

---

[← Anterior: Transações](./transactions.md)
·
[Voltar para Blockchain Fundamentos](./README.md)
·
[Próximo: Raízes Merkle →](./merkle-roots.md)
