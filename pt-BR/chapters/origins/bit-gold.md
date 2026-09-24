# Bit Gold

Nick Szabo propôs "bit gold" em 1998 e escreveu em detalhes em seu blog em dezembro de 2005, antes de Bitcoin existir, e especificamente antes do whitepaper de Satoshi. Szabo é um jurista e cientista da computação que, independentemente da questão monetária, passou os anos 90 escrevendo sobre como contratos e direitos de propriedade poderiam ser aplicados em software em vez de tribunais, cunhando o termo "[contrato inteligente](../contracts/README.md)" em 1994. Bit gold senta-se na intersecção desse trabalho e da tradição cypherpunk digital-cash: uma tentativa de criar escassez e propriedade imperdível em um meio puramente digital, modelado explicitamente sobre as propriedades que fazem o ouro físico funcionar como dinheiro.

## O problema, como Szabo emoldurado

A pergunta inicial de Szabo foi: por que o ouro funciona como dinheiro em quase todas as civilizações humanas, quando tem comparativamente pouco uso intrínseco (algumas jóias e, nos tempos modernos, fabricação de eletrônicos) em relação ao seu preço? Sua resposta, apresentada em seu ensaio companheiro [Descasque: As origens do dinheiro](https://nakamotoinstitute.org/library/shelling-out/), é que o ouro é **onerosa para produzir** (exige esforço real para minar e refinar) e **barato para verificar** (sua densidade, cor e reação ao ácido são fáceis de testar), e essas duas propriedades juntas tornam difícil falsificar e fácil para estranhos confiarem sem uma autoridade central atestando isso. Ele queria construir um bem digital com as mesmas duas propriedades: caro para criar, trivial para verificar.

## Como bit ouro foi projetado para trabalhar

A proposta de Szabo é mais um esboço de protocolo do que um sistema totalmente projetado, mas sua estrutura é descritível em etapas concretas:

1. Um participante gera uma **texto de desafio**, algum pedaço de dados atuais imprevisíveis, de modo que uma solução não pode ser pré-computada com antecedência.
2. O participante realiza uma **Cálculo da prova de trabalho** (a mesma classe de puzzle que [Hashcash](./hashcash.md)) usando esse desafio como uma entrada, à procura de uma solução que é caro encontrar, mas barato para verificar.
3. A solução (o próprio "o ouro de bits") é **cronometrado criptograficamente**, e Szabo propôs fazer isso usando um **serviço de cronometração distribuído byzantine-fault-tolerant** executado coletivamente por um quórum de servidores, de modo que nenhum partido controla o registro oficial de quando um pedaço de ouro foi criado.
4. A solução cronometrada é **ligado à solução ou cadeia de soluções anteriores**, criando uma cadeia crescente e ordenada de moedas de ouro de bits, cada uma provavelmente criada após a última.
5. Porque cada unidade de bit ouro requer nova prova de trabalho, não reutilizável, unidades não podem ser copiadas ou forjadas. Verificar um só requer verificar novamente um hash, mas criar um novo requer refazer a procura cara de um novo desafio.

Szabo propôs explicitamente que **A propriedade de unidades bit ouro ser rastreado e transferido através de um registro de título**, novamente idealmente mantido por um sistema distribuído, baseado em quórum em vez de uma única empresa, ecoando o mesmo "que mantém o livro de contabilidade honesto sem um único partido confiável" problema encontrado em [b-dinheiro](./b-money.md).

```text
Challenge #1 (random seed)
        │
        ▼  proof-of-work search
Solution #1 ── timestamped by BFT quorum
        │
        ▼  becomes input to next challenge
Challenge #2
        │
        ▼  proof-of-work search
Solution #2 ── timestamped, chained to Solution #1
        │
        ▼
       ...
```

Esta estrutura encadeada (cada nova unidade de criação referenciando o que veio antes, cronometrada por um quórum distribuído em vez de um partido) é a parte do bit ouro que mais visivelmente antecipa uma blockchain. Não é idêntico ao projeto do Bitcoin: o bit gold não tem uma única cadeia global com uma regra de "cadeia mais longa", nenhum ajuste de dificuldade de mineração ligado a um tempo de bloqueio de alvo, e (criticamente) Szabo nunca especificou completamente como o quorum de registro de tempo distribuído chega a acordo ou resiste a ser assumido, que é o mesmo problema não resolvido que aparece no modelo de servidor de b-money.

## O que o ouro tem direito

- **Prova de trabalho como fonte de escassez digital**, usando o mesmo custo-para-produzir / barato-para-verificar lógica Bitcoin usa para mineração.
- **Acorrentar novas unidades ao estado anterior**, um precursor conceitual inicial para ligar blocos por hash (ver [Hashes e Block Linking](../blockchain/block-linking.md)).
- **Um serviço distribuído, em vez de um só partido, de marcação temporal e de registro de títulos**: reconhecendo, como o autor de b-money fez, que o partido que mantém o registro é o cerne de todo o projeto.
- **Modelagem explícita sobre as propriedades monetárias do ouro**, que colocou o trabalho de Szabo diretamente em conversação com questões da teoria monetária [Economia](../economics/README.md), em especial porque é que os bens produzidos com custos elevados funcionam historicamente bem como os dinheiros (ver [Carl Menger e a Origem do Dinheiro](../economics/menger.md)).

## Que pedaço de ouro ficou por resolver

- **Nenhum mecanismo de consenso totalmente especificado.** "Um quórum distribuído de servidores" é um objetivo de design, não um protocolo. Como o quórum é selecionado, como ele lida com um participante tentando se juntar ou sair, e como ele resiste a uma coalizão de membros de quórum desonestos controlando o processo de timestamping nunca foram trabalhados em detalhes ou implementados.
- **Nunca construído.** Como dinheiro-b, bit gold existe como ensaios, não código em execução. Szabo disse em entrevistas posteriores e comentários do blog que ele tentou uma implementação protótipo, mas nunca lançou ou implantou um publicamente.
- **Nenhum mecanismo nativo para dividir ou agregar unidades em montantes de pagamento arbitrários** a forma como as saídas satoshi-denominadas de Bitcoin fazem (ver [O Modelo UTXO](../bitcoin/utxo.md)).

## Um pouco de ouro, Satoshi, e a questão de identidade

Como o bit gold está estruturalmente próximo ao Bitcoin (prova de trabalho, timestamps acorrentados, escassez digital modelada em ouro) e porque Szabo foi comprovadamente ativo nos círculos intelectuais que produziram o Bitcoin, Szabo tem sido um dos candidatos mais frequentemente propostos para a identidade real de Satoshi Nakamoto em especulações externas e jornalismo. Szabo negou repetidamente e publicamente ser Satoshi. Nenhuma evidência de origem primária (criptográfica, estilométrica ou não) foi publicada que estabelece sua identidade como sendo de Satoshi além da especulação, e este livro não trata essa afirmação como fato. Ver [Quem era Satoshi Nakamoto?](./satoshi.md) para um tratamento integral das teorias identitárias e por que este livro as rotula como especulação e não história.

O que está documentado, em vez de especular: Satoshi não citou bit ouro pelo nome nas referências do whitepaper Bitcoin (ao contrário de Hashcash e b-money), embora os dois projetos são suficientemente próximos na estrutura que a omissão tem sido um assunto de comentário público. Szabo e Satoshi ambos postaram em listas de criptografia e discussão financeira-criptografia sobrepostas nos anos anteriores a 2008.

## Conceitos errôneos comuns

**Bit gold não foi uma criptomoeda que lançou e falhou.** Nenhuma moeda jamais foi emitida sob este projeto; nunca passou da fase de design-ensaio e (por comentários posteriores de Szabo) limitada protótipo.

**Szabo ser candidato a Satoshi é especulação, não evidência.** A semelhança estrutural entre dois desenhos de autores diferentes que trabalham na mesma pequena comunidade sobre o mesmo problema bem conhecido é esperada, não suspeita por si só.

## Outras leituras

- [Pouco ouro](https://unenumerated.blogspot.com/2005/12/bit-gold.html): Nick Szabo, 2005
- [Descasque: As origens do dinheiro](https://nakamotoinstitute.org/library/shelling-out/): Nick Szabo
- [Contratos inteligentes: Blocos de construção para mercados digitais](https://www.fon.hum.uva.nl/rob/Courses/InformationInSpeech/CDROM/Literature/LOTwinterschool2006/szabo.best.vwh.net/smart_contracts_2.html): Nick Szabo, 1996

---

[← Anterior: b-money](./b-money.md)
·
[Voltar às Origens](./README.md)
·
[Próximo: Quem era Satoshi Nakamoto? →](./satoshi.md)
