# Carteiras Quentes

Uma carteira quente mantém suas chaves privadas em um dispositivo conectado à internet. Este capítulo abrange o que isso significa especificamente para a segurança, e onde as carteiras quentes se encaixam no espaço de troca mais amplo desta seção capítulos restantes (particularmente [Armazenamento a frio](./cold-storage.md)) explorar a partir da direção oposta.

## A propriedade definidora

"Hot" descreve conectividade de rede, não qualquer tipo de dispositivo ou software específico, um aplicativo de carteira de desktop, um aplicativo móvel, uma extensão do navegador, e um sistema de custódia de uma troca (ver [Custodial vs Carteiras Não- Personalizadas](./custody.md)) são todas carteiras quentes se as chaves privadas que eles usam estão sempre presentes em um sistema conectado à internet. A conectividade é precisamente o que os torna conveniente (os fundos podem ser gastos imediatamente, sem qualquer passo de assinatura offline) e precisamente o que os torna uma superfície de ataque maior: malware, phishing e exploits remotos (ver [Roubo de Chave Privada](../security/private-key-theft.md)) geralmente exigem alguma forma de alcance de rede para um dispositivo que realmente detém material chave para ter sucesso em escala.

## Por que existem carteiras quentes apesar do risco

O tradeoff de conveniência é real e, para muitos casos de uso, vale a pena: uma carteira de gastos diária, um pequeno saldo operacional para pagamentos de rotina de uma empresa, ou fundos sendo usados ativamente em um contexto de Camada 2 ou DeFi todos se beneficiam da assinatura imediata, sem atrito de uma carteira quente, da mesma forma que a maioria das pessoas não mantém todo o seu valor líquido em dinheiro físico em um cofre simplesmente porque as contas bancárias carregam algum risco de fraude. A orientação prática geralmente aceita, ecoada em todas as partes conscientes da segurança da comunidade Bitcoin, é manter apenas o que você está confortável perdendo (ou precisa ativamente de gastos a curto prazo) em uma carteira quente, e mover maiores participações a longo prazo para [armazenamento a frio](./cold-storage.md).

## Conceitos errôneos comuns

**Uma carteira quente não é inerentemente "má" ou um sinal de má prática**É um ponto específico em um tradeoff segurança-versus-conveniência, apropriado para casos de uso específico e inapropriado para os outros, exatamente como transportar dinheiro em seu bolso é razoável para um café e irracional para uma entrada casa.

**carteira de software e carteira quente não são perfeitamente sinônimo**, embora a maioria das carteiras de software são quentes na prática. Uma carteira de software executada em uma máquina permanentemente offline (usada apenas para assinar transações passadas para ela através de mídia removível ou códigos QR, então transmitida de um dispositivo conectado separado) é fria, apesar de ser "apenas software", porque o material chave real nunca toca em um dispositivo conectado à internet.

## Outras leituras

- Ver também: [Armazenamento a frio](./cold-storage.md), [Roubo de Chave Privada](../security/private-key-theft.md)

---

[← Anterior: Caminhos de Derivação](./derivation-paths.md)
·
[Voltar para Wallets e Key Management](./README.md)
·
[Próximo: Armazenamento frio →](./cold-storage.md)

