# Glossário

Definições concisas para termos usados ao longo do livro. Cada entrada liga-se ao capítulo que o cobre em profundidade. Leia o item aqui para um lembrete rápido, leia o capítulo vinculado para o mecanismo.

Este glossário cresce ao lado do livro. Se um termo esperado estiver faltando, o capítulo que o define pode ainda não estar escrito. Verificar [PROGRESS. md](./PROGRESS.md).

## A

**ASICs**: Circuito Integrado Específico de Aplicação; um chip projetado para fazer exatamente um cálculo (SHA-256d hashing, para Bitcoin) extremamente eficiente. Ver [ASICs](./chapters/bitcoin/asics.md).

**Endereço**: Uma string derivada de uma chave pública (através de hashing e codificação) que identifica onde os fundos podem ser enviados. Não é uma chave. Ver [Endereços](./chapters/wallets/addresses.md).

**Economia austríaca**: Uma escola econômica fundada por Carl Menger, desenvolvida ainda mais por Ludwig von Mises, Friedrich Hayek e Murray Rothbard, enfatizando a ordem de mercado espontânea e o ceticismo de dinheiro gerenciado centralmente. Ver [Dinheiro e Economia](./chapters/economics/README.md#economia-austríaca).

**AMM (Automated Market Maker)**: Um contrato inteligente que negocia algoritmomente a partir de reservas de tokens atuais de um pool, em vez de combinar comprar e vender ordens. Ver [Criadores de Mercado Automatizados](./chapters/defi/amm.md).

**Controle de acesso**: Regras que decidem quais contas ou contratos podem chamar de funções sensíveis como cunhagem, atualização, pausa ou alteração de configuração. Ver [Controle de acesso](./chapters/security/access-control.md).

**Aprovação**: Autoridade on-chain concedida a um gastador ou operador para mover tokens de propriedade de outro endereço. Ver [Ataques de aprovação](./chapters/security/approval-attacks.md).

**Nó do arquivo**: Uma configuração de nó que mantém o estado histórico para que antigos saldos e chamadas de contrato possam ser respondidas diretamente. Ver [Nós do Arquivo](./chapters/infrastructure/archive-nodes.md).

## B

**BIP (Proposta de melhoria do Bitcoin)**: Uma proposta publicada ou documento de informação para Bitcoin; publicação não significa, por si só, adoção ou consenso comunitário. Ver [BIP](./chapters/governance/bips.md).

**Recompensa/subvenção em bloco**: O recém-criado bitcoin um minerador recebe por um bloco, separado das taxas de transação. Metade a cada 210.000 blocos. Ver [Bloquear recompensas](./chapters/bitcoin/block-rewards.md).

**Falha bizantina**: Um modo de falha onde um componente do sistema se comporta arbitrariamente ou maliciosamente, potencialmente enviando informações contraditórias para diferentes pares, em vez de simplesmente parar. Ver [Falhas Bizantinas](./chapters/distributed-systems/byzantine-faults.md).

**Bit Gold**: Proposta de Nick Szabo 1998 para a escassez digital baseada em soluções de prova de trabalho encadeadas. Nunca implementado. Ver [Bit Gold](./chapters/origins/bit-gold.md).

**b-dinheiro**: A proposta de Wei Dai de 1998 para dinheiro digital descentralizado, citada no whitepaper Bitcoin. Nunca implementado. Ver [b-dinheiro](./chapters/origins/b-money.md).

**Assinatura cega**: Uma técnica criptográfica que permite que um assinante assine uma mensagem sem ver seu conteúdo, usada no DigiCash de David Chaum para dar privacidade não-linkável a dinheiro digital. Ver [David Chaum e DigiCash](./chapters/origins/digicash.md).

**Altura do bloco**: Posição de um bloco na cadeia, contado a partir do bloco de gênese na altura 0. Ver [Altura do Bloco](./chapters/blockchain/block-height.md).

**Bloco**: Um lote de transações agrupadas, hashed, e ligado ao bloco anterior, formando a blockchain. Ver [Blocos](./chapters/blockchain/blocks.md).

**Blob**: Tipo de dados dedicados e temporariamente conservados da Ethereum para dados de lote de rollup, introduzidos pela EIP-4844 com seu próprio mercado de taxa separada. Ver [Blobs](./chapters/layer2/blobs.md).

**Ponte**: Valor móvel de infraestrutura ou mensagens entre duas blockchains separadas, através de um mecanismo de verificação que vai de um multisig confiável a um cliente leve minimizado por confiança. Ver [Pontes](./chapters/layer2/bridges.md).

## C

**Armazenamento a frio**: Mantendo chaves privadas totalmente offline, nunca presente em qualquer dispositivo conectado à internet. Ver [Armazenamento a frio](./chapters/wallets/cold-storage.md).

**Carteira de custódia**: Uma carteira onde um terceiro tem as chaves privadas em nome do usuário. Ver [Custodial vs Carteiras Não- Personalizadas](./chapters/wallets/custody.md).

**Colisão (hash)**: Duas entradas diferentes que produzem a mesma saída de hash. Deve existir matematicamente para qualquer função de hash; segurança depende de ninguém ser capaz de encontrar um. Ver [Colisões de Hash](./chapters/cryptography/collisions.md).

**Consenso**: O problema geral de obter múltiplos partidos independentes, possivelmente-adversariais para concordar em um único valor ou história. Ver [Consenso](./chapters/distributed-systems/consensus.md).

**Compromisso criptográfico**: Uma maneira de bloquear um valor oculto agora e revelá-lo mais tarde, sem ser capaz de mudá-lo após o fato. Ver [Compromissos criptográficos](./chapters/cryptography/commitments.md).

**Efeito Cantillon**: O impacto desigual e sequencial do novo dinheiro entrando em uma economia: aqueles que o recebem primeiro benefício em detrimento daqueles que o recebem por último, após os preços ajustados. Ver [O Efeito Cantillon](./chapters/economics/cantillon-effect.md).

**Banco central**: A instituição responsável pela gestão da oferta monetária de uma moeda e, normalmente, pela supervisão do sistema bancário e agindo como mutuante de último recurso. Ver [Banco Central](./chapters/economics/central-banking.md).

**CBDC (moeda digital do banco central)**: Responsabilidade digital de um banco central concebido para pagamentos a retalho ou liquidação por grosso. Ver [CBDC](./chapters/society/cbdcs.md).

**Reorganização da cadeia ("reorg")**: Quando um nó muda de uma versão da corrente recente para outra, a versão concorrente agora considera mais válida. Ver [Reorganizações da Cadeia](./chapters/blockchain/reorgs.md).

**Confirmação**: Quantos blocos foram extraídos em cima do bloco contendo uma determinada transação; uma medida grosseira e crescente de quão improvável essa transação deve ser revertida. Ver [Finalidade Probabilística](./chapters/distributed-systems/probabilistic-finality.md).

**Regras de consenso**: Condições de validade impostas por cada nó; violar um faz um bloco ou transação inválida em toda a rede, ao contrário de uma regra de política local. Ver [Regras de Consenso](./chapters/blockchain/consensus-rules.md).

**Transação de base de moedas**: A primeira transação especial em um bloco, que cria novas moedas e as paga ao criador do bloco, em vez de gastar moedas existentes. Ver [Transações de base de moeda](./chapters/bitcoin/coinbase-transactions.md).

**Moeda-mercadoria**: Dinheiro cujo valor deriva de um bem físico com usos não monetários, como ouro ou prata. Ver [Moeda-mercadoria](./chapters/economics/commodity-money.md).

**Cypherpunk**: Um participante na lista de discussão focada em criptografia e privacidade e movimento ativo a partir de 1992, cujos membros incluíram vários dos antecessores intelectuais diretos de Bitcoin. Ver [O Movimento Cypherpunk](./chapters/origins/cypherpunks.md).

**Fórmula constante do produto**: A `x * y = k` Regra de preços por trás da classe mais amplamente implantada da AMM, exigindo que o produto das duas reservas de um pool permaneça fixo em qualquer swap. Ver [Fórmula constante do produto](./chapters/defi/constant-product.md).

**Índice de colateralização**: O valor da garantia bloqueada contra um empréstimo, expresso em relação ao montante emprestado; o inverso do empréstimo-a-valor. Ver [Garantia](./chapters/defi/collateral.md).

**Ponte canônica**: A própria ponte oficial de um rollup para L1, que herda segurança diretamente do mecanismo à prova de fraude ou validade do rollup, em vez de uma suposição de confiança separada. Ver [Pontes Canônicas](./chapters/layer2/canonical-bridges.md).

**Ponto de controle**: Uma posição de bloco persistente e hash registrando quão longe um pipeline ou indexador tem aplicado dados canônicos. Ver [Indexadores](./chapters/infrastructure/indexers.md).

**Invalidação da 'cache'**: Removendo ou substituindo resultados em cache quando seu contexto de bloco ou estado subjacente não é mais atual. Ver [Cache](./chapters/infrastructure/caching.md).

## D

**DAO (Organização Autónoma descentralizada)**: Uma organização cujo tesouro ou autoridade administrativa é gerido em parte através de contratos e governança participante. Ver [DAOs](./chapters/governance/daos.md).

**Decimais**: Uma convenção de exibição ERC-20 (não uma regra de protocolo) especificando quantos lugares para dividir um saldo de token cru para exibição legível por humanos; USDC usa 6, a maioria dos tokens usa 18. Ver [Saldos](./chapters/tokens/balances.md).

**Dificuldade**: Uma medida normalizada de como é difícil atualmente encontrar um hash de bloco válido, expresso em relação ao alvo mais fácil de Bitcoin. Ver [Dificuldade em Mineração](./chapters/bitcoin/difficulty.md).

**Assinatura digital**: Prova criptográfica de que um titular de chave privada autorizou uma mensagem específica, verificável por qualquer pessoa com a chave pública. Ver [Assinaturas digitais](./chapters/cryptography/digital-signatures.md).

**Deflação**: Uma queda sustentada no nível geral de preços, o que significa que o poder de compra de uma moeda aumenta ao longo do tempo. Ver [Inflação e deflação](./chapters/economics/inflation-and-deflation.md).

**Gasto duplo**: O problema de uma unidade digital de valor ser gasto mais de uma vez, uma vez que os dados digitais podem ser copiados. O problema central do projeto do Bitcoin resolve sem um terceiro confiável. Ver [Por que o dinheiro digital era difícil](./chapters/origins/digital-cash.md).

**DEX (Exchange descentralizada)**: Um protocolo que permite que os usuários troquem tokens diretamente contra um contrato inteligente, sem que nenhuma empresa opere um livro de pedidos ou mantenha a custódia de fundos entre comércios. Ver [Bolsas descentralizadas](./chapters/defi/dex.md).

**Disponibilidade dos dados**: A garantia de que os dados subjacentes de uma transação de rolagem são realmente publicados em algum lugar qualquer um pode recuperá-lo, distinta da garantia de que os dados descrevem uma transição de estado correta. Ver [Disponibilidade de Dados](./chapters/layer2/data-availability.md).

## E

**EOA (Conta externa detida)**: Uma conta Ethereum controlada por uma chave privada, em oposição a uma conta contratual. Ver [Contas de propriedade externa](./chapters/ethereum/eoa.md).

**ECDSA**: Algoritmo de assinatura digital da curva elíptica. O esquema de assinatura original do Bitcoin, ainda é o mais utilizado. Ver [ECDSA](./chapters/cryptography/ecdsa.md).

**Curve elíptica**: Uma curva da forma y2 = x3 + ax + b sobre um campo finito, usado como base matemática para as chaves e assinaturas de Bitcoin e Ethereum. Ver [Curvas elípticas](./chapters/cryptography/elliptic-curves.md).

**EIP-712**: Um padrão para assinaturas estruturadas e legíveis por humanos, com um separador de domínio impedindo a repetição de aplicações cruzadas. Ver [Dados tipados e EIP-712](./chapters/web3/eip-712.md).

**PEI (Proposta de melhoria da eficiência energética)**: Um documento padrão para Ethereum núcleo protocolo, rede, interfaces, ou convenções de aplicação. Ver [EIP](./chapters/governance/eips.md).

## E (continuação)

**EVM (máquina virtual Ethereum)**: A máquina virtual Turing-completo baseada na pilha que executa o bytecode do contrato. Ver [O EVM](./chapters/evm/README.md).

## F

**Execução frontal**: Observando uma transação pendente e organizando para que outra transação seja executada antes dela para capturar uma vantagem de ordenação. Ver [Execução frontal](./chapters/security/front-running.md).

**Finalidade**: A propriedade de uma transação ou bloco se tornando permanente e irreversível; determinístico, probabilístico, ou econômico, dependendo do mecanismo de consenso. Ver [Finalidade](./chapters/distributed-systems/finality.md).

**Prova de fraude**: Uma prova apresentada de que a alegação de estado publicada de um rollop está errada, produzida através de um processo interativo que reduz uma disputa para uma etapa de execução de baixo custo verificável. Ver [Provas de Fraude](./chapters/layer2/fraud-proofs.md).

**Moeda Fiduciária**: Moeda com valor derivado de leis de curso legal e credibilidade institucional em vez de um apoio de mercadorias. Ver [Moeda Fiduciária](./chapters/economics/fiat-money.md).

**Banco de reserva fraccional**: Um sistema bancário no qual os bancos detêm apenas uma fração de depósitos como reservas, emprestando o resto. Ver [Banco e Crédito](./chapters/economics/banking-and-credit.md).

**Empréstimo Flash**: Um empréstimo sem obrigação de garantia, sacado e reembolsado, com uma taxa, inteiramente dentro de uma única transação; se não for reembolsado, toda a transação reverte. Ver [Empréstimos Flash](./chapters/defi/flash-loans.md).

## G

**Gás**: Unidade de Ethereum para medir trabalho computacional; cada operação EVM custa uma quantidade fixa, limitando a execução de uma máquina virtual Turing-completo. Ver [Gás](./chapters/ethereum/gas.md).

**Bloco de Gênesis**: Bloco 0, o primeiro bloco do Bitcoin blockchain, minado por Satoshi Nakamoto em 3 de janeiro de 2009, e codificado no software cliente em vez de descoberto através de validação normal. Ver [O Bloco de Gênesis](./chapters/origins/genesis-block.md).

**Padrão ouro**: Um sistema monetário no qual o valor de uma moeda é formalmente definido como, e recuperável para, uma quantidade fixa de ouro. Ver [Moeda-mercadoria](./chapters/economics/commodity-money.md).

## H

**Hard fork**: Uma regra de protocolo de mudança incompatível com o software antigo; requer que cada nó para atualizar ou arriscar uma divisão de cadeia permanente. Ver [Hard fork](./chapters/forks/hard-forks.md).

**Carteira HD (Determinação hierárquica)**: Uma carteira que deriva uma árvore inteira de chaves de uma única semente, padronizada pelo BIP-32. Ver [Carteiras HD](./chapters/wallets/hd-wallets.md).

**Carteira quente**: Uma carteira cujas chaves privadas estão sempre presentes em um dispositivo conectado à internet. Ver [Carteiras Quentes](./chapters/wallets/hot-wallets.md).

**Metade**: O evento, a cada 210.000 blocos (cerca de quatro anos), quando Bitcoin bloco subsídio cortes ao meio. Ver [O halving](./chapters/bitcoin/halving.md).

**HTLC (contrato de bloqueio temporal)**: Um pagamento condicional que combina um hash lock e um timelock, permitindo o roteamento multi-hop na Rede Lightning. Ver [HTLCs](./chapters/lightning/htlcs.md).

**Função de hash**: Uma função de mapeamento de entrada de tamanho arbitrário para saída de tamanho fixo, deterministicamente e imprevisivelmente. Ver [Funções do Hash](./chapters/cryptography/hashes.md).

**Dinheiro duro**: Uma moeda cuja oferta é difícil ou lenta de expandir. Ver [Dinheiro difícil e dinheiro sólido](./chapters/economics/sound-money.md).

**Hashcash**: Sistema anti-spam de Adam Back 1997 usando prova de trabalho, citado diretamente no whitepaper Bitcoin como o modelo para o quebra-cabeça de mineração de Bitcoin. Ver [Hashcash](./chapters/origins/hashcash.md).

## I

**Idempotência**: A propriedade que aplica a mesma operação mais de uma vez tem o mesmo efeito que aplicá-la uma vez. Ver [Processamento de Eventos](./chapters/infrastructure/event-processing.md).

**Indexador**: Um serviço que lê dados de cadeia ordenados e constrói um banco de dados orientado para consultas a partir dele. Ver [Indexadores](./chapters/infrastructure/indexers.md).

## K

**KYC (Conheça o seu cliente)**: Procedimentos através dos quais um serviço coberto identifica e verifica os clientes de acordo com suas regras aplicáveis e programa de risco. Ver [KYC e AML](./chapters/society/kyc-aml.md).

**Inflação**: Um aumento sustentado do nível geral de preços, o que significa que o poder de compra de uma moeda cai ao longo do tempo. Ver [Inflação e deflação](./chapters/economics/inflation-and-deflation.md).

**Perda impermanente**: A diferença de valor entre a posição retirada de um provedor de liquidez da AMM e o que simplesmente segurando os mesmos símbolos originais, unpooled, teria valido a pena; causado pela fórmula constante-produto reequilibrando as reservas de um pool como move preço. Ver [Perda impermanente](./chapters/defi/impermanent-loss.md).

## L

**Lightning Network**: Uma rede de canais de pagamento bidirecionais Bitcoin conectados através de HTLCs, permitindo pagamentos rápidos e de baixa taxa fora da cadeia liquidados periodicamente on-chain. Ver [Lightning Network](./chapters/lightning/README.md).

**Liquidação**: O processo automatizado que encerra uma posição de empréstimo subcolateralizada antes de sua dívida pode exceder o valor de sua garantia, realizada por qualquer endereço em troca de um bônus. Ver [Liquidações](./chapters/defi/liquidations.md).

**Conjunto de liquidez**: O contrato inteligente que detém duas reservas token de um AMM, o equilíbrio dos preços da fórmula constante-produto negocia contra. Ver [Grupos de liquidez](./chapters/defi/liquidity-pools.md).

**LP token**: Um token cunhado a um fornecedor de liquidez que representa um crédito proporcional sobre as reservas de um pool, queimado para retirar. Ver [Grupos de liquidez](./chapters/defi/liquidity-pools.md#tokens-lp-um-recibo-para-uma-parte-do-pool).

**L1 / L2**: Camada 1 (um blockchain base, como Ethereum mainnet) e Camada 2 (um sistema separado construído em cima dele, herdando sua segurança através de um mecanismo específico, verificável em vez de uma nova suposição de confiança). Ver [L1 vs. L2](./chapters/layer2/l1-vs-l2.md).

## M

**MEV (Valor máximo extraível)**: Valor obtido através da inclusão de transações, exclusão ou ordenação por pesquisadores e atores envolvidos na construção de blocos. Ver [MEV](./chapters/security/mev.md).

**Multisig**: Uma carteira que exige mais de uma chave privada para autorizar as despesas. Ver [Multisig](./chapters/wallets/multisig.md).

**Mempool**: O conjunto de transações válidas e não confirmadas que um nó conhece e está preparado para retransmitir ou minar. Local para cada nó, nenhuma lista global. Ver [O Mempool](./chapters/bitcoin/mempool.md).

**Mineração**: Competindo para criar novos blocos, buscando uma prova de trabalho válida. Ver [Mineração](./chapters/bitcoin/mining.md).

**Prova de Merkle**: Um pequeno conjunto de hashes irmãos provando a inclusão de um item específico em uma árvore Merkle, sem precisar do conjunto de dados completo. Ver [Provas de Merkle](./chapters/cryptography/merkle-proofs.md).

**Raízes de merkle**: O único hash no topo de uma árvore Merkle, resumindo um conjunto de dados inteiro. Ver [Merkle Trees](./chapters/cryptography/merkle-trees.md).

**Merkle tree**: Uma árvore de hashes que resume um grande conjunto de dados em um hash raiz, permitindo provas de inclusão compactas. Ver [Merkle Trees](./chapters/cryptography/merkle-trees.md).

**Meio de intercâmbio**: Uma função do dinheiro: algo amplamente aceito no comércio, evitando a necessidade de uma dupla coincidência de desejos. Ver [Funções do Dinheiro](./chapters/economics/functions-of-money.md).

**Política monetária**: Ações que um banco central toma para influenciar a oferta de dinheiro, taxas de juros e condições de crédito. Ver [Política monetária](./chapters/economics/monetary-policy.md).

**Fornecimento de dinheiro**: Quantidade total de dinheiro numa economia, medida em níveis (M0, M1, M2) por liquidez. Ver [Oferta Monetária](./chapters/economics/money-supply.md).

## N

**Nonce**: Os mineradores de campo de 4-byte header de bloco variam ao procurar um hash de prova de trabalho válido; também, no ECDSA, o valor aleatório ou determinístico usado em cada assinatura. Ver [Nonce](./chapters/bitcoin/nonce.md).

**Efeito da rede**: Uma propriedade onde um bem torna-se mais valioso para cada usuário como mais pessoas usá-lo; dinheiro é uma boa rede. Ver [Efeitos da Rede em Dinheiro](./chapters/economics/network-effects.md).

## O

**Oracle**: Um mecanismo que disponibiliza informações externas ou derivadas, como um preço de ativo, para um contrato inteligente. Ver [Oráculos](./chapters/defi/oracles.md) e [Manipulação do Oracle](./chapters/security/oracle-manipulation.md).

**Oracle**: Infraestrutura que recebe dados externos, na maioria das vezes preços de ativos, em uma blockchain em uma forma que um contrato inteligente pode ler, uma vez que um contrato não pode consultar uma API externa diretamente. Ver [Oráculos](./chapters/defi/oracles.md).

**Rollup otimizado**: Um rollup que aceita uma reivindicação de estado publicada por padrão, dando a qualquer um um período de desafio para contestá-lo com uma prova de fraude antes de ser tratado como final. Ver [Rollups Optimistas](./chapters/layer2/optimistic-rollups.md).

## P

**Resistência à preimagem**: A propriedade que faz uma função de hash one-way: dada uma saída, nenhum método prático existe para encontrar uma entrada que produz, além de busca por força bruta. Ver [Resistência à Preimagem](./chapters/cryptography/preimage-resistance.md).

**Chave privada**: Um número secreto, gerado aleatoriamente que autoriza os gastos e deriva uma chave pública. Nunca deve ser partilhado. Ver [Chaves particulares e públicas](./chapters/cryptography/keys.md).

**Chave pública**: Um valor matematicamente derivado de uma chave privada, segura de compartilhar, usado para verificar assinaturas. Ver [Chaves particulares e públicas](./chapters/cryptography/keys.md).

**Prova de trabalho**: Um mecanismo que exige que um partido realize um cálculo caro e difícil de falsificar para ganhar um privilégio (enviar um email passado por um filtro de spam, ou estender o blockchain Bitcoin). Barato para verificar, caro para produzir. Ver [Hashcash](./chapters/origins/hashcash.md) e [Prova de Trabalho](./chapters/bitcoin/proof-of-work.md).

**Pseudonímico**: Identificado por uma etiqueta persistente (uma chave ou endereço público) que não está diretamente ligada a uma identidade do mundo real, em oposição a uma identidade totalmente anônima (sem etiqueta persistente em tudo) ou totalmente identificada. Descreve o modelo de privacidade do Bitcoin. Ver [O whitepaper Bitcoin](./chapters/origins/bitcoin-whitepaper.md#10-privacidade).

## Q

**Teoria da quantidade de dinheiro**: A teoria de que o nível de preços é fundamentalmente determinado pela relação entre a oferta de dinheiro, sua velocidade e produção real (M × V = P × Y). Ver [Oferta Monetária](./chapters/economics/money-supply.md).

## R

**Reentrância**: Execução aninhada causada quando um contrato chama o código externo antes de resolver seu próprio estado e o código externo chama de volta para ele. Ver [Reentrância](./chapters/security/reentrancy.md).

**Teorema de regressão**:O argumento de Ludwig von Mises de que o valor do dinheiro deve remontar ao uso prévio não monetário de um bem. Central para um debate específico e não resolvido sobre Bitcoin. Ver [O Teorema da Regressão](./chapters/economics/regression-theorem.md).

**RPOW (Prova de trabalho reutilizável)**: O sistema de Hal Finney em 2004 permite que tokens de prova de trabalho ao estilo Hashcash sejam trocados por tokens transferíveis e assinados. Ver [Hashcash](./chapters/origins/hashcash.md#de-hashcash-a-rpow).

**Rollup**: Um sistema L2 que executa transações fora L1, em seguida, publica os dados subjacentes e uma maneira de verificar a exatidão (fraude ou provas de validade) de volta para L1. Ver [Rollups](./chapters/layer2/rollups.md).

**Protecção de repetição**: Dados e estados que impedem que uma mensagem assinada ou mensagem cross-chain válida seja executada mais de uma vez ou no domínio errado. Ver [Assinaturas Maléficas](./chapters/security/malicious-signatures.md).

**RPC (Chamada de Procedimento Remoto)**: Uma interface através da qual o software solicita dados ou ações de nó, comumente usando JSON-RPC para Ethereum e Bitcoin Core. Ver [RPC](./chapters/infrastructure/rpc.md).

## S

**Auto- guarda**: Controle das chaves ou política de autorização necessária para mover ativos sem pedir a um guardião. Ver [Autocustodia](./chapters/society/self-custody.md).

**SegWit (Testemunha Segregada)**: Um soft fork 2017 que moveu dados de assinatura para fora da estrutura principal da transação, fixando maleabilidade e mudando a contabilidade de taxas. Ver [SegWit](./chapters/bitcoin/segwit.md).

**Soft fork**: Uma regra de protocolo que reforça as regras de consenso de uma forma que o software antigo ainda aceita. Ver [Soft forks](./chapters/forks/soft-forks.md).

**Contrato inteligente**: Código implantado em uma blockchain que executa deterministicamente quando chamado, mantendo seu próprio estado e, opcionalmente, fundos. Ver [Contratos Inteligentes](./chapters/contracts/README.md).

**Ataque de sanduíches**: Um ataque de ordem de transação que negocia antes e depois de uma vítima para mover o preço de execução da vítima e capturar a diferença. Ver [Execução frontal](./chapters/security/front-running.md#ataques-de-sanduíches).

**secp256k1**: A curva elíptica específica Bitcoin e Ethereum usar para todas as chaves e assinaturas. Ver [secp256k1](./chapters/cryptography/secp256k1.md).

**Assinatura do Schnorr**: Um esquema de assinatura adicionado ao Bitcoin via Taproot, notável por permitir agregação de assinatura. Ver [Assinaturas Schnorr](./chapters/cryptography/schnorr.md).

**Frase de sementes**: 12 ou 24 palavras que codificam a entropia por trás da chave mestra de uma carteira HD, padronizada pelo BIP-39. Ver [Frases de sementes](./chapters/wallets/seed-phrases.md).

**Satoshi Nakamoto**: O pseudônimo usado pelo criador de Bitcoin. Identidade do mundo real desconhecida. Ver [Quem era Satoshi Nakamoto?](./chapters/origins/satoshi.md).

**Armazenagem de valor**: Uma função do dinheiro: um ativo que pode ser salvo e recuperado mais tarde sem perda significativa do poder de compra. Ver [Funções do Dinheiro](./chapters/economics/functions-of-money.md).

**Ataque de Sybil**: Um ataque onde um partido cria muitas identidades falsas para ganhar influência desproporcional sobre um sistema que assume uma identidade igual a um voto. Ver [Ataques de Sybil](./chapters/distributed-systems/sybil-attacks.md).

**Slippage**: A diferença entre o preço esperado de um comércio e o seu preço real executado, impulsionado pelo próprio impacto do preço do comércio nas reservas de um pool e por outros comércios desembarque antes dele. Ver [Slippage](./chapters/defi/slippage.md).

**Establecoína**: Um token projetado para manter um valor aproximadamente constante em relação a alguma referência, quase sempre o dólar dos EUA, através de reservas suportadas por fiat ou sobre-colateralização cripto. Ver [Moedas estáveis](./chapters/defi/stablecoins.md).

**Sequenciador**: O componente de um rollup que ordena e executa transações provisoriamente antes de serem loteadas e publicadas para L1; centralizado em cada rollup principal a partir de 2026. Ver [Sequenciadores](./chapters/layer2/sequencers.md).

## T

**Clock de tempo**: Uma regra de contrato ou protocolo que atrasa uma ação aprovada antes da execução, dando aos observadores tempo para inspecionar e aos usuários tempo para reagir. Ver [Governança em curso](./chapters/governance/on-chain.md).

**Regra de viagem**: Norma FATF que exige informações específicas sobre o cedente e o beneficiário para acompanhar as transferências qualificadas entre instituições abrangidas. Ver [KYC e AML](./chapters/society/kyc-aml.md).

**Taproot**: Um soft fork 2021 trazendo assinaturas Schnorr para Bitcoin, tornando condições de gasto complexas indistinguíveis on-chain de simples. Ver [Taproot](./chapters/bitcoin/taproot.md).

**Terceiros fidedignos**: Um intermediário (banco, processador de pagamentos, emitente) exigido por um sistema para resolver litígios ou prevenir fraudes, ao custo de essa parte poder congelar, reverter ou vigiar a actividade. Ver [Por que o dinheiro digital era difícil](./chapters/origins/digital-cash.md).

**TWAP (Preço médio ponderado em tempo)**: Um preço médio sobre uma janela de negociação em vez de ler instantaneamente, usado como um oráculo on-chain especificamente porque é muito mais caro para manipular do que o preço spot de uma pool. Ver [Oráculos](./chapters/defi/oracles.md#oráculos-twap-preço-derivado-do-histórico-comercial-de-uma-amm).

## U

**UASF (Forquilha Macia Ativada pelo Usuário)**: Um soft fork ativado por operadores de nó que impõem novas regras em uma data definida, independente da sinalização de minerador. Ver [Soft forks ativados pelo usuário](./chapters/forks/uasf.md).

**UTXO (Saída de Transação Unspent)**: Uma saída específica de uma transação anterior ainda não gasta. Bitcoin não tem saldos de conta; o saldo de uma carteira é a soma de seus UTXOs gastáveis. Ver [O Modelo UTXO](./chapters/bitcoin/utxo.md).

**Unidade de conta**: Uma função do dinheiro: o padrão usado para medir e comparar o valor dos bens, dívidas e contratos. Ver [Funções do Dinheiro](./chapters/economics/functions-of-money.md).

**Taxa de utilização**: A fração dos depósitos de um mutuante atualmente emprestados, a variável que algorítmicamente impulsiona tanto depósitos quanto taxas de juros. Ver [Empréstimos](./chapters/defi/lending.md#taxas-de-juro-fixadas-por-utilização-não-por-decisão-central).

## V

**Validador**: participante cadastrado no consenso de prova de participação de Ethereum, apoiado por um depósito de 32 ETH, responsável por propor blocos e atestar. Ver [Validadores](./chapters/ethereum/validators.md).

**Velocidade do dinheiro**: Quantas vezes, em média, uma unidade monetária é gasta num determinado período. Ver [Oferta Monetária](./chapters/economics/money-supply.md).

**Prova de validade**: Uma prova criptográfica, apresentada ao lado de um lote rollup, demonstrando sua nova raiz de estado corretamente seguida do estado anterior e as transações do lote. Ver [Provas de Validade](./chapters/layer2/validity-proofs.md).

## W

**Webhook**: Um mecanismo de entrega HTTP usado por um serviço para notificar outro sistema de um evento, com autenticação, repetições e manipulação duplicada fornecida acima do transporte. Ver [Webhooks](./chapters/infrastructure/webhooks.md).

## Z

**Prova de conhecimento zero**: Um método para provar uma declaração é verdade sem revelar nada além desse fato. Ver [Provas de Conhecimento Zero](./chapters/cryptography/zero-knowledge.md).

**ZK rollup**: Um rollup que prova que sua transição de estado corrige antecipadamente com uma prova de validade, em vez de assumir a exatidão e confiar em um período de desafio. Ver [Rollups ZK](./chapters/layer2/zk-rollups.md).
