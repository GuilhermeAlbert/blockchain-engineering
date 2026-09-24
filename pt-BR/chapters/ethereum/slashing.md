# Slashing

Slashing é o mecanismo de Ethereum para punir comprovadamente, criptograficamente demonstrável comportamento de validação desonesto, uma parte da estaca do validador ofensivo é destruída, e eles são forçados a ser removidos do conjunto de validadores. Este capítulo cobre exatamente o que comportamentos desencadeá-lo, distinguindo corte acentuadamente do comum, penas muito mais suaves para a simples inatividade.

## Delitos gravíveis, precisamente

Ethereum define exatamente duas categorias de comportamento cortante, ambos escolhidos especificamente porque eles são **prova apenas de provas criptográficas**, nenhum processo de julgamento ou resolução de litígios é necessário, apenas uma mensagem assinada que prove a violação ocorreu:

- **Dupla proposta**: assinando dois blocos diferentes para o mesmo slot. Isto é diretamente análogo ao [Nonce reutilizar](../cryptography/ecdsa.md#reutilização-do-nonce-o-erro-de-implementação-mais-conseqüente) problema abordado na Criptografia, em espírito, se não mecanismo. Um validador só é suposto propor um bloco por slot atribuído, e assinar dois conflitos é uma evidência inequívoca, comprovada de intenção maliciosa ou uma falha operacional grave (mais comumente, na prática, executando a mesma chave de validação em duas máquinas separadas simultaneamente por engano).
- **Votação dupla / votação cerca**: submetendo dois atestados conflitantes para a mesma época, ou submetendo um atestado que "surrounds" (é inconsistente com, de uma forma específica, formalmente definida relacionada com a gama de épocas que ele vota são justificadas) um atestado anterior do mesmo validador.

## Por que esses comportamentos específicos, e não outros

Ambas as ofensas cortantes compartilham uma propriedade estrutural: um validador honesto, funcionando corretamente executando uma única instância corretamente configurada de seu software cliente **não pode** Sem querer apresentar estas provas. Não é algo que acontece por estar off-line, ser lento ou cometer um erro honesto de julgamento sobre qual cadeia seguir. É precisamente por isso que o corte (uma pena severa, destruindo o capital real) é reservado para estas categorias estreitas, criptograficamente prováveis em vez de aplicado à categoria muito mais ampla, mais comum de simplesmente estar offline ou faltando tarefas, que o modo de falha menor incorre em seu próprio, muito mais suave **pena de inatividade** em vez disso (pequeno, contínuo, e especificamente não tratado como equivalente a desonestidade deliberada).

## A sanção efectiva

Um validador cortado perde uma parte de sua estaca imediatamente, é colocado em um processo de saída forçada, e (criticamente) perde **mais** se muitos outros validadores são cortados em torno do mesmo tempo (uma "pena de correlação", escalando a penalidade individual para cima com base no quanto a estaca total foi cortada na janela de tempo circundante). Este desenho de escala de correlação é deliberado: **ataque coordenado** por muitos validadores simultaneamente (o cenário na verdade ameaça a segurança da rede) dramaticamente mais caro per-validator do que um erro isolado, one-off honesto por um único validador, que incorre apenas em uma penalidade de base comparativamente pequena.

## Incentivo ao assobio

Quem submeter a prova criptográfica de um delito de corte (um "whistleblower") recebe uma pequena recompensa por fazê-lo, um incentivo direto, estrutural, garantindo que o comportamento descomprometido demonstrável seja denunciado e penalizado prontamente, ao invés de potencialmente passar despercebido, similar em espírito a como a segurança baseada na prova de trabalho de Bitcoin depende de participantes economicamente motivados, forçando ativamente as regras, em vez de passivo, não forçado a seguir regras.

## Conceitos errôneos comuns

**Slashing não é uma penalidade por simplesmente estar offline ou falta de atestados**, que incorre em uma pena de inatividade muito menor, separada; cortar especificamente e só se aplica às duas categorias estreitas, criptograficamente comprovadas de dupla assinatura descrito acima, uma distinção título deste capítulo deliberadamente mantém separado do tempo normal de inatividade validador.

**Um validador não pode ser cortado para ter uma opinião sobre qual cadeia está correta**, ou para qualquer chamada de julgamento subjetivo. Cada ofensa cortante requer prova criptográfica inequívoca (duas mensagens assinadas conflitantes) que não deixa espaço para disputa sobre se ocorreu, por design.

## Outras leituras

- [Ethereum especificações de consenso, condições de corte](https://github.com/ethereum/consensus-specs/blob/dev/specs/phase0/beacon-chain.md#slashings)

---

[← Anterior: Tomada](./staking.md)
·
[Voltar para Ethereum](./README.md)
·
[Próximo: Finalidade →](./finality.md)
