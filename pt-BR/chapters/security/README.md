# Segurança Blockchain

Os sistemas blockchain falham nos limites. Uma assinatura pode ser matematicamente válida e ainda autorizar um roubo. Um contrato pode executar exatamente como escrito enquanto viola a suposição econômica que seus desenvolvedores pretendiam codificar. Uma ponte pode executar contratos corretos e ainda falhar porque chaves de validação suficientes foram comprometidas. O trabalho de segurança começa nomeando o ativo, a autoridade que pode movê-lo, e cada suposição entre a intenção de um usuário e a transição final do estado.

Esta seção segue esses limites do usuário para dentro. Começa com chaves, frases de recuperação, phishing, assinaturas e aprovações de tokens. Em seguida, cobre falhas de contrato, ordens de transação, pontes, atualizações, auditorias e verificação formal. Os capítulos descrevem ataques o suficiente para explicar a falha da engenharia e sua mitigação. Eles não fornecem instruções operacionais para direcionar sistemas vivos.

## Um modelo de ameaça de trabalho

Um modelo de ameaça responde a quatro perguntas antes de alguém escolher uma ferramenta:

1. **O que deve permanecer protegido?** Chaves privadas, autoridade de retirada, controle de governança, integridade de preços, invariantes contábeis, disponibilidade e dados confidenciais do usuário são ativos diferentes.
2. **Quem pode atuar?** Usuários, administradores, validadores, sequenciadores, relés, operadores de oráculos, contratos externos, frontends comprometidos e atacantes têm capacidades diferentes.
3. **Em que se deve confiar?** Código, hardware, estado do navegador, DNS, serviços off-chain, sinais multisig, chaves de atualização, feeds de dados e incentivos econômicos podem estar dentro do limite de confiança.
4. **Como é que o fracasso aparece?** O roubo é apenas um resultado. Os fundos podem ser congelados, a contabilidade pode derivar, as retiradas podem tornar-se insolvente, a governança pode empatar, ou um serviço pode devolver dados obsoletos enquanto parece saudável.

O mesmo componente pode ser seguro sob um modelo e inseguro sob outro. Um único administrador pode ser aceitável para um protótipo local e imprudente para um contrato que detenha depósitos públicos. Um preço ponderado em tempo pode resistir à manipulação de um bloco, mas permanecer errado durante uma luxação prolongada do mercado. As reivindicações de segurança precisam da suposição anexada.

## Capítulos

1. [Roubo de Chave Privada](./private-key-theft.md): como a autoridade de assinatura é copiada, abusada e contida
2. [Roubo de Frase de Sementes](./seed-phrase-theft.md): por que uma frase de recuperação é um segredo mestre portátil
3. [Phishing](./phishing.md): como os atacantes substituem a interface, o destino ou solicitam a aprovação de um usuário
4. [Assinaturas Maléficas](./malicious-signatures.md): criptografia válida ligada ao significado hostil
5. [Ataques de aprovação](./approval-attacks.md): autoridade simbólica persistente e os limites da revogação
6. [Reentrância](./reentrancy.md): fluxo de controle externo antes da liquidação da contabilidade interna
7. [Controle de acesso](./access-control.md): papéis, caminhos de administração, inicialização e menos privilégio
8. [Insetos Inteiros e Precisão](./precision.md): unidades, sentido de arredondamento, truncamento e deriva contabilística
9. [Manipulação do Oracle](./oracle-manipulation.md): quando um contrato confia num preço que um atacante pode mover
10. [Flash Empréstimo Ataca](./flash-loan-attacks.md): capital atômico como um amplificador em vez de uma causa raiz
11. [Execução frontal](./front-running.md): visibilidade da transação e ordenação adversarial
12. [MEV](./mev.md): valor extraído através da inclusão, exclusão e ordenação
13. [Explorações da Ponte](./bridge-exploits.md): compromisso de sinal, falha de verificação e replay entre cadeias
14. [Riscos de atualização](./upgrade-risks.md): lógica mutável, compatibilidade de armazenamento e autoridade concentrada
15. [Auditoria inteligente de contratos](./auditing.md): o que uma revisão pode encontrar e o que não pode provar
16. [Verificação formal](./formal-verification.md): provando propriedades de um modelo contra uma especificação escrita

## Outras leituras

- [Considerações relativas à segurança da solidez](https://docs.soliditylang.org/en/latest/security-considerations.html)
- [Ethereum.org segurança inteligente contrato](https://ethereum.org/developers/docs/smart-contracts/security/)
- [Documentação dos contratos OpenZeppelin](https://docs.openzeppelin.com/contracts/)
- [Ethereum.org verificação formal](https://ethereum.org/developers/docs/smart-contracts/formal-verification/)

---

[← Anterior: Starknet](../layer2/starknet.md)
·
[Voltar ao Conteúdo Completo](../../SUMMARY.md)
·
[Próximo: Chave privada Roubo →](./private-key-theft.md)
