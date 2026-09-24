# Contratos Actualizáveis

[Contratos de proxy](./proxies.md) abrangeu o mecanismo DELEGATECALL que torna tecnicamente possível a atualização. Este capítulo abrange os padrões específicos construídos em cima desse mecanismo, e os tradeoffs da própria atualização, uma escolha genuína de design com custos reais, não uma melhoria inequívoca sobre a implantação imutável.

## Por que imutabilidade foi o padrão original, e por que isso é um custo real

Uma vez implantado, o bytecode de contrato comum não pode ser alterado. Esta foi, para grande parte da história inicial de Ethereum, tratada como um núcleo, propriedade valorizada: os usuários que interagem com um contrato poderiam confiar que sua lógica nunca mudaria por baixo deles, uma garantia proxies deliberadamente trocar. Este tradeoff é real e vale a pena afirmar claramente: os usuários de um contrato imutável têm certeza sobre o código com o qual estão interagindo para sempre; os usuários de um contrato atualizável têm que confiar em quem controla o mecanismo de atualização (ver [Controle de acesso](../security/access-control.md)) não introduzir lógica maliciosa ou simplesmente buggy em uma atualização futura, um pressuposto de confiança contratos imutáveis não exigem em tudo.

## Por que a atualização se tornou comum de qualquer maneira

O software do mundo real tem bugs, e um bug sério descoberto em um contrato imutável com valor real não tem remédio além de implantar um contrato inteiramente novo e pedir aos usuários para migrar, um processo lento, caro e às vezes praticamente impossível para um contrato com adoção significativa, difícil de coordenar. A atualização afasta a certeza da imutabilidade especificamente para fazer correções de bugs (e, mais contestavelmente, adições de recursos) possíveis sem exigir que cada usuário e sistema integrado migrassem para um novo endereço. Um benefício real, prático que tornou padrões atualizáveis comuns para exatamente o tipo de protocolos grandes, de alto valor, desenvolvidos ativamente [DeFi](../defi/README.md).

## Os três padrões mais comuns

- **Proxy Transparente**: o padrão desta seção [Contratos de proxy](./proxies.md) capítulo demonstrado, com uma regra adicionada para evitar uma ambiguidade específica: se o chamador é o administrador designado pelo proxy, as chamadas são encaminhadas para as próprias funções de administrador do proxy (como "alterar a implementação"; se o chamador é mais alguém, as chamadas são encaminhadas para a implementação, impedindo um cenário onde a própria chamada do administrador acidentalmente desencadeia a lógica de implementação com o mesmo seletor de função como uma função de administrador.
- **UUPS (Universal Upgradeable Proxy Standard)**: move a lógica de atualização *no próprio contrato de execução* em vez do proxy, tornando o proxy mais simples e mais barato de implantar (uma economia de gás real e significativa ao implantar muitos proxies apontando para a mesma implementação), ao custo de exigir que cada versão de implementação inclua corretamente a própria lógica de atualização. Esquecer de incluí-lo em uma nova implementação bloquearia permanentemente o proxy de quaisquer atualizações futuras.
- **Padrão de diamantes (EIP-2535)**: divide a lógica de um contrato em vários contratos de implementação ("facetas"), roteado pelo selector de função em vez de uma única implementação monolítica. Projetado especificamente para trabalhar em torno do limite de tamanho do contrato da Ethereum (ver [EIP-7954](../evm/opcodes.md#conceitos-errôneos-comuns) para os atuais, limites de tamanho mais recentes) para sistemas cuja lógica combinada de outra forma excederia o que um único contrato pode manter, ao custo de significativamente mais complexidade tanto na lógica de roteamento quanto no raciocínio sobre o comportamento completo do sistema em muitos contratos de faceta separada.

## O risco específico deste livro sinaliza explicitamente

Para além do risco de colisão de armazenagem já abrangido [Contratos de proxy](./proxies.md#risco-de-colisão-de-armazenamento), atualização concentra o poder real em quem controla o mecanismo de atualização, uma chave de administrador comprometida ou maliciosa pode redirecionar um proxy para lógica arbitrária, hostil, potencialmente drenando os fundos de cada usuário em uma única transação. É precisamente por isso que implantações sérias e conscientes de segurança, geralmente colocam a autoridade de atualização atrás de uma **timelock** (um atraso obrigatório entre propor e executar uma atualização, dando aos usuários tempo para notificarem e saírem caso discordem) e/ou **Votos multisig ou DAO** (ver [DAOs](../governance/daos.md)) em vez de uma única chave privada, de carácter individual, uma mitigação real e documentada de uma categoria de risco real e documentada, [Riscos de atualização](../security/upgrade-risks.md).

## Conceitos errôneos comuns

**"Atualizável" não é um nível de risco único e uniforme**, um contrato atualizável apenas por um voto DAO de 30 dias e um contrato atualizável instantaneamente pela chave privada de um indivíduo são ambos tecnicamente "atualizáveis" no mesmo sentido, mas representam perfis de risco dramaticamente diferentes do mundo real; avaliar a segurança real de um contrato atualizado requer verificação *que* controla a atualização e *sob que restrições*, não apenas se existe ou não atualização.

**Escolher imutabilidade não é automaticamente a escolha "mais segura" em todos os casos**Ele remove o risco de confiança relacionado com a atualização, mas exclui permanentemente qualquer remédio para um bug descoberto após a implantação; qual tradeoff é mais apropriado depende do propósito do contrato específico, tempo de vida esperado, e da maturidade de sua lógica no momento da implantação.

## Outras leituras

- [OpenZeppelin: Padrão de Atualização de Proxy](https://docs.openzeppelin.com/upgrades-plugins/proxies)
- [EIP-1822: Padrão Proxy Universal Upgradeable (UUPS)](https://eips.ethereum.org/EIPS/eip-1822)
- [EIP-2535: Diamantes, Proxy multifacetado](https://eips.ethereum.org/EIPS/eip-2535)

---

[← Anterior: Contratos de Proxy](./proxies.md)
·
[Voltar aos contratos inteligentes](./README.md)
·
[Próximo: Teste →](./testing.md)
