# Hard fork

Um hard fork é uma regra de protocolo que muda **afrouxa ou muda de outra forma** regras de consenso de uma forma que é incompatível com o software antigo, blocos válidos sob as novas regras podem ser rejeitados por nós não-atualizados, e vice-versa. Este capítulo abrange as razões pelas quais essa incompatibilidade, ao contrário de um fork mole, torna a coordenação genuinamente obrigatória e não meramente preferível.

## A propriedade definidora

Ao contrário de uma [soft fork](./soft-forks.md)As novas regras de um hard fork são **não** um subconjunto restrito dos antigos, algo se torna válido sob as novas regras que as antigas regras teriam rejeitado (um limite de tamanho de bloco maior é o exemplo canônico: um bloco que excede o limite antigo é inválido para um nó antigo, não importa o quão válido seja sob regras novas e mais soltas). Isto significa **cada nó deve atualizar para continuar seguindo a mesma cadeia**, um nó não-atualizado, encontrando um bloco que viola as regras que ele ainda impõe, irá rejeitá-lo e continuar construindo sobre o antigo conjunto de regras, enquanto nós atualizados aceitá-lo e construir para frente sob as novas regras.

```text
Old rules accept: { A, B, C }
New rules accept: { A, B, C, D, E }   (a larger, different set — not a subset relationship)

A block like D is valid under new rules but INVALID under old rules.
Non-upgraded nodes reject it; upgraded nodes accept it.
If both upgraded and non-upgraded nodes keep mining after this point,
the chain splits into two permanently separate, incompatible chains.
```

## Por que isso torna uma divisão permanente um risco real, não apenas uma possibilidade

Se mesmo uma minoria significativa de mineradores, operadores de nó, ou usuários economicamente significativos (trocas, comerciantes) não atualizar até o momento em que um hard fork ativa, a rede pode dividir-se genuinamente, permanentemente, em duas cadeias separadas, cada uma com sua própria história subsequente, cada uma considerada "cadeia real" por qualquer conjunto de participantes que siga suas regras. Foi exatamente isto que aconteceu com [Bitcoin Cash](./bitcoin-cash.md) em 2017. Este é um risco estruturalmente diferente do que um soft fork carrega, onde nós não-atualizados permanecem na mesma cadeia única ao longo de toda, simplesmente sem verificar independentemente cada nova regra.

## Coordenar um hard fork

Devido a este risco dividido, um hard fork geralmente requer demonstrar, com antecedência, que uma parcela esmagadora do ecossistema relevante (operadores de nós, mineradores, grandes trocas e serviços, e a base de usuários mais ampla) realmente suporta e adotará a mudança por um ponto de ativação específico e coordenado, muitas vezes através de uma altura de bloco ou timestamp de código rígido em vez de os mecanismos de sinalização mais flexíveis que os soft forks podem usar (ver [Sinalização Miner](./miner-signaling.md)). Mesmo com esta coordenação, alcançar uma verdadeira unanimidade completa e ecossistémica é difícil numa rede grande, descentralizada e sem autorização, sem autoridade central que possa obrigar a participação, razão pela qual os hard forks e contenciosos (em oposição aos amplamente apoiados de forma quase unânime) produziram historicamente divisões de cadeias reais e duradouras em vez das transições limpas e de cadeia única que os seus proponentes tipicamente esperam.

## Nem todo hard fork é contencioso.

Vale a pena ser preciso aqui, uma vez que "difícil fork" às vezes é usado como se sempre implica controvérsia: uma mudança de regra que é tecnicamente incompatível com o software antigo ainda pode alcançar quase universal, rápida adoção se o ecossistema concorda amplamente que é necessário, produzindo nenhuma segunda cadeia duradoura em tudo, a palavra descreve o *mecanismo de compatibilidade técnica*, não uma previsão sobre o quão contenciosa ou suave uma dada mudança realmente será. A correção de emergência mais famosa do Bitcoin, o "incidente de transbordamento de valor" de agosto de 2010 (um bug, CVE-2010-5139, que deixou uma única transação criar mais de 184 bilhões de BTC do nada devido a um transbordamento inteiro em código de validação), foi resolvido dentro de horas através de uma mudança de regra rejeitando o tipo de transação defeituoso, tecnicamente um soft fork, uma vez que *apertado* validação em vez de afrouxá-la, mas um lembrete útil de que as correções de protocolos de emergência, quase unânimes, são uma categoria real distinta das mudanças contenciosas e deliberadamente projetadas nos estudos de caso desta seção.

## Comércio

Um hard fork pode implementar mudanças na restrição de subconjunto de um soft fork torna impossível ou altamente estranho alcançar, a liberdade de design genuína, sem restrições, precisando de nós antigos para permanecer (parcialmente) compatível. O custo é o ónus da coordenação e o risco estrutural genuíno de uma divisão permanente e não intencional se essa coordenação não for alcançada com algo próximo do pleno consenso dos ecossistemas. Os forks moles de risco são especificamente concebidos para evitar, discutidos em [Soft forks](./soft-forks.md#por-que-soft-forks-são-geralmente-preferidos-quando-possível).

## Conceitos errôneos comuns

**Um hard fork não cria automaticamente uma nova criptomoeda.** Apenas um hard fork que um conjunto significativo e sustentado de participantes realmente continua a mineração e uso no *antigo* o conjunto de regras (enquanto outro conjunto adota as novas regras) produz duas cadeias duradouras, separadas, uma forquilha dura sem conteúdo com adoção universal simplesmente continua como uma cadeia sob as novas regras, sem que a segunda cadeia persista.

**"Forquilha dura" e "forquilha contenciosa" não são sinônimos**, embora os hard forks historicamente mais famosos (Bitcoin Cash, o fork DAO de Ethereum) fossem contenciosos, o mecanismo técnico e a recepção social/política são propriedades variáveis separadas, independentemente de qualquer mudança.

## Outras leituras

- Ver também: [O que é um fork?](./README.md), [Bitcoin Cash](./bitcoin-cash.md), [Debate sobre o Tamanho do Bloco](./block-size-war.md)

---

[← Anterior: Soft forks](./soft-forks.md)
·
[Voltar às atualizações de forks e protocolos](./README.md)
·
[Próximo: Compatibilidade para trás →](./backward-compatibility.md)
