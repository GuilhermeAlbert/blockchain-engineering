# Propostas de Rollup de Bitcoin

Ethereum's rollup ecossistema, totalmente coberto em [Camada 2](../layer2/README.md), é maduro, amplamente implantado, e processa volume de transação real, substancial. O Bitcoin não tem um ecossistema de rolagem comparativamente maduro. Este capítulo aborda as razões pelas quais os dois ecossistemas diferem tanto neste ponto específico, e a forma geral das propostas que tentam colmatar o fosso.

## Por que os rollups são mais difíceis de construir no Bitcoin

Um rollup Ethereum (ver [Rollups](../layer2/rollups.md)) depende fundamentalmente da camada de base ser capaz de **verificar uma prova ou arbitrar um pedido de fraude** sobre computação off-chain, modelo de estado baseado em conta de Ethereum e EVM Turing-completo (ver [O EVM](../evm/README.md)) tornar este um ajuste natural, uma vez que um contrato de rollup on-chain verificador pode ser um contrato comum, se especializado, inteligente. Bitcoin é deliberadamente não-Turing-completo [Programa](../bitcoin/script.md#o-projeto-uma-máquina-de-pilha-deliberadamente-não-turing-completo) nunca foi projetado para suportar este tipo de lógica de verificação on-chain de propósito geral, que é precisamente por isso que a construção de um genuíno, trust-minimized rollup (um em que a própria camada base de Bitcoin pode independentemente verificar uma prova de validade ou julgar uma prova de fraude, da mesma forma que um contrato de rollup de Ethereum L1 faz) é um problema de engenharia substancialmente mais difícil, ainda em grande parte não resolvido em Bitcoin como esta escrita.

## BitVM: a proposta atual mais significativa

**BitVM**, proposta por Robin Linus e colaboradores em 2023, é a mais significativa tentativa recente de trazer verificação baseada em fraude para Bitcoin sem exigir qualquer alteração às regras de consenso do próprio Bitcoin. Seu insight principal: em vez de tentar fazer Bitcoin Script executar diretamente computação arbitrária, BitVM codifica uma computação como um grande circuito de portas lógicas, compromete-se com esse circuito usando Bitcoin Script e recursos de caminho de script de Taproot, e (criticamente) só requer o *parte específica, contestada* do circuito a ser realmente revelado e verificado on-chain, em um processo de desafio interativo à prova de fraude entre duas partes comprometidas, semelhante em espírito ao mecanismo à prova de fraude [Rollups Optimistas](../layer2/optimistic-rollups.md) usar em Ethereum, mas adaptado para trabalhar dentro Bitcoin Script recursos muito mais limitados. Isto permite ao Bitcoin verificar se *uma etapa específica* de uma computação off-chain foi feito incorretamente, sem Bitcoin nunca precisar executar nativamente ou entender a computação completa em si.

## O que BitVM faz e não fornece, a partir desta escrita

Os projetos baseados em BitVM são geralmente estruturados como **otimista** sistemas: eles assumem que a computação off-chain foi realizada honestamente a menos que desafiado, e eles exigem pelo menos um partido honesto disposto e capaz de detectar fraude dentro de uma janela definida. Isto assemelha-se à suposição "1-de-N honest watcher" em Ethereum's [Rollups otimistas](../layer2/optimistic-rollups.md#a-suposição-ótima), mas os protocolos e o ambiente operacional diferem. A partir de setembro de 2026, o projeto oficial BitVM rotula sua implementação Rust como uma pré-visualização do desenvolvedor. O design é ativo e cada vez mais concreto, mas ainda não tem o histórico de implantação ou valor em risco de maior implantação da Ethereum. Ver [Local do projeto BitVM](https://bitvm.org/) Para a implementação e os documentos.

## Por que isso importa para como você deve ler scaling reivindicações Bitcoin

Dado o quanto mais estabelecido é o ecossistema de rollup da Ethereum, as reivindicações de "rollups do Bitcoin" ou "Bitcoin Layer 2s" devem ser lidas com cuidado e especificamente, verificando se um determinado projeto fornece uma genuína minimização de confiança reforçada por camadas de base (a forma como um verificador de rollup da Ethereum faz) ou se está mais perto do [cadeia lateral federada](./federations.md) ou [statechain](./statechains.md) modelos de confiança abordados anteriormente nesta seção, que oferecem propriedades reais, úteis, mas significativamente diferentes, geralmente mais fracas garantias de confiança do que o termo "rollup", emprestado diretamente da terminologia muito mais estabelecida de Ethereum, pode implicar para um leitor já familiarizado com o significado Ethereum desse termo.

## Conceitos errôneos comuns

**"Bitcoin Layer 2" não é uma única categoria técnica bem definida da forma como "Ethereum rollup" se tornou**. É usado, às vezes frouxamente, para descrever uma ampla gama de sistemas com modelos de confiança genuinamente diferentes (Lightning, federated sidechains, statechains, e sistemas emergentes à prova de fraudes como BitVM), e o uso deste livro de "Layer 2" em todo o mundo é escopo cuidadosamente para especificar qual destes realmente significa em contexto, em vez de tratar o termo como carregando um significado consistente e preciso em todo o ecossistema.

**BitVM não é um soft fork, hard fork, ou qualquer tipo de mudança para as regras de consenso do próprio Bitcoin**. É uma construção inteligente construída inteiramente usando Bitcoin Script e capacidades Taproot que já existem na mainnet de Bitcoin hoje, que é precisamente a restrição de design que fez com que vale a pena construir desta forma em primeiro lugar.

## Outras leituras

- [BitVM: Calcular qualquer coisa sobre Bitcoin](https://bitvm.org/bitvm.pdf): Robin Linus, 2023
- Ver também: [Camada 2](../layer2/README.md), [Rollups Optimistas](../layer2/optimistic-rollups.md)

---

[← Anterior: RGB](./rgb.md)
·
[Voltar para Bitcoin Scaleing](./README.md)
·
[Próximo: Lightning Network →](../lightning/README.md)
