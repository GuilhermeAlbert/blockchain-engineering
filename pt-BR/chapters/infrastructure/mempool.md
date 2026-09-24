# Infraestruturas Mempool

Um mempool é o conjunto local de transações válidas e não confirmadas consideradas para relé ou inclusão. Não há uma única mempool global. Os nós recebem transações diferentes em momentos diferentes e aplicam a política local antes de retransmiti-las.

## Política não é consenso

Regras de consenso decidem se uma transação pode aparecer em um bloco válido. A política de Mempool decide se um nó armazena e retransmite antes da confirmação. Limiares de taxas, regras de substituição, limites ancestrais e descendentes, e padronização de transações podem diferir pela versão e configuração do software.

Uma transação rejeitada de um mempool ainda pode chegar a um minerador ou validador através de outro canal par ou privado. Uma transação presente localmente pode nunca confirmar porque sua taxa é muito baixa, uma transação conflitante ganha, ou expira do armazenamento local.

## Dados pendentes são instáveis

Aplicações usam feeds mempool para estimativa de taxas, saldos pendentes, negociação, monitoramento de fraudes e notificações de usuários. Cada resultado precisa da fonte de observação e do tempo. Ausência significa “não visto aqui”, não “não existe”.

Construtores de Ethereum e sistemas de transações privados podem ver o fluxo de ordem indisponível para um nó público. Os nós Bitcoin podem diferir na política de substituição e aceitação do pacote. Comparando vários pares melhora a visibilidade, mas não cria completude.

## Substituição e conflitos

Acompanhe transações por hash e pelo recurso que eles competem para gastar. Os conflitos de Bitcoin consomem o mesmo UTXO. As transações Ethereum de uma conta competem na mesma noite. Uma substituição cria um novo hash; uma interface que observa apenas o hash original pode relatar uma transação como presa após sua intenção já ter executado através de outro hash.

O estado pendente não deve ser misturado com a contabilidade confirmada. Marcar os registros tentativos e conciliá-los quando um bloco chega. Se uma transação desaparecer, distinguir confirmada, substituída, abandonada e meramente ausente do provedor atual quando as provas o permitirem.

## Operando um feed

Persista observações apenas quando o produto precisa de história, e retenção ligada. A contrapressão importa durante picos de taxa quando a taxa de chegada e o tráfego de substituição aumentam. Proteger os endpoints públicos contra fugas de dados de submissão sensíveis ou permitir a carga de assinatura ilimitada.

## Outras leituras

- [Bitcoin Documentação de mempool e RPC](https://bitcoincore.org/en/doc/)
- [Transações Ethereum](https://ethereum.org/developers/docs/transactions/)
- Ver também: [O Bitcoin Mempool](../bitcoin/mempool.md), [Execução frontal](../security/front-running.md)

---

[← Anterior: Exploradores de bloco](./block-explorers.md)
·
[Voltar à Infraestrutura](./README.md)
·
[Próximo: Pipelines de dados Blockchain →](./data-pipelines.md)
