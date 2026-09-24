# O Bloco de Gênesis

O bloco de gênese é o bloco 0, o primeiro bloco no blockchain Bitcoin, minado por Satoshi Nakamoto antes da rede ter outros participantes. É um capítulo útil por si só porque é curto, totalmente concreto, e demonstra vários mecanismos (a transação de base de moedas, hashing de blocos e parâmetros de rede codificados) que mais tarde capítulos cobrem em termos gerais. Aqui eles aparecem em um exemplo específico, inspeccionável.

## O problema que ele resolve

Cada blockchain precisa de um ponto de partida: um primeiro bloco sem antecessor, cujo hash cada bloco subsequente finalmente remonta. O bloco de gênese não pode seguir a regra de ligação normal (cada bloco referencia o hash do bloco antes dele, veja [Hashes e Block Linking](../blockchain/block-linking.md)) porque não há nenhum bloco antes dele. O software de Bitcoin lida com isso através da codificação dos parâmetros do bloco de gênese diretamente no cliente, ao invés de derivá-lo através do processo normal de mineração e validação um novo nó se aplicaria a cada bloco posterior.

## O que há nele?

O bloco de gênese foi extraído em **3 de janeiro de 2009, às 18:15:05 UTC**O seu haxixe é:

```text
000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f
```

Como cada bloco Bitcoin, sua única transação é uma **transação de base de moeda**, a primeira transação especial num bloco que cria novas moedas em vez de gastar as existentes (ver [Transações de base de moeda](../bitcoin/coinbase-transactions.md)). A operação de base de moeda de gênese pagou uma recompensa em bloco de 50 BTC. Devido a como as verificações de código originais do Bitcoin Core são escritas, esta saída específica é **codificado como impendável**, nenhuma transação válida do Bitcoin pode referenciá-lo como uma entrada, de modo que estes 50 BTC nunca foram e não podem ser movidos, independentemente de quem possa ter a chave privada correspondente.

### A mensagem incorporada

A entrada da transação coinbase inclui um campo de dados arbitrário (mais tarde formalizado como `coinbase` dados do scriptSig, discutidos em [Transações de base de moeda](../bitcoin/coinbase-transactions.md)) que contém o texto:

```text
The Times 03/Jan/2009 Chancellor on brink of second bailout for banks
```

Esta é uma cópia integral do título da primeira página do jornal do Reino Unido *Tempos* na data em que o bloco foi criado, referindo-se à então chanceler do Exchequer Alistair Darling e aos crescentes resgates bancários do Reino Unido durante a crise financeira 2008-2009. Duas coisas sobre esta mensagem são fatos documentados; uma terceira é interpretação:

- **Fato:** o texto corresponde a um título de jornal real, verificável a partir dessa data exata, que qualquer um pode confirmar independentemente de cópias sobreviventes ou arquivos daquele dia *Vezes*.
- **Fato:** incorporar um texto recente, publicamente verificável em um bloco é uma técnica padrão (também utilizada em algumas das propostas de [Bit Gold](./bit-gold.md)) para provar um bloco não poderia ter sido criado antes de uma determinada data, uma vez que o texto não poderia ter sido conhecido antes.
- **Interpretação:** muitos leitores, incluindo grande parte da comunidade Bitcoin, tomam a escolha específica do título como uma declaração política sobre a fragilidade do sistema bancário Bitcoin foi projetado para percorrer. Satoshi nunca explicou a escolha do título em qualquer escrita conhecida. Este livro trata a leitura política como uma interpretação amplamente realizada, não um fato que Satoshi confirmou.

## Debaixo do capô

Os parâmetros do bloco de gênese (seu timestamp exato, nonce, Merkle root, e a mensagem da base de moedas acima) são escritos diretamente no código fonte Bitcoin, no que é agora o `chainparams.cpp` arquivo (ou seu equivalente histórico em código inicial) do Bitcoin Core, em vez de ser algo que um nó descobre executando a pesquisa de prova de trabalho normal em entrada vazia. Cada nó completo recomputa independentemente o hash do bloco de gênese a partir desses parâmetros codificados como um de seus primeiros passos de validação na inicialização, confirmando que ele corresponde ao valor esperado antes de aceitar qualquer outro bloco. Este é um dos poucos lugares no projeto de Bitcoin onde a confiança em um valor específico e imutável é construída no próprio software, ao invés de derivado puramente da cadeia de prova de trabalho.

O bloco de gênese tem uma altura de bloco de 0 e, incomummente entre os blocos de Bitcoin, seu campo de cabeçalho para "hash bloco anterior" é preenchido com todos os zeros. Não há nenhum bloco anterior para referência. Ver [Altura do Bloco](../blockchain/block-height.md) e [Cabeçalhos de Blocos](../blockchain/block-headers.md).

## Comércio

Hardcoding o bloco de gênese é uma exceção pragmática necessária ao modelo habitual de verificação sem confiança de Bitcoin. Cada nó tem que simplesmente confiar que este ponto de partida específico, distribuído com o próprio software, é o legítimo. Na prática, essa confiança está ancorada na própria distribuição de código aberto do software e no fato de que mudar o bloco de gênese produziria uma cadeia completamente diferente que nenhum nó, carteira ou troca existente reconheceria como Bitcoin. Assim, o risco prático está mais próximo de "todos perceberiam e rejeitariam uma mudança" do que de uma verdadeira lacuna de confiança explorável na operação diária.

## Conceitos errôneos comuns

**Os 50 BTC no bloco de gênese não são "moedas perdidas" no mesmo sentido que moedas cuja chave privada foi deslocada.** Eles são impendáveis por projeto de protocolo, uma peculiaridade codificada do código de índice de transação do cliente original, não um caso de uma chave perdida. Ver [Moedas Perdidas](../bitcoin/lost-coins.md) para a categoria mais ampla (e muito maior) de moedas que são perdidas por causa de chaves privadas esquecidas ou destruídas.

**A lacuna de nove dias entre o lançamento do whitepaper (31 de outubro de 2008) e o bloco de gênese (3 de janeiro de 2009) é real e documentado**Não há provas de nada de anormal. Ela reflete o tempo necessário para terminar e testar a implementação inicial, consistente com a correspondência da mailing-list privada daquele período em que Satoshi discutiu trabalhos de desenvolvimento em andamento.

## Outras leituras

- [Bloco Genesis, Bitcoin Wiki](https://en.bitcoin.it/wiki/Genesis_block)
- [Fonte do núcleo do Bitcoin, chainparams.cpp](https://github.com/bitcoin/bitcoin/blob/master/src/kernel/chainparams.cpp): ver os parâmetros do bloco de gênese codificados
- [Bloco 0 num explorador de blocos](https://mempool.space/block/000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f): inspecionar o bloco de gênese diretamente

---

[← Anterior: O whitepaper Bitcoin](./bitcoin-whitepaper.md)
·
[Voltar às Origens](./README.md)
·
[Próximo: História do Bitcoin Início →](./early-bitcoin.md)
