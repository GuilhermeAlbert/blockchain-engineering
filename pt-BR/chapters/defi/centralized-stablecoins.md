# Moedas Estáveis Centralizadas

Uma stablecoin centralizada (USDT (Tether) e USDC (Circle) são, pela capitalização do mercado, esmagadoramente os maiores exemplos) é apoiada por um emitente que detém reservas do mundo real e promete redenção 1:1. Este capítulo cobre o mecanismo claramente e a questão de confiança específica que este livro tem sinalizado repetidamente para cada acordo de custódia que está coberto até agora.

## O mecanismo

Um emissor (Circle, for USDC; Tether Limited, for USDT) aceita dólares (ou instrumentos equivalentes a dólares) de um participante autorizado, menta uma quantidade equivalente de tokens em uma ou mais blockchains, e compromete-se a resgatar esses tokens por dólares a pedido, normalmente através da própria plataforma institucional do emitente em vez de um contrato inteligente sem permissão. On-chain, o próprio símbolo é um comum [ERC-20](../tokens/erc-20.md) (ou padrão equivalente em outras cadeias), mecanicamente indistinguível de qualquer outro token; o que o torna "estável" é inteiramente a gestão de reserva off-chain do emitente e compromisso de resgate, nada que o contrato inteligente em si impõe.

## Onde a confiança realmente se senta

Esta é exatamente a mesma questão de confiança já levantada para [WBTC](../tokens/wrapped-assets.md#wbtc-bitcoin-embrulhado-para-ethereum) e [Custodial vs Carteiras Não- Personalizadas](../wallets/custody.md#o-que-a-custódia-realmente-determina): deter uma moeda estável centralizada significa apresentar uma reclamação contra uma empresa específica, e não uma garantia criptograficamente auto-aplicativa. O valor do token depende inteiramente de:

- **Qualidade da reserva**: o que as reservas de apoio ao token realmente consistem (os títulos de dívida pública de curto prazo e de curto prazo são considerados a mais alta qualidade, a maioria do apoio líquido; outros emitentes historicamente detiveram ou alegaram deter uma combinação mais ampla de ativos com diferentes perfis de risco e liquidez).
- **Atestado de reserva e auditoria**: se o emitente fornece reservas de confirmação contabilística regular, independentemente verificadas, na verdade correspondem a tokens emitidas, e quão rigorosa essa verificação é realmente (uma auditoria completa é uma reivindicação significativamente mais forte do que um atestado periódico, e os emitentes têm variado e mudado ao longo do tempo, em que fornecem).
- **Risco regulamentar e operacional**: a capacidade e a vontade do emitente de honrar os reembolsos, que podem ser afetados por relações bancárias, ação regulatória ou falha operacional simples, independentemente de as reservas serem tecnicamente suficientes no papel.

## Controles a nível dos contratos: congelamento e lista negra

Ao contrário de um token sem permissão, sem papéis privilegiados, a maioria dos principais contratos de stablecoin centralizados incluem **função de congelamento/lista negra controlada pelo emitente**, a capacidade de bloquear um endereço específico da transferência do token, normalmente utilizado em resposta a pedidos de aplicação da lei ou sanções de conformidade. Esta é uma capacidade real, documentada e usada ativamente, não uma capacidade teórica: tanto o USDC quanto o USDT congelaram os saldos de endereços específicos em vários pontos. Trata-se de uma ilustração directa e concreta da questão do controle do acesso já referida em geral. [Fornecimento de Token](../tokens/token-supply.md#por-que-verificar-a-política-de-abastecimento-importa-antes-de-confiar-em-um-token). A posse de uma moeda estável centralizada significa aceitar que o emitente mantenha esta capacidade específica e poderosa sobre os próprios tokens, uma propriedade significativamente diferente da posse de um ativo sem qualquer controle privilegiado.

## Por que continuam dominantes apesar deste comércio

As moedas estáveis centralizadas permanecem, por uma ampla margem, as moedas estáveis mais utilizadas e de maior volume no ecossistema de criptografia mais amplo, em grande parte porque o tradeoff de confiança descrito acima é um muitos usuários e instituições acham aceitável em troca de uma verdadeira estabilidade dólar-preço apoiada por uma empresa regulamentada, identificável, o mesmo cálculo prático já discutido em geral [Custodial vs Carteiras Não- Personalizadas](../wallets/custody.md#por-que-serviços-de-custódia-existem-e-são-amplamente-utilizados-de-qualquer-maneira).

## Conceitos errôneos comuns

**O código de contrato inteligente de uma stablecoin centralizado ser auditável publicamente não significa que *Reservas de apoio* são igualmente verificáveis**. Verificação do código (ver [Implantação](../contracts/deployment.md#verificação-do-contrato)) confirma o que a lógica do contrato faz; ele não diz nada sobre se o emitente realmente detém os dólares que ele reivindica, o que requer verificação financeira separada, off-chain inteiramente fora do que qualquer explorador blockchain pode confirmar.

**Nem todas as stablecoin com "USD" em seu nome usam o mesmo modelo de reserva ou carregam o mesmo perfil de risco.** USDC, USDT e outras moedas estáveis centralizadas têm, em vários pontos de sua história, diferido significativamente na composição de reserva, rigor de auditoria e posição regulatória; tratá-los como intercambiáveis é uma fonte real, documentada de avaliação de risco mal calibrada.

## Outras leituras

- [Círculo: Relatório de reserva USDC](https://www.circle.com/transparency)
- Ver também: [Moedas estáveis](./stablecoins.md), [Custodial vs Carteiras Não- Personalizadas](../wallets/custody.md)

---

[← Anterior: Moedas estáveis garantidas](./collateralized-stablecoins.md)
·
[Voltar para DeFi](./README.md)
·
[Próximo: Trocas descentralizadas →](./dex.md)
