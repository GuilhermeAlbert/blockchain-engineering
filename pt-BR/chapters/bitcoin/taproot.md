# Taproot

Taproot, ativado em novembro de 2021 via [BIP 340, 341 e 342](https://github.com/bitcoin/bips), é a bifurcação mais recente do Bitcoin. A Comissão adoptou, em 18 de Julho, uma decisão relativa à conclusão do acordo entre a Comunidade Econômica Europeia e o Reino de Marrocos relativo à conclusão do acordo de cooperação entre a Comunidade Econômica Europeia e a República da Coreia sobre o comércio de [Assinaturas Schnorr](../cryptography/schnorr.md)) no protocolo base, e (seu recurso principal) tornou condições de gasto complexas indistinguíveis on-chain de gastos simples, de assinatura única. Este capítulo cobre como essa indistinguibilidade realmente funciona.

## A ideia central: o caminho-chave e os gastos script-caminho

Uma saída Taproot pode ser gasta de duas maneiras, e (esta é a parte importante) **um observador externo geralmente não pode dizer com antecedência qual um dado gasto irá usar, e depois de um caminho-chave gastar, não pode dizer que uma opção script-caminho sequer existiu**:

- **Caminho da chave**: gastar diretamente com uma assinatura Schnorr única de uma "chave interna", indistinguível de um pagamento de um único sinal comum.
- **Localização do programa**: revelar um script específico a partir de um conjunto de condições de despesa alternativas pré-comprometidas (construídas utilizando um **Merkle árvore de scripts**, chamado de "Taptree", utilizando diretamente o mecanismo de [Merkle Trees](../cryptography/merkle-trees.md), aplicado aqui às condições de gasto em vez de transações) e satisfazer as condições desse script específico.

```text
Taproot output creation:
  internal key + Taptree (Merkle tree of alternative scripts, e.g.
    "2-of-3 multisig", "spendable by Bob alone after 1 year", etc.)
        │
        ▼  combined via a specific "tweaking" construction
  a single, ordinary-looking public key (the Taproot output key)

Spending, option A (key path):
  provide one Schnorr signature for the output key directly
  → looks identical to any other single-key Taproot spend

Spending, option B (script path):
  reveal ONE specific script from the Taptree, plus a Merkle
  proof that it's part of the committed tree, plus data
  satisfying that script
  → reveals only the ONE branch actually used, not the others
```

## Por que isso importa: privacidade e custo

Antes de Taproot, um complexo arranjo de gastos (uma carteira multisig, um canal de Lightning cooperativa contra condições não cooperativas, um plano de herança com bloqueio temporal) teve que revelar sua estrutura de script completa on-chain no momento em que foi gasto (via [P2SH](./p2sh.md) ou equivalente de script-hash do SegWit), marcando visivelmente essa transação como "não um único sinal comum gasto" para qualquer um examinando o blockchain. Com o Taproot, o caso comum e cooperativo (despesas do caminho-chave, que os participantes podem geralmente concordar em usar sempre que *pode* cooperar, mesmo para um arranjo que também tem condições de retrocesso mais complexas) parece exatamente como um pagamento comum, menor, mais barato, e não visivelmente distinguível como tendo vindo de uma configuração complexa, multipartidária, ou condicional em tudo. Apenas o caso incomum (uma disputa real ou retrocesso que exige um ramo de script-caminho específico) revela qualquer uma da complexidade subjacente, e mesmo assim, apenas o *um* branch realmente usado, não as outras alternativas que estavam disponíveis, mas não necessário.

## Papel de Schnorr

Os gastos do taproot dependem diretamente de [Assinaturas Schnorr (')](../cryptography/schnorr.md) propriedade de linearidade: uma chave interna de saída de Taproot pode ser um agregado de várias chaves individuais dos participantes (através da família de protocolos MuSig), o que significa que um genuíno arranjo multipartidário pode, se todas as partes cooperarem, produzir uma assinatura Schnorr única, com aparência ordinária para o gasto de caminho-chave, uma assinatura, indistinguível de um único signater, mesmo que várias partes realmente autorizou-lo juntos.

## Exemplo: como funciona o "tweak", conceitualmente

A construção que combina uma chave interna com uma Taptree em uma chave de saída usa **adição de ponto de curva elíptica** (ver [Curvas elípticas](../cryptography/elliptic-curves.md#adição-de-pontos-a-operação-que-torna-isto-útil)): a chave de saída é calculada como a chave interna mais (o ponto gerador multiplicado por um valor derivado de hashing a chave interna juntamente com a raiz Taptree). Isto é projetado para que revelar a raiz de Taptree e provar o ajuste mais tarde (para um passo de script) seja possível, enquanto alguém que só vê a chave de saída final, sem nenhum passo de script nunca ocorrendo, não tem como dizer se um Taptree foi cometido ou o que poderia ter contido.

## Programa de Taproot e Bitcoin

Os gastos com o caminho do script do Taproot usam um novo contexto de script relacionado chamado **Tapscript** (BIP 342), uma variante do normal [Bitcoin Script](./script.md) com alguns opcodes ajustados ou adicionados especificamente para as necessidades do Taproot (incluindo reservar espaço para potenciais opcodes futuros sem precisar de outro soft fork apenas para adicioná-los), o modelo de execução de pilha-máquina subjacente coberto em [Bitcoin Script](./script.md) ainda se aplica; o Tapscript é melhor compreendido como as regras do Script adaptadas para este novo contexto, não uma substituição por atacado.

## Comércio

Os ganhos de privacidade e eficiência do Taproot para acordos de gastos complexos vêm ao custo de implementação real e complexidade conceitual, a chave interna / Taptree ajustar a construção, e os protocolos MuSig necessários para realmente obter várias partes para produzir cooperativamente uma assinatura agregada única, são significativamente mais envolvidos para implementar corretamente do que o pré-Taproot multisig mais simples, e (conforme coberto em [Assinaturas Schnorr](../cryptography/schnorr.md#comércio)) os protocolos de agregação MuSig passaram por várias revisões após sua publicação inicial, especificamente porque versões iniciais tinham falhas de segurança sutis em certos padrões de interação.

## Conceitos errôneos comuns

**A adoção do taproot não é universal ou automática**. É um tipo opcional de script carteiras e serviços optam por suportar e usar; tipos de script pré-Taproot (P2PKH, P2SH, pré-Taproot SegWit) permanecem totalmente válidos e em uso ativo, e Bitcoin não força a migração para formatos mais recentes.

**Um passo de chave-caminho do Taproot não prova que não havia alternativa de script-caminho disponível.** O objetivo do projeto é que os gastos de caminho-chave são indistinguíveis de uma simples saída de uma única chave, se um Taptree foi ou não comprometido. Você não pode concluir que "nenhuma condição complexa existiu" apenas porque uma assinatura simples foi usada.

## Outras leituras

- [BIP 340: Assinaturas da Schnorr para a secp256k1](https://github.com/bitcoin/bips/blob/master/bip-0340.mediawiki)
- [BIP 341: Taproot: SegWit versão 1 regras de gastos](https://github.com/bitcoin/bips/blob/master/bip-0341.mediawiki)
- [BIP 342: Validação de Programas de Taproot](https://github.com/bitcoin/bips/blob/master/bip-0342.mediawiki)

---

[← Anterior: SegWit](./segwit.md)
·
[Voltar para Bitcoin](./README.md)
·
[Próximo: Ordinais e Inscrições →](./ordinals.md)
