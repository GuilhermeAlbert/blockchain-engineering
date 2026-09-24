# Ordinais e Inscrições

Ordinais é um esquema de numeração, e inscrições são uma forma de anexar dados arbitrários a satoshis individuais, que em conjunto permitem que as pessoas criem artefatos digitais nativos de Bitcoin comparáveis em espírito aos NFTs, sem qualquer novo opcode, soft fork ou mudança de protocolo. Este capítulo abrange a forma como ambas as peças funcionam e por que se tornaram possíveis especificamente após [Taproot](./taproot.md).

## Teoria ordinal: numeração satoshis

O esquema "ordinários", proposto pelo desenvolvedor Casey Rodarmor em 2022, atribui a cada indivíduo satoshi um número único, sequencial com base na ordem que foi minado, o primeiro satoshi da recompensa da base de moedas do bloco de gênese é ordinal `0`, e assim por diante, seguindo uma regra determinística específica para como os números ordinais transferem através de transações (geralmente, na primeira ordem de saída em relação às entradas e saídas de uma transação). Esta numeração existe inteiramente como um **convenção off-chain**. Nada sobre ele é imposto pelas regras de consenso do Bitcoin, e um software padrão de execução de nó Bitcoin Core não tem nenhum conceito de "números ordinais" em tudo. O software implementando a teoria ordinal (um indexador, rastreando a regra externamente) calcula esses números repetindo o histórico de transações e aplicando a regra de transferência de forma consistente.

## Inscrições: anexando dados a um satoshi

An **inscrição** incorpora conteúdo arbitrário (uma imagem, texto ou qualquer outro dado) diretamente nos dados de testemunha de uma transação, usando o gasto de script-caminho do Taproot (ver [Taproot](./taproot.md#programa-de-taproot-e-bitcoin)) em um padrão específico que Bitcoin Script's `OP_FALSE OP_IF ... OP_ENDIF` sequência permite, colocando dados dentro de um branch que nunca realmente executa (desde `OP_FALSE` faz o seguinte: `OP_IF` bloco get puled), significando que os dados podem ser arbitrariamente grandes (sujeito aos limites de tamanho global da transação) sem afetar a lógica de execução real do script em tudo. Este dado é então convencionalmente associado com o satoshi específico sendo gasto por essa transação, por numeração da teoria ordinal. Criando um registro que um satoshi específico, identificável agora "carrega" este conteúdo inscrito, rastreável por qualquer um executando software de indexação compatível.

## Por que Taproot especificamente tornou isso prático

Antes de SegWit e Taproot, incorporar quantidades significativas de dados desta forma teria contado com o peso total da transação, e os limites de tamanho pré-Taproot do script eram consideravelmente mais restritivos. Desconto de testemunhas de Taproot (ver [Taxas de transação](./fees.md#tamanho-e-peso-da-transação)) e seus gastos com roteiros mais flexíveis tornaram a incorporação de quantidades significativas de dados arbitrários economicamente práticos de uma forma que não tinha sido antes. Inscrições são, em um sentido importante, um uso emergente do design de Taproot em vez de algo que seus autores especificamente construíram o recurso para permitir.

## Por que isso é controverso dentro da comunidade Bitcoin

As inscrições geraram um debate real, substantivo, não apenas entusiasmo, porque elas tocam em uma discordância de longo prazo sobre o que o espaço de bloco de Bitcoin deve ser usado para:

- **Apoiantes** apontar que nada sobre inscrições viola qualquer regra de consenso. Eles são transações comuns, válidas usando Bitcoin Script exatamente como especificado, e as taxas que eles pagam (que aumentou substancialmente durante períodos de atividade de inscrição pesada) contribuem diretamente para [receita de mineradores e orçamento de segurança de longo prazo do Bitcoin](./security-budget.md), um argumento relacionado com as preocupações sobre o papel das receitas das taxas, uma vez que bloqueia os subsídios totalmente [O halving](./halving.md)).
- **Críticos** argumentam que o uso de espaço de bloco para armazenamento de mídia arbitrário, em vez de transações financeiras, aumenta as taxas para pagamentos ordinários e representa um caso de uso O espaço de bloco do Bitcoin nunca foi planejado ou bem adequado para, e alguns contribuintes do Bitcoin Core discutiram (com desacordo sobre implementação e mérito) várias abordagens de filtragem de nível de política proposta (não nível de consenso) em resposta.

Este livro apresenta ambas as posições como uma discordância real e contínua dentro da comunidade Bitcoin em vez de uma questão resolvida. É, no seu cerne, uma disputa sobre o uso correto de um recurso genuinamente escasso e compartilhado (espaço de bloqueio), não uma disputa técnica sobre se as inscrições são válidas (eles são inequivocamente, sob as regras de consenso existentes).

## Conceitos errôneos comuns

**Inscrições não modificam as regras de consenso do Bitcoin de forma alguma.** Não era necessário soft fork ou hard fork. Eles usam recursos de script Taproot previamente especificados de uma forma que seus designers podem não ter antecipado especificamente ser usados desta forma, mas não proibir.

**Um "número normal" não é armazenado em nenhum lugar no protocolo do Bitcoin.** É uma convenção calculada por software de indexação especializado aplicando uma regra específica, definida externamente aos dados de blockchain existentes, não modificados, um nó rodando Bitcoin Core não modificado não tem consciência de números ordinais em tudo.

## Outras leituras

- [Manual de Ordinais / especificação](https://docs.ordinals.com/)
- [BIP 341: Taproot](https://github.com/bitcoin/bips/blob/master/bip-0341.mediawiki)

---

[← Anterior: Taproot](./taproot.md)
·
[Voltar para Bitcoin](./README.md)
·
[Próximo: Prova de Trabalho →](./proof-of-work.md)
