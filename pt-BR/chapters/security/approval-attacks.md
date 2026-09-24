# Ataques de aprovação

A propriedade do token e a autoridade de despesa do token são estados separados. Um titular de ERC-20 pode autorizar um gastador com `approve`, após o qual o gastador chama `transferFrom`. ERC-721 e ERC-1155 expõem permissões de operador comparáveis. Um gastador malicioso ou comprometido pode usar essa autoridade permanente sem outra assinatura do proprietário.

## Que alterações de aprovação

Para o ERC-20, o subsídio mapeia um proprietário e um gastador a um montante. O gastador pode transferir até o restante subsídio, sujeito ao saldo do proprietário. Aplicações muitas vezes pedem o máximo `uint256` Valor para que as interações futuras não exijam outra transação de aprovação. Isso reduz o atrito e o gás, mas deixa a autoridade após o swap, depósito ou hortelã ter terminado.

Os padrões NFT podem autorizar um token ou definir um operador para cada token em uma coleção. Uma frase como “definir a aprovação para todos” descreve uma ampla mudança na autoridade, não uma etapa de conexão de rotina.

Uma aprovação não transfere os ativos por si só. A transferência posterior pode ocorrer em uma transação separada, iniciada pelo contrato aprovado ou qualquer conta capaz de fazê-lo exercer sua autoridade. Essa separação explica por que uma carteira pode ser drenada muito tempo após o usuário ter visitado o site que criou a aprovação.

## Gastador legítimo, compromisso posterior

O gastador não precisa ser malicioso quando a aprovação é concedida. Seu contrato pode mais tarde receber um upgrade defeituoso, perder uma chave de administrador, expor um bug de controle de acesso ou chamar uma integração insegura. Um subsídio ilimitado transforma esse compromisso de contrato posterior em um risco usuário-carteira.

As licenças também sobrevivem às mudanças de interface. Remover um botão de um site, desconectar uma carteira, limpar dados do navegador ou excluir um aplicativo não modifica o estado de aprovação on-chain.

## Corridas de aprovação e padrões mais seguros

O ERC-20 original `approve` interface permite um problema de ordenação ao mudar uma licença não zero para outro valor não zero. O esbanjador que observar a mudança pendente pode gastar o subsídio antigo antes da atualização, então reter o subsídio novo depois. Algumas interfaces fixam a margem como zero primeiro. As funções de incremento e decremento podem expressar alterações mais precisamente quando o token as suporta.

As licenças baseadas na assinatura eliminam uma transação de aprovação separada, mas não eliminam a autoridade. Passam a autorização para uma mensagem assinada. A licença precisa de um nonce, prazo, correta separação de domínio, e um gastador e quantidade que o usuário pode verificar.

As aplicações podem reduzir a exposição solicitando a quantidade necessária para a operação atual, evitando a aprovação NFT em toda a coleção quando um método mais restrito funciona, e tornando o endereço gastador visível. Os usuários podem revisar e revogar aprovações antigas através de um explorador confiável ou ferramenta de aprovação.

## Limites de revogação

A revogação define a autoridade futura como zero ou desativa um operador. Não reverte as transferências concluídas. Ele também pode ser de primeira execução se um atacante já controla o gastador ou uma licença assinada utilizável. A transferência de ativos para uma conta nova pode ser mais segura após amplo compromisso, mas as funções contratuais, identidades e ordens assinadas pendentes precisam de revisão separada.

Os painéis de aprovação dependem de dados de cadeia indexados. Verifique a cadeia, token, proprietário, gastador e transação antes de assinar a própria revogação.

## Outras leituras

- [EIP-20: Padrão de Token](https://eips.ethereum.org/EIPS/eip-20)
- [EIP-721: Norma de Token não-Fungível](https://eips.ethereum.org/EIPS/eip-721)
- [EIP-1155: Padrão Multi Token](https://eips.ethereum.org/EIPS/eip-1155)
- [Ethereum.org ajuda fraude e revogação aprovação](https://ethereum.org/community/support/scams/)
- Ver também: [Subsídios e homologações](../tokens/approvals.md), [EIP-712](../web3/eip-712.md)

---

[← Anterior: Assinaturas maliciosas](./malicious-signatures.md)
·
[Voltar à Segurança](./README.md)
·
[Próximo: Reentrância →](./reentrancy.md)
