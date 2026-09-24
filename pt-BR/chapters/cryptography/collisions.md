# Colisões de Hash

Uma colisão é duas entradas diferentes que produzem a mesma saída de hash. As colisões não são um bug, pelo princípio do buraco de pombo, uma vez que SHA-256 mapeia um espaço efetivamente infinito de possíveis entradas em uma saída fixa 2^256 possível, as colisões devem existir matematicamente. O que importa não é se existem colisões, mas se alguém pode *encontrar* Um mais rápido que a força bruta. Este capítulo cobre por que essa distinção é todo o modelo de segurança, e o que acontece quando ele quebra, usando a colisão real e documentada do SHA-1 como um estudo de caso concreto.

## A resistência à colisão do problema resolve

Considere [Árvores-merkle](./merkle-trees.md), onde um único hash raiz de 256 bits representa um conjunto inteiro de transações em um bloco. Isto só funciona como um mecanismo de segurança se for inviável para alguém construir um *diferente* conjunto de transações que produzem o mesmo hash raiz. Caso contrário, alguém poderia apresentar uma transação forjada definida para um cliente leve (ver [Clientes leves](../bitcoin/light-clients.md)) e tê-lo aceito como legítimo, uma vez que o cliente leve só verifica o hash raiz, não todas as transações subjacentes. **Resistência à colisão** é a propriedade que torna esta falsificação inviável.

## Quantas tentativas seria preciso?

Para uma função de hash com uma `n`-bit saída, encontrando *qualquer* duas entradas colidindo (não visando uma específica com antecedência) requerem, em média, aproximadamente `2^(n/2)` Tentações. Esta é uma consequência directa da **paradoxo de aniversário**: em uma sala de apenas 23 pessoas, já há uma chance melhor do que mesmo duas pessoas compartilharem um aniversário, porque você está verificando todos os pares, não procurando uma partida para um encontro específico. Para SHA-256, com `n = 256`, isto significa que um atacante precisa `2^128` tenta encontrar uma colisão aleatória. Um número tão grande que é considerado computacionalmente inviável com qualquer tecnologia previsível (para comparação, todo o esforço cumulativo da rede Bitcoin desde 2009, embora astronomicamente grande em termos absolutos, permanece muitas, muitas ordens de magnitude abaixo `2^128`).

Isto `2^(n/2)` relacionamento é porque o comprimento da saída do hash importa diretamente para a segurança: um hash de 128 bits só oferece `2^64` resistência à colisão, que está ao alcance de grandes atacantes bem financiados usando hardware moderno, uma das razões pelas quais Bitcoin, Ethereum, e praticamente todos os protocolos criptográficos modernos usam funções de hash de 256 bits (ou maiores) em vez de funções mais curtas.

## Uma colisão real documentada: SHA-1

SHA-256's antecessora-geração primo, SHA-1 (uma função de hash diferente, mais velho, 160-bit, não faz parte da família SHA-2 SHA-256 pertence), tinha um **praticamente demonstrado** Colisão publicada em fevereiro de 2017 por pesquisadores do Google e da CWI (Centrum Wiskunde & Informatica) em Amsterdã, em um ataque que eles chamaram de "Shattered". Os pesquisadores produziram dois arquivos PDF diferentes com conteúdo visível diferente que ambos hash ao mesmo valor SHA-1, usando uma estimativa de 9.223,372,036.854.775,808 (2^63) computações SHA-1. Um número que era inviável para indivíduos, mas acessível para um esforço de pesquisa bem-recurso usando recursos de computação em nuvem significativos.

Esta é a ilustração mais clara do mundo real de por que "resistente à colisão" é uma afirmação sobre o custo computacional, não impossibilidade matemática: as colisões SHA-1 sempre existiram em princípio (pelo mesmo argumento de buraco de pombo acima), mas foram consideradas seguras desde que se encontrasse uma computacionalmente inviável. Uma vez que os pesquisadores demonstraram um método prático e reprodutível para encontrar um ao alcance dos recursos do mundo real, o SHA-1 deixou de ser considerado seguro para uso crítico de segurança. Os principais navegadores e autoridades de certificação já tinham começado a deprecar os certificados SHA-1 para os certificados TLS antes do anúncio SHAttered, com base em anteriores enfraquecimentos teóricos da sua margem de segurança publicada a partir de 2005.

## O que isto significa para SHA-256

Nenhum ataque de colisão prático contra SHA-256 foi publicado a partir desta escrita. Criptanalistas encontraram fraquezas teóricas em *rodada reduzida* versões do SHA-256 (variantes com menos de 64 rodadas completas, estudadas para entender a margem de segurança do algoritmo), mas nenhum ataque chega perto de ameaçar o SHA-256 completo, padrão 64-round usado pelo Bitcoin. Esta é uma postura de segurança significativamente diferente da SHA-1 antes mesmo de SHAttered, e é monitorada continuamente pela comunidade de pesquisa criptográfica. Uma pausa genuína do SHA-256 seria significativa o suficiente para afetar diretamente o modelo de segurança do Bitcoin, que é uma das razões pelas quais pesquisadores de mineração e consenso rastreiam de perto a literatura criptoanalítica sobre o SHA-2.

## Comércio

Não há como provar matematicamente que uma função de haxixe é resistente à colisão para sempre, a segurança aqui se baseia na ausência de um ataque conhecido após escrutínio público sustentado e contraditório pela comunidade de pesquisa de criptografia, não em uma prova formal de impossibilidade. Isto significa que a segurança de qualquer função de hash específica é, em princípio, um alvo em movimento que poderia mudar com uma nova visão matemática ou um poder computacional muito maior (incluindo, especulativamente, computadores quânticos suficientemente grandes, embora os algoritmos quânticos específicos conhecidos por ameaçar a resistência à colisão, tais como versões do algoritmo de Grover, ofereçam, no máximo, uma aceleração quadrática, reduzindo a margem de segurança efetiva de SHA-256 `2^128` a aproximadamente `2^85.3` mesmo em um cenário otimista de ataque quântico, que permanece muito além do alcance prático atual ou próximo prazo).

## Conceitos errôneos comuns

**Uma colisão não é a mesma que um ataque de pré-imagem.** Uma colisão significa encontrar *qualquer dois* entradas que hash o mesmo; um ataque de preimage significa encontrar uma entrada que produz *um dado específico* Saída do hash. Estes requerem diferentes quantidades de trabalho e têm diferentes implicações práticas, ver [Resistência à Preimagem](./preimage-resistance.md) Para a distinção em pormenor.

**SHA-1 ter uma colisão prática não significa SHA-256 é igualmente fraco.** Eles são estruturalmente relacionados (tanto construções Merkle-Damgård), mas são algoritmos diferentes com diferentes contagens redondas, tamanhos internos de estados e margens de segurança. Uma fraqueza em um não é automaticamente uma fraqueza no outro.

## Outras leituras

- [Shattered: A primeira colisão para SHA-1 completo](https://shattered.io/): Equipe de pesquisa Google/CWI Amsterdam, 2017
- [NIST FIPS 180-4: Padrão de Hash seguro](https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.180-4.pdf)

---

[← Anterior: SHA-256](./sha-256.md)
·
[Voltar à Criptografia](./README.md)
·
[Próximo: Resistência à Preimagem →](./preimage-resistance.md)

