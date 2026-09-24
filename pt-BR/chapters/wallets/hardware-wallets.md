# Carteira de Hardware

Uma carteira de hardware é um dispositivo físico criado para gerar e manter chaves privadas offline e assinar transações sem nunca expor essas chaves a um computador ou telefone conectado. Este capítulo abrange as propriedades específicas de design que distinguem uma carteira de hardware de simplesmente "armazenamento frio em geral" (coberto no capítulo anterior) e o que uma carteira de hardware faz e não protege.

## O objetivo principal do design: a chave privada nunca deixa o dispositivo

A propriedade definidora de uma carteira de hardware é que a chave privada é gerada no próprio dispositivo (usando o próprio gerador de números aleatórios do dispositivo), armazenado na memória segura do dispositivo, e **nunca transmitido do dispositivo sob qualquer forma**, não para o computador conectado, não por USB, não em qualquer lugar. Quando um computador conectado precisa de uma transação assinada, ele envia os dados de transação não assinados para o dispositivo; o dispositivo assina internamente e retorna apenas a assinatura, exatamente o padrão de assinatura offline descrito geralmente em [Armazenamento a frio](./cold-storage.md#a-técnica-principal-ar-gapping-e-assinatura-offline), mas implementado especificamente e exclusivamente para este propósito, em vez de como um computador off-line de propósito geral reaproveitado para ele.

## Elementos seguros

Muitas carteiras de hardware usam um **elemento seguro**, um chip especializado, inviolável (semelhante na categoria dos chips usados em cartões de crédito e passaportes) projetado especificamente para resistir a ataques físicos de extração, incluindo sofisticados envolvendo descapeamento do chip e sondagem direta. Esta é uma garantia de segurança de hardware significativamente diferente, geralmente mais forte do que um microcontrolador de propósito geral comum oferece contra um atacante bem-recurso, fisicamente presente, embora as propriedades de segurança específicas, e os tradeoffs de usar o firmware de um elemento seguro muitas vezes proprietário, de código fechado versus um projeto aberto mais auditável, mas potencialmente menos endurecido fisicamente, variam entre diferentes fabricantes e modelos de carteiras de hardware, e este livro não endossa nenhum produto específico.

## Verificar os detalhes da transação no dispositivo

Uma propriedade de segurança crítica além de apenas "a chave nunca sai": uma carteira de hardware bem projetada exibe os detalhes reais da transação (endereço do destinatário, quantidade) em sua **tela física própria**, separado do display do computador conectado, e requer confirmação física (um botão pressione) antes de assinar. Isto defende especificamente contra malware no computador conectado que pode alterar os detalhes de uma transação após o usuário revisá-los na tela, mas antes de assinar, uma vez que a própria tela da carteira de hardware mostra o que está realmente prestes a assinar, independentemente de qualquer coisa que o computador potencialmente comprometido conectado exibe. Uma carteira de hardware sem seu próprio display confiável, ou aquele cujo display não pode ser invocado para mostrar detalhes precisos da transação, não fornece totalmente esta proteção específica, mesmo se o seu isolamento de chave é de outra forma som.

## Que carteiras de hardware não protegem contra

As carteiras de hardware são projetadas especificamente contra a extração remota de chaves baseadas em software. Sim. **não**, por si só, proteger contra: roubo físico do dispositivo combinado com o conhecimento de seu PIN (embora a maioria implemente atrasos ou tentativas de limpeza após falha de proteção contra a força bruta do PIN), perda tanto do dispositivo quanto de seu backup de frase de semente, ataques de cadeia de suprimentos (um dispositivo adulterado antes de chegar ao comprador, que é por isso que comprar diretamente do fabricante e verificar a autenticidade do dispositivo em primeiro caso de instalação), ou o usuário sendo socialmente projetado ou coagido a aprovar uma transação maliciosa o dispositivo exibe fielmente e o usuário aprova de qualquer maneira.

## Conceitos errôneos comuns

**Uma carteira de hardware não armazena seu bitcoin "no" dispositivo**, como qualquer carteira, ele gerencia chaves; os fundos reais existem como UTXOs na blockchain, exatamente como coberto em [Chaves Privadas](./private-keys.md#o-que-uma-carteira-realmente-faz-com-uma-chave-privada)Perder ou destruir uma carteira de hardware sem backup de frase de semente significa perder o acesso às chaves, não "perder as moedas armazenadas dentro dela".

**Configurar uma carteira de hardware não requer confiar o fabricante com seus fundos em qualquer ponto**. O dispositivo gera chaves localmente e você é responsável por fazer backup da frase de semente resultante você mesmo; o fabricante não tem acesso contínuo às suas chaves ou fundos sob procedimentos de configuração normais, corretamente seguidos.

## Outras leituras

- Ver também: [Armazenamento a frio](./cold-storage.md), [Chave de backup e recuperação](./recovery.md)

---

[← Anterior: Armazenamento a frio](./cold-storage.md)
·
[Voltar para Wallets e Key Management](./README.md)
·
[Próximo: Multisig →](./multisig.md)
