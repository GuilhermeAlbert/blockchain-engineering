# Ler o Estado da Cadeia de Blocos

Ler dados de um contrato (um saldo, um preço, um proprietário) é a coisa mais comum que uma aplicação Web3 faz, e não custa nada: sem gás, sem assinatura, sem transação. Este capítulo cobre exatamente por que isso é verdade e demonstra leitura real, estado contrato ao vivo com uma chamada verificada.

## Por que as leituras são gratuitas

Recordar de [JSON- RPC](../ethereum/json-rpc.md#alguns-dos-métodos-mais-utilizados) que `eth_call` simula uma chamada de contrato contra o estado atual (ou histórico) sem nunca transmitir uma transação ou ser incluído em um bloco. Ele roda inteiramente no nó RPC respondendo à consulta, localmente, e descarta quaisquer alterações de estado que a chamada teria feito (o que é bom, uma vez que um `view`/`pure` função, por [Funções](../contracts/functions.md#ver-e-funções-puras), não faz nenhum de qualquer maneira). Nenhum gás é carregado porque nenhum outro nó na rede precisa processá-lo ou validá-lo. É um cálculo local que o nó de consulta executa e retorna, não algo que se torna parte do estado de cadeia compartilhado e concordado.

## Exemplo: leitura real, estado ao vivo

```typescript
import { createPublicClient, http, formatUnits, parseAbi } from "viem";
import { mainnet } from "viem/chains";

const client = createPublicClient({ chain: mainnet, transport: http() });
const erc20Abi = parseAbi([
  "function name() view returns (string)",
  "function totalSupply() view returns (uint256)",
  "function decimals() view returns (uint8)",
]);

const weth = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2" as const;

const [name, totalSupply, decimals] = await Promise.all([
  client.readContract({ address: weth, abi: erc20Abi, functionName: "name" }),
  client.readContract({ address: weth, abi: erc20Abi, functionName: "totalSupply" }),
  client.readContract({ address: weth, abi: erc20Abi, functionName: "decimals" }),
]);

console.log("name:", name);
console.log("totalSupply (raw):", totalSupply.toString());
console.log("totalSupply (formatted):", formatUnits(totalSupply, decimals));
```

Resultado verificado da execução deste código exato (capturado no momento da escrita):

```text
name: Wrapped Ether
totalSupply (raw): 2084662897219033353846529
totalSupply (formatted): 2084662.897219033353846529
```

`totalSupply` reflete o estado de cadeia ao vivo e em constante mudança (a oferta da WETH cresce e encolhe continuamente à medida que os usuários depositam e retiram o ETH), de modo que ao contrário dos outros exemplos verificados deste livro, o número específico acima deve ser tratado como um instantâneo, não como um fato fixo. Repetir este código irá devolver o fornecimento da WETH naquele momento posterior.

## Leitura em um bloco histórico específico

Cada leitura pode ser fixada a um bloco passado específico em vez da ponta da corrente atual, passando um `blockNumber` (ou `blockTag`) parâmetro. Deixando uma aplicação perguntar "o que era esse equilíbrio no bloco 18.000.000" em vez de apenas "o que é agora", útil para análise histórica, auditoria, ou estado de reconstrução em um momento passado específico, sem necessidade de reproduzir toda a cadeia manualmente.

## Batting lê: multicall

Tornar muitos separados `eth_call` os pedidos (um por pedaço de dados necessários) são simples, mas podem ser lentos. Cada uma é uma viagem de ida e volta de rede separada. A **Multichamada** padrão (um contrato de ajuda amplamente implantado, e uma característica integrada de `viem`'s `client.multicall()`) lotes muitas chamadas de leitura em um único `eth_call`, executado em conjunto em uma viagem de ida e volta contra um único contrato de ajudante que internamente loops através e retorna o resultado de cada chamada solicitada, uma técnica de eficiência direta, prática qualquer aplicação que leia muitas peças de estado de contrato (um painel mostrando muitos saldos de tokens, por exemplo) deve geralmente usar em vez de disparar muitas leituras independentes e separadas.

## Conceitos errôneos comuns

**O estado de leitura não necessita de uma carteira conectada** (qualquer pessoa pode ler os dados públicos de qualquer contrato, não restritos de um endpoint RPC público (exatamente como o exemplo deste capítulo), totalmente independente de se um usuário específico conectou uma carteira à aplicação; conexão de carteira (ver [Conectando as Carteiras](./wallet-connections.md)) é apenas necessário para *escrita*) envio de transações ou assinaturas.

**A `view` função revertendo durante uma leitura não custa nada ao chamador** da forma como uma transação em cadeia falhou (rechamar [Erros e Reversões](../contracts/errors.md#por-que-reverter-desfaz-tudo-precisamente)), uma vez que a leitura nunca se torna uma transação real, um revertida `eth_call` simplesmente retorna um erro ao chamador localmente, sem gás consumido e nada gravado na cadeia.

## Outras leituras

- [viem documentação: readContract](https://viem.sh/docs/contract/readContract)
- [Contrato multicall3](https://github.com/mds1/multicall)

---

[← Anterior: WalletConnect](./walletconnect.md)
·
[Voltar para Construindo Aplicações Web3](./README.md)
·
[Próximo: Chamadas de Contratos →](./calling-contracts.md)
