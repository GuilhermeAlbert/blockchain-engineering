# Assinaturas digitais

Uma assinatura digital prova que alguém que possui uma chave privada específica autorizou uma mensagem específica, de uma forma que qualquer pessoa que possua a chave pública correspondente pode verificar de forma independente, sem que o assinante revele a chave privada. Este é o mecanismo que autoriza cada transação Bitcoin e Ethereum. Este capítulo abrange o conceito geral e as suas propriedades exigidas antes dos dois capítulos seguintes abrangerem os dois regimes específicos de assinatura que o Bitcoin utiliza efectivamente: [ECDSA](./ecdsa.md) e [Assinaturas Schnorr](./schnorr.md).

## O problema

[Transações de Bitcoin](../bitcoin/transactions.md) precisa provar que quem está gastando um determinado conjunto de moedas está realmente autorizado a fazê-lo, especificamente, que eles controlam a chave privada associada ao endereço para o qual essas moedas foram enviadas. Fazer isso ingenuamente (como enviar a própria chave privada como prova) seria catastrófico: qualquer um que observasse essa transação poderia então usar a mesma chave privada para gastar desse endereço novamente. Um esquema de assinatura digital resolve isso, permitindo que o titular da chave privada prove o controle da chave sem nunca expô-la.

## As três propriedades necessárias

Um esquema de assinatura digital deve fornecer:

- **Autenticação**: uma assinatura válida só pode ter sido produzida por alguém com acesso à chave privada. Ninguém sem a chave deve ser capaz de forjar uma assinatura que verifique com sucesso, mesmo depois de ver muitas outras assinaturas válidas da mesma chave.
- **Não repudicação**: uma vez que alguém assinou uma mensagem, eles não podem negar credivelmente ter feito isso, uma vez que a assinatura só poderia ter vindo de sua chave privada. Em um contexto legal ou contratual, isso faz com que as assinaturas digitais suportem evidências de consentimento, embora este livro se concentre em seu papel técnico na autorização de transações e não em sua posição legal.
- **Integridade**: a assinatura está ligada especificamente à mensagem exata assinada. Se mesmo um único bit da mensagem assinada mudar, a assinatura não mais verifica. Isto é o que faz uma assinatura sobre uma transação do Bitcoin proteger todo o conteúdo da transação (montantes, destinatários, e assim por diante), não apenas provar "esta chave foi usada em algum momento".

## A forma geral de um esquema de assinatura

Cada esquema de assinatura digital (ECDSA, Schnorr, RSA-based e outros) fornece três algoritmos:

1. **Geração de chaves**: produz um par de chaves privado/público, conforme [Chaves particulares e públicas](./keys.md).
2. **Assinatura**: pega uma chave privada e uma mensagem (na prática, um hash da mensagem. Veja abaixo) e produz uma assinatura.
3. **Verificação**: pega uma chave pública, uma mensagem e uma assinatura, e retorna verdadeiro ou falso. Se a assinatura é válida para essa mensagem específica e chave pública.

## Por que você assina um haxixe, não a mensagem crua

Na prática, nenhum esquema de assinatura assina uma mensagem arbitrariamente grande diretamente. A mensagem é executada pela primeira vez através de uma função de hash criptográfica (ver [Funções do Hash](./hashes.md)), e a assinatura é calculada sobre o hash de tamanho fixo resultante. Isso tem dois benefícios: torna a assinatura eficiente, independentemente do tamanho da mensagem (assinar um hash de 32-bytes leva o mesmo tempo se a mensagem original era uma palavra ou um gigabyte), e depende da resistência de colisão da função hash (ver [Colisões de Hash](./collisions.md)) para garantir que uma assinatura válida para o hash de uma mensagem não pode ser reinterpretada como válida para outra mensagem diferente que produza o mesmo hash. É por isso que as propriedades de segurança da própria função de hash importam diretamente para a segurança geral de qualquer coisa construída em cima dela. Um esquema de assinatura é tão forte quanto o mais fraco do algoritmo de assinatura e a função hash alimentando-o.

## Maleabilidade: uma sutileza que vale a pena nomear aqui

Um esquema de assinatura pode ser **maleável** se, dado uma assinatura válida para uma mensagem, é possível calcular uma *diferente* assinatura válida para a mesma mensagem sem conhecer a chave privada. Isso soa inofensivo (a mensagem e sua autorização não mudaram) mas causou um problema real e documentado para o Bitcoin: porque os IDs iniciais da transação do Bitcoin foram calculados por hashing a transação inteira *incluindo* suas assinaturas, um atacante poderia levar uma transmissão, transação não confirmada, produzir uma assinatura diferente mas igualmente válida para o mesmo gasto, retransmiti-la com um ID de transação resultante diferente, e potencialmente obter a versão modificada confirmada em vez do original. Isto é... **maleabilidade da transação**, e os sistemas complicados (incluindo os projetos de canais de pagamento da Lightning Network) que referenciavam transações por seu ID antes da confirmação. [SegWit](../bitcoin/segwit.md) resolveu este problema específico movendo dados de assinatura para fora da parte da transação usada para calcular seu ID. Esta situação está totalmente coberta [SegWit](../bitcoin/segwit.md); é mencionado aqui porque maleabilidade de assinatura é uma propriedade do esquema de assinatura subjacente, não um detalhe de formato de transação, e compreendê-lo requer entender o que um esquema de assinatura realmente garante (e não) em primeiro lugar.

## Comércio

As assinaturas digitais substituem um mecanismo de confiança físico ou burocrático (um notário, uma assinatura física testemunhada, um banco que verifica a sua identidade) por um mecanismo puramente matemático, que elimina a necessidade de qualquer terceiro, mas desloca todo o fardo da segurança para a gestão de chaves privadas: não há recurso, nenhum processo de recuperação "esqueceu a minha assinatura" e nenhuma instituição que possa reverter uma transação assinada se uma chave privada for roubada ou perdida (ver [Roubo de Chave Privada](../security/private-key-theft.md) e [Chave de backup e recuperação](../wallets/recovery.md)). Trata-se de um compromisso genuíno e significativo, não de uma melhoria rigorosa em relação aos sistemas baseados na confiança. Ela negocia o recurso institucional para a certeza criptográfica e auto-soberania.

## Conceitos errôneos comuns

**Uma assinatura digital não criptografa nem oculta a mensagem assinada.** Dados de transação do Bitcoin, incluindo suas assinaturas, são totalmente públicos na blockchain. Uma assinatura prova autorização, não fornece confidencialidade. Confuso de assinatura com criptografia é um erro comum, mas consequente; veja [Criptografia de Chave Pública](./public-key-cryptography.md#como-funciona-dois-casos-principais-de-uso) para a distinção.

**Assinar a mesma mensagem duas vezes com a mesma chave não produz necessariamente a assinatura idêntica**, dependendo do regime e da sua abordagem de não geração. Este é um detalhe de design deliberado coberto em profundidade, incluindo uma falha de segurança histórica grave que resultou de equivocá-lo, em [ECDSA](./ecdsa.md#reutilização-do-nonce-o-erro-de-implementação-mais-conseqüente).

## Outras leituras

- [Manual de Criptografia Aplicada, Capítulo 11: Assinaturas digitais](https://cacr.uwaterloo.ca/hac/about/chap11.pdf): Menezes, van Oorschot, Vanstone (texto de referência livre e amplamente citado)

---

[← Anterior: secp256k1](./secp256k1.md)
·
[Voltar à Criptografia](./README.md)
·
[Próximo: ECDSA →](./ecdsa.md)
