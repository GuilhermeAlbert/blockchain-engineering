# Por que o dinheiro digital era difícil

O dinheiro físico tem uma propriedade que é fácil de ignorar porque não requer engenharia: quando se entrega uma nota a alguém, já não a tem. A transferência é física, não lógica. A informação digital não funciona assim. Copiar um arquivo não o remove da origem. Qualquer pessoa que tente construir "digital dinheiro" (dinheiro que se move tão facilmente como um arquivo, mas se comporta como uma nota) corre para este descompasso imediatamente.

Este capítulo explica o problema técnico específico que se colocava entre a invenção da criptografia de chave pública (1976) e o lançamento de Bitcoin (2009): trinta e três anos durante os quais múltiplos criptógrafos construíram sistemas reais de trabalho para o dinheiro digital e nenhum deles produziu algo que funcionasse sem uma empresa ou banco no meio. Entender por que eles falharam é a maneira mais rápida de entender o que Bitcoin realmente mudou.

## O problema

### Copiar não é gastar

Representar uma unidade de dinheiro como uma cadeia de bits, um número de série, uma assinatura, qualquer coisa. A corda pode ser copiada a zero custo marginal e fidelidade perfeita. Se Alice envia essa string para Bob como pagamento, nada impede Alice de também enviar a mesma string para Carol, ou de manter uma cópia para si mesma. Este é o **problema de dupla despesa**: num esquema de dinheiro digital ingénuo, gastar uma moeda digital não a consome.

Com dinheiro físico, o dobro de gastos é impedido fisicamente. Com uma conta bancária, a dupla despesa é impedida pelo banco: ele mantém um livro de contabilidade, verifica que o saldo de Alice cobre o pagamento, e o decrementa. O banco é um terceiro confiável que resolve reivindicações conflitantes, sendo a única autoridade que todos consultam.

### O terceiro de confiança

Cada sistema de pagamento eletrônico pré-Bitcoin (cartões de crédito, PayPal, transferências bancárias e os esquemas de caixa digital criptográficos discutidos nesta seção) resolveu a dupla despesa nomeando uma autoridade para manter o registro autorizado. Isso funciona, e é por isso que os pagamentos eletrônicos existiam décadas antes do Bitcoin. Mas vem com custos específicos que os cipherpunks (ver [O Movimento Cypherpunk](./cypherpunks.md)) considerado fundamental, não incidental:

- **A autoridade pode congelar ou reverter operações.** Um processador de pagamento pode bloquear um comerciante, um banco pode congelar uma conta, um governo pode obrigar qualquer um deles a fazê-lo.
- **A autoridade pode identificar as partes.** Mesmo que um esquema use criptografia para esconder o valor do pagamento ou o histórico da moeda, a autoridade que limpa a transação geralmente sabe quem está pagando quem, porque tem que autenticar os titulares de conta para evitar fraudes.
- **A autoridade é um único ponto de fracasso.** Se ele ficar offline, for hackeado ou desligado, o sistema de pagamento para de funcionar ou o registro de quem possui o que pode ser perdido ou alterado.
- **A autoridade deve ser confiável para não emitir dinheiro.** Nada impede o operador de um sistema de caixa digital centralizado de se creditar com saldos que não ganhou, a não ser uma auditoria que ninguém pode forçar.

O whitepaper de Satoshi Nakamoto abre nomeando este custo diretamente:

> "Commerce on the Internet has come to rely almost exclusively on financial institutions serving as trusted third parties to process electronic payments. While the system works well enough for most transactions, it still suffers from the inherent weaknesses of the trust based model."
> Satoshi Nakamoto, [Bitcoin: A Peer-to-Peer Electronic Cash System](https://bitcoin.org/bitcoin.pdf), Section 1

A questão da engenharia que os antecessores deste capítulo estavam perseguindo, reafirmou precisamente: **Você pode evitar a dupla despesa sem nomear um partido confiável para manter o livro de registros?**

## Como sistemas anteriores tentaram resolvê-lo

Os criptografistas tinham duas estratégias amplas antes de Bitcoin, e ambos valem a pena entender porque o design de Bitcoin é mais fácil de entender como uma combinação específica de ideias já em circulação, não uma descoberta do nada.

### Estratégia 1: Cegar as moedas, confiar no banco

DigiCash de David Chaum (ver [David Chaum e DigiCash](./digicash.md)) utilizado **assinaturas cegas**: um banco poderia assinar criptograficamente uma moeda digital sem ver seu número de série, o que deu aos usuários dinheiro digital não-linkável, que preserva a privacidade. Mas o banco ainda manteve o livro de contabilidade e ainda tinha que ser confiável para verificar se a dupla despesa no momento da redenção. A inovação de Chaum resolveu *privacidade* problema dentro do modelo de terceiros confiável; ele não removeu o terceiro confiável.

### Estratégia 2: Faça do próprio registro a autoridade, mas quem o guarda?

Uma linha diferente de trabalho cypherpunk perguntou se um *rede* dos participantes, em vez de uma única empresa, poderia manter o livro de contabilidade. Wei Dai's [b-dinheiro](./b-money.md) (1998) e Nick Szabo [Bit Gold](./bit-gold.md) (1998) ambos os regimes descentralizados propostos, em que um conjunto distribuído de partes registou quem possuía o quê, utilizando prova criptográfica de trabalho para tornar as novas unidades dispendiosas de criar. Ambas eram propostas, não sistemas implantados, e ambas, pelas descrições de seus próprios autores, necessitavam de algo para manter as cópias dos participantes do livro de registros sincronizados e necessitavam de uma forma de decidir qual versão da história contada quando os participantes discordassem. Nenhum deles resolveu totalmente esse problema de coordenação de uma forma que foi publicada e implementada.

Este segundo problema mais difícil (**obter um conjunto descentralizado de partes mutuamente desconfiadas para chegar a acordo sobre uma ordem única e evidente de eventos sem um coordenador central**) é um problema de sistemas distribuídos, não um problema de criptografia. Está coberto em profundidade. [Sistemas distribuídos](../distributed-systems/README.md), especialmente [o problema dos generais bizantinos](../distributed-systems/byzantine-generals.md)Cryptography sozinho (hashes, assinaturas) pode provar que um registro específico não foi adulterado. Não pode, por si só, dizer dois nós qual de duas histórias conflitantes acreditar.

## O que o Bitcoin realmente adicionou

O whitepaper de Bitcoin é explícito que está combinando peças existentes, não introduzindo todas elas do zero. A sua contribuição central é uma resposta específica para o problema de encomenda: usar prova de trabalho (uma ideia já utilizada não monetáriamente em [Hashcash](./hashcash.md)) não apenas para tornar a falsificação cara, mas como um mecanismo de votação onde a influência sobre o registro é proporcional ao esforço computacional em vez do número de identidades que um participante controla. Isto é o que derrota [Ataques de Sybil](../distributed-systems/sybil-attacks.md). Criar mil identidades falsas não o ajuda a superar a rede se os votos forem contados em hashes computados, não em contas.

Os capítulos que se seguem nesta seção traçam o trabalho anterior específico (DigiCash, Hashcash, b-dinheiro, Bit Gold) e então mostram exatamente como o whitepaper de Satoshi os combinou em um sistema que nunca havia sido implantado antes: dinheiro digital descentralizado sem autoridade emissora, garantido pelo custo econômico em vez de aplicação legal.

## Conceitos errôneos comuns

**"O Bitcoin inventou o dinheiro digital."** Dinheiro digital (valor representado e transferido como dados) existia muito antes do Bitcoin, em bancos de dados bancários, saldos PayPal e DigiCash. O que o Bitcoin introduziu foi uma forma de evitar a dupla despesa de valor digital *sem* Um partido que pode alterar unilateralmente o livro.

**"O Bitcoin inventou a criptografia ou o hashing de chaves públicas."** Ambos existiam décadas antes (ver [Criptografia](../cryptography/README.md)). Bitcoin é uma aplicação de primitivos criptográficos existentes combinada com um novo mecanismo de consenso.

**"O problema de duas despesas não foi resolvido antes do Bitcoin."** Foi resolvido repetidamente (por cada banco, rede de cartões e processador de pagamento) usando intermediários confiáveis. O que não foi resolvido foi prevenir a dupla-pensão *sem* Uma.

## Outras leituras

- [Bitcoin: Um sistema de caixa eletrônico de pares a pares](https://bitcoin.org/bitcoin.pdf): Satoshi Nakamoto, Seção 1
- [b-dinheiro](http://www.weidai.com/bmoney.txt): Wei Dai, 1998
- [Bit Gold](https://unenumerated.blogspot.com/2005/12/bit-gold.html): Nick Szabo, 2005 retrospectiva de uma ideia de 1998
- [Chaum, D. (1983). Assinaturas cegas para pagamentos indetectáveis](https://www.chaum.com/publications/Chaum-blind-signatures.PDF)

---

[Voltar às Origens](./README.md)
·
[Próximo: O Movimento Cypherpunk →](./cypherpunks.md)
