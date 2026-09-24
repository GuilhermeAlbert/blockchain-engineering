# Contabilidade de gás

Este capítulo final da seção EVM reúne a mecânica do gás referenciada ao longo ([Gás](../ethereum/gas.md)'s finalidade geral, a assimetria de custo de armazenamento contra memória demonstrada com números reais em [Armazenamento](./storage.md)) nas regras reais de contabilidade: o que é cobrado antes da execução mesmo começa, e a fórmula específica por trás do custo quadrático da memória.

## Gás intrínseco: carregado antes de qualquer opcode executar

Cada transação paga um fixo **Custo intrínseco do gás** antes que o EVM execute um único opcode da chamada real: 21.000 gás como custo base (referenciado já em [Transações Ethereum](../ethereum/transactions.md#exemplo-construir-e-inspecionar-os-campos-de-uma-transação-com-viem)), mais gás por byte adicional de calldata (historicamente 4 gás por bytes zero, 16 gás por bytes não zero, seguindo [EIP-2028](https://eips.ethereum.org/EIPS/eip-2028)• redução do custo inicial, mais elevado não-zero-byte), acrescido de custos fixos adicionais para as transações de criação de contratos especificamente. Este custo intrínseco existe para cobrir a sobrecarga de base do processamento de qualquer transação (verificação de assinatura, verificação de validade básica) trabalho que acontece independentemente do que o próprio código da transação posteriormente faz.

## Expansão da memória: um custo específico e não linear

Como marcado em [Memória](./memory.md#a-expansão-da-memória-custa-gás-e-cresce-quadricamente), o custo de expandir a memória para uma nova contagem de palavras de maior acesso `n` a seguir:

```text
memory_cost(n) = 3n + floor(n² / 512)
```

O linear `3n` termo é barato e domina para uso de memória pequena; o quadrático `n²/512` o termo é negligenciável em pequenos tamanhos, mas cresce para dominar em grandes tamanhos, deliberadamente tornando as alocações de memória muito grandes desproporcionalmente caras.

```typescript
function memoryCost(words: number): number {
  return 3 * words + Math.floor((words * words) / 512);
}

for (const words of [1, 10, 100, 1000, 10000]) {
  console.log(`${words} words: ${memoryCost(words)} gas`);
}
```

Resultado verificado da execução deste código exato:

```text
1 words: 3 gas
10 words: 30 gas
100 words: 319 gas
1000 words: 4953 gas
10000 words: 225312 gas
```

Observe a proporção de gás para palavras: em 10 palavras é aproximadamente 3 gás/palavra (o termo linear domina); por 10.000 palavras é mais de 22 gás/palavra. Um aumento mais de sete vezes *marginal* taxa, puramente a partir do termo quadrático, exatamente o escalonamento deliberadamente desproporcionado descrito acima.

## Reembolsos: um mecanismo de redução

Contabilidade de gás Ethereum mais antiga oferecida **Restituições** para certas operações de redução do estado, mais notavelmente, limpar um espaço de armazenamento não-zero de volta para zero através `SSTORE`Isso criou um incentivo genuíno para limpar o estado não utilizado, mas também criou oportunidades reais e documentadas de jogo (contratos especificamente projetados para definir e limpar imediatamente grandes quantidades de armazenamento puramente para as restituições agrícolas, explorando a interação do mecanismo de reembolso com certos limites de gás de nível de transação). [EIP-3529](https://eips.ethereum.org/EIPS/eip-3529) (parte da mesma atualização de Londres que introduziu o EIP-1559) reduziu substancialmente esses reembolsos especificamente para fechar esse vetor de jogos, refletindo um padrão mais amplo que vale a pena notar: regras de contabilidade de gás não são fixadas para sempre no lançamento do Ethereum, eles foram revistos várias vezes como a comunidade identificou lacunas reais e exploráveis entre as regras como originalmente especificado e como atores sofisticados realmente se comportaram sob eles.

## Por que a contabilidade do gás continua mudando

Cada custo de gás mencionado em toda esta seção (21.000 para o custo de transação base, 20.000 para um frio `SSTORE`, 2,100 para uma gripe `SLOAD`, os valores específicos na fórmula da memória) reflectem uma calibração pontual específica, revista através da [Processo EIP](../governance/eips.md) como os padrões de uso do mundo real, os custos de hardware e as técnicas de exploração descobertas revelam lacunas entre os preços originais e a carga real de recursos ou efeitos de incentivo que diferentes operações criam. Este livro apresenta os valores atuais, documentados, mas trata-os como um instantâneo de um sistema contínuo, deliberadamente ajustável, não como uma constante de protocolo fixo permanentemente, digamos, a tampa de 21 milhões de Bitcoin é tratada dentro de seu próprio ecossistema.

## Conceitos errôneos comuns

**Os custos de gás não são proporcionais ao tempo de computação real em qualquer sentido literal e preciso**. Eles são aproximações econômicas calibradas para a carga de recursos (computação, armazenamento, largura de banda) cada operação lugares em cada nó, periodicamente recalibrado quando essa aproximação é encontrada para ser significativamente fora em qualquer direção para um opcode específico.

**Uma transação não é carregado gás para opcodes que ele nunca realmente executa**, um contrato com muitos ramos condicionais só paga para a execução do caminho específico realmente assume uma determinada chamada, não para cada caminho possível que o código poderia teoricamente seguir.

## Outras leituras

- [Papel Amarelo Ethereum](https://ethereum.github.io/yellowpaper/paper.pdf): Apêndice G (Fee Schedule)
- [EIP-3529: Redução das restituições](https://eips.ethereum.org/EIPS/eip-3529)
- [evm.codes](https://www.evm.codes/): custos de gás corrente, exato por opcode

---

[← Anterior: Criação de contratos](./contract-creation.md)
·
[Voltar ao EVM](./README.md)
·
[Próximo: Contratos inteligentes →](../contracts/README.md)
