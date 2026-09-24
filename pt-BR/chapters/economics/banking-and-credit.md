# Banco e Crédito

A maior parte do dinheiro numa economia moderna não é moeda emitida por um banco central. Trata-se de depósitos bancários, criados por bancos comerciais em ato de empréstimo. Este capítulo explica esse processo de forma concreta, porque é amplamente mal compreendido mesmo por pessoas que usam bancos diariamente, e porque fundamenta argumentos posteriores sobre inflação, política monetária, e o que Bitcoin faz e não muda sobre como o crédito funciona.

## O problema bancário resolve

Savers geralmente quer segurar o dinheiro com segurança e acessá-lo em curto prazo. Em geral, os tomadores de empréstimos (empresas que constroem fábricas, pessoas que compram casas) querem comprometer capital durante anos. Um banco situa-se entre estas duas necessidades desiguais: aceita depósitos de curto prazo, facilmente retiráveis e faz empréstimos de longo prazo, lucrando com a diferença entre o que paga aos depositantes e o que cobra aos mutuários. Esta transformação (transformando passivos líquidos a curto prazo em ativos ilíquidos a longo prazo) é chamada **transformação da maturidade**, e é a função econômica que os bancos desempenham além de simplesmente armazenar dinheiro.

## Como funciona a reserva bancária fraccionada

Um banco não detém 100% dos seus depósitos em reserva, prontos para serem retirados a qualquer momento. Possui uma fração (históricamente estabelecida por reservas obrigatórias, embora muitos bancos centrais modernos, incluindo a Reserva Federal dos EUA desde 2020, tenham reduzido ou eliminado reservas formais em favor de outras ferramentas regulatórias) e emprestam o resto.

Aqui está o mecanismo concreto, na descrição tradicional "multiplicador de dinheiro" encontrada na maioria dos livros didáticos introdutórios:

```text
Alice deposits $1,000 in Bank A.
Bank A keeps $100 in reserve (10% reserve ratio) and lends $900 to Bob.
Bob deposits that $900 in Bank B.
Bank B keeps $90 in reserve and lends $810 to Carol.
Carol deposits that $810 in Bank C.
   ... and so on.
```

O depósito original de $1,000 de Alice, através de empréstimos repetidos, pode suportar depósitos totais em todo o sistema bancário, aproximando-se de $1,000 (no limite, abaixo de uma taxa de reserva de 10%, seguindo a série geométrica 1000 × (1/0,10)). Esta é a origem do termo **Banco de reserva fraccionado**: reservas são uma fração de depósitos, não o montante total.

### Uma descrição moderna mais precisa: empréstimos criam depósitos

Os bancos centrais, incluindo o Banco da Inglaterra em um artigo de 2014 amplamente citado, esclareceram que o simples "multiplicador" história acima, enquanto uma primeira aproximação útil, não descreve como decisões individuais de empréstimo realmente acontecem dia a dia. Na prática, quando um banco aprova um empréstimo, ele normalmente cria um novo depósito na conta do mutuário diretamente, como uma entrada de contabilidade correspondente. O empréstimo é um novo ativo no balanço do banco, e o depósito que ele cria é um novo passivo, e ambas as entradas são criadas na mesma transação, não proveniente de um pool pré-existente de dinheiro dos depositantes esperando para ser emprestado. Em seguida, o banco gere a sua posição de reserva posteriormente, contraindo reservas de outros bancos ou do banco central, se necessário para cumprir os requisitos regulamentares e de liquidação. Qualquer descrição chega à mesma conclusão relevante para este livro: **novos empréstimos bancários ampliam a oferta de dinheiro**, e esta expansão acontece através de decisões ordinárias de empréstimo comercial, não só através da ação do banco central.

> "Rather than banks receiving deposits when households save and then lending them out, bank lending creates deposits. [...] The reality of how money is created today differs from the description found in some economics textbooks."
> Bank of England, [Money Creation in the Modern Economy](https://www.bankofengland.co.uk/-/media/boe/files/quarterly-bulletin/2014/money-creation-in-the-modern-economy.pdf), 2014

## Por que isso importa para os capítulos posteriores

Este mecanismo é a ligação prática entre [Banco e Crédito] e [Oferta Monetária](./money-supply.md): a maior parte do que os economistas contam como "dinheiro" em uma economia moderna são depósitos criados pelo banco, não dinheiro emitido pelo banco central. É também o ponto de partida para a crítica austríaca-escola à reserva fraccionada bancária, discutida em profundidade em [Ludwig von Mises e Teoria Monetária](./mises.md) e [Murray Rothbard e Dinheiro Som](./rothbard.md), que argumenta que a expansão do crédito para além do que os aforradores optaram efectivamente por adiar o consumo distorce as taxas de juro e as decisões de investimento, contribuindo para os ciclos de crescimento e crescimento ( **Teoria do ciclo de negócios austríaco**).

## Comércio

**Quais os ganhos fraccionados da reserva bancária:** permite que a poupança seja produtivamente implantada como capital de investimento de longo prazo em vez de ficar ocioso, e é o mecanismo que financia a maioria dos investimentos empresariais, hipotecas e infraestrutura nas economias modernas.

**O que é que ele desiste:** um banco que emprestou a maior parte dos seus depósitos não pode honrar uma demanda súbita e simultânea de muitos depositantes para retirar seus fundos de uma só vez. A **execução bancária**Isto não é hipotético: as corridas bancárias repetiram-se ao longo da história bancária, desde os pânicos do século XIX até ao colapso de 2008 do Northern Rock no Reino Unido (o primeiro banco do Reino Unido executado em mais de 140 anos) até ao colapso de 2023 do Silicon Valley Bank nos EUA. Os seguros de depósitos (como o FDIC nos Estados Unidos, criado em 1933) e as facilidades de crédito do banco central de última geração existem especificamente para evitar que as operações bancárias entrem em colapso total do sistema bancário, ao custo da introdução de backstops públicos e regulamentos associados discutidos em [Banco Central](./central-banking.md).

## Conceitos errôneos comuns

**Os bancos não apenas re-prestam dinheiro que outras pessoas depositaram, esperando em um cofre.** Os mecanismos contabilísticos da maioria dos empréstimos modernos criam novos depósitos no momento em que um empréstimo é emitido, como descrito na conta do próprio Banco de Inglaterra acima. Esta é uma característica documentada de como o banco realmente funciona, não uma simplificação para iniciantes.

**"Fornecimento de dinheiro" não é o mesmo que "dinheiro físico em circulação".** O dinheiro (notas e moedas) é tipicamente uma pequena fração da oferta total de dinheiro em uma economia desenvolvida; a esmagadora maioria existe como depósitos bancários. Ver [Oferta Monetária](./money-supply.md).

## Outras leituras

- [Criação de Dinheiro na Economia Moderna](https://www.bankofengland.co.uk/-/media/boe/files/quarterly-bulletin/2014/money-creation-in-the-modern-economy.pdf): Boletim Trimestral do Banco de Inglaterra, 2014
- [O que o governo fez ao nosso dinheiro?](https://mises.org/library/what-has-government-done-our-money): Murray Rothbard, 1963, Parte III cobre a história do banco de reserva fracionário e a crítica austríaca

---

[← Anterior: Moeda Fiduciária](./fiat-money.md)
·
[Voltar à Economia](./README.md)
·
[Próximo: Inflação e deflação →](./inflation-and-deflation.md)
