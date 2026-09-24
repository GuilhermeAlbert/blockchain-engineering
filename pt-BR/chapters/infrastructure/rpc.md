# RPC

Interfaces de chamadas de procedimento remotas expõem funções de nó como requisições e respostas. Ethereum comumente usa JSON-RPC sobre HTTP ou WebSocket. Bitcoin Core expõe seus próprios métodos JSON-RPC. O transporte é familiar; a semântica dos dados ainda segue uma corrente em mudança.

## Estrutura de pedido e resposta

Uma solicitação Ethereum JSON-RPC inclui `jsonrpc`, `method`, `params`, e `id` escolhido pelo cliente. Uma resposta devolve o mesmo ID com qualquer um dos dois `result` ou `error`. Respostas em lote podem chegar em uma ordem diferente, então os clientes devem combinar IDs em vez de posições de array.

Quantidades Hex usam hexadecimal compacto sem zeros de chumbo desnecessários. Os valores dos dados representam bytes e preservam pares de dígitos hex. Tratar ambos como strings arbitrárias produz erros de análise sutis. Balanços e valores de bloco grandes excedem o intervalo inteiro seguro do JavaScript e devem ser analisados `bigint` ou outro tipo inteiro exato.

## Referências do bloco definem consistência

Métodos podem aceitar um número de bloco ou etiquetas como `latest`, `pending`, `safe`, e `finalized`, dependendo do cliente e método. Duas chamadas usando `latest` pode observar diferentes blocos se a cabeça avança entre eles. Um cálculo multi-call deve fixar um número de bloco ou hash quando a consistência importa.

A `pending` view é nó-local e pode diferir entre provedores porque mempools diferem. `safe` e `finalized` expressar propriedades de consenso em Ethereum, enquanto uma política de confirmação numérica é uma regra de aplicação. As etiquetas ou métodos não suportados devem falhar visivelmente em vez de voltar silenciosamente para `latest`.

## Erros fazem parte da API

Falhas de transporte separadas, status HTTP, processamento de JSON, erros JSON-RPC, erros de esquema e dados ausentes semanticamente. Um HTTP 200 bem-sucedido pode conter um erro JSON-RPC. A `null` resultado pode significar que uma transação é desconhecida, ainda não indexada, ou não canônica, dependendo do método.

As repetições são seguras para leituras determinísticas quando fixadas a um bloco. Repetir a submissão da transação requer cuidado: a solicitação original pode ter atingido o nó mesmo que a resposta tenha sido perdida. Re-submeta os mesmos bytes assinados e rastreie o hash de transação em vez de criar uma nova transferência cegamente.

## Assinaturas e sondagens

Subscrições WebSocket reduzem o atraso de votação, mas não são uma fila durável. As conexões caem, os provedores reiniciam e as mensagens podem ser perdidas. Ao reconectar, retome a partir de um posto de controle persistente, consultando intervalos de blocos. Use assinaturas como um sinal de despertar, em seguida, concilie-se com dados RCP canônicos.

## Clientes defensivos

Validar formas de resposta, IDs, IDs de cadeia, hashes de bloco e código de contrato esperado. Faixas de log e tamanhos de resposta. Aplicar tempo limite e cancelamento. Grave o bloco exato usado para cada resultado derivado. Não registrar credenciais incorporadas em URLs de provedor.

## Outras leituras

- [Ethereum JSON-RPC especificação](https://ethereum.org/developers/docs/apis/json-rpc/)
- [Documentação do Bitcoin Core RPC](https://bitcoincore.org/en/doc/)
- Ver também: [JSON- RPC](../ethereum/json-rpc.md), [Fornecedores de RPC](./rpc-providers.md)

---

[← Anterior: Executando um nó](./running-a-node.md)
·
[Voltar à Infraestrutura](./README.md)
·
[Próximo: Fornecedores RPC →](./rpc-providers.md)

