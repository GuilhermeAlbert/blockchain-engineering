# ScriptPubKey e ScriptSig

[Bitcoin Script](./script.md) cobriu como a máquina de pilha executa. Este capítulo é uma visão geral de referência do script padrão **modelos** (os padrões específicos e reconhecidos de scripts de bloqueio e desbloqueamento que compõem a esmagadora maioria das transações reais do Bitcoin) antes dos próximos capítulos cobrirem os mais importantes (P2PKH, P2SH, SegWit, Taproot) em profundidade.

## Terminologia

- **scriptPubKey**: o script de bloqueio anexado a uma saída, especificando a condição para gastá-lo. O nome vem de sua forma histórica mais comum: um roteiro referenciando uma chave pública (ou um hash de um).
- **scriptSig**: o script de desbloqueio fornecido em uma entrada (pré-SegWit), satisfazendo o script de saída referenciadoPubKey. O nome vem de seu conteúdo histórico mais comum: uma assinatura.
- **testemunha**: para SegWit e Taproot gastam, os dados de desbloqueamento equivalentes ao scriptSig, mas armazenados em uma parte separada da transação em vez de em linha, veja [SegWit](./segwit.md).

## Os tipos de script padrão, de relance

| Tipo | Nome | Condições de bloqueio | Capítulo |
| --- | --- | --- | --- |
| P2PK | Pague à chave pública | Uma assinatura válida para uma chave pública específica e diretamente incorporada | Grandemente histórico; substituído por P2PKH |
| P2PKH | Pagar ao Hash Chave Pública | Uma assinatura válida e uma chave pública que corresponda a um hash específico | [P2PKH](./p2pkh.md) |
| P2MS | Uno Multisig | Assinaturas válidas M-of-N, diretamente | Grandemente substituído por P2SH-wraped multisig |
| P2SH | Pagar ao Hash do Programa | Fornecendo um script correspondente a um hash específico, que deve ser executado com sucesso | [P2SH](./p2sh.md) |
| P2WPKH | Pagar às Testemunhas de Jeová | Versão do SegWit do P2PKH | [SegWit](./segwit.md) |
| P2WSH | Pague ao hash do script das Testemunhas | Versão do P2SH do SegWit | [SegWit](./segwit.md) |
| P2TR | Pagar ao Taproot | Uma assinatura única de Schnorr (caminho-chave), ou revelar e satisfazer uma das várias alternativas de script pré-comprometidas (caminho-escrito) | [Taproot](./taproot.md) |

## Por que P2PK deu lugar a P2PKH

As transações mais antigas do Bitcoin, incluindo o [primeira transação a Hal Finney](../origins/early-bitcoin.md#a-primeira-transação-do-bitcoin), utilizado **P2PK**, um script de bloqueio que incorpora diretamente a chave pública completa do destinatário. Isto foi substituído quase imediatamente por **P2PKH**, que tranca a uma *haxixe* da chave pública (um endereço) em vez disso, por uma razão de segurança específica e concreta: um endereço esconde a chave pública real até que a saída seja gasta, significando um atacante (incluindo, em princípio, um computador quântico futuro suficientemente poderoso capaz de resolver o problema de logaritmo discreto da curva elíptica, veja [Curvas elípticas](../cryptography/elliptic-curves.md#multiplicação-escalar-e-o-problema-difícil)) não pode sequer começar a tentar derivar a chave privada de uma chave pública que ainda não é publicamente visível on-chain. A chave pública só é revelada no momento em que uma saída é gasta, não no momento em que é recebida. Esta distinção é discutida em [Resistência quântica](../security/README.md) Considerações abrangidas pela seção Segurança.

## Por que o P2SH existe

Antes do P2SH, um script de bloqueio teve que incorporar sua lógica de gasto total diretamente na saída (significando, por exemplo, um script multisig de saída 2 de 3 inteiro multisig teve que aparecer na transação *criação de* essa saída e o remetente (não o destinatário) suportaram o custo de dados on-chain dessa complexidade. **P2SH** (BIP 16, 2012) inverte isto: a saída apenas armazena um hash do script de gastos, e o script real só é revelado quando o resultado é gasto) empurrando a complexidade, e seu custo, para o gastador em vez do remetente, e deixando um remetente pagar um destinatário usando um script arbitrariamente complexo sem precisar saber ou se importar com o que esse script realmente é, apenas seu hash. Coberto totalmente em [P2SH](./p2sh.md).

## Conceitos errôneos comuns

**scriptSig e dados de testemunhas servem ao mesmo propósito funcional** (provando o direito de gastar). A diferença é puramente sobre *onde no formato serializado da transação* que os dados vivem, uma mudança estrutural introduzida pela SegWit por razões abrangidas [SegWit](./segwit.md#por-que-o-segwit-existe), não é uma diferença no que eles conseguem.

**Nem todas as saídas do Bitcoin usam um destes modelos padrão.** scripts não padrão são válidos por regras de consenso, desde que eles executem corretamente, mas a política de relé padrão dos nós Bitcoin Core não encaminhará transações não padrão por padrão. Uma regra política (ver [Regras de Consenso](../blockchain/consensus-rules.md#o-que-torna-uma-regra-uma-regra-política)), não uma restrição de consenso, significando que um minerador ainda poderia optar por incluir uma transação não padrão em um bloco que eles mesmos minam.

## Outras leituras

- [Referência do desenvolvedor do Bitcoin Core: Transações (scripts padrão)](https://developer.bitcoin.org/devguide/transactions.html)
- [BIP 16: Pagar a Hash de Script](https://github.com/bitcoin/bips/blob/master/bip-0016.mediawiki)

---

[← Anterior: Bitcoin Script](./script.md)
·
[Voltar para Bitcoin](./README.md)
·
[Próximo: P2PKH →](./p2pkh.md)
