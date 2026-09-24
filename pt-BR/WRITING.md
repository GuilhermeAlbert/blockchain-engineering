# Guia de redação e pesquisa

Este arquivo define as regras editoriais da edição brasileira de *Blockchain Engineering*.

## Público

Parta do princípio de que o leitor sabe ler código, mas talvez ainda não conheça blockchain, criptografia ou economia monetária.

## Regra principal

Explique o mecanismo antes de apresentar o nome.

Prefira:

> Uma transação de Bitcoin gasta saídas criadas anteriormente e cria novas saídas.

Depois, apresente o termo **UTXO**.

## Estilo

Use português brasileiro direto e tecnicamente preciso.

Prefira mecanismos concretos, voz ativa, termos exatos, exemplos numéricos, diagramas úteis, pequenos trechos de código e fontes primárias.

Evite marketing, dramatização, prosa motivacional genérica, perguntas retóricas desnecessárias, conclusões que apenas repetem o capítulo e a troca de termos técnicos por sinônimos menos precisos. Preserve nomes consagrados, como hash, fork, staking, rollup, token, Taproot e Lightning, quando a tradução prejudicar o sentido.

## Texto sem vícios de IA

Quando disponível, use a habilidade [`no-ai-slop`](https://github.com/petergyang/no-ai-slop).

Antes de considerar um capítulo concluído, remova introduções vazias, ênfase sem evidência, contrastes artificiais, frases de efeito e repetições. Não invente exemplos, números ou opiniões durante a revisão.

## Fontes

Prefira material primário.

### Bitcoin

Use o whitepaper do Bitcoin, o código-fonte e a documentação do Bitcoin Core, BIPs, mensagens originais de listas de discussão, textos públicos de Satoshi Nakamoto e documentação do protocolo.

### Ethereum

Use ethereum.org, as especificações de execução e consenso, EIPs, a documentação de Solidity, a documentação dos clientes e os repositórios dos protocolos.

### Economia

Ao discutir um economista, prefira seus textos originais. Exemplos:

- Carl Menger, *Princípios de Economia Política*
- Ludwig von Mises, *A teoria da moeda e do crédito*
- Friedrich Hayek, *Desestatização do dinheiro*
- Murray Rothbard, *O que o governo fez com o nosso dinheiro?*

Não atribua opiniões sobre Bitcoin a autores que morreram antes de sua criação. Separe o que o autor escreveu das interpretações posteriores, da defesa do Bitcoin e das críticas a ele.

## Alegações históricas

Distinga fatos documentados, inferências, interpretações contestadas e especulação.

Ao tratar de Satoshi Nakamoto, não apresente nenhuma identidade proposta como fato estabelecido.

## Precisão técnica

Evite:

> Seu Bitcoin fica guardado na carteira.

Prefira:

> Uma carteira gerencia as chaves e os dados de transação usados para autorizar o gasto dos UTXOs controlados por essas chaves.

Não descreva o Bitcoin como um banco de dados de saldos por conta. Explique o modelo UTXO diretamente.

## Estrutura dos capítulos

Não force todos os capítulos a seguir o mesmo molde. Use estas seções quando forem úteis:

- introdução
- problema
- funcionamento
- exemplo
- detalhes internos
- trade-offs
- equívocos comuns
- experimente
- referências

## Figuras

Use Mermaid quando o diagrama tornar relações ou fluxos mais fáceis de entender. Use diagramas ASCII para estruturas compactas de protocolo. Não acrescente diagramas apenas como decoração.

## Código

Prefira TypeScript nos exemplos gerais e Solidity nos exemplos de contratos inteligentes.

Todo exemplo não trivial deve explicar a entrada, a saída, as etapas importantes e o que foi omitido em comparação com um sistema de produção. Não apresente implementações didáticas como sistemas seguros para produção.

## Segurança

O conteúdo de segurança deve servir à compreensão e à defesa. Estudos de incidentes podem explicar a causa, o mecanismo afetado, o impacto e a mitigação.

## Citações

Não invente citações. Se uma alegação não puder ser verificada, remova-a ou qualifique-a antes da publicação. O manuscrito não deve conter marcadores editoriais pendentes.

## Trade-offs

Não trate descentralização, escalabilidade, segurança, privacidade, resistência à censura, rigidez monetária ou finalidade como propriedades binárias. Explique o mecanismo e seu custo.

## Lista de verificação

Antes de marcar um capítulo como concluído, confirme:

- O mecanismo está explicado?
- O texto explica por que esse mecanismo existe?
- Os termos novos estão definidos?
- As alegações importantes têm fonte?
- As alegações contestadas aparecem como contestadas?
- As opiniões econômicas estão separadas das descrições factuais?
- O código está tecnicamente correto?
- Os links funcionam?
- A prosa evita vícios de escrita por IA e tradução literal?
- O capítulo repete outro sem necessidade?
- Um profissional de software entenderia o conceito depois da leitura?
