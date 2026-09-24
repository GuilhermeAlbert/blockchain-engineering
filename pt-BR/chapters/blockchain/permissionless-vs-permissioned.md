# Sem Permissão vs Redes Permitidas

Nem todo sistema comercializado como "blockchain" compartilha a propriedade definidora da participação aberta do Bitcoin. Este capítulo faz precisamente a distinção, porque afeta quais das garantias cobertas ao longo desta seção (resistência à sibilos, resistência à censura, verificação sem confiança) realmente se aplicam a um determinado sistema.

## Redes sem permissão

A **sem permissão** blockchain permite que qualquer pessoa participe em suas funções principais (executando um nó completo, validando transações e (para sistemas de prova de trabalho ou prova de participação) participando na produção de blocos) sem precisar de aprovação de qualquer gatekeeper. Bitcoin e Ethereum são ambos sem permissão: qualquer um pode baixar o software, executar um nó, e, sujeito aos requisitos de recursos envolvidos (mening hardware, ou capital em jogo), participar em blocos de produção. Esta abertura é precisamente a razão pela qual estas redes necessitam de mecanismos de consenso específicos [Sistemas distribuídos](../distributed-systems/README.md). [Resistência do sibilo](../distributed-systems/sybil-attacks.md) é apenas um problema significativo para resolver quando alguém pode se juntar à vontade, que é exatamente a situação que os sistemas sem permissão criam.

## Redes autorizadas

A **autorizado** blockchain restringe quem pode participar, tipicamente a um conjunto conhecido, vetado de organizações, comuns em contextos empresariais e de consórcios (o rastreamento da cadeia de suprimentos entre um grupo de parceiros corporativos conhecidos, por exemplo, ou sistemas de liquidação interbancária entre instituições financeiras regulamentadas). Como o conjunto de participantes é conhecido e controlado com antecedência, sistemas autorizados podem usar protocolos clássicos de consenso tolerantes à falha bizantina (ver [Falhas Bizantinas](../distributed-systems/byzantine-faults.md) e [Consenso](../distributed-systems/consensus.md)) que assumem uma associação fixa e identificável, protocolos como PBFT tornam-se práticos precisamente porque o conjunto "quem pode ser desonesto" é limitado e conhecido, desviando-se do mais difícil problema de resistência sem permissão-Síbil.

## Comparando os dois diretamente

| | Permitido | Permitido |
| --- | --- | --- |
| Quem pode validar | Qualquer pessoa, sujeita ao custo dos recursos | Um conjunto conhecido, controlado e aprovado |
| Necessária resistência de Sybil | Sim (prova de trabalho, prova de participação ou similar) | Não realmente) a adesão já está controlada |
| Mecanismo de consenso típico | Consenso de Nakamoto (finalidade probabilística) ou variantes de prova de participação | BFT clássico (PBFT e derivados), muitas vezes determinística finalidade |
| Resistência à censura | Alto (nenhum gatekeeper pode excluir um participante | Menor) a(s) organização(ões) de controle determina(m) a adesão |
| Governança | Emergente, distribuída entre um grande conjunto de partes interessadas (ver [Governança](../governance/README.md)) | Acordo formal e contratual entre organizações membros conhecidas |
| Produção típica | Menor (constrangido pela necessidade de um consenso global aberto, ver [Escala de Bitcoin](../bitcoin-scaling/README.md)) | Muitas vezes mais alto (menos, mais rápido-comunicando, confiável- suficiente participantes) |

## Por que essa distinção importa quando se avaliam reivindicações de "blockchain"

Uma quantidade significativa de blockchain-adjacent marketing ao longo dos anos 2010 e 2020 descreveu sistemas autorizados, controlados por consórcios usando linguagem emprestada de Bitcoin e Ethereum, projeto de confiança minimizado ("descentralizado", "sem confiança", "resistente à censura") sem que esses sistemas realmente ofereçam as mesmas garantias, porque a segurança de um sistema autorizado, em última análise, ainda depende de confiar no conjunto específico e conhecido de organizações que o executam para não colidir. Isso não é necessariamente uma crítica de sistemas autorizados em seus próprios termos, para alguns casos de uso empresarial, um conjunto conhecido, responsável e avaliado de participantes é uma escolha de design perfeitamente razoável e até mesmo preferível, uma vez que pode oferecer maior rendimento e responsabilidade legal mais clara do que uma rede totalmente aberta. Mas é um modelo de segurança e confiança significativamente diferente do de Bitcoin, e conflitar os dois (assumindo uma "blockchain" autorizada oferece a mesma resistência de censura ou falta de confiança que Bitcoin simplesmente porque usa estruturas de dados subjacentes similares (blocos, hashes, uma cadeia) é um erro de categoria comum e consequente.

## Conceitos errôneos comuns

**Usar uma estrutura de dados estilo blockchain (blocos ligados por hashes) não faz automaticamente um sistema "descentralizado" ou "sem confiança".** Essas propriedades dependem do mecanismo de consenso e do modelo participante (especificamente, associação sem permissão combinada com consenso Sybil-resistente) não apenas em usar blocos ligados ao hash como um formato de armazenamento. Um sistema autorizado usando exatamente a mesma estrutura de dados bloco-e-hash como Bitcoin, mas controlado por um pequeno consórcio, oferece garantias de confiança fundamentalmente diferentes.

**"Private blockchain" é às vezes usado como um quase-sinônimo para "permissioned blockchain", mas os termos não são perfeitamente intercambiáveis** em todas as fontes, alguns usam "private" para descrever *ler* acesso (que pode ver os dados) como distinto de "permitido", que mais precisamente descreve *escrever/validar* acesso (que pode propor ou aprovar novos blocos). Este livro utiliza "permissão" especificamente para a distinção escrita/validadada acima, uma vez que essa é a propriedade que mais afeta diretamente as garantias de segurança discutidas ao longo desta seção.

## Outras leituras

- [Tolerância bizantina prática](http://pmg.csail.mit.edu/papers/osdi99.pdf): Castro & Liskov, 1999, o protocolo fundamental mais autorizado blockchain mecanismos de consenso
- Ver também: [Consenso](../distributed-systems/consensus.md), [Ataques de Sybil](../distributed-systems/sybil-attacks.md)

---

[← Anterior: Escolha do fork](./fork-choice.md)
·
[Voltar para Blockchain Fundamentos](./README.md)
·
[Próximo: Como funciona o Bitcoin →](../bitcoin/README.md)
