# Multisig

Uma carteira multisig ("multi-assinatura") requer mais de uma chave privada para autorizar despesas, por exemplo, quaisquer 2 de 3 chaves designadas, em vez de uma única chave. Este capítulo cobre as duas formas estruturalmente diferentes que o Bitcoin implementa isso (pré-Taproot baseado em script multisig, e abordagem chave-agregação de Taproot) e os problemas concretos multisig realmente resolve.

## O problema multisig resolve

Uma única chave privada é uma **ponto único de falha**: perder, e os fundos desaparecem para sempre (ver [Moedas Perdidas](../bitcoin/lost-coins.md)); ter roubado, e os fundos foram para o ladrão, sem recurso. Multisig distribui este risco: com uma configuração 2 de 3, perdendo qualquer *um* das três chaves não perde acesso a fundos (os outros dois ainda podem autorizar gastos), e um ladrão roubando qualquer *um* chave não ganha a capacidade de gastar nada (eles precisariam de uma segunda chave também). Isto torna a multisig uma verdadeira ferramenta estrutural de redução de risco, não apenas um teatro de segurança inconveniente. Muda os modos de falha que realmente ameaçam os fundos.

## Pré-Taproot: OP CHECKMULTISIG e P2SH

O mecanismo multisig original do Bitcoin usa o `OP_CHECKMULTISIG` opcode diretamente, tipicamente envolto em [P2SH](../bitcoin/p2sh.md) assim o remetente só precisa saber o hash script resultante, não o arranjo multisig completo:

```text
Redeem script for a 2-of-3 multisig:
  OP_2 <pubkeyA> <pubkeyB> <pubkeyC> OP_3 OP_CHECKMULTISIG

Spending requires providing signatures from any 2 of the 3 corresponding
private keys, in the same relative order the public keys appear in the
script, plus the redeem script itself, per the P2SH pattern covered in
chapters/bitcoin/p2sh.md.
```

Isto é visível on-chain no tempo gasto como exatamente o que é, uma transação multisig, maior e mais caro (em taxas) do que um gasto de assinatura única comum, porque ele precisa incluir várias assinaturas completas.

## Taproot: assinaturas agregadas

[Taproot](../bitcoin/taproot.md#por-que-isso-importa-privacidade-e-custo) altera substancialmente esta imagem. Utilização [Agregação da assinatura Schnorr](../cryptography/schnorr.md#por-que-bitcoin-o-adotou-linearidade) através da família de protocolos MuSig, vários participantes podem **single** Schnorr assinatura que uma única saída Taproot, comum-looking aceita, indistinguível on-chain de um único-signer gastar, tanto em privacidade (sem sinal visível de que várias partes estavam envolvidas) e em custo (uma assinatura vale de dados, não vários). Se a cooperação falhar, os gastos do caminho do script do Taproot (também [Taproot](../bitcoin/taproot.md#a-ideia-central-o-caminho-chave-e-os-gastos-script-caminho)) pode voltar para um script pré-comprometido, mais tradicional multi-sig-estilo como uma condição de backup.

## Configuração comum multisig e seus propósitos

- **2 de 2**: frequentemente utilizado para canais de pagamento (ver [Lightning Network](../lightning/README.md)) ou contas conjuntas que exigem o acordo de ambas as partes para cada despesa.
- **2 de 3**: uma configuração pessoal ou de pequena organização comum, duas chaves detidas pelo proprietário primário (talvez uma carteira de hardware e um backup separado), uma mantida por um terceiro confiável ou localização de backup, então perder qualquer chave não bloqueia fundos, e nenhuma chave comprometida pode roubá-los.
- **Maior M-de-N** (3-of-5, 4-of-7, e assim por diante): típico para os tesouros organizacionais, exigindo um quórum significativo de titulares chave geograficamente ou organizacionalmente distribuídos para concordar antes que os fundos se movem, reduzindo diretamente o risco de um único comprometido ou coagido mover fundos individuais unilateralmente.

## Comércio

Multisig reduz significativamente o risco de um único ponto de falha, a custos reais: procedimentos de configuração e backup mais complexos (cada chave precisa de seu próprio backup seguro, e a configuração multisig específica em si (que chaves públicas, que limiar) também precisa ser gravado de forma confiável, ou os fundos tornam-se irrecuperáveis mesmo com chaves individuais suficientemente corretas na mão), taxas de transação mais elevadas para gastos multisig pré-Taproot, e genuína coordenação sobrecarga quando múltiplos, possivelmente separados geograficamente titulares de chaves precisam cooperar para autorizar uma transação.

## Conceitos errôneos comuns

**Multisig não é a mesma coisa que um [carteira de hardware](./hardware-wallets.md).** Uma carteira de hardware protege uma única chave; multisig é uma política sobre quantas chaves separadas são necessárias para gastar, e qualquer uma dessas chaves (incluindo aquelas mantidas em carteiras de hardware) pode individualmente ser chaves de assinatura única que só se tornam parte de um arranjo multisig quando combinadas com as outras em um script específico ou assinatura agregada.

**Esquecendo a configuração multisig específica (que chaves, que limiar) é tão irrecuperável quanto perder uma chave em si**, ter 2 de 3 chaves necessárias é inútil se você não sabe que era originalmente uma configuração 2-of-3 envolvendo essas três chaves públicas específicas nessa ordem específica, que é por isso que documentar a configuração completa (não apenas backup de chaves individuais) questões para multisig especificamente, discutido mais em [Chave de backup e recuperação](./recovery.md).

## Outras leituras

- [BIP 11: Transações Padrão M-of-N](https://github.com/bitcoin/bips/blob/master/bip-0011.mediawiki)
- Ver também: [P2SH](../bitcoin/p2sh.md), [Taproot](../bitcoin/taproot.md), [Assinaturas Schnorr](../cryptography/schnorr.md)

---

[← Anterior: Carteiras de hardware](./hardware-wallets.md)
·
[Voltar para Wallets e Key Management](./README.md)
·
[Próximo: Custodial vs Carteiras Não-Custodiais →](./custody.md)
