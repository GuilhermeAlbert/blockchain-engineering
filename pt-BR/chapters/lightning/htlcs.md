# HTLCs

Um Contrato Hashed Timelock (HTLC) é o que permite uma rota de pagamento Lightning com segurança através de vários canais não relacionados (através de pessoas com quem você não tem relação direta, nenhum canal direto com, e nenhuma razão para confiar) sem que nenhum deles seja capaz de roubar o pagamento ao longo do caminho. Este é o mecanismo único que transforma uma coleção de dois partidos independentes [canais de pagamento](./payment-channels.md) em um pagamento real, utilizável *rede*.

## O problema: dirigir através de estranhos

Suponha que Alice queira pagar Carol, mas não tem nenhum canal direto com ela, apenas um canal com Bob, que por acaso tem um canal com Carol. Alice poderia pedir a Bob para simplesmente encaminhar o pagamento, mas isso requer que ele não pegue o dinheiro de Alice e nunca realmente pague Carol. Um HTLC remove totalmente esse requisito de confiança, usando a mesma ideia de compromisso baseada em hash introduzida em [Compromissos criptográficos](../cryptography/commitments.md), aplicado especificamente aos pagamentos condicionalmente encaminhados.

## Como funciona, passo a passo

1. **Carol gera um segredo**: um valor aleatório, chamá-lo `R` (a "preimagem"), e dá a Alice o seu haxixe, `H = SHA256(R)`, através da fatura Lightning Alice está pagando (ver [Relâmpagos](./README.md#relâmpagos-brevemente)). Carol não revela `R` Mesmo assim.
2. **Alice cria um HTLC com Bob**"Eu vou pagar-lhe este montante, **se e somente se** Mostre-me a preimagem. `R` tal que `SHA256(R) = H`, dentro de algum prazo. Caso contrário, após esse prazo expirar, eu recebo meu dinheiro de volta."
3. **Bob, querendo ganhar sua taxa de roteamento, estende um equivalente HTLC para Carol**: o mesmo hash `H`, a mesma condição, mas com *menor* limite de tempo do que o que Alice lhe deu (este detalhe de tempo importa, coberto abaixo).
4. **Carol, que realmente sabe `R`** (ela o gerou), revela `R` ao Bob para reclamar o HTLC que ele lhe ofereceu.
5. **Bob agora sabe `R`** também (Carol teve que revelá-lo para reclamar o pagamento dele), e usa-lo para reivindicar o HTLC Alice estendeu a ele.
6. **O pagamento mudou de Alice para Bob para Carol**, atomicamente, ou toda a cadeia de HTLCs resolve (todos são pagos, em sequência, usando o mesmo segredo revelado), ou nada disso acontece.

```text
Alice ──HTLC(H, timeout=T1)──► Bob ──HTLC(H, timeout=T2)──► Carol
                                                    (T2 < T1)

Carol reveals R (knows it: she generated it)
         │
         ▼
Bob learns R, claims Alice's HTLC using it
         │
         ▼
Alice's payment is now, provably, Bob's — and Bob has already
paid Carol using the same secret
```

## Por que os timeouts devem diminuir ao longo da rota

Note o detalhe do passo 3: Bob HTLC para Carol tem um **menor** Tempo para o Bob. Isto não é arbitrário. É essencial para a segurança do mecanismo. Se a Carol foi lenta a reclamar, ou se algo correu mal, o Bob precisa de tempo suficiente. *após* sua própria HTLC para Carol expira, para ainda reivindicar seu HTLC de Alice antes *que* Um também expira. Cada salto ao longo de uma rota precisa de um tempo limite estritamente decrescente, dando a cada nó intermediário uma janela segura para enviar com sucesso o segredo para trás ou recuperar com segurança seus próprios fundos se o pagamento falhar a meio caminho, sem nunca ser pego em uma posição onde eles pagaram o próximo salto, mas não pode mais reclamar do anterior.

## O que acontece se o pagamento falhar a meio

Se Carol nunca revelar `R` (ela não quer o pagamento, a fatura expirou, ou qualquer outra coisa dá errado), nem o HTLC de Bob nem Alice nunca é reivindicado. Uma vez que o respectivo tempo limite de cada HTLC passa, os fundos bloqueados simplesmente retornam a quem os ofereceu originalmente (Bob recebe as costas do HTLC que ofereceu Carol; Alice recebe as dela de volta do HTLC que ofereceu Bob). Ninguém perde fundos de uma rota falhada. O pior resultado é um atraso até que o tempo limite relevante expira, não uma perda.

## Por que nós intermediários não podem roubar o pagamento

Este é todo o ponto do mecanismo, vale a pena afirmar explicitamente: **Bob nunca pode reivindicar HTLC de Alice sem também ser obrigado a já ter pago (ou estar prestes a pagar) Carol**, porque alegar requer revelar `R`, e a única maneira que Bob aprende `R` é por Carol revelando-o para reivindicar seu próprio HTLC primeiro. Bob não pode reclamar o pagamento de Alice e simplesmente mantê-lo. O hash-lock criptograficamente liga sua capacidade de ser pago a Carol tendo *já* Foi pago usando o mesmo segredo.

## Conceitos errôneos comuns

**Um HTLC não exige Alice e Carol para confiar Bob em tudo**Todo o mecanismo é projetado para que o comportamento honesto e correto de Bob seja imposto pela estrutura criptográfica e econômica dos próprios HTLCs, não por qualquer reputação ou relação de confiança entre as partes.

**HTLCs não são exclusivos para Lightning**. O mesmo padrão de hash-lock-plus-timelock aparece em swaps atômicos de cadeia cruzada e em vários outros sistemas de pagamento condicional minimizados pela confiança; Lightning é a sua aplicação mais amplamente implantado, não o seu único.

## Outras leituras

- [BOLT # 3: Formatos de saída HTLC](https://github.com/lightning/bolts/blob/master/03-transactions.md)

---

[← Anterior: Transações de Compromisso](./commitment-transactions.md)
·
[Voltar à Rede Lightning](./README.md)
·
[Próximo: Roteamento de Pagamentos →](./routing.md)
