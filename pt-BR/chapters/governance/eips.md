# EIP

Propostas de Melhoria Ethereum documentam normas e mudanças para Ethereum. Os EIP principais dizem respeito ao comportamento do protocolo. Os ERC definem convenções de nível de aplicação. As propostas de rede e interface cobrem as respectivas camadas. Estatuto final significa que o documento completou o seu processo de normalização, não que cada aplicação deve usá-lo.

## Fluxo de trabalho

EIP-1 pede aos autores que discutam uma ideia antes de apresentar uma proposta formal. Os editores verificam o formato e o processo. Uma proposta rastreada passa por Rascunho, Revisão, Última Chamada e Final quando sua especificação estabiliza e a revisão completa. O trabalho inativo pode tornar-se estagnante; os autores podem retirar propostas; Os documentos vivos permanecem abertos à revisão por design.

Editores mesclam documentos de qualificação, mas não ativam EIPs principais. As mudanças principais precisam de interesse do cliente, implementações, testes, coordenação e inclusão em uma atualização de rede. EIP-1 identifica AllCoreDevs como um local para os implementadores discutirem mérito técnico e coordenarem versões compatíveis.

## Principais EIP e CEI

Um EIP principal pode alterar a validade da transação, contabilidade de gás, opcodes, consenso ou rede. Sua implantação afeta nós e pode requerer ativação em um fork nomeado. Um ERC define contratos de convenção e aplicativos podem escolher, como interfaces de token. O ERC-20 tornou-se útil porque contratos, carteiras e trocas o adotaram, não porque o repositório EIP pudesse forçar o cumprimento.

Alguns EIPs cobrem camadas ou dependem de outros. Ler o `requires` campo, discussões, casos de teste e status de implementação do cliente. Uma interface pode ser Final enquanto contratos comuns implementam extensões ou desvios que os chamados devem lidar.

## Estado não mede a segurança

Final indica maturidade da especificação. Não certifica uma execução, auditoria de um contrato, resolução de objeções de governança ou adoção de garantias. Uma proposta pode ser tecnicamente completa e economicamente controversa. Por outro lado, uma convenção amplamente utilizada pode continuar a evoluir através de PIP posteriores.

## Outras leituras

- [EIP-1: Objetivo e Orientações do EIP](https://eips.ethereum.org/EIPS/eip-1)
- [Todas as propostas de melhoria Ethereum](https://eips.ethereum.org/all)
- Ver também: [Atualizações de Protocolos](../forks/upgrades.md), [Padrões de Token](../tokens/README.md)

---

[← Anterior: BIP](./bips.md)
·
[Voltar à Governança](./README.md)
·
[Próximo: Desenvolvedores Principais →](./core-developers.md)
