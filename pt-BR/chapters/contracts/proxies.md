# Contratos de proxy

Um contrato proxy encaminha cada chamada que recebe para um contrato de implementação separado, usando [DELEGATECALL](../evm/message-calls.md#delegatall-código-emprestado-seu-próprio-contexto) então o código da implementação executa contra o próprio armazenamento do proxy. Este capítulo constrói uma versão mínima e funcional desse padrão e cobre o risco específico que torna genuinamente fácil errar.

## Um proxy mínimo e funcional

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract MinimalProxy {
    address public implementation;

    constructor(address _implementation) {
        implementation = _implementation;
    }

    fallback() external payable {
        address impl = implementation;
        assembly {
            calldatacopy(0, 0, calldatasize())
            let result := delegatecall(gas(), impl, 0, calldatasize(), 0, 0)
            returndatacopy(0, 0, returndatasize())
            switch result
            case 0 { revert(0, returndatasize()) }
            default { return(0, returndatasize()) }
        }
    }
}
```

Verificado: isto compila-se perfeitamente com solc 0.8.26. O conjunto em linha (Yul, linguagem intermediária de baixo nível da Solidity) é necessário aqui especificamente porque a sintaxe ordinária da Solidity não tem como encaminhar dados de retorno arbitrários, desconhecidos e arbitrários, desconhecidos para um `DELEGATECALL` e para trás. O proxy precisa funcionar corretamente para *qualquer* função sobre a implementação, incluindo aqueles que nunca foi compilado com conhecimento de, que é exatamente o encaminhamento genérico deste bloco de montagem implementa: copiar calldata de entrada, `delegatecall` a implementação, copiar o que quer que tenha retornado (ou reverter com qualquer erro que tenha produzido).

## Risco de colisão de armazenamento

Este é o perigo da introdução deste capítulo sinalizado diretamente. Porque... `DELEGATECALL` faz com que o código de implementação funcione na **disposição de armazenamento do próprio proxy** (recordar [Armazenamento](../evm/storage.md#disposição-de-armazenamento-para-tipos-complexos): variáveis de estado ocupam slots de armazenamento em ordem de declaração), o proxy e a implementação devem concordar, precisamente, em que slot de armazenamento cada variável ocupa (se o proxy declarar `address public implementation` na faixa 0, e no contrato de execução *também* declara sua própria variável de estado no que pensa ser o slot 0 (talvez um token's `totalSupply`), o código da implementação irá ler e escrever o proxy's `implementation` variável de endereço, pensando que está escrevendo `totalSupply`) uma categoria genuína e documentada de vulnerabilidade de contratos inteligentes, não uma preocupação hipotética.

```text
Proxy's storage:                Implementation's code, run via DELEGATECALL,
  slot 0: implementation addr    thinks slot 0 holds:
                                    totalSupply  ← WRONG — actually overwrites
                                                    the proxy's implementation
                                                    address, potentially redirecting
                                                    all future calls anywhere
                                                    the attacker chooses
```

## Como os padrões reais de proxy evitam isso: armazenamento não estruturado

Padrões de procuração da produção (nomeadamente [EIP-1967](https://eips.ethereum.org/EIPS/eip-1967), os contratos atualizados padrão do OpenZeppelin e as implementações proxy mais auditadas seguem) evitar esta colisão, armazenando o endereço de implementação (e outros dados específicos do proxy) em um **espaço de armazenamento pseudo-random, deliberadamente improvável-para-colide**, calculado como algo como `keccak256("eip1967.proxy.implementation") - 1`, em vez de na slot 0 ou qualquer outro número de slot baixo e facilmente colidido, um contrato de implementação simples pode naturalmente usar para sua própria primeira variável declarada. É precisamente por isso que o proxy mínimo acima, armazenando `implementation` no slot natural 0, é uma genuína simplificação de ensino, não algo para implantar para o valor real. Uma implantação real precisa da convenção de slots EIP-1967 (ou um equivalente) especificamente para fazer colisão com as próprias variáveis da implementação astronomicamente improvável em vez de um risco real, vivo.

## Conceitos errôneos comuns

**Um padrão proxy não faz um contrato "o mesmo contrato" que sua implementação em todos os sentidos**. O proxy tem seu próprio endereço (que é o que os usuários e outros contratos realmente interagem), seu próprio armazenamento, e seu próprio equilíbrio; apenas o *código de execução* vem da implementação, emprestado via `DELEGATECALL` durante a duração de cada chamada.

**Mudar para qual implementação um proxy aponta não é, por si só, sempre evidência de intenção maliciosa** (legítimos, sistemas bem governados e atualizáveis fazem isso rotineiramente e muitas vezes de forma transparente (frequentemente atrás de um bloqueio de tempo ou multisig, veja [Multisig](../wallets/multisig.md)) para corrigir bugs ou adicionar recursos; o mesmo mecanismo, em um sistema mal projetado ou mal-operado, também pode ser usado para o rug-pull usuários trocando em lógica arbitrária, hostil) o mecanismo em si é neutro, e o que realmente governa *que* pode alterar a implementação (ver [Controle de acesso](../security/access-control.md)) é o que determina se a atualização de uma implantação específica é um recurso de segurança ou um risco.

## Outras leituras

- [EIP-1967: Slots de armazenamento de proxy padrão](https://eips.ethereum.org/EIPS/eip-1967)
- [OpenZeppelin: Padrão de Atualização de Proxy](https://docs.openzeppelin.com/upgrades-plugins/proxies)

---

[← Anterior: Bibliotecas](./libraries.md)
·
[Voltar aos contratos inteligentes](./README.md)
·
[Próximo: Contratos atualizáveis →](./upgrades.md)
