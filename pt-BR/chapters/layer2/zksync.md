# zkSync

zkSync Era, construída pela Matter Labs, lançou para fechar mainnet em outubro de 2022 e abriu ao público em março de 2023. Este capítulo cobre o que faz com que a abordagem técnica específica do zkSync seja distinta entre os rollups do ZK: ele não objetiva a equivalência exata do bytes EVM, e constrói a abstração da conta diretamente no próprio protocolo.

## Não equivalente a EVM, compatível com EVM

Lembrar [Provas de Validade](./validity-proofs.md#o-trabalho-do-provador-transformar-a-execução-num-circuito-de-prova): construir um zkEVM que prove a execução requer que a lógica de execução seja expressa como um circuito provável. Ao invés de construir um circuito que reproduz o exato formato de bytecode EVM opcode para opcode, o zkSync Era usa sua própria máquina virtual personalizada, e uma ferramenta de compilador baseada em LLVM que traduz o código fonte Solidity, Vyper e Yul diretamente no formato de instrução da VM personalizada. Isso significa que o código fonte de alto nível de um contrato é executado corretamente no zkSync Era, mas o bytecode exato compilado, e alguns casos de borda EVM de nível de byte que dependem do comportamento exato do opcode, podem diferir do que a mesma fonte produz em Ethereum L1 ou em um rollup equivalente a EVM, um tradeoff de compatibilidade significativamente diferente do que a equivalência de nível de bytecode Arbitrum's Nitro stack especificamente alvos (veja [Arbitrum](./arbitrum.md#lançar-e-reescrever-o-nitro)).

## Abstração da conta nativa

Ethereum L1 alcança abstração de conta (deixar uma conta ter lógica de validação programável em vez da verificação de assinatura de ECDSA fixa cada uso simples de EOA) através do ERC-4337, um padrão construído inteiramente em cima do modelo de EVM existente e conta sem exigir qualquer alteração de nível de protocolo, precisamente porque o protocolo base de Ethereum em si não o suporta nativamente. A VM personalizada do zkSync Era constrói essa capacidade diretamente no nível do protocolo: cada conta no zkSync Era pode implementar sua própria lógica de validação personalizada e pagamento de taxa como uma característica nativa de primeira classe, ao invés de exigir a infraestrutura adicional (bundlers, contratos de ponto de entrada) ERC-4337 precisa trabalhar em cima de um EVM não modificado. Isso permite que aplicativos zkSync-native construam lógica de conta personalizada, transações sem gás pagas por terceiros através de uma **pagador**, por exemplo, mais diretamente do que uma abordagem baseada em ERC-4337 em uma cadeia equivalente a EVM requer.

## O tradeoff este design específico representa

A abordagem do zkSync ilustra um tradeoff geral real entre os rollops ZK: uma VM personalizada construída com propósito para provas eficientes e características nativas como a abstração de conta pode superar e superar um projeto rígido equivalente ao EVM, ao custo de diferenças de compatibilidade sutis que podem importar para ferramentas, práticas de auditoria de segurança construídas em torno do comportamento exato do EVM, e contratos que dependem de semânticas EVM de nível preciso, em vez de apenas corrigir o comportamento de Solidity de alto nível.

## Conceitos errôneos comuns

**zkSync Era não é idêntico ao EVM do Ethereum**, embora os contratos comuns de Solidity geralmente funcionam corretamente sobre ele. "EVM-compatível" (comportamento de alto nível correto para a maioria dos contratos) e "EVM-equivalente" (execução de nível de bytecode idêntico) são reivindicações significativamente diferentes, e zkSync Era é o primeiro, não o último, uma distinção que vale a pena verificar para qualquer aplicação que se baseie no comportamento preciso, de baixo nível EVM.

**A abstração de conta nativa em zkSync não é o mesmo padrão que o ERC-4337.** Eles resolvem um problema subjacente similar (lógica de validação de conta programável) através de mecanismos arquiteturais diferentes; uma carteira ou aplicativo construído especificamente para um não funciona automaticamente com o outro sem adaptação.

## Outras leituras

- [Documentação do zkSync](https://docs.zksync.io/)
- [Documentação da abstração da conta do zkSync Era](https://docs.zksync.io/zksync-protocol/era-vm/account-abstraction)
- Ver também: [Rollups ZK](./zk-rollups.md), [Provas de Validade](./validity-proofs.md)

---

[← Anterior: Base](./base.md)
·
[Voltar à Camada 2](./README.md)
·
[Próximo: StarkNet →](./starknet.md)
