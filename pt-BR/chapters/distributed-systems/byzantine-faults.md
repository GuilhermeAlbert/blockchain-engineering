# Falhas Bizantinas

Uma falha bizantina é um modo de falha onde um componente de um sistema não para de funcionar. Continua a trabalhar, mas comporta-se arbitrariamente, de forma inconsistente ou maliciosa, potencialmente enviando informações diferentes e contraditórias a diferentes observadores. Este capítulo define o termo com precisão e distingue-o de modelos de falha mais simples, porque a distinção é a razão pela qual o consenso blockchain precisava de um design diferente da tecnologia de banco de dados distribuída anteriormente.

## O problema: nem todas as falhas parecem iguais

A engenharia de sistemas distribuída distingue entre vários modelos de falha, mais ou menos ordenados de mais fácil de tolerar:

- **Paragem de falhas**: um componente para completamente e isso é detectável por outros (por exemplo, uma verificação do batimento cardíaco da rede confirma que está em baixo). O modelo de falha mais fácil de projetar.
- **Falha de colisão**: um componente para completamente, mas isso pode não ser detectável de forma imediata ou confiável. Pode ser apenas lento, ou a rede para ele pode estar para baixo, em vez do próprio componente ter falhado. Ainda assim, a suposição é que enquanto um componente está em execução, ele se comporta corretamente de acordo com o protocolo.
- **Falha bizantina**: um componente continua operando, mas se comporta de forma arbitrária, inconsistente, ou ativamente adversa, enviando valores diferentes para diferentes pares, seguindo o protocolo corretamente com algumas mensagens e incorretamente com outras, ou coordenando com outros componentes defeituosos para interromper a capacidade da maioria honesta de concordar. Este é o modelo de falha mais difícil de projetar um protocolo em torno, porque o comportamento de um nó byzantine-faulty é, por definição, unconstrained pelas próprias regras do protocolo.

## De onde vem o nome

O termo vem do artigo de 1982 "Problema dos generais bizantinos" de Leslie Lamport, Robert Shostak e Marshall Pease, que enquadra o problema como um grupo de generais do exército bizantino, cada um comandando uma parte de uma força sitiante, que deve concordar unanimemente em um plano de batalha (ataque ou retirada) trocando mensageiros, embora sabendo que alguns dos generais podem ser traidores, enviando ordens ativamente diferentes, contraditórias para diferentes generais leais especificamente para sabotar o acordo. A mecânica completa deste enquadramento, e os resultados centrais da impossibilidade e possibilidade do artigo, são abordados no próximo capítulo, [Problema dos generais bizantinos](./byzantine-generals.md); Este capítulo centra-se no conceito geral de tolerância a falhas introduzido e nomeado.

## Por que a tolerância bizantina à falha é mais difícil do que a tolerância à falha

Com falhas de falha, as informações de um componente funcional podem sempre ser confiáveis pelo valor de face. A única questão é se um determinado componente é acessível e responsivo. Protocolos podem ser construídos em torno de timeouts e redundância: se você não ouvir de um componente, assuma que ele falhou e trabalhe em torno dele.

Com defeitos bizantinos, não se pode confiar *qualquer* as reivindicações de um único componente ao valor de face, mesmo um componente que parece estar respondendo normalmente, porque um componente bizantino-faulty pode mentir convincentemente, incluindo mentir diferentemente para observadores diferentes simultaneamente. Isso significa que protocolos tolerantes à falha bizantina geralmente exigem que os participantes cruzem informações com múltiplos outros participantes e exijam uma **supermaioridade** (não apenas a maioria) dos participantes honestos para garantir o acordo correto, resultados clássicos (desenvolvidos no original jornal de generais bizantinos) mostram que com `n` total dos participantes, acordo bizantino só é possível se menos do que `n/3` delas são bizantina-faulty, uma exigência mais forte do que o limite "mais da metade deve ser honesto" que é frequentemente suficiente para modelos de falha mais simples.

## Resposta específica do Bitcoin

Consenso baseado na mineração de Bitcoin (ver [Consenso](./consensus.md)) evita a clássica máquina bizantina de tolerância a falhas (que assume um conjunto conhecido e fixo de participantes), mas aborda a mesma ameaça subjacente (participantes que podem mentir, enviar informações conflitantes, ou tentar ativamente interromper o acordo) através de um mecanismo diferente: tornando economicamente oneroso ter influência desproporcional sobre a história acordada, via prova de trabalho. Em vez de exigir `n/3` de um participante conhecido definido para ser honesto, a suposição de segurança de Bitcoin é geralmente resumida como exigindo que **mais da metade da potência total do hash da rede** é controlada pelos participantes seguindo o protocolo honestamente (ver [51% Ataques](../bitcoin/51-percent-attacks.md) para o que acontece quando essa suposição é violada, e note que este é um limiar diferente, embora relacionado, do que o limite clássico de um terço do BFT, refletindo o mecanismo subjacente diferente).

## Exemplo: qual comportamento bizantino se parece concretamente no contexto de Bitcoin

Um nó byzantine-faulty ou minerador na rede de Bitcoin pôde: transmitir duas transações conflitantes gastando as mesmas moedas para diferentes partes da rede simultaneamente (tentando um spend duplo), reter um bloco minado validamente da rede temporariamente para ganhar uma vantagem de mineração (a **mineração egoísta** estratégia, discutida em [Pools de Mineração](../bitcoin/mining-pools.md)), ou retransmitir blocos inválidos ou transações na esperança de que alguns pares não os validem corretamente. O protocolo do Bitcoin é projetado para que nós honestos, validando independentemente cada regra para si mesmos (ver [Replicação](./replication.md)), simplesmente rejeitar qualquer coisa que viole as regras de consenso, independentemente de quem enviou ou quão convincente. A defesa contra o comportamento bizantino não é detectar e excluir mentirosos através da reputação, mas fazer mentiras simplesmente falhar validação onde quer que sejam verificados.

## Comércio

Projetar para a tolerância bizantina à falha, em vez do modelo mais simples de falha, significa aceitar um custo estrutural real: verificação mais redundante, limiares de acordo mais conservadores, e no caso específico de Bitcoin, um mecanismo de prova de trabalho inteiro cujo único objetivo é tornar oneroso ganhar influência desproporcional sobre o consenso (ver [Prova de Trabalho](../bitcoin/proof-of-work.md)). Sistemas que não precisam tolerar adversários ativos (um banco de dados interno da empresa replicado em servidores que a empresa controla totalmente) podem usar protocolos tolerantes a falhas muito mais simples e eficientes, já que eles não precisam se defender contra um componente tentando sabotar ativamente os outros.

## Conceitos errôneos comuns

**Uma falha bizantina não requer intenção maliciosa de um operador humano.** Um erro de software que faz um nó enviar dados inconsistentes ou incorretos para diferentes pares é, da perspectiva do protocolo, indistinguível de um nó deliberadamente malicioso, o termo descreve o *padrão de comportamento*Não é a causa por trás disso.

**Tolerância de falha bizantina não é um conceito específico de Bitcoin ou mesmo blockchain-específico.** Trata-se de um modelo geral de falha de sistemas distribuídos, estudado desde o início da década de 1980, com aplicações em sistemas aeroespaciais, bancos de dados distribuídos e qualquer sistema que precise permanecer correto apesar de alguns componentes se comportarem arbitrariamente.

## Outras leituras

- [O problema dos generais bizantinos](https://lamport.azurewebsites.net/pubs/byz.pdf): Lamport, Shostak, Pease, 1982
- [Tolerância bizantina prática](http://pmg.csail.mit.edu/papers/osdi99.pdf): Castro & Liskov, 1999

---

[← Anterior: Consenso](./consensus.md)
·
[Voltar aos Sistemas Distribuídos](./README.md)
·
[Próximo: Problema dos generais bizantinos →](./byzantine-generals.md)
