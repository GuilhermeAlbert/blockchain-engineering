# Recursos

Uma lista com curadoria de fontes primárias, especificações e livros referenciados em todo o livro. Qualidade sobre quantidade. Esta lista favorece material original sobre resumos secundários e posts de blog.

## Bitcoin

- [Bitcoin: Um sistema de caixa eletrônico de pares a pares](https://bitcoin.org/bitcoin.pdf): o whitepaper
- [repositório do núcleo do Bitcoin](https://github.com/bitcoin/bitcoin)
- [Bitcoin Documentação do desenvolvedor principal](https://developer.bitcoin.org/)
- [Propostas de Melhoria de Bitcoin (PIB)](https://github.com/bitcoin/bips)
- [Instituto Satoshi Nakamoto](https://nakamotoinstitute.org/): arquivo dos escritos de Satoshi e história de Cypherpunk relacionada
- [Arquivo da lista de discussão de criptografia](https://www.metzdowd.com/pipermail/cryptography/): onde o whitepaper foi anunciado pela primeira vez
- [bitcointalk.org](https://bitcointalk.org/): o fórum Bitcoin original, ativo desde 2009
- [BIP 16: Pagar a Hash de Script](https://github.com/bitcoin/bips/blob/master/bip-0016.mediawiki)
- [BIP 34: Bloco v2, Altura na base de moedas](https://github.com/bitcoin/bips/blob/master/bip-0034.mediawiki)
- [BIP 125: Substituição total por Fee](https://github.com/bitcoin/bips/blob/master/bip-0125.mediawiki)
- [BIP 141: Testemunha Segregada](https://github.com/bitcoin/bips/blob/master/bip-0141.mediawiki)
- [BIP 340/341/342: Taproot](https://github.com/bitcoin/bips)
- [Índice de Consumo de Eletricidade de Cambridge Bitcoin](https://ccaf.io/cbnsi/cbeci)
- [BIP 9: bits da versão com tempo limite e atraso](https://github.com/bitcoin/bips/blob/master/bip-0009.mediawiki)
- [BIP 148: Activação obrigatória da implantação de segwit](https://github.com/bitcoin/bips/blob/master/bip-0148.mediawiki)
- [Crypto Open Patent Alliance contra Craig Wright, acórdão do Supremo Tribunal do Reino Unido, Março de 2024](https://www.judiciary.uk/wp-content/uploads/2024/05/Crypto-Open-Patent-Alliance-v-Wright-judgment-140524.pdf)

## Ethereum

- [ethereum.org](https://ethereum.org/en/)
- [Papel Amarelo Ethereum](https://ethereum.github.io/yellowpaper/paper.pdf)
- [Especificações de execução Ethereum](https://github.com/ethereum/execution-specs)
- [Especificações de consenso Ethereum](https://github.com/ethereum/consensus-specs)
- [Propostas de melhoria Ethereum (EIP)](https://eips.ethereum.org/)
- [EIP-1559: Alteração do mercado de taxas](https://eips.ethereum.org/EIPS/eip-1559)
- [Ethereum JSON-RPC especificação](https://ethereum.org/en/developers/docs/apis/json-rpc/)
- [Casper, o Gadget de Finalidade Amigo](https://arxiv.org/abs/1710.09437): Buterin & Griffith, 2017
- [Documentação sobre a solidez](https://docs.soliditylang.org/)
- [`viem` documentação](https://viem.sh/): usado em todos os exemplos deste livro Web3
- [`wagmi` documentação](https://wagmi.sh/)
- [EIP-712: Hashing e assinatura de dados estruturados digitados](https://eips.ethereum.org/EIPS/eip-712)
- [EIP-1193: API JavaScript do provedor Ethereum](https://eips.ethereum.org/EIPS/eip-1193)
- [Documentação da CarteiraConectar](https://docs.walletconnect.com/)

## Criptografia

- [Manifesto de um Cypherpunk](https://www.activism.net/cypherpunk/manifesto.html): Eric Hughes, 1993
- [Segurança sem identificação](https://www.chaum.com/publications/Security_Wthout_Identification.html): David Chaum, 1985
- [Assinaturas cegas para pagamentos indetectáveis](https://www.chaum.com/publications/Chaum-blind-signatures.PDF): David Chaum, 1982
- [Hashcash](http://www.hashcash.org/papers/hashcash.pdf): Adam Back, 2002
- [NIST FIPS 180-4: Padrão de Hash seguro](https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.180-4.pdf)
- [SEC 2: Parâmetros recomendados de domínio da curva elíptica](https://www.secg.org/sec2-v2.pdf): Certicom Research
- [Novas Instruções em Criptografia](https://ee.stanford.edu/~hellman/publications/24.pdf): Diffie & Hellman, 1976
- [BIP 340: Assinaturas da Schnorr para a secp256k1](https://github.com/bitcoin/bips/blob/master/bip-0340.mediawiki)
- [RFC 6979: Uso determinístico de DSA e ECDSA](https://www.rfc-editor.org/rfc/rfc6979)
- [A Complexidade do Conhecimento dos Sistemas Interativos de Prova](https://doi.org/10.1145/22145.22178): Goldwasser, Micali, Rackoff, 1985
- [`@noble/curves`](https://github.com/paulmillr/noble-curves): a biblioteca TypeScript auditada usada nos exemplos de criptografia deste livro
- [`@scure/bip39`](https://github.com/paulmillr/scure-bip39) e [`@scure/bip32`](https://github.com/paulmillr/scure-bip32), usado nos exemplos de derivação da seção Carteira
- [BIP 32: Carteiras determinísticas hierárquicas](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki)
- [BIP 39: Código mnemônico para geração de chaves determinísticas](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki)
- [BIP 44: Hierarquia Multi-Account para carteiras determinísticas](https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki)

## Sistemas distribuídos

- [O problema dos generais bizantinos](https://lamport.azurewebsites.net/pubs/byz.pdf): Lamport, Shostak, Pease, 1982
- [Tolerância bizantina prática](http://pmg.csail.mit.edu/papers/osdi99.pdf): Castro & Liskov, 1999
- [O Parlamento a tempo parcial](https://lamport.azurewebsites.net/pubs/lamport-paxos.pdf): Leslie Lamport, 1998
- [O ataque de Sybil](https://www.microsoft.com/en-us/research/wp-content/uploads/2002/01/IPTPS2002.pdf): John R. Douceur, 2002
- [Conjectura de Brewer e a viabilidade de serviços web consistentes, disponíveis e tolerantes à partição](https://groups.csail.mit.edu/tds/papers/Gilbert/Brewer2.pdf): Gilbert & Lynch, 2002

## Economia

- [Sobre a Origem do Dinheiro](https://mises.org/library/origin-money): Carl Menger, 1892
- [A Teoria Geral do Emprego, Interesse e Dinheiro](https://www.marxists.org/reference/subject/economics/keynes/general-theory/): John Maynard Keynes, 1936
- [História Monetária dos Estados Unidos, 1867-1960](https://press.princeton.edu/books/paperback/9780691003542/a-monetary-history-of-the-united-states-1867-1960): Milton Friedman & Anna Schwartz, 1963
- [Criação de Dinheiro na Economia Moderna](https://www.bankofengland.co.uk/-/media/boe/files/quarterly-bulletin/2014/money-creation-in-the-modern-economy.pdf): Boletim Trimestral do Banco de Inglaterra, 2014
- [O mito do déficit](https://www.publicaffairsbooks.com/titles/stephanie-kelton/the-deficit-myth/9781541736191/): Stephanie Kelton, 2020 (Teoria Monetária Moderna)
- [A Teoria do Dinheiro do Estado](https://archive.org/details/statetheoryofmon00knapuoft): Georg Friedrich Knapp, 1905

## Economia austríaca

- [Sobre a Origem do Dinheiro](https://mises.org/library/origin-money): Carl Menger, 1892
- [Princípios da Economia](https://mises.org/library/principles-economics): Carl Menger, 1871
- [A Teoria do Dinheiro e do Crédito](https://mises.org/library/theory-money-and-credit): Ludwig von Mises, 1912
- [Desnacionalização do dinheiro: o argumento refinado](https://mises.org/library/denationalisation-money-argument-refined): Friedrich Hayek, 1976/1978
- [O que o governo fez ao nosso dinheiro?](https://mises.org/library/what-has-government-done-our-money): Murray Rothbard, 1963
- [Bitcoin, o Teorema da Regressão, e a emergência de um novo meio de troca](https://mises.org/quarterly-journal-austrian-economics/bitcoin-regression-theorem-and-emergence-new-medium-exchange): Konrad Graf, 2013
- [b-dinheiro](http://www.weidai.com/bmoney.txt): Wei Dai, 1998
- [Pouco ouro](https://unenumerated.blogspot.com/2005/12/bit-gold.html): Nick Szabo, 2005
- [Descasque: As origens do dinheiro](https://nakamotoinstitute.org/library/shelling-out/): Nick Szabo

## Contratos inteligentes

- [Documentação sobre a solidez](https://docs.soliditylang.org/)
- [Livro de Fundição](https://book.getfoundry.sh/)
- [Contratos OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts)
- [EIP-1967: Slots de armazenamento de proxy padrão](https://eips.ethereum.org/EIPS/eip-1967)
- [EIP-2535: Diamantes, Proxy multifacetado](https://eips.ethereum.org/EIPS/eip-2535)

## Tokens

- [EIP-20: Padrão de Token](https://eips.ethereum.org/EIPS/eip-20)
- [EIP-721: Norma de Token não-Fungível](https://eips.ethereum.org/EIPS/eip-721)
- [EIP-1155: Padrão Multi Token](https://eips.ethereum.org/EIPS/eip-1155)
- [WETH9 (vivo verificado na rede principal)](https://etherscan.io/address/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2)

## DeFi

- [Whitepaper Uniswap v2](https://uniswap.org/whitepaper.pdf)
- [Whitepaper Uniswap v3](https://uniswap.org/whitepaper-v3.pdf)
- [Contratos de base Uniswap v2](https://github.com/Uniswap/v2-core)
- [Whitepaper curvo StableSwap](https://curve.fi/files/stableswap-paper.pdf): Michael Egorov
- [Whitepaper Aave V2](https://github.com/aave/aave-protocol/blob/master/docs/Aave_Protocol_Whitepaper_v1_0.pdf)
- [Documentação do Aave](https://aave.com/docs)
- [Whitepaper do MakerDAO](https://makerdao.com/en/whitepaper/)
- [Documentação do Protocolo Sky](https://docs.sky.money/)
- [Documentação da ligação em cadeia: feeds de preço](https://docs.chain.link/data-feeds)

## Camada 2

- [EIP-4844: Transações Shard Blob](https://eips.ethereum.org/EIPS/eip-4844)
- [EIP- 7892: Parâmetro de bloco apenas duro](https://eips.ethereum.org/EIPS/eip-7892)
- [Ethereum: um roteiro centrado no roadmap](https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698): Vitalik Buterin, 2020
- [Whitepaper Nitro Arbitrum](https://github.com/OffchainLabs/nitro/blob/master/docs/Nitro-whitepaper.pdf)
- [Documentação Arbitrum](https://docs.arbitrum.io/)
- [Especificação da pilha de OP](https://specs.optimism.io/)
- [Documentação sobre otimismo](https://docs.optimism.io/)
- [Documentação de base](https://docs.base.org/)
- [L2Beat: framework de etapas de rollup](https://l2beat.com/scaling/stages)
- [Documentação do zkSync](https://docs.zksync.io/)
- [Documentação StarkNet](https://docs.starknet.io/)
- [Documentação LayerZero](https://docs.layerzero.network/)
- [Documentação do buraco de minhoca](https://docs.wormhole.com/)

## Segurança

- [Considerações relativas à segurança da solidez](https://docs.soliditylang.org/en/latest/security-considerations.html)
- [Ethereum.org segurança inteligente contrato](https://ethereum.org/developers/docs/smart-contracts/security/)
- [Ethereum.org segurança e prevenção de fraudes](https://ethereum.org/security/)
- [Documentação dos contratos OpenZeppelin](https://docs.openzeppelin.com/contracts/)
- [Controle de acesso OpenZeppelin](https://docs.openzeppelin.com/contracts/5.x/access-control)
- [OpenZeppelin atualiza a documentação](https://docs.openzeppelin.com/upgrades)
- [Ethereum.org verificação formal](https://ethereum.org/developers/docs/smart-contracts/formal-verification/)
- [Solidity SMTChecker](https://docs.soliditylang.org/en/latest/smtchecker.html)
- [Documentação dos Flashbots](https://docs.flashbots.net/)
- [Ronin Network: Alerta Comunitário, Validadores Ronin comprometidos](https://blog.roninchain.com/p/community-alert-ronin-validators)
- [Relatório do incidente Wormhole, 2 de fevereiro de 2022](https://wormholecrypto.medium.com/wormhole-incident-report-02-02-22-ad9b8f21eec6)
- [Verichains Ronin Bridge auditoria, junho 2022](https://docs.roninchain.com/assets/files/Verichains-Audit-Ronin-Bridge-v1.1-8d4913ed1f3197a108f80de1de4c4407.pdf)

## Infraestruturas

- [Nós e clientes Ethereum](https://ethereum.org/developers/docs/nodes-and-clients/)
- [Executando um nó Ethereum](https://ethereum.org/developers/docs/nodes-and-clients/run-a-node/)
- [Nós do arquivo Ethereum](https://ethereum.org/developers/docs/nodes-and-clients/archive-nodes/)
- [Ethereum JSON- RPC](https://ethereum.org/developers/docs/apis/json-rpc/)
- [RPC do núcleo do Bitcoin](https://bitcoincore.org/en/doc/)
- [Documentação da Geth](https://geth.ethereum.org/docs/)
- [Os subgrafos do gráfico](https://thegraph.com/docs/en/subgraphs/overview/)
- [Visão geral da indexação do gráfico](https://thegraph.com/docs/en/indexing/overview/)
- [Documentação do nós do gráfico](https://thegraph.com/docs/en/indexing/tooling/graph-node/)
- [Especificação do CloudEvents](https://cloudevents.io/)

## Governança

- [BIP 3: Processo actualizado de BIP](https://github.com/bitcoin/bips/blob/master/bip-0003.md)
- [repositório de propostas de melhoria de Bitcoin](https://github.com/bitcoin/bips)
- [Bitcoin Orientações essenciais para a contribuição](https://github.com/bitcoin/bitcoin/blob/master/CONTRIBUTING.md)
- [EIP-1: Objetivo e Orientações do EIP](https://eips.ethereum.org/EIPS/eip-1)
- [Governança Ethereum](https://ethereum.org/governance/)
- [Especificações de execução Ethereum](https://github.com/ethereum/execution-specs)
- [Especificações de consenso Ethereum](https://github.com/ethereum/consensus-specs)
- [Documentação de governança do OpenZeppelin](https://docs.openzeppelin.com/contracts/5.x/governance)

## Regulamento e sociedade

- [Guia do FATF para ativos virtuais e VASPs](https://www.fatf-gafi.org/content/dam/fatf-gafi/guidance/Updated-Guidance-VA-VASP.pdf.coredownload.inline.pdf)
- [Regulamento (UE) 2023/1114 relativo aos mercados de ativos criptográficos](https://eur-lex.europa.eu/legal-content/EN/ALL/?uri=CELEX%3A32023R1114)
- [Banco Central do Brasil: regulamentação de ativos virtuais](https://www.bcb.gov.br/meubc/faqs/p/guarda-e-negociacao-de-moedas-virtuais)
- [Resolução 520 do BCB](https://www.bcb.gov.br/estabilidadefinanceira/exibenormativo?numero=520&tipo=Resolu%C3%A7%C3%A3o+BCB)
- [Publicações BIS CBDC](https://www.bis.org/topic/cbdc.htm)
- [Manual Virtual CBDC do FMI](https://www.imf.org/en/Topics/fintech/central-bank-digital-currency/virtual-handbook)
- [Privacidade Ethereum](https://ethereum.org/privacy/)

## Livros

- Andreas M. Antonopoulos, *Mastering Bitcoin*, para transação Bitcoin, script, carteira e mecânica de rede
Andreas M. Antonopoulos e Gavin Wood, *Mestre Ethereum*, para contas Ethereum, transações, o EVM, e contratos inteligentes
- Ross Anderson, *Engenharia de Segurança*, para modelagem de ameaças, autenticação, controle de acesso e análise de falhas do sistema além de código blockchain específico

## Papel

- [Assinaturas cegas para pagamentos indetectáveis](https://www.chaum.com/publications/Chaum-blind-signatures.PDF): David Chaum, CRYPTO '82
- [Preços via Processamento ou Combate ao Correio Lixo](https://www.wisdom.weizmann.ac.il/~naor/PAPERS/pvp.pdf)Dwork & Naor, CRYPTO '92

## Especificações

- [Propostas de Melhoria de Bitcoin](https://github.com/bitcoin/bips)
- [Propostas de melhoria Ethereum](https://eips.ethereum.org/)

## Repositórios de código-fonte

- [bitcoin/bitcoin](https://github.com/bitcoin/bitcoin): Núcleo do Bitcoin
- [ethereum/go-ethereum](https://github.com/ethereum/go-ethereum): Geth, um cliente de execução Ethereum
