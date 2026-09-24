# Custódia

A custódia responde quem pode autorizar uma transferência e o que alega que outra pessoa tem se essa autoridade é mal utilizada, perdida, congelada ou se torna insolvente. O controle-chave em cadeia e a propriedade legal podem alinhar-se, mas não são o mesmo conceito.

## Contas de custódia

Um guardião controla chaves privadas e registra direitos ao cliente em um livro interno. As transferências entre clientes podem nunca aparecer em cadeia. O cliente depende da solvência do guardião, controles, política de retirada, estrutura legal e livros precisos.

Segregação de ativos visa manter os ativos do cliente distintos da propriedade do próprio guardião. A implementação depende de carteiras, livros de contabilidade, contratos e legislação aplicável em matéria de insolvência. Um endereço rotulado como “ativos do cliente” não prova que os passivos conciliem ou que os credores não possam contestar a propriedade.

## Omnibus e carteiras segregadas

Uma carteira omnibus combina ativos para muitos clientes, enquanto o livro interno aloca saldos. Melhora a eficiência operacional e a privacidade entre os clientes, mas os usuários não podem provar o seu direito individual apenas a partir do saldo do endereço. Os endereços individuais segregados melhoram a atribuição, aumentando a gestão de endereços e as taxas. Ambos os modelos podem falhar se a autoridade de assinatura ou contabilidade estiver comprometida.

## Prova de reservas e passivos

Uma assinatura on-chain ou prova de Merkle pode mostrar o controle de ativos selecionados em um momento no tempo. A solvência também requer passivos completos, propriedade dos ativos e ausência de penhores não revelados ou saldos emprestados. Um instantâneo de reserva é evidência, não uma demonstração financeira completa.

A garantia independente pode examinar os controles e a reconciliação dentro de um âmbito definido. Leia a data, entidades, ativos, passivos e procedimentos em vez de tratar a palavra “auditoria” como cobertura universal.

## Controles operacionais

Os custodianos dividem as chaves em sistemas quentes, quentes e frios, definem limites de retirada, destinos de tela e exigem várias aprovações. Esses controles reduzem alguns caminhos de roubo e podem atrasar retiradas legítimas. O congelamento de emergência só preserva os ativos se a governança e a recuperação permanecerem confiáveis.

Os usuários devem compreender os direitos de retirada, as taxas, o atraso, os limites do seguro, a lei, a herança e o que acontece durante a insolvência. Os desenvolvedores devem modelar o estado de custódia explicitamente em vez de exibir um saldo interno como se fosse um UTXO on-chain ou saldo de conta.

## Outras leituras

- [Custodial vs Carteiras Não- Personalizadas](../wallets/custody.md)
- [Roubo de Chave Privada](../security/private-key-theft.md)

---

[← Anterior: Regulamento e Sociedade](./README.md)
·
[Voltar ao Regulamento e à Sociedade](./README.md)
·
[Próximo: Intercâmbios →](./exchanges.md)
