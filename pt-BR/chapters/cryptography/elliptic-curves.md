# Curvas elípticas

O capítulo anterior descreveu as chaves públicas como "uma chave privada multiplicada por um ponto gerador em uma curva" sem explicar o que isso significa. Este capítulo preenche essa lacuna: o que uma curva elíptica realmente é, o que "pontos de adição" em um significa geometricamente, e porque esta estrutura matemática específica tornou-se a escolha padrão para criptografia blockchain.

## O que é uma curva elíptica

Uma curva elíptica, na forma usada para criptografia, é o conjunto de pontos `(x, y)` satisfazer uma equação da forma:

```text
y² = x³ + ax + b  (mod p)
```

em que `a` e `b` são constantes fixas definindo a curva específica, e tudo é calculado **módulo um grande número primo `p`**, significando toda a aritmética envolve em torno de depois de alcançar `p`Da mesma forma que um relógio se enrola depois das 12. Este "modulo a prime" detalhe é o que torna a curva utilizável para criptografia: em vez de uma curva suave e contínua você poderia esboçar no papel, trabalhando módulo um grande primo produz um conjunto grande, finito, uniformemente disperso de pontos discretos sem padrão visual óbvio (a **campo finito**, na terminologia formal) embora a equação subjacente pareça álgebra ordinária.

Para a curva de Bitcoin e Ethereum, secp256k1 (coberto no próximo capítulo), a equação específica é:

```text
y² = x³ + 7  (mod p)
```

com `a = 0` e `b = 7`, uma das escolhas não triviais mais simples possíveis, e `p` um primo específico de 256 bits definido na especificação da curva.

## Adição de pontos: a operação que torna isto útil

A criptografia de curvas elípticas define uma regra específica para "adicionar" dois pontos na curva para obter um terceiro ponto também na curva. Geometricamente, sobre os números reais (antes do "modulo a prime" wraparound é aplicado, puramente como um auxílio de visualização), a regra é: desenhar uma linha reta através dos dois pontos que você está adicionando; essa linha cruza a curva em exatamente mais um ponto (porque a equação da curva é cúbica); refletir esse terceiro ponto através do eixo x, e que ponto refletido é a soma.

```text
      y
      │      P
      │     ╱ ╲
      │    ╱   ╲
──────┼───╱─────╲──── x
      │  ╱       ╲
      │ Q          
      │             ╲
      │              R'  (line through P, Q hits curve here)
      │              │
      │              ▼
      │              R  = P + Q  (R' reflected across x-axis)
```

Adicionar um ponto a si próprio (`P + P`, usado na computação `k × G` para uma chave privada `k`) usa uma regra relacionada baseada na linha tangente naquele ponto em vez de uma linha através de dois pontos distintos. Ambas as regras reduzem para fórmulas algébricas explícitas envolvendo apenas adição, subtração, multiplicação e inversão modular, nenhum desenho geométrico real acontece em uma implementação real; a geometria é uma maneira de entender *Porquê?* as fórmulas algébricas são definidas como são.

## Multiplicação escalar e o problema difícil

"Multiplying" um ponto `P` por um inteiro `k` (escrito `k × P` ou `kP`) significa adicionar `P` para si mesmo `k` vezes usando a regra de adição de pontos acima: `2P = P + P`, `3P = 2P + P`E assim por diante. Computando isso eficientemente para muito grande `k` (256-bit chaves privadas são astronomicamente grandes números) usa uma técnica chamada **duplo- e- adicionar**, que calcula `kP` em aproximadamente `log2(k)` operações de redução de pontos e de adição de pontos em vez de `k` Adições separadas. Para um 256-bit `k`, isto significa cerca de 256 operações em vez de uma inviável 2^256 operações, que é o que torna a computação uma chave pública de uma chave privada rápido na prática.

A **problema de logaritmo discreto da curva elíptica (ECDLP)** é a pergunta inversa: dado `P` e `Q = kP`, encontrar `k`Nenhum algoritmo eficiente para isso é conhecido por uma curva bem escolhida, os ataques clássicos mais conhecidos (como o algoritmo de rho de Pollard) levam tempo aproximadamente proporcional à raiz quadrada da ordem da curva, que para ordem de secp256k1 de aproximadamente 256 bits significa aproximadamente `2^128` Operações consideradas inviáveis com quaisquer recursos informáticos previsíveis. Esta assimetria (rápido`k → kP`), inviável para trás (`kP → k`) é toda a fundação de segurança descrita em geral em [Criptografia de Chave Pública](./public-key-cryptography.md).

## Por que curvas elípticas em vez de, digamos, RSA

A criptografia de curvas elípticas alcança segurança comparável à RSA (que se baseia na dificuldade de fatorar grandes números, não o ECDLP) com chaves muito menores: uma chave de curvas elípticas de 256 bits fornece segurança aproximadamente comparável a uma chave RSA de 3072 bits, de acordo com comparações de nível de segurança amplamente citadas de NIST e outros organismos de normas. Chaves menores significam assinaturas menores, menos largura de banda, e menos armazenamento, uma vantagem significativa, agravante para um sistema como Bitcoin, onde milhões de chaves públicas e assinaturas acumulam-se em dados de bloco permanentes, com restrição de armazenamento (ver [Tamanho / Peso da transação](../bitcoin/fees.md)).

## Comércio

A compactação da criptografia de curvas elípticas vem ao custo da complexidade de implementação: as fórmulas modulares aritméticas e de adição de pontos têm mais casos de borda para acertar do que a exponenciação modular mais simples da RSA, e erros de implementação sutis (manuseamento incorreto de casos de bordas como o ponto no infinito, ou operações não constantes que vazam informações de tempo) historicamente causaram vulnerabilidades reais em bibliotecas de software específicas, mesmo que a matemática subjacente permaneça som. É por isso que se utiliza bibliotecas auditadas e amplamente revistas (como [`@noble/curves`](https://github.com/paulmillr/noble-curves), usado em todos os exemplos deste livro) em vez de implementar a aritmética curva do zero é padrão, prática sonora para o software do mundo real.

## Conceitos errôneos comuns

**Uma curva elíptica, neste contexto criptográfico, não é uma linha curva suave que você desenharia no papel.** Porque toda a aritmética é feita modulo um primo grande, o conjunto real de pontos válidos é um conjunto grande, discreto, aparentemente espalhado de pares de coordenadas. A imagem de curva suave é uma ajuda de visualização para entender a origem geométrica da regra de adição de pontos, não uma descrição de como a versão real de campo finito se parece.

**"Elíptica" não se refere a uma elipse.** O nome é uma reserva histórica do estudo de integrais elípticas, uma área não relacionada da matemática do século XIX que envolveu equações de uma forma cúbica semelhante. As curvas elípticas não são elipses e não têm relação geométrica direta com elas.

## Outras leituras

- [SEC 2: Parâmetros recomendados de domínio da curva elíptica](https://www.secg.org/sec2-v2.pdf)
- [Um Primer (Relativamente Fácil de Entender) na Criptografia de Curve Elíptica](https://arstechnica.com/information-technology/2013/10/a-relatively-easy-to-understand-primer-on-elliptic-curve-cryptography/): Cloudflare/Ars Technica, 2013

---

[← Anterior: Chaves privadas e públicas](./keys.md)
·
[Voltar à Criptografia](./README.md)
·
[Próximo: secp256k1 →](./secp256k1.md)
