# Nós Completos

Um nó completo baixa e valida independentemente toda a blockchain do Bitcoin, verificando cada regra para cada bloco e transação desde o bloco de gênese, em vez de confiar na reivindicação de qualquer outra pessoa sobre o que é válido. Este capítulo cobre exatamente o que isso significa na prática e por que "executar seu próprio nó completo" é a ação específica, concreta por trás da afirmação comum, mas vaga de que Bitcoin permite que você "não confie em ninguém".

## O que "validação completa" realmente verifica

Um nó completo aplica o conjunto completo de [Regras de consenso](../blockchain/consensus-rules.md) para cada bloco processa, incluindo: as assinaturas de cada transação são criptograficamente válidas, cada referência de entrada uma saída real, criada anteriormente, atualmente não gasta (ver [O Modelo UTXO](./utxo.md)), nenhuma transação gasta mais do que a soma de suas entradas, a prova de trabalho de cada bloco atende ao alvo de dificuldade atual, a raiz Merkle do bloco resume corretamente suas transações, e o bloco referencia corretamente o hash de seu pai. Nada disto é assumido pela fé dos colegas. Um nó completo recomputa e verifica cada um desses fatos em si, exatamente como descrito geralmente em [Replicação](../distributed-systems/replication.md).

## O que a execução realmente requer

A partir de qualquer medição recente, o blockchain completo ocupa várias centenas de gigabytes de armazenamento, e sincronização inicial (download e validação de toda a história da gênese) pode levar de várias horas a alguns dias, dependendo do hardware, velocidade da internet, e se a poda é usada. **Poda** permite que um nó descarte dados de blocos antigos após validá-lo, mantendo apenas o atual conjunto UTXO e (opcionalmente) os cabeçalhos de blocos, reduzindo drasticamente os requisitos de armazenamento de longo prazo, enquanto ainda tendo realizado validação completa em tempo de sincronização, o tradeoff sendo um nó pound não pode mais servir dados de blocos históricos completos para outros pares, ou reproduzir validação histórica sem re-downloadá-lo.

## Porque é que isto importa?

Executar um nó completo significa que quando sua carteira (se construída no mesmo software, como Bitcoin Core's, ou uma carteira separada conectada a ele) lhe diz que um pagamento foi recebido, que a reivindicação repousa na validação independente do seu próprio nó, não em confiar na API de uma troca, no site de um explorador de bloco ou no servidor de um provedor de carteira de terceiros. Esta é a base técnica concreta para a frase comum da comunidade Bitcoin "não confie, verifique": a verificação é algo que um nó completo faz automaticamente e continuamente, como consequência direta de como ele processa cada bloco.

Os nós completos também desempenham um papel específico no [governança](../governance/README.md) de alterações de protocolo: porque um nó completo impõe as regras que seu próprio software implementa, um conjunto coordenado de operadores de nó que se recusam a aceitar uma alteração de regra proposta ( simplesmente não atualizando, ou rejeitando ativamente blocos que violam as regras antigas) é uma verificação real sobre o que as mudanças podem ter sucesso na rede, uma dinâmica explorada completamente na [Governança do Bitcoin](../forks/governance.md) e o [UASF](../forks/uasf.md) Estudo de caso.

## Comércio

Executar um nó completo requer recursos reais (armazenamento, largura de banda e tempo para sincronização inicial) que a [cliente leve](./light-clients.md) evita confiando na maioria honesta em vez de verificar tudo de forma independente. Este é um tradeoff genuíno, não uma escolha estritamente superior em todos os contextos: um indivíduo gerenciando participações modestas, priorizando máxima confiança-minimização, razoavelmente escolhe executar um nó completo; uma aplicação que precisa verificar milhares de saldos de usuários instantaneamente razoavelmente depende de infraestrutura de terceiros em vez disso (ver [Infraestruturas](../infrastructure/README.md)), aceitando um modelo de confiança diferente e mais centralizado em troca de praticidade.

## Conceitos errôneos comuns

**Um nó completo não precisa ser mineração, ou segurar qualquer bitcoin, para ser útil.** Seu valor é verificação e retransmissão independentes. A maioria dos nós completos não são também mineração.

**A validação de um nó completo não depende de quanto hash power backs qualquer bloco dado.** Um nó completo rejeita um bloco inválido, independentemente de quanto prova de trabalho foi gasto produzindo-o. Prova de trabalho determina que *válido* cadeia ganha sob a regra de escolha do fork (ver [Escolha do fork](../blockchain/fork-choice.md)); não torna aceitável um bloco inválido.

## Outras leituras

- [Núcleo do Bitcoin: executando um nó completo](https://bitcoin.org/en/full-node)

---

[← Anterior: A rede Bitcoin](./network.md)
·
[Voltar para Bitcoin](./README.md)
·
[Próximo: Clientes leves →](./light-clients.md)
