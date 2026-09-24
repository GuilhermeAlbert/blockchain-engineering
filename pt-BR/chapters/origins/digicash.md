# David Chaum e DigiCash

David Chaum é a coisa mais próxima que o dinheiro digital tem de uma figura fundadora que não faz parte da história Bitcoin diretamente. Um criptógrafo treinado na UC Berkeley, Chaum publicou os artigos fundamentais sobre dinheiro digital e comunicação anônima no início dos anos 1980 e passou mais de uma década tentando comercializar a ideia através de uma empresa chamada DigiCash. A empresa falhou. A criptografia não. É ainda a base para a forma como os sistemas de numerário digitais modernos pensam sobre a privacidade, e é a ilustração mais clara da Estratégia 1 descrita em [Por que o dinheiro digital era difícil](./digital-cash.md): resolver privacidade com criptografia, mas manter um emissor confiável.

## O problema Chaum se propôs a resolver

No início dos anos 80, Chaum estava preocupado com uma consequência específica de mover pagamentos online: cada transação eletrônica deixaria um registro em uma instituição financeira, e o agregado desses registros deixaria qualquer um com acesso construir uma imagem completa da vida de uma pessoa, onde eles compravam, o que eles liam, com quem eles se associavam. Seu artigo de 1985 é explícito sobre as apostas:

> "Computerization is robbing individuals of the ability to monitor and control the ways information about them is used. [...] The foundation is being laid for a dossier society, in which computers could be used to infer individuals' lifestyles, habits, whereabouts, and associations from data collected in ordinary consumer transactions."
> David Chaum, [Security Without Identification: Transaction Systems to Make Big Brother Obsolete](https://www.chaum.com/publications/Security_Wthout_Identification.html), 1985

O objetivo de Chaum não era eliminar o banco como record-keeper (ele aceitou um emissor confiável como parte do design), mas torná-lo *criptograficamente impossível* para que o emitente ligue uma retirada à despesa posterior desse mesmo dinheiro, embora o emitente processe ambos os eventos.

## Como funciona: assinaturas cegas

A invenção principal de Chaum, descrita em seu artigo de 1982 [Assinaturas cegas para pagamentos indetectáveis](https://www.chaum.com/publications/Chaum-blind-signatures.PDF), é uma maneira de obter uma assinatura em uma mensagem sem o assinante nunca ver a mensagem.

Aqui está o mecanismo em termos concretos, usando assinaturas cegas estilo RSA como Chaum originalmente proposto:

1. **Alice gera uma moeda.** Ela escolhe um número de série aleatório e único. `s` Por uma moeda, digamos, 10 dólares.
2. **A Alice cega-o.** Ela multiplica `s` por um fator de cegamento aleatório `r` (elevado ao expoente público do banco), produzindo um valor cego `s' = s · r^e mod n`Este valor cego parece um ruído aleatório para quem não conhece `r`.
3. **O banco assina o valor cego.** Alice envia `s'` ao seu banco juntamente com um pedido de débito de 10 dólares da sua conta. Os sinais bancários `s'` com sua chave privada para a denominação ¿$10¿, produzindo `sig(s')`E debita a conta da Alice. Criticamente, o banco nunca vê `s`, apenas os cegos `s'`.
4. **A Alice não o cega.** Usando o fator ofuscante `r` Ela gerou, Alice pode remover matematicamente o cegamento da assinatura do banco, `sig(s)` (uma assinatura bancária válida na *original, não cego* Número de série) sem que o banco nunca tenha visto esse valor não cego.
5. **A Alice gasta a moeda.** Ela dá `(s, sig(s))` a um comerciante. O comerciante envia-o ao banco, que verifica que a assinatura é válida e verifica `s` contra uma lista de números de série já gastos. Se não utilizado, o banco credita o comerciante e marca `s` como gasto.

O banco pode verificar que `sig(s)` é uma assinatura genuína produzida (provando que a moeda é real, não falsificada), mas não tem como conectar `s` voltar ao valor cego `s'` originalmente assinado para Alice, o fator ofuscante `r` tornou essa ligação matematicamente irrecuperável. O banco sabe. *alguém* retirou uma moeda válida de $10 e *alguém* gastou um; não pode provar que são a mesma pessoa da criptografia sozinho.

## Exemplo

```text
Alice's bank account: $100
                       │
                       │  1. generate s = "9F3A...", blind with r → s'
                       ▼
              Alice ──────────► Bank
                     s', "debit $10"
                                 │
                                 │ 2. bank signs s' blindly, debits $100 → $90
                                 ▼
              Alice ◄────────── Bank
                     sig(s')
                       │
                       │ 3. Alice removes blinding factor r
                       │    → now holds (s, sig(s))
                       ▼
              Alice ──────────► Merchant   (pays with coin s)
                       │
                       │ 4. Merchant redeems (s, sig(s)) at Bank
                       ▼
                     Bank checks: sig(s) valid? s already spent?
                     → credits merchant $10, marks s as spent
```

O livro de contabilidade do banco registra dois eventos não ligados: "emitiu uma moeda de 10 dólares" e "moeda recuperada `s`, que ninguém tinha gasto antes." Nada naquele livro liga a moeda à Alice.

## DigiCash a empresa

Chaum fundada **DigiCash** em Amsterdã, em 1989, para comercializar esta pesquisa, com um produto chamado **ecash**Vários bancos reais pilotaram-no na década de 1990, incluindo o Deutsche Bank, o Credit Suisse e o Mark Twain Bank, que sediado nos EUA, que ofereceu contas ecash a clientes de retalho a partir de 1995. A Microsoft supostamente discutiu integrar o ecash no Windows 95 para pagamentos na internet.

DigiCash entrou em falência em 1998 e mais tarde foi vendido em pedaços. As razões são debatidas e provavelmente múltiplas: a adoção do comerciante e do consumidor necessária para uma rede de pagamento de duas faces nunca chegou a uma massa crítica em uma época em que o comércio eletrônico em si era jovem; Chaum foi descrito por contemporâneos como um parceiro de negócios difícil que estava relutante em renunciar ao controle sobre os termos do acordo; e DigiCash exigiu bancos parceiros para executar seu software proprietário, que era um elevador mais pesado do que os comerciantes de cartões de crédito e os consumidores já tinham.

## Comércio

O modelo de privacidade para o pagador de Ecash foi genuinamente novo e, ao nível da própria criptografia, alcançou algo mais tarde sistemas (incluindo Bitcoin, no nível do protocolo base) não: forte, criptograficamente imposta inligabilidade entre retirada e gastos, sem precisar de uma camada de ofuscação totalmente separada.

O que o ecash não resolveu é o problema que motiva o resto desta seção. Exige:

- **Um único emissor de confiança por moeda.** DigiCash ou um banco parceiro tem que ser honesto sobre quanto dinheiro ele emite, uma vez que nada no próprio esquema de assinatura cega impede o emitente de imprimir moedas que ele não está apoiando. Não há nenhuma oferta pública, total auditável.
- **Verificação online de gastos duplos.** O banco deve ser consultado no momento do reembolso para verificar se um número de série já foi gasto, porque nada na própria moeda impede um usuário de gastar uma cópia do mesmo `(s, sig(s))` par duas vezes. Chaum publicou variantes off-line que poderiam detectar duplas despesas após o fato, codificando a identidade do gastador de uma forma que só se torna recuperável se a mesma moeda for usada duas vezes, mas estas não alcançaram ampla implantação.
- **A continuação da existência e cooperação do emitente.** Quando a DigiCash faliu, os saldos da Ecash não tinham um caminho à frente independente da empresa.

Esta é exatamente a lacuna identificada em [Por que o dinheiro digital era difícil](./digital-cash.md): Chaum resolvido *privacidade* contra um terceiro confiável, não o *existência* dos terceiros de confiança. Bitcoin aborda o mesmo objetivo original (pagamento sem uma parte que pode congelar, reverter ou vigiar transações) da direção oposta: aceita transparência total da transação (transações Bitcoin são pseudônimos, não anônimos. Qualquer pessoa pode ver quantidades e endereços no público [blockchain](../blockchain/README.md)) em troca de não ter nenhum emitente. Trata-se de uma troca genuína, não de uma melhoria rigorosa; ver [Privacidade](../society/privacy.md) para como o ecossistema tentou adicionar privacidade de volta em cima de um livro de registros transparente.

## Conceitos errôneos comuns

**O ecash de Chaum não foi descentralizado.** Exigia um banco central emissor para cada moeda. A privacidade era criptográfica; a emissão não era.

**Chaum não deixou de resolver a dupla despesa.** O seu esquema online impediu-o da mesma forma que um banco previne descobertos: verificando uma base de dados central no tempo gasto. O que ele não resolveu (e, pelo projeto de assinaturas cegas, não poderia facilmente resolver sem um emissor) foi a prevenção de gastos duplos sem qualquer verificação central.

## Outras leituras

- [Segurança sem identificação: Sistemas de transação para tornar o Big Brother Obsoleto](https://www.chaum.com/publications/Security_Wthout_Identification.html): David Chaum, Comunicações da ACM, 1985
- [Assinaturas cegas para pagamentos indetectáveis](https://www.chaum.com/publications/Chaum-blind-signatures.PDF): David Chaum, CRYPTO '82
- [Arquivo de publicação de David Chaum](https://www.chaum.com/publications/)

---

[← Anterior: O Movimento Cypherpunk](./cypherpunks.md)
·
[Voltar às Origens](./README.md)
·
[Próximo: Hashcash →](./hashcash.md)
