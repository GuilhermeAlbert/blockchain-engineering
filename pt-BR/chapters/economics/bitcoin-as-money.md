# Bitcoin como dinheiro

Tendo coberto o que é dinheiro, que funções desempenha, e as principais formas históricas que tomou, este capítulo faz a pergunta diretamente: Bitcoin funciona como dinheiro? A resposta honesta, usando o framework de [Funções do Dinheiro](./functions-of-money.md), é função por função e não-binário. Bitcoin desempenha algumas funções monetárias razoavelmente bem, desempenha outras fracamente pelos padrões tradicionais, e o equilíbrio mudou significativamente desde 2009.

## Meio de intercâmbio

O Bitcoin pode ser transferida peer-to-peer sem o envolvimento de uma instituição financeira, que é a sua realização técnica fundamental (ver [Origens](../origins/README.md)). No entanto, como um meio de troca diário para compras normais de varejo, Bitcoin de camada de base tem limites práticos reais: espaço de bloco é escasso (ver [O Problema de Escala](../bitcoin-scaling/README.md)), o que significa que as taxas de transação podem aumentar acentuadamente durante períodos de alta demanda, e tempos de confirmação (cerca de dez minutos por bloco, com múltiplas confirmações frequentemente recomendadas para pagamentos maiores, ver [Confirmação da transação](../bitcoin/confirmation.md)) são lentos em relação a uma passagem de cartão.

A [Lightning Network](../lightning/README.md) foi construído especificamente para resolver esta lacuna, permitindo pagamentos quase instant, Bitcoin de baixo custo através de canais de pagamento em vez de transações on-chain para cada compra. A aceitação mercante do Bitcoin, diretamente ou através de processadores de pagamento que se convertem em fiat no ponto de venda, cresceu desde 2009, mas continua a ser uma pequena fração do comércio global de varejo na maioria das economias; vários adotantes corporativos iniciais (Microsoft, Overstock, e outros) adicionaram e, em alguns casos, restringiram a aceitação direta de pagamentos Bitcoin ao longo dos anos, refletindo a flutuação do interesse mercante ligado em parte à volatilidade de preços e complexidade de processamento.

## Unidade de conta

Esta é a função mais fraca de Bitcoin por medidas convencionais. Os preços dos bens e serviços são amplamente cotados em moedas fiat nacionais em todo o mundo, mesmo em jurisdições com adoção significativa de Bitcoin; comerciantes que aceitam preço Bitcoin normalmente na moeda fiat local e converter no ponto de venda, em vez de definir os preços nativos de Bitcoin-denominados. Esta é uma consequência directa da volatilidade discutida em [Volatilidade e adoção monetária](./volatility.md)Uma boa unidade de conta requer estabilidade de preços a curto prazo, e o preço de Bitcoin tem historicamente movido por percentagens de dois dígitos em uma única semana em várias ocasiões, tornando os preços nativos Bitcoin impraticáveis para a maioria do comércio comum.

## Armazenagem de valor

Esta é a função mais enfatizada pelos defensores de Bitcoin e é onde existe o caso empírico mais forte: Fonte fixa do Bitcoin (ver [21 milhões de BTC](../bitcoin/21-million.md)) e sua trajetória a longo prazo de preços desde 2009 levaram um número crescente de indivíduos e, mais recentemente, alguns investidores institucionais e tesouros corporativos para manter Bitcoin explicitamente como um veículo de poupança de longo prazo, muitas vezes descrito usando a analogia "ouro digital". Este caso de uso não requer Bitcoin para funcionar bem como um meio de troca ou unidade de conta simultaneamente. O próprio ouro tem funcionado historicamente principalmente como uma loja de valor enquanto sendo relativamente impraticável para as transações diárias (ver [Moeda-mercadoria](./commodity-money.md)). Os críticos contrapõem que o histórico de preços de Bitcoin, enquanto se inclinando para cima ao longo de sua história completa, também incluiu severas retiradas multianuais (mais de 80% pico-a-trilha em mais de uma ocasião, incluindo 2013–2015 e 2021–2022), que é um perfil de volatilidade muito diferente das lojas tradicionais de valor como ouro ou títulos de nível de investimento, e que o caso de loja-de-valor repousa significativamente na adoção futura continuada em vez de um histórico estabelecido, de décadas de longa duração.

## O que determina a resposta

Se Bitcoin "é dinheiro" não é resolvível como um simples sim-ou-não fato. Depende de qual função você está perguntando, que população de usuários você está perguntando sobre (um detentor de Bitcoin em um país com uma moeda fictícia estável usa muito diferente de alguém em um país que experimenta hiperinsuflação ou controles de capital, veja [Bitcoin e soberania monetária](./monetary-sovereignty.md)), e sobre que horizonte de tempo. Este livro trata a questão como uma questão empírica aberta, evoluindo em vez de uma questão de compromisso ideológico, e apresenta o caso documentado mais forte de cada lado nos capítulos relacionados relevantes em vez de declarar um veredicto aqui.

| Função | Força hoje | Fator limitante primário |
| --- | --- | --- |
| Meio de intercâmbio | Fraco a moderado, melhorando via Camada 2 | Taxas e tempo de confirmação na camada de base |
| Unidade de conta | Fraco | Volatilidade dos preços |
| Armazenagem de valor | Caso de advogado mais forte e contestado | volatilidade histórica e menor histórico do que o ouro |

## Conceitos errôneos comuns

**"Bitcoin falhou como dinheiro" e "Bitcoin conseguiu como dinheiro" são ambas simplificações excessivas** de uma realidade mais nuanceada, específica da função e específica da população descrita acima.

**O papel monetário do Bitcoin não é estático.** O equilíbrio entre essas três funções em 2009, 2017, e hoje difere significativamente como infraestrutura (trocas, custódia, Lightning, clareza regulatória em algumas jurisdições) e condições de mercado evoluíram; reivindicações sobre "o que é Bitcoin" deve especificar um período de tempo.

## Outras leituras

- [Bitcoin: Um sistema de caixa eletrônico de pares a pares](https://bitcoin.org/bitcoin.pdf): Satoshi Nakamoto, para o caso de uso originalmente pretendido
- Ver também: [Críticas de Bitcoin como Dinheiro](./bitcoin-criticism.md) e [Economia austríaca e Bitcoin](./austrian-economics-and-bitcoin.md)

---

[← Anterior: Efeitos de rede em dinheiro](./network-effects.md)
·
[Voltar à Economia](./README.md)
·
[Próximo: Carl Menger e a Origem do Dinheiro →](./menger.md)
