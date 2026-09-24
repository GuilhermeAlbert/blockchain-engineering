# Criptografia de Chave Pública

Criptografia de chave pública (também chamada de criptografia assimétrica) usa um par matematicamente relacionado de chaves (um mantido em segredo, um compartilhado abertamente) em vez de um único segredo compartilhado. Este capítulo cobre o conceito em termos gerais antes de os próximos capítulos obter específicos sobre a matemática exata (curvas elípticas) e caso de uso exato (assinaturas digitais) Bitcoin e Ethereum dependem.

## O problema

**Criptografia simétrica** (onde a mesma chave secreta bloqueia e desbloqueia dados) tem um problema de distribuição: antes que duas partes possam se comunicar com segurança, elas precisam de alguma forma já compartilhar uma chave secreta, que por si só tem que ser transmitida por algum canal. Se esse canal já não estiver seguro, você tem um problema de frango e ovo: você precisa de um canal seguro para estabelecer o segredo que o deixaria criar um canal seguro.

Criptografia de chave pública, desenvolvida independentemente por Whitfield Diffie e Martin Hellman (publicado em 1976) e, como documentos posteriormente desclassificados revelados, mais cedo e separadamente dentro da inteligência britânica (GCHQ) por James Ellis, Clifford Cocks, e Malcolm Williamson no início dos anos 1970, resolve isso usando duas chaves matematicamente ligadas em vez de uma: a **chave pública**, que pode ser compartilhado abertamente com qualquer um, e um **chave privada**, que deve ser mantido em segredo pelo seu proprietário. A relação matemática entre eles é projetada de modo que as operações realizadas com uma chave só podem ser revertidas ou verificadas usando a outra, e, criticamente, saber que a chave pública não permite derivar a chave privada, pelo menos não com qualquer método prático conhecido (ver [Curvas elípticas](./elliptic-curves.md) para o problema matemático duro específico que se baseia para Bitcoin e Ethereum).

## Como funciona: dois casos principais de uso

### Criptografia (não é o uso primário neste livro)

Uma aplicação de chave pública: qualquer pessoa pode criptografar uma mensagem usando a chave pública do destinatário, mas apenas o titular da chave privada correspondente pode decifrá-la. É assim que, por exemplo, o HTTPS estabelece conexões seguras. **Este livro foca muito menos neste caso de uso** (As transações Bitcoin e Ethereum não são criptografadas, são transmitidas em aberto (ver [Privacidade](../society/privacy.md)) e muito mais sobre o segundo caso de uso abaixo.

### Assinaturas digitais (o uso principal neste livro)

A operação reversa: o titular da chave privada pode produzir um **assinatura** sobre uma mensagem, e qualquer pessoa que tenha a chave pública correspondente pode verificar que a assinatura foi produzida por alguém que controla a chave privada, sem que o verificador precise da chave privada em si. Este é o mecanismo que autoriza transações Bitcoin e transações Ethereum, provando o direito de gastar fundos sem nunca transmitir a chave privada através da rede. Esta é coberta na íntegra em [Assinaturas digitais](./digital-signatures.md), [ECDSA](./ecdsa.md), e [Assinaturas Schnorr](./schnorr.md).

## Por que "assimétrico" é o termo preciso

O par de chaves é assimétrico na capacidade, não apenas em segredo: a chave privada pode fazer coisas (sinal, decodificação) que a chave pública não pode, enquanto a chave pública pode fazer coisas (verificar, criptografar) que não revelam nada sobre a chave privada. Isto é diferente de, digamos, um bloqueio físico e chave, onde possuir a chave lhe dá plena capacidade e não há nenhuma "metade pública" significativa, a estrutura matemática da criptografia de chave pública especificamente permite que uma metade seja compartilhada sem comprometer a outra, que não tem análogo físico direto.

## O problema duro por baixo

Cada sistema de chave pública baseia-se em um problema matemático específico que é fácil de calcular em uma direção e acredita-se ser inviável para reverter. Bitcoin e Ethereum ambos usam **Criptografia da curva elíptica**, que se baseia no **problema de logaritmo discreto da curva elíptica**: dado um ponto `P` em uma curva e o resultado da adição `P` para si mesmo `k` vezes (escritas `k·P`), é computacionalmente inviável recuperar `k` mesmo que a computação `k·P` de `k` é rápido. Esta assimetria (rápido em uma direção, inviável na outra) é toda a base de segurança das chaves cobertas em [Chaves particulares e públicas](./keys.md) e [Curvas elípticas](./elliptic-curves.md). Sistemas mais antigos, incluindo RSA, dependem de um problema duro diferente (fatorização integrada: multiplicar dois primos grandes é rápido, mas fatorando seu produto de volta para os primos originais acredita-se ser inviável), que não é a abordagem Bitcoin ou uso Ethereum, embora ele permaneça comum em outros contextos, incluindo grande parte da infraestrutura subjacente HTTPS.

## Comércio

A criptografia de chave pública resolve o problema de distribuição de chaves que a criptografia simétrica enfrenta, mas a um custo computacional real: operações de chave pública (assinando, verificando, a multiplicação do ponto de curva elíptica subjacente) são substancialmente mais lentas do que as operações de criptografia simétrica, razão pela qual a maioria dos sistemas seguros do mundo real, incluindo TLS, usam criptografia de chave pública apenas para estabelecer uma conexão segura inicial e uma chave simétrica compartilhada, em seguida, mudar para criptografia simétrica mais rápida para a maior parte dos dados. Bitcoin e Ethereum usam criptografia de chave pública especificamente para sua propriedade de assinatura (aprovação de autorização) em vez de para criptografia em massa, já que os dados de transação em si são públicos, não confidenciais.

## Conceitos errôneos comuns

**Uma chave pública não é a mesma que um endereço.** Em Bitcoin, um endereço é um hashed, derivado codificado de uma chave pública (ver [Endereços](../wallets/addresses.md)), não a chave pública em si. Este passo extra dá alguns benefícios práticos abrangidos nesse capítulo.

**Perder sua chave privada não é o mesmo modo de falha que alguém aprendendo sua chave pública.** Chaves públicas são destinadas a ser compartilhadas; chaves privadas nunca devem ser compartilhadas. Confundir os dois, ou tratar acidentalmente uma chave privada como segura para exibir, é um dos erros mais consequenciais possíveis em todo este campo, veja [Roubo de Chave Privada](../security/private-key-theft.md).

## Outras leituras

- [Novas Instruções em Criptografia](https://ee.stanford.edu/~hellman/publications/24.pdf): Whitfield Diffie e Martin Hellman, 1976
- [James Ellis](https://www.gchq.gov.uk/person/james-ellis): O relato de Ellis, Clifford Cocks e Malcolm Williamson sobre criptografia de chave pública

---

[← Anterior: Resistência à Preimagem](./preimage-resistance.md)
·
[Voltar à Criptografia](./README.md)
·
[Próximo: Chaves públicas e privadas →](./keys.md)

