# Implantação

Realizar um contrato significa transmitir uma transação de criação de contratos (ver [Criação de Contratos](../evm/contract-creation.md)) e esperando que seja minado. Este capítulo final da seção Contratos cobre o fluxo de trabalho prático de implantação e a etapa de verificação que permite que outros confirmem o que realmente está sendo executado em um endereço implantado.

## Implementação com a Fundição

```bash
forge create --rpc-url $RPC_URL --private-key $PRIVATE_KEY src/Counter.sol:Counter
```

Isto compila `Counter.sol`, constrói uma transação de criação de contrato com o código compilado como seu `data` campo (recordar de [Criação de Contratos](../evm/contract-creation.md#create-endereço-determinado-pelo-remetente-e-nonce) que estes dados são *código init*, executado uma vez, cujo valor de retorno se torna o código de execução implantado), assina-lo com a chave fornecida, e transmite-lo através do endpoint RPC especificado (ver [Fornecedores de RPC](../web3/rpc-providers.md)). Para contratos com argumentos do construtor, Fundição `--constructor-args` flag ABI-encodes e adiciona-os aos dados da operação de implantação, exatamente o esquema de codificação abrangido [Contrato ABI](./abi.md#argumentos-de-codificação).

## Scripts de fundição: implantação como código

Para qualquer coisa além de um contrato simples, scripts de Fundição (escritos em Solidity, executado via `forge script`) deixar uma sequência de implantação (contrato de implantação A, implantar o contrato B com o endereço de A como um argumento construtor, chamar uma função de configuração em B) ser expressa como código de Solidity normal, testável em vez de uma sequência de comandos de shell manualmente, reduzindo o risco de um passo manual ser esquecido ou executado na ordem errada durante uma implantação real.

## Verificação do contrato

Uma vez implantado, a presença de um contrato é apenas um bytecode. Ninguém observando diretamente o blockchain pode dizer o código fonte que o produziu. **Verificação** (oferecido por exploradores de bloco como Etherscan, e cada vez mais padronizado através de cadeias) fecha esta lacuna: um desenvolvedor envia seu código fonte exato, versão do compilador e configurações de compilação; o explorador o recompila de forma independente e verifica se o resultado byte-for-byte corresponde ao bytes implantado. Uma combinação bem-sucedida permite ao explorador exibir o código fonte legível e um ABI correspondente para qualquer um que inspecione esse endereço, uma reivindicação real e controlável ("este bytes implantados realmente vem desta fonte legível por humanos"), não apenas uma afirmação que a equipe de implantação faz.

## Por que os endereços de implantação importam para CREATE vs. CREATE2

Lembrar [Criação de Contratos](../evm/contract-creation.md#create-endereço-determinado-pelo-remetente-e-nonce): o endereço de uma implantação normal depende do nonce do desdobrador no momento da implantação, o que significa que a reinstalação (após uma transação falhada, ou de um ambiente diferente) pode produzir um endereço diferente do esperado se outras transações da mesma conta acontecerem no meio. Projetos que precisam de previsibilidade de tratamento em várias cadeias ou tentativas de implantação (um requisito comum para [Camada 2](../layer2/README.md) infraestrutura e alguns protocolos DeFi) geralmente usam `CREATE2` com um sal fixo, escolhido especificamente para esquivar esta nonce-dependência inteiramente.

## Redes de ensaio e nós locais

Antes de implantar em uma rede real com valor real em jogo, a implantação é tipicamente testada em um nó local (Foundry's `anvil`, um nó Ethereum de corrida rápida e local com mineração instantânea de blocos) e, em seguida, uma rede de teste pública (uma rede separada, real usando éter de teste inútil, permitindo testes realistas de custos de gás, interação RPC, e timing multi-blocos sem risco financeiro), uma progressão encenada deste livro próprio [Web3](../web3/README.md) e mais tarde exemplos adjacentes à Solidity geralmente assumem, em vez de implantar diretamente para Ethereum mainnet como um primeiro passo.

## Conceitos errôneos comuns

**O código fonte de um contrato verificado não é uma garantia de exatidão ou segurança**. A verificação só confirma que a fonte exibida realmente compila para o bytecode implantado; não diz nada sobre se essa fonte está livre de bugs, backdoors intencionalmente deixados dentro por seu autor, ou os problemas de segurança abrangidos em [Segurança](../security/README.md).

**Implantar para uma rede de teste não é livre de riscos em todos os sentidos**, enquanto o éter testnet não tem valor monetário real, implementações testnet ainda pode ter reais custos de reputação ou coordenação se usado de forma descuidada (confusão de endereços entre implantações testnet e mainnet causou erros reais, documentados), e as orientações deste livro para nunca usar chaves reais ou fundos em exemplos aplica-se a chaves privadas testnet também, uma vez que uma chave testnet habitualmente reutilizada poderia ser reutilizada por engano para uma transação mainnet também.

## Outras leituras

- [Livro de fundição: Contratos de implantação](https://book.getfoundry.sh/forge/deploying)
- [Etherscan: Verificação do contrato](https://docs.etherscan.io/etherscan-v2/contract-verification)

---

[← Anterior: Teste](./testing.md)
·
[Voltar aos contratos inteligentes](./README.md)
·
[Próximo: O que é um Token? →](../tokens/README.md)
