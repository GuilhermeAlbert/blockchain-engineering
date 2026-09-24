# Replicação

Cada nó Bitcoin completo armazena uma cópia completa de toda a blockchain, centenas de gigabytes de dados, duplicados em dezenas de milhares de máquinas independentes em todo o mundo, sem coordenação além das regras do protocolo cada nó segue independentemente. Este capítulo aborda por que essa quantidade radical de duplicação é o ponto, não uma ineficiência, e como ela difere da replicação como praticada em bases de dados distribuídas convencionais.

## O problema

Sistemas convencionais distribuídos (uma base de dados que suporta um grande site, por exemplo) usam replicação para **disponibilidade** e **durabilidade**: se um servidor falhar, outra cópia dos dados está disponível, e o sistema permanece em cima. Este é um problema de engenharia bem estudado com tradeoffs bem conhecidos (discussed in [Teorema da PAC](./cap.md)), e geralmente assume que as réplicas são todas controladas pela mesma organização e espera-se cooperar honestamente. As falhas que estão sendo defendidas são falhas, falha de hardware, e partições de rede, não réplicas mentindo ativamente um para o outro.

O problema de replicação do Bitcoin é diferente e mais difícil: a rede tem que tolerar não apenas falhas honestas, mas **participantes ativamente adversários**. Nós e mineradores que podem deliberadamente tentar apresentar dados falsos, gastar ou reescrever o histórico para seu próprio benefício. Esta distinção (tolerando falhas honestas mas não confiáveis versus tolerando comportamento ativamente malicioso) é a linha divisória entre a tolerância de falha de sistemas clássicos distribuídos e o [Tolerância de falha bizantina](./byzantine-faults.md) Bitcoin realmente precisa, coberto nos próximos dois capítulos.

## Como funciona

Cada nó completo de forma independente baixa e valida todo o blockchain de seus pares (verificando a prova de trabalho de cada bloco, as assinaturas de cada transação e cada regra que o protocolo especifica (ver [Regras de Consenso](../blockchain/consensus-rules.md)) em vez de confiar na palavra de qualquer colega que um bloco é válido. Isto significa que a replicação do Bitcoin não é "copiar os dados e confiar na fonte" a forma como a replicação de um banco de dados funciona normalmente; é "copiar os dados e *verificar independentemente cada fato sobre ele*Um nó que recebe um bloco inválido de um par (um com uma assinatura ruim, um gasto duplo, ou uma prova de trabalho quebrado) simplesmente rejeita-lo, independentemente de quantos outros nós já podem tê-lo aceitado ou quanto hash power produziu.

Isto é o que dá a replicação do Bitcoin sua propriedade de segurança específica: **um usuário não precisa confiar em nenhum de seus pares**, apenas as regras de protocolo e a verificação independente de seu próprio nó. Um único nó completo, sem permissão, executado por um indivíduo sem acesso ou relação especial a qualquer outra pessoa pode, e pelo design, verificar completamente todo o histórico da rede a partir do bloco de gênese para frente, verificando cada regra para cada bloco, sem pedir a ninguém para confirmar nada.

## Exemplo: o custo da replicação completa

A partir de qualquer medição recente, o blockchain Bitcoin completo (incluindo todos os blocos históricos desde 2009) ocupa várias centenas de gigabytes e cresce continuamente à medida que novos blocos são adicionados aproximadamente a cada dez minutos. Executar um nó completo significa baixar e armazenar todo este conjunto de dados (ou usar [poda](../bitcoin/README.md), que descarta dados antigos do bloco após validá-lo, mantendo apenas o atual conjunto UTXO, veja a seção Bitcoin para detalhes) e re-executando cada etapa de validação histórica durante a sincronização inicial, um processo que pode levar muitas horas a dias em hardware de consumo comum, dependendo da velocidade de conexão à internet e desempenho do disco. Este é um custo real e contínuo que cada operador de nó inteiro suporta voluntariamente, em troca de não precisar confiar nas reivindicações de ninguém sobre o conteúdo do blockchain.

```text
Traditional replicated database:              Bitcoin's replication model:

  Primary ──► Replica A                         Node A ◄──► Node B ◄──► Node C
     │        (trusts primary,                     ▲           ▲           ▲
     └──────► Replica B                            │           │           │
              copies data as-is)              each independently
                                               re-validates every
                                               block and transaction
                                               against protocol rules
```

## Sob o capô: por que isso escala apesar do custo

O modelo de replicação de Bitcoin negocia deliberadamente armazenamento e eficiência de largura de banda (os mesmos dados, duplicados dezenas de milhares de vezes, é objetivamente desperdiçado por padrões convencionais de engenharia de banco de dados) para uma propriedade que nenhum sistema centralizado eficientemente replicado pode oferecer: **nenhum nó único, ou mesmo um grande grupo de nós, pode alterar unilateralmente o que qualquer outro nó aceita como válido**, porque cada nó verifica as regras por si mesmo. Um nó executado por um indivíduo solitário com um laptop de consumo tem exatamente o mesmo poder de rejeitar um bloco inválido como um nó executado pelo maior grupo de mineração ou troca. Trata-se de uma consequência estrutural directa da plena replicação, combinada com uma verificação independente, e é a base para a alegação, que se insere ainda mais [Nós Completos](../bitcoin/full-nodes.md), que executar o seu próprio nó é a única maneira de evitar totalmente confiar na versão de alguém da verdade.

## Comércio

A replicação completa com verificação independente dá a cada participante a capacidade de verificar todo o histórico, ao custo de exigir a cada participante que queira essa garantia para armazenar e processar todo o conjunto de dados. Um fardo que cresce ao longo do tempo à medida que a blockchain cresce, e que tem implicações reais, práticas para quem pode realisticamente executar um nó completo (um tópico conectado a [descentralização](../governance/README.md) debates abrangidos pela Governança). Sistemas que relaxam a replicação completa ([clientes leves](../bitcoin/light-clients.md), que armazenam apenas cabeçalhos de bloqueio, ou serviços centralizados como intercâmbios e exploradores de bloco) trocar parte desta garantia de verificação independente para requisitos de recursos significativamente menores, uma troca real e consequente em vez de uma escolha estritamente inferior para cada caso de uso.

## Conceitos errôneos comuns

**Executar um nó completo não é o mesmo que mineração.** Um nó completo valida e retransmite blocos e transações e aplica regras de consenso; mineração é o processo separado de competir para criar novos blocos (ver [Mineração](../bitcoin/mining.md)). A maioria dos nós completos não são meus.

**Mais cópias dos dados existentes não fornecem, por si só, as garantias de segurança do Bitcoin.** Mil cópias de um banco de dados controlado pelo mesmo operador desonesto não fornece mais integridade do que uma cópia, o que importa é que cada cópia é verificada independentemente contra regras fixas pelas partes sem necessidade de confiar uns nos outros, não apenas que muitas cópias existem.

## Outras leituras

- [Bitcoin Referência do desenvolvedor principal: Nós completos](https://developer.bitcoin.org/devguide/p2p_network.html)
- [Whitepaper Bitcoin, Seção 5](https://bitcoin.org/bitcoin.pdf)

---

[← Anterior: Redes de pares a pares](./p2p.md)
·
[Voltar aos Sistemas Distribuídos](./README.md)
·
[Próximo: Consenso →](./consensus.md)
