# Soft forks

Um soft fork é uma regra de protocolo que muda **apertos** regras de consenso (fazendo alguns blocos previamente válidos ou transações agora inválidas) de uma forma que nós antigos, não-atualizados ainda aceitam como válidos, porque tudo o que as novas regras rejeitam já era algo antigo nós teria aceitado de qualquer maneira; nada novo está sendo permitido. Este capítulo abrange precisamente o mecanismo, porque "para trás compatível" está fazendo trabalho técnico real, específico nessa definição, não apenas uma vaga garantia.

## A propriedade definidora

Se uma mudança for um verdadeiro soft fork, **cada bloco válido sob as novas regras mais apertadas também é válido sob as regras antigas**As novas regras são um subconjunto estrito do que as antigas regras já permitiam. Isso é o que permite que um soft fork ative sem que cada nó precise atualizar simultaneamente: nós não atualizados continuam aceitando novos blocos (já que esses blocos também satisfazem as regras antigas e mais soltas que ainda estão verificando), enquanto nós atualizados aplicam adicionalmente a nova restrição mais apertada.

```text
Old rules accept: { A, B, C, D, E, F }   (the full space of valid blocks, pre-change)
New rules accept: { A, B, C }             (a tightened subset)

A block satisfying the new rules ⊂ satisfies the old rules — always.
Old nodes see new-rule-compliant blocks as valid (they're a subset of what
old nodes already accept). Old nodes might still accept a block that
violates the NEW rules (like D, E, or F) — they simply don't know to check
for the new restriction — but upgraded nodes correctly reject those.
```

## SegWit como o exemplo mais claro trabalhado

[SegWit](../bitcoin/segwit.md#segwit-como-um-soft-fork) é o caso concreto mais claro já abordado neste livro: saídas SegWit usam um padrão de script que os nós antigos interpretam como "ninguém pode gastar, nenhuma verificação de assinatura necessária" (já que eles não reconhecem a nova lógica de validação de testemunhas), a *solto* interpretação do que os nós atualizados realmente impõem (uma testemunha válida que satisfaça que a saída específica realmente é necessária). Porque a nova regra é estritamente mais apertada do que os nós antigos já estavam permitindo, nós antigos nunca rejeitam um bloco SegWit-válido; eles simplesmente não verificam independentemente o mesmo requisito de assinatura nós atualizados fazer para essas saídas específicas.

## Mecanismos de ativação

Como um soft fork não requer que cada nó atualize antes de poder ativar com segurança, a coordenação geralmente se concentra em **mineradores**, uma vez que são especificamente seus blocos que precisam começar a aplicar a nova, regra mais apertada para que ela faça efeito em toda a rede. Vários mecanismos de ativação têm sido usados ao longo da história do Bitcoin, cobertos em seus próprios capítulos: [Sinalização Miner](./miner-signaling.md) (miners votando através de bits de versão em bloco, padronizados como [BIP 9](https://github.com/bitcoin/bips/blob/master/bip-0009.mediawiki)) e, quando o minerador sinalizou para segWit especificamente, [Soft forks ativados pelo usuário](./uasf.md) (nós econômicos e usuários, não apenas mineradores, forçando o problema).

## Por que soft forks são geralmente preferidos quando possível

Como um soft fork não requer que cada participante (cada carteira, cada troca, cada operador de nó) se atualize antes que a rede possa continuar operando com segurança como uma cadeia, ele carrega significativamente menor risco de coordenação e menor risco de uma divisão de rede permanente não intencional em comparação com uma [hard fork](./hard-forks.md)Esta é uma das principais razões pela qual a comunidade de desenvolvimento de Bitcoin tem geralmente favorecido os forks moles para mudanças de protocolo, onde um design compatível com soft fork é tecnicamente alcançável, discutido mais adiante em [Governança do Bitcoin](./governance.md).

## Comércio

Os soft forks não são livres de custo, apesar de seu caminho de ativação mais suave: porque nós não atualizados não entendem totalmente ou verificam independentemente as novas regras, eles estão confiando mais fortemente na maioria honesta dos mineradores para realmente aplicar essas regras corretamente (uma suposição real, se geralmente modesta, confiança em relação à verificação completa e independente). Um nó completo não atualizado tecnicamente permanece um "nodo completo" pelo nome, mas sua garantia prática de segurança para o conjunto de regras recentemente restrito é mais fraca do que um nó atualizado, até que ele eventualmente atualiza.

## Conceitos errôneos comuns

**Um soft fork não é automaticamente "mais seguro" do que um hard fork em todas as dimensões**. Ele minimiza o risco de uma divisão de cadeia permanente não intencional, mas a restrição técnica específica (as novas regras devem ser um subconjunto restrito das antigas) às vezes força implementações mais complexas ou estranhas do que um hard fork limpo permitiria a mesma mudança subjacente, uma troca de engenharia real.

**"Soft" não significa "menor" ou "baixas apostas".** SegWit e Taproot eram ambos forks moles e eram alterações importantes e significativas do protocolo. A distinção suave/dura é sobre o mecanismo de ativação e compatibilidade, não a magnitude da mudança em si.

## Outras leituras

- [BIP 9: bits da versão com tempo limite e atraso](https://github.com/bitcoin/bips/blob/master/bip-0009.mediawiki)
- Ver também: [SegWit](../bitcoin/segwit.md), [Taproot](../bitcoin/taproot.md)

---

[← Anterior: Forks de corrente temporária](./temporary-forks.md)
·
[Voltar às atualizações de forks e protocolos](./README.md)
·
[Próximo: Hard forks →](./hard-forks.md)
