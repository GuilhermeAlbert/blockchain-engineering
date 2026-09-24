# Fornecimento de Token

Este capítulo final da seção Tokens reúne um tema que passa por cada capítulo antes dele: ao contrário do protocolo de Bitcoin de 21 milhões de cap [21 milhões de BTC](../bitcoin/21-million.md)), a oferta total de uma token ERC-20 é definida inteiramente pelo próprio código desse contrato específico. Não existe um mecanismo de aplicação equivalente, à escala da rede, para qualquer símbolo individual.

## De onde vem o total

Tal como estabelecido em [ERC-20](./erc-20.md#totalfornecimento-não-é-automaticamente-forçado-para-ser-preciso) e [Emissão e queima](./minting-and-burning.md), um símbolo `totalSupply` é apenas um número que a lógica do próprio contrato mantém. Incrementado por operações de hortelã, decrementado por queimaduras, e de outra forma inalterado por transferências ordinárias (que movem o fornecimento existente entre endereços sem criar ou destruir nada). O que quer que o código do contrato permita chamar `mint`, e em que condições, é o **inteiro** determinante da política de emissão real desse símbolo. Não há nenhuma verificação de nível de protocolo comparável ao programa de subsídios reforçado por consenso do Bitcoin (ver [Bloquear recompensas](../bitcoin/block-rewards.md#como-aplicar-a-subvenção)).

## O espectro das políticas de abastecimento do mundo real

- **Fornecimento fixo, cunhado uma vez**: o `SimpleToken` padrão de [ERC-20](./erc-20.md): um construtor menta um montante fixo, e não `mint` função existe em tudo depois. Este é o análogo mais próximo do hard cap do Bitcoin, embora aplicado inteiramente pelo próprio código imutável de um contrato específico (ou, para um contrato atualizável, por qualquer que seja o governo de sua autoridade de atualização, veja [Contratos Actualizáveis](../contracts/upgrades.md)) e não por qualquer consenso de rede mais amplo.
- **Cunhagem em curso**: um máximo fixo `totalSupply` o contrato obriga (revertendo qualquer `mint` a chamada que a excederia), com a emissão efetiva acontecendo gradualmente ao longo do tempo, sob regras o próprio contrato define (uma taxa fixa por bloco, um calendário decrescente, ou valores de voto de governança).
- **Sem tampa, cunhagem discricionária**: no máximo, com autoridade de cunhagem detida por um endereço de proprietário, um multisig, ou um DAO (ver [DAOs](../governance/daos.md)), que pode cunhar nova oferta à vontade, sujeita apenas a qualquer processo de governança off-chain (ou falta de um) realmente limita essa autoridade na prática.
- **Oferta algorítmica ou orientada para a procura**: alguns tokens (particularmente certos desenhos de stablecoin, ver [Moedas estáveis](../defi/stablecoins.md)) fornecimento de hortelã e queimaduras automaticamente em resposta a condições específicas de cadeia (depósitos colaterais e retiradas, por exemplo), em vez de através de decisões humanas diretas, discricionárias ou de governança em tudo.

## Por que verificar a política de abastecimento importa antes de confiar em um token

Dada a forma como este mapa está diretamente relacionado com o risco real e documentado, este livro afirma claramente: antes de tratar o fornecimento declarado de qualquer token específico como significativo, vale a pena verificar, diretamente no código real do contrato (ou uma auditoria confiável do mesmo), exatamente quem pode cunhar, sob que restrições, e se essa autoridade é ela própria ainda mais limitada por um bloqueio temporal, multisig, ou DAO votar em vez de uma única chave, unilateralmente controlada, precisamente a mesma questão de controle de acesso já levantada para proxies actualizáveis em [Contratos Actualizáveis](../contracts/upgrades.md#o-risco-específico-deste-livro-sinaliza-explicitamente)Um token's anunciado "fornecimento fixo" é tão confiável quanto o código de apoio real que reivindica, não a reivindicação em si.

## Conceitos errôneos comuns

**Um símbolo `totalSupply` ser grande não é, por si só, evidência de nada sobre seu valor ou legitimidade**, as figuras de fornecimento em diferentes tokens não são diretamente comparáveis isoladamente; `totalSupply` de 1.000 e um com `totalSupply` de 1 trilião poderia representar valor total idêntico, diferindo apenas em quantas unidades esse valor é dividido em `decimals` convenção de exibição coberta em [Saldos](./balances.md#onde-um-equilíbrio-realmente-vive)).

**Fornecimento circulante e fornecimento total não são necessariamente o mesmo número** (muitas tokens distinguem `totalSupply` (tudo sempre cunhado) a partir de um número circulante menor (excluindo tokens bloqueadas em contratos de aquisição, mantidos em uma equipe de tesouraria, ou de outra forma ainda não livremente negociável)) uma distinção não imposta pela própria norma ERC-20, e uma que requer verificar as divulgações de um projeto específico ou a lógica de contrato de aquisição em cadeia para verificar com precisão.

## Outras leituras

- [EIP-20: Padrão de Token](https://eips.ethereum.org/EIPS/eip-20)
- Ver também: [21 milhões de BTC](../bitcoin/21-million.md), [Controle de acesso](../security/access-control.md)

---

[← Anterior: Éter embrulhado](./weth.md)
·
[Voltar aos Tokens](./README.md)
·
[Próximo: Arquitetura de Aplicação Web3 →](../web3/README.md)
