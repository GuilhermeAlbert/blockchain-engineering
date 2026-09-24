# Compatibilidade para trás

Este breve capítulo explicita uma distinção [Soft forks](./soft-forks.md) e [Hard fork](./hard-forks.md) cada um depende de: o que "para trás compatível" significa precisamente em um contexto de regras de consenso, e por que é uma reivindicação mais rigorosa, mais específica do que a mesma frase significa no desenvolvimento de software comum.

## Compatibilidade para trás, precisamente definida aqui

Na maioria dos contextos de software, "compatible backward" significa algo como "antigos clientes ainda podem falar com o novo sistema sem quebrar". No contexto das regras de consenso de Bitcoin, significa algo mais exato: **nós antigos, não-atualizados continuam a aceitar cada bloco que os nós atualizados consideram válido, sem exigir que os nós antigos mudem nada sobre como eles validam.** Esta é exatamente a propriedade. [soft forks](./soft-forks.md#a-propriedade-definidora) são projetados para preservar, e exatamente a propriedade [hard forks](./hard-forks.md#a-propriedade-definidora) necessariamente quebrar.

## Por que esta definição específica importa

Uma mudança pode ser "para trás compatível" no sentido frouxo, diário (o software antigo da carteira ainda pode construir e transmitir transações ordinárias após a mudança) enquanto ainda ser um hard fork no sentido estrito consenso (antigo *nó* O software rejeitaria alguns blocos de novo formato como inválidos). Estas são afirmações genuinamente diferentes sobre peças genuinamente diferentes de software. Uma carteira só precisa construir transações válidas; um nó completo precisa validar corretamente cada bloco e transação com o conjunto completo de regras atuais. Configurando "minha carteira ainda funciona" com "a mudança de protocolo foi backward compatível" é uma simplificação comum, compreensível, mas tecnicamente imprecisa.

## Exemplo: porque o SegWit precisava de cuidados aqui

[SegWit](../bitcoin/segwit.md#segwit-como-um-soft-fork) é instrutivo precisamente porque alcançar um verdadeiro nível de consenso para trás compatibilidade requer trabalho de projeto deliberado. Não foi automático. O padrão de script específico que as saídas do SegWit usam (`OP_0 <hash>`) foi escolhido porque os nós antigos já haviam definido, se permissive, comportamento para ele (tratando-o como qualquer-pode-spend), os autores do SegWit não inventaram nova compatibilidade backward do nada; eles encontraram uma lacuna existente nas regras antigas deliberadamente solto o suficiente para construir o novo, comportamento mais apertado dentro dele sem nós antigos que precisam mudar nada.

## Conceitos errôneos comuns

**Compatibilidade para trás no nível de consenso não é a mesma questão que compatibilidade para trás no nível de carteira, API ou experiência do usuário.** Uma mudança pode satisfazer um sem satisfazer o outro, e o uso deste livro de "compatible backward" em toda a seção de Forks significa especificamente o senso de regras de consenso, salvo indicação em contrário.

## Outras leituras

- Ver também: [Soft forks](./soft-forks.md), [Hard fork](./hard-forks.md)

---

[← Anterior: Forquilhas duras](./hard-forks.md)
·
[Voltar às atualizações de forks e protocolos](./README.md)
·
[Próximo: Atualizações de Protocolo →](./upgrades.md)
