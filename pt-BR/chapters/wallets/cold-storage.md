# Armazenamento a frio

Armazenamento frio mantém chaves privadas totalmente offline, nunca presentes, mesmo momentaneamente, em qualquer dispositivo conectado à internet. Este capítulo cobre como isso é realmente alcançado na prática (é menos exótico do que poderia soar) e quais riscos específicos que ele faz e não aborda.

## A técnica principal: ar-gapping e assinatura offline

Uma configuração de armazenamento frio gera e mantém chaves privadas em um dispositivo que nunca foi, e nunca será, conectado a qualquer rede. Gastar no armazenamento de frio requer uma **Assinatura offline** fluxo de trabalho: uma transação não assinada é criada em um dispositivo conectado, transferida para o dispositivo offline (através de um código QR, uma unidade USB ou dados digitados manualmente. Qualquer canal que não exija que o próprio dispositivo offline tenha acesso à rede), assinado lá usando a chave privada offline, e a assinatura resultante transferida de volta para o dispositivo conectado para transmissão. A chave privada em si nunca cruza de volta para o lado conectado. Apenas a transação não assinada vai de uma maneira, e a assinatura completa volta.

```text
Connected device                      Offline device (cold storage)
  (has network access,          ──►    (never connects to any network,
   no private key)                      holds the private key)
        │                                       │
        │  1. build unsigned transaction        │
        └──────────────► QR code / USB ─────────┤
                                                  │  2. sign with offline private key
        ┌──────────────◄ QR code / USB ──────────┘
        │  3. broadcast the now-signed
        │     transaction to the network
```

## O que o armazenamento de frio protege contra, e o que ele não

O armazenamento a frio é especificamente eficaz contra **remoto** ataques, malware, phishing e exploits baseados em rede que requerem alcançar um dispositivo segurando a chave através de uma conexão de rede (ver [Roubo de Chave Privada](../security/private-key-theft.md)). Sim. **não**, por si só, proteger contra roubo ou destruição física do dispositivo ou seu backup, coerção do titular, ou simples perda (ver [Moedas Perdidas](../bitcoin/lost-coins.md)), armazenamento frio aborda uma categoria específica de risco, e uma postura de segurança completa geralmente precisa de medidas adicionais (segurança física, redundância de backup em todos os locais, e em alguns casos [multisig](./multisig.md)) para resolver os riscos que o armazenamento de frio deixa em aberto.

## Implementações comuns de armazenagem a frio

- **Carteiras de hardware** (ver [Carteira de Hardware](./hardware-wallets.md)), dispositivos projetados especificamente para armazenamento e assinatura de chaves offline, geralmente o método de armazenamento frio mais acessível e amplamente utilizado para indivíduos.
- **Carteiras de papel**: uma chave privada (ou frase de semente) impressa ou escrita em papel físico, historicamente comum, mas agora geralmente desencorajada em relação às carteiras de hardware, uma vez que o papel não oferece proteção contra danos físicos, degradação, ou ser fotografado/copiado sem o conhecimento do titular, e gerar um com segurança (sem o dispositivo gerador ter sido comprometido ou conectado) é mais difícil de verificar do que usar um dispositivo de hardware construído com propósito.
- **Computadores de uso geral alimentados por ar**: um laptop permanentemente offline ou um computador de uma só placa que executa software de carteira, usado exclusivamente para assinatura offline, mais flexível, mas exigindo mais cuidados técnicos para configurar e manter corretamente do que uma carteira de hardware dedicada.

## Conceitos errôneos comuns

**Armazenamento a frio não é sinônimo de carteira de hardware especificamente**. É a categoria geral (chaves nunca tocar em um dispositivo conectado); carteiras de hardware são as mais comuns, mas não a única, maneira de alcançá-lo.

**"Offline" não significa que o dispositivo de assinatura não precise de nenhuma interação com o mundo exterior.**. Transferência de dados através de códigos QR, unidades USB, ou entrada manual é esperado e necessário; o que importa é que o próprio dispositivo nunca estabelece uma conexão de rede, não que ele nunca troca qualquer dado.

## Outras leituras

- Ver também: [Carteira de Hardware](./hardware-wallets.md), [Carteiras Quentes](./hot-wallets.md), [Multisig](./multisig.md)

---

[← Anterior: Hot Wallets](./hot-wallets.md)
·
[Voltar para Wallets e Key Management](./README.md)
·
[Próximo: Hardware Wallets →](./hardware-wallets.md)

