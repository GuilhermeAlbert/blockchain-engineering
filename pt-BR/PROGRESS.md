# Acompanhamento editorial

Este arquivo registra o estado de cada seção da edição brasileira. Estados possíveis: `Planejada`, `Em redação`, `Em revisão` e `Completa`.

Uma seção só recebe o estado `Completa` quando todos os capítulos existem, têm conteúdo substantivo, seguem as regras editoriais e não contêm links internos quebrados.

| Seção | Estado | Notas |
| --- | --- | --- |
| Origens | Completa | 10 capítulos + README. Fonte de whitepaper, mailing-list arquivos, e registro judicial (decisão Wright). |
| Economia | Completa | 26 capítulos + README. Economia austríaca fonte de textos primários; reivindicações sobre Bitcoin explicitamente separados do que cada economista escreveu. |
| Criptografia | Completa | 15 capítulos + README. Todos os exemplos de código são executados e verificados (Node crypto + @noble/curves v2.x). |
| Sistemas distribuídos | Completa | 9 capítulos + README. Whitepaper Seção 11 fórmula computada e verificada de forma independente contra tabela publicada. |
| Fundamentos da Cadeia de Blocos | Completa | 12 capítulos + README. |
| Bitcoin | Completa | 37 capítulos + README. A seção mais profunda do livro. Todos os exemplos numéricos/código verificados pela execução. |
| Forks | Completa | 13 capítulos + README. Estudos de caso verificados (datas/altura de bloco verificada); um pseudônimo fabricado-para-nome real atribuído capturado e corrigido durante a elaboração. |
| Carteira | Completa | 15 capítulos + README. Todos os exemplos derivativos/mnemônicos são executados e verificados (@scure/bip39, @scure/bip32); usa apenas o vetor de teste oficial BIP-39 ou chaves de teste triviais, nunca entropia real. |
| Escala de Bitcoin | Completa | 10 capítulos + README. Distingue os modelos de confiança (federação/estatechain/BitVM) cuidadosamente em vez de tratar "Layer 2" como uma categoria. |
| Raios | Completa | 9 capítulos + README. Um erro de citação capturado (BOLT 13 vive fora do núcleo raio / parafusos repo como um rascunho) e corrigido. |
| Ethereum | Completa | 19 capítulos + README. Exemplos vivos de JSON-RPC e viem verificados contra dados reais da mainnet; fórmula de taxa base EIP-1559 computada e verificada independentemente. |
| EVM | Completa | 9 capítulos + README. Cada exemplo de bytecode executado contra uma implementação EVM real (@ethereumjs/evm), incluindo uma medição real do custo de gás SSTORE/SLOAD. |
| Contratos | Completa | 15 capítulos + README. Quase todos os trechos de Solidity não trivial compilados com solc 0.8.26 e confirmados limpos, incluindo um proxy mínimo de trabalho com montagem em linha Yul. |
| Tokens | Completa | 11 capítulos + README. Todas as interfaces/contratos compilam com solc 0.8.26; o endereço real da rede principal da WETH verificado ao vivo via viem (retorna o nome/symbol corretamente). |
| Web3 | Completa | 12 capítulos + README. Quase todos os exemplos não navegadores correm ao vivo contra mainnet (receitos, eth getLogs, EIP-712, EIP-191 round-trip). |
| DeFi | Completa | 22 capítulos + README. Perda impermanente e deslize constante-produto derivado e verificado numericamente em vários cenários; estudos de caso de protocolo (Uniswap, Aave, MakerDAO/Sky, Curve) verificados de fato contra fontes primárias, incluindo datas exatas e a causa raiz do compilador Vyper julho 2023. |
| Camada 2 | Completa | 18 capítulos + README. EIP-4844 fórmula de taxa de base blob independentemente computado e verificado contra uma gama de cenários de excesso de demanda; rollup reivindicações de descentralização (o status BOLD de Arbitrum, Stage 1 da Base) verificado contra fontes atuais, datadas em vez de pressupostos de era de lançamento. |
| Segurança | Completa | 16 capítulos + README. Modelos de ameaça, análise de incidentes, falhas de contrato, risco de ponte, segurança operacional e testes de defesa. |
| Infraestruturas | Completa | 14 capítulos + README. Operação de nós, RPC, indexação, manipulação de reorg, observação, backups e infraestrutura chave. |
| Governança | Completa | 10 capítulos + README. Processos BIP e EIP, diversidade de clientes, DAOs, tesouros, votação, bloqueios de tempo e risco de captura. |
| Sociedade | Completa | 9 capítulos + README. Custódia, privacidade, KYC/AML, sanções, tributação, CBDCs, inclusão e trocas ambientais. Âmbito de aplicação regulamentar de 24 de Setembro de 2026. |
| Glossário | Completa | Abrange o vocabulário técnico, econômico, de governança, de segurança e regulatório utilizado em todo o livro. |
| Recursos | Completa | Especificações primárias, artigos, documentação oficial e estudo posterior por tópico. |
| exemplos/simples-blockchain | Completa | TipoScript, executável (`npm run demo` / `npm test`), 8/8 testes passando, tipo de verificação limpo. |
| exemplos/bitcoin | Completa | Descodifica dados reais, verificados on-chain tx / block (txid + block hash + PoW alvo todos confirmados para corresponder). Variante Live-fetch incluído. 7/7 testes a passar. |
| exemplos/estatísticas da carteira | Completa | Live CLI lendo saldos reais/contagem de tx/status de contrato/taken balances. 4/4 testes passar contra dados mainnet ao vivo. Encontrada e documentada uma verdadeira lacuna de detecção EIP-7702 durante os testes. |
| exemplos/ethereum-rpc | Completa | Projeto de aprendizagem RAW JSON-RPC com dispositivos determinísticos. 7/7 testes de passagem e verificação de tipo limpo. |
| Exemplos/solidariedade | Completa | Compila Solidity, inspeciona ABI e bytecode, e explica falhas no compilador. 6/6 testes de passagem e verificação de tipo limpo. |
| exemplos/defi | Completa | Constante-produto AMM com taxas, aspas de saída exata, limites de deslizamento, e verificações invariantes. 7/7 testes de passagem e verificação de tipo limpo. |
| exemplos/indexador | Completa | Reorg-safe índicer de eventos com checkpoints, rollback, replay e idempotência. 8/8 testes de passagem e verificação de tipo limpo. |

## Verificação

- Os nomes de arquivo não têm prefixos numéricos. A ordem de leitura vem do sumário e dos links de navegação.
- Cada capítulo termina com links para o capítulo anterior, o índice da seção e o capítulo seguinte.
- Execute `node scripts/check-book.mjs --edition pt-BR --parity-with .` depois de alterar capítulos, navegação ou sumário.
- Execute `node scripts/check-book.test.mjs` depois de alterar o verificador do livro.
- Evite travessões decorativos. Use a pontuação que a frase pedir.
