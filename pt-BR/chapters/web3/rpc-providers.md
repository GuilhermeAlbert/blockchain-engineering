# Fornecedores de RPC

Cada aplicativo Web3 precisa de uma maneira de alcançar um nó Ethereum, e executar o seu próprio é muitas vezes impraticável para um aplicativo frontend ou uma pequena equipe. Este capítulo cobre o que é realmente um provedor de RPC, os verdadeiros tradeoffs de confiar em um, e como raciocinar sobre escolher um, construindo diretamente sobre [JSON- RPC](../ethereum/json-rpc.md).

## O que um provedor realmente oferece

Um provedor de RPC (Alquimia, Infura, QuickNode, e opções públicas como a usada ao longo de exemplos verificados deste livro, entre muitos outros) executa e mantém os nós Ethereum (clientes de execução e consenso, mantidos sincronizados, em redes potencialmente diversas) e expõe [JSON- RPC](../ethereum/json-rpc.md) endpoints para aplicações a chamar, sem que as aplicações precisem executar, sincronizar e manter sua própria infraestrutura de nó. Trata-se de um comércio direto e prático: infraestrutura real e carga operacional, terceirizada para um terceiro especializado, em troca de um custo recorrente (existem níveis livres, com limites de taxa; escala de níveis pagos com uso) e uma dependência de confiança neste capítulo abrange explicitamente abaixo.

## A troca de confiança, afirmada precisamente

Isto liga- se diretamente a [Nós Completos](../bitcoin/full-nodes.md) versus [Clientes leves](../bitcoin/light-clients.md)'s discussão de confiança, aplicada ao Ethereum: uma aplicação que consulta um fornecedor de RPC de terceiros é **confiando nesse provedor para retornar dados precisos e honestos**. Não tem forma independente de verificar `balanceOf` resposta, e `eth_call` resultado, ou status de inclusão de uma transação sem refazer a mesma consulta contra seu próprio nó independentemente executado, totalmente validado. Um provedor malicioso ou comprometido poderia, em princípio, devolver dados falsos, mostrando uma transação como confirmada quando não está, relatando mal um saldo, ou censurando seletivamente a atividade de endereços específicos. Esta é uma categoria de risco real, documentada, não apenas teórica, e é exatamente por isso que os fornecedores de infraestrutura sérios, trocas e aplicações de alto valor frequentemente funcionam seus próprios nós (ver [Nós Ethereum](../ethereum/nodes.md)) em vez de confiar apenas em um terceiro para consultas de consenso crítico.

## mitigação prática

- **Consultar vários fornecedores independentes** e respostas cruzadas para operações críticas, em vez de confiar incondicionalmente na resposta de qualquer prestador.
- **Verificação das respostas contra provas criptográficas, sempre que possível**: uma prova Merkle contra um cabeçalho de bloco confiável (ver [Trie Estado](../ethereum/blocks.md#por-que-uma-raiz-de-estado-especificamente)) pode ser verificado independentemente, sem precisar confiar na parte que o forneceu, para aplicações suficientemente sofisticadas para implementar esta camada de verificação.
- **Executando seu próprio nó** para qualquer coisa em que o custo da confiança supere a carga operacional, o mesmo tradeoff [Nós Completos](../bitcoin/full-nodes.md#comércio) já coberto para Bitcoin aplica-se de forma idêntica aqui.

## Escolher um prestador na prática

Para além das considerações de confiança brutas, os factores práticos que pesam na maioria das aplicações reais incluem: limites de taxa e preços no volume de utilização esperado, em que as redes e a profundidade histórica dos dados são apoiadas (uma [nó do arquivo](../infrastructure/archive-nodes.md) capaz de responder a perguntas sobre o estado passado arbitrário custa significativamente mais a executar do que um nó que serve apenas o estado recente), tempo de funcionamento e latência geográfica, e (para qualquer coisa que lida com valor significativo) se o provedor oferece redundância suficiente (ou se o aplicativo em si deve consultar vários provedores) para evitar um único ponto de falha levando a aplicação para baixo inteiramente.

## Conceitos errôneos comuns

**Usar um provedor RPC não é o mesmo que confiar que provedor com seus fundos ou chaves privadas**, um provedor só vê as consultas lidas e transações assinadas que seu aplicativo envia; ele não tem acesso a chaves privadas a menos que um aplicativo é especificamente, configurado separadamente para entregar material chave para um serviço remoto (uma configuração significativamente diferente e muito mais arriscado, coberto em [Custodial vs Carteiras Não- Personalizadas](../wallets/custody.md), que a maioria das aplicações Web3 comuns corretamente evitar completamente).

**Uma rede de provedores RPC "descentralizada" não elimina automaticamente a questão de confiança que este capítulo levanta**. Pode reduzir a confiança em qualquer empresa, mas a questão subjacente (pode o nó específico ou nós realmente responder a uma determinada consulta ser confiável, ou verificado independentemente) permanece relevante, independentemente de quantos provedores organizacionalmente distintos existem atrás de uma camada de agregação.

## Outras leituras

- [Ethereum JSON-RPC especificação](https://ethereum.org/en/developers/docs/apis/json-rpc/)

---

[← Anterior: Arquitetura da aplicação Web3](./README.md)
·
[Voltar para Construindo Aplicações Web3](./README.md)
·
[Próximo: Conectando carteiras →](./wallet-connections.md)
