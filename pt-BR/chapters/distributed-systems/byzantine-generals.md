# Problema dos generais bizantinos

O problema dos generais bizantinos é a experiência do pensamento específico, e os resultados formais que acompanham, que deu [Erros bizantinos](./byzantine-faults.md) O nome deles. Este capítulo cobre a formulação original de 1982 em detalhes, seu resultado chave (o acordo é impossível após uma certa fração de traidores), e como o projeto de Bitcoin se relaciona (sem implementar diretamente) aos protocolos que o artigo descreve.

## A configuração

Leslie Lamport, Robert Shostak e Marshall Pease colocaram o problema em seu jornal de 1982 da seguinte forma: várias divisões do exército bizantino, cada uma comandada por um general diferente, cercam uma cidade inimiga. Os generais só podem comunicar por mensageiro. Eles devem concordar com um plano de ação comum (ataque ou retirada) porque um ataque coordenado por todas as divisões tem sucesso, mas se apenas algumas divisões atacarem enquanto outras se retiram, as divisões de ataque são destruídas. Este seria um problema simples se cada general fosse honesto e cada mensageiro confiável. A verdadeira preocupação do jornal é mais difícil: **Alguns dos generais podem ser traidores.**, ativamente tentando evitar que os generais leais cheguem a acordo, inclusive enviando ordens diferentes para diferentes generais ("ataque" para um, "retirar" para outro) ou simplesmente mentindo sobre o que outros generais lhes disseram.

A exigência formal que o documento estabelece: uma solução deve garantir que (1) todos os generais leais decidam sobre o mesmo plano de ação, e (2) um pequeno número de traidores não pode levar os generais leais a adotar um plano ruim. Especificamente, se o general comandante é leal, todo general leal deve seguir a ordem que general realmente deu, mesmo na presença de traidores tentando confundir a questão.

## O resultado chave: o limite de um terço

O resultado central, formalmente comprovado, do trabalho é um limiar numérico específico: com `n` Total de generais, dos quais `m` pode ser traidores, uma solução que garante acordo existe **se e somente se `n ≥ 3m + 1`**Equivalentemente, o acordo só é possível se menos de um terço de todos os participantes forem traidores. Abaixo deste limiar, o artigo comprova, pela construção explícita de um cenário, que **nenhum protocolo de mensagens, por mais inteligente que seja, pode garantir acordo**. Existem situações em que um pequeno número de traidores pode ser arranjado para que nenhum protocolo permita aos generais leais distinguir de forma confiável a verdadeira situação de uma falsa situação diferente, igualmente consistente.

Isso vale a pena sentar-se com porque é um resultado de impossibilidade genuína, não apenas "ninguém encontrou um bom protocolo ainda": para `n = 3`, generais `A`, `B`, e `C`, com um traidor (diga `C`) o artigo mostra um cenário onde `C` diz `A` "atacar" e dizer `B` "Retirar", enquanto `A` e `B` Não é possível determinar, a partir das informações que lhes são disponibilizadas, somente através de mensageiros, qual deles (se algum deles) está sendo dito a verdade, porque de `A`'s perspectiva, "`B` está mentindo sobre o que `C` disse-lhes" e "`C` está a mentir `B` enquanto diz `A` a verdade" são situações indistinguíveis dadas apenas as mensagens `A` Posso ver.

O artigo também demonstra um resultado positivo: `n ≥ 3m + 1`, existem algoritmos explícitos (o artigo apresenta tanto um algoritmo de "mensagens orais", assumindo que as mensagens não podem ser forjadas, mas seu conteúdo não pode ser autenticado como vindo de um remetente específico além da relação do mensageiro, e um algoritmo de "mensagens assinadas" usando o que agora reconheceríamos como assinaturas digitais) que garantem concordância correta.

## Por que as assinaturas mudam a matemática

A variante "mensagens assinadas" do papel merece destaque devido à sua relevância direta para sistemas blockchain: se as mensagens podem ser criptograficamente assinadas de uma forma que torne inviável a falsificação (ver [Assinaturas digitais](../cryptography/digital-signatures.md)) e as mensagens podem ser retransmitidas enquanto preservam suas assinaturas (de modo que um general pode provar exatamente o que outro general disse, não apenas retransmitir uma reivindicação sobre ele), o limite de um terço pode ser relaxado, o algoritmo de mensagens assinadas no papel original tolera até qualquer número de traidores, a menos que todos os generais leais sejam em menor número, porque um traidor pego enviando mensagens assinadas contraditórias pode ser comprovadamente exposto como mentira, em vez de apenas criar ambiguidade. Isto é parte de porque as assinaturas digitais são fundamentais para essencialmente todos os protocolos modernos tolerantes à falha blockchain, baseados ou não. Eles mudam o que é realizável, não apenas o quão eficiente é alcançado.

## Como Bitcoin se relaciona com este framework específico

Vale a pena ser preciso aqui, uma vez que esta ligação é frequentemente exagerada em explicações casuais: **Bitcoin não implementa algoritmos específicos dos generais bizantinos.** Esses algoritmos assumem um conjunto fixo e conhecido de `n` generais, todos diretamente alcançáveis, engajando-se em múltiplas rodadas estruturadas de troca de mensagens, um modelo que não se encaixa no conjunto de participantes sem permissão, sem limites e em constante mudança (ver [Consenso](./consensus.md#duas-dimensões-de-dificuldade) por que esta diferença de adesão importa).

O que o Bitcoin partilha com os generais bizantinos que enquadram é o **modelo de ameaça subjacente**: um conjunto de participantes mutuamente desconfiados que precisam concordar em uma única versão da história, alguns dos quais podem mentir ativamente ou tentar causar desacordo. A solução específica de Bitcoin (acordo de cadeias mais longas ponderadas à prova de trabalho) é frequentemente descrita informalmente como "solucionar o problema dos generais bizantinos para uma rede sem permissão", que é uma caracterização razoável do *problema que resolve* mas não uma alegação de que implementa os protocolos específicos do artigo de 1982. Alguns Bitcoin material explicativo (incluindo alguns primeiros escritos da comunidade) usa "Problema Geral Bizantino" vagamente como um sinônimo para "o problema geral de alcançar consenso distribuído com participantes não confiáveis, possivelmente desonestos". Este livro usa o termo nesse mesmo sentido geral quando se refere a Bitcoin, mantendo a reivindicação histórica, técnica (um terço ligado, os algoritmos específicos) ligada ao seu significado original, mais específico acima.

## Conceitos errôneos comuns

**O whitepaper de Satoshi Nakamoto não usa a frase "Problema dos generais bizantinos".** O whitepaper nunca cita diretamente Lamport, Shostak e Pease's paper, e não usa esta terminologia específica, a conexão entre Bitcoin e o enquadramento dos generais bizantinos é uma feita por comentaristas posteriores e pela comunidade blockchain mais ampla explicando o significado de Bitcoin em termos de sistemas distribuídos estabelecidos, não um enquadramento Satoshi usado no texto original.

**O um terço encadernado do papel original não traduz diretamente para "O Bitcoin está segura desde que menos de um terço do poder de haxixe seja desonesto."** A suposição de segurança do Bitcoin, discutida em [51% Ataques](../bitcoin/51-percent-attacks.md), é geralmente enquadrado em torno de uma maioria (cerca de 50%) de poder de hash, porque se baseia em um mecanismo diferente (proof-of-work-pondered chain selection among permissionless participants) do que os protocolos de assinatura de messagem de associação fixa que o um terço vinculado foi provado para.

## Outras leituras

- [O problema dos generais bizantinos](https://lamport.azurewebsites.net/pubs/byz.pdf): Lamport, Shostak, Pease, ACM Transactions on Programming Languages and Systems, 1982

---

[← Anterior: Falhas Bizantinas](./byzantine-faults.md)
·
[Voltar aos Sistemas Distribuídos](./README.md)
·
[Próximo: Ataques Sybil →](./sybil-attacks.md)
