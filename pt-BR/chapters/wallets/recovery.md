# Chave de backup e recuperação

Este capítulo final da seção de Carteiras reúne uma disciplina prática de tudo o que foi coberto até agora: o que realmente precisa ser apoiado, o que acontece quando não é, e os modos de falha documentados específicos que valem a pena planejar.

## O que realmente precisa ser apoiado

Para uma carteira HD de uma única semente (ver [Carteiras HD](./hd-wallets.md)), em apoio da [frase de semente](./seed-phrases.md) é suficiente para recuperar todas as chaves que a carteira já tenha derivado ou irá derivar. Este é o ponto inteiro da estrutura HD. Mas este livro tem sinalizado várias informações adicionais, fáceis de ignorar, que são igualmente necessárias para um *completo* Recuperação em situações específicas:

- **A frase- senha**, se foi utilizado (ver [BIP-39](./bip-39.md#a-frase-senha-opcional)), sem ele, a frase semente sozinho recupera uma carteira diferente, vazia, sem indicação de que nada está errado.
- **A convenção específica do caminho de derivação** utilizado (ver [Caminhos de Derivação](./derivation-paths.md#por-que-carteiras-diferentes-às-vezes-mostram-endereços-diferentes-para-a-mesma-semente)), se não for padrão ou a carteira não detectar automaticamente.
- **A configuração multisig completa**: que chaves públicas específicas, e que limiar, para uma configuração multisig (ver [Multisig](./multisig.md#conceitos-errôneos-comuns)), uma vez que ter backups de chaves individuais suficientes é inútil sem saber como eles combinam.

## A tensão central: redundância versus exposição

A estratégia de backup é uma troca genuína e inevitável: uma única cópia de backup, armazenada em um único local, corre o risco de perda total se esse único local for destruído (fogo, inundação, simples deslocalização) ou o próprio backup se degrada (decaimento de papel, desvanecimento de tinta). Várias cópias em vários locais reduzem esse risco, mas cada cópia adicional também é um local adicional onde o backup poderia ser encontrado e roubado, aumentando diretamente a superfície de ataque para o cenário exato catastrófico, completa perda de fundos que existe para prevenir. Não há um único número objetivamente correto de cópias de backup ou conjunto de locais. É uma chamada de julgamento equilibrando esses dois riscos específicos, opostos, informados por uma avaliação realista das ameaças que um indivíduo enfrenta e do valor em jogo.

## Técnicas práticas para gerir esta tensão

- **Distribuição geográfica**: armazenar cópias em locais fisicamente separados (um cofre de casa, um cofre de banco, a localização de um membro da família confiável) reduz a chance de um único desastre localizado destruir todas as cópias, ao custo de precisar confiar ou proteger vários locais.
- **Placas de apoio de metal**: gravação ou estampar palavras de semente em metal (em vez de escrever em papel) especificamente aborda a durabilidade física metade do risco (resistente ao fogo, água e degradação geral em formas de papel não é) sem abordar o roubo / exposição metade em tudo.
- **Partilha secreta de Shamir (SLIP- 39)**: divide uma semente em várias ações, onde apenas um número limite de ações (nem todas elas) é necessário para a recuperação, o que significa que nenhum compromisso único de ações roubadas ou perdidas ou é mesmo suficiente para recuperar a carteira, abordando tanto o problema de redundância (perdendo uma ação não perde acesso) e o problema de exposição (encontrando uma ação não concede acesso) simultaneamente, ao custo de procedimentos de configuração e recuperação significativamente mais complexos do que uma única frase de semente.
- **Multisig** (ver [Multisig](./multisig.md)), como uma alternativa para dividir uma única semente, distribuindo a própria autoridade de despesa real através de várias chaves independentes em vez de dividir o backup de uma chave.

## Conceitos errôneos comuns

**Um backup que nunca foi testado não é um backup verificado.** Um modo de falha genuinamente comum e evitável está descobrindo (apenas no momento em que a recuperação é realmente necessária, muitas vezes sob estresse) que um backup foi gravado incorretamente (uma palavra erroneamente digitada, uma página em falta, uma foto que não capturou totalmente todas as palavras) e não funciona de fato; periodicamente testando a recuperação de um backup (restaurando-o em um dispositivo de reposição ou carteira de software, verificando os endereços resultantes correspondem ao esperado, sem mover fundos reais através dessa configuração de teste desnecessariamente) é uma garantia significativamente diferente e mais forte do que simplesmente confiar que um backup foi feito corretamente.

**Recuperação de informações não é "seguro" simplesmente porque é dividido ou obscurecido de alguma forma informal, ad-hoc** (escrever metade das palavras em uma página e metade em outra, por exemplo, sem um esquema formalmente verificado como SLIP-39). Os esquemas informais de divisão são fáceis de obter sutilmente errados de formas que não protegem contra roubos (se a divisão é sustentável ou uma metade vaza informação suficiente) ou, mais comumente, tornam a recuperação legítima mais difícil ou impossível se qualquer peça é perdida, sem fornecer os tradeoffs de segurança deliberados testados, um esquema real como o Compartilhamento Secreto de Shamir é projetado especificamente para fornecer.

## Outras leituras

- [SLIP-39: Shamir's Secret-Sharing for Mnemonic Codes](https://github.com/satoshilabs/slips/blob/master/slip-0039.md)
- Ver também: [Frases de sementes](./seed-phrases.md), [Multisig](./multisig.md), [Custodial vs Carteiras Não- Personalizadas](./custody.md)

---

[← Anterior: Carteira de custódia vs Carteiras não personalizadas](./custody.md)
·
[Voltar para Wallets e Key Management](./README.md)
·
[Próximo: O problema de escala →](../bitcoin-scaling/README.md)
