# Redes de pares a pares

O Bitcoin não tem servidor. Não há nenhuma máquina central à qual os clientes se conectem, nenhuma empresa operando a rede, nenhum ponto único que possa ser desligado para pará-la. Em vez disso, cada participante executa software que se conecta diretamente a um número de outros participantes, formando uma malha onde cada nó é simultaneamente um cliente e um servidor. Este capítulo cobre o que essa arquitetura realmente significa na prática, antes que capítulos posteriores construam consenso e finalidade em cima dela.

## O problema

Uma arquitetura cliente-servidor (um navegador web falando com servidores de uma empresa) é simples de construir e raciocinar, mas tem uma fraqueza estrutural para um sistema como Bitcoin: quem controla o servidor controla o sistema. Eles podem negar o serviço a usuários específicos, alterar registros ou desligar todo o serviço, e os usuários não têm nenhum recurso além de confiar no bom comportamento continuado do operador. Isto é exatamente o [terceiros de confiança](../origins/digital-cash.md#o-terceiro-de-confiança) problema Bitcoin foi projetado para evitar.

**P2P** rede remove o servidor central especial: cada nó roda o mesmo software, segue as mesmas regras de protocolo, e se conecta a um conjunto de outros nós como iguais. Nenhum nó tem autoridade privilegiada arquitetural sobre qualquer outro, o que não significa que todos os nós têm igual *influência* (mineradores com mais poder de hash têm mais influência sobre quais blocos são construídos sobre [Consenso](./consensus.md)), apenas que nenhum nó tem um papel especial protocolo-nível como "o servidor" que outros devem passar.

## Como funciona

Quando um nó Bitcoin inicia, ele precisa encontrar outros nós para se conectar, um processo chamado **descoberta por pares**Bitcoin O núcleo utiliza vários mecanismos para isso:

- **Sementes de DNS**: um pequeno número de nomes de domínio codificados, operados por voluntários confiáveis, que retornam uma lista de endereços IP de nó atualmente ativos quando questionados, usados principalmente para iniciar as primeiras conexões de um nó novinho.
- **Nós de sementes com código rígido**: uma lista secundária de endereços de nó conhecidos-estáveis incluídos diretamente no software, usado se as sementes DNS são inalcançáveis.
- **Fofoca de endereços (`addr` mensagens)**: uma vez conectado a até mesmo alguns pares, um nó pode pedir-lhes os endereços de outros nós que eles conhecem, e propagar endereços que ele aprende para seus próprios pares, a lista de nós alcançáveis da rede se espalha organicamente através da malha em si, em vez de através de qualquer diretório central.

Uma vez conectado, um nó tipicamente mantém um número modesto de conexões por pares ativadas (o padrão do Bitcoin Core é de 8 conexões de saída, além de conexões adicionais de entrada até um limite configurável) (deliberadamente muito menos do que o tamanho total da rede, porque conectividade completa de nó com qualquer outro nó seria impraticável em escala, e não é necessário: informação (novas transações, novos blocos) atinge toda a rede por **propagação**) cada nó encaminha o que recebe para seus próprios pares, que encaminham para o deles, então um pedaço de dados atinge toda a rede dentro de um pequeno número de saltos, semelhante a como um rumor se espalha através de um grande grupo, mesmo que nenhuma pessoa diz a todos diretamente.

```text
        Node A ─────── Node B
          │  ╲         ╱  │
          │    ╲     ╱    │
          │      ╲ ╱      │
        Node D ─── X ─── Node C
          │      ╱ ╲      │
          │    ╱     ╲    │
          │  ╱         ╲  │
        Node E ─────── Node F

Every node connects to a handful of others, not all of them.
A new transaction broadcast by Node A reaches every node within a few hops,
without any central server relaying it.
```

## Exemplo: questões de temporização de propagação

Quando Node A ouve sobre uma nova transação, valida-a contra suas próprias regras de mempool e consenso (ver [O Mempool](../bitcoin/mempool.md)) e, se válido, transmite-o para os seus pares, que cada um faz o mesmo. Isto significa que um pedaço de dados não chega a cada nó simultaneamente. Chega em diferentes momentos, dependendo da topologia e latência da rede, uma consequência inevitável de uma rede descentralizada sem ponto central de transmissão. Este atraso de propagação não é apenas um detalhe de desempenho; é a causa direta de [Reorganizações da Cadeia](../blockchain/reorgs.md), uma vez que dois mineradores podem cada um encontrar um bloco válido dentro de segundos um do outro, antes que qualquer bloco tenha terminado de se propagar para toda a rede, temporariamente dividindo que bloqueia diferentes partes da rede considerar a ponta atual.

## Sob o capô: o protocolo

Os nós Bitcoin comunicam usando um protocolo de fio definido (documentado na referência do desenvolvedor do Bitcoin Core), tipos de mensagem específicos incluindo `version` (trocado quando dois nós se conectam pela primeira vez, negociando versão de protocolo e capacidades), `inv` (anunciando que um nó tem novos dados, como uma transação ou bloco, disponíveis), `getdata` (que solicitam esses dados), `tx` (uma transação), e `block` (um bloco completo). Este padrão de requisição/resposta (anunciar, em seguida, deixar os pares interessados solicitar os dados completos) evita desnecessariamente re-enviar dados grandes (como blocos completos) para pares que já o têm através de outro caminho, um detalhe de eficiência que importa na escala de rede real do Bitcoin.

## Comércio

Uma arquitetura peer-to-peer remove o único ponto de controle e falha que um modelo cliente-servidor tem, a custos reais, mensuráveis: propagação através de uma malha descentralizada é mais lenta do que uma conexão direta para um único servidor rápido seria, que forma diretamente decisões de projeto em outro lugar em Bitcoin (tempo de bloqueio, discutido em [Tempo de bloco](../blockchain/block-time.md), é parcialmente escolhido para manter o atraso de propagação pequeno em relação ao tempo entre os blocos, limitando quantas vezes dois mineradores acidentalmente produzem blocos concorrentes). Coordenar qualquer alteração de protocolo também se torna mais difícil sem um operador central que pode simplesmente empurrar uma atualização, veja [Governança do Bitcoin](../governance/bitcoin.md) para como a rede lida com isso na prática.

## Conceitos errôneos comuns

**"Peer-to-peer" não significa que cada nó está diretamente conectado a cada outro nó.** A rede do Bitcoin tem milhares de nós, cada um conectado a um número relativamente pequeno de pares; os dados chegam a toda a rede através de retransmissão, não conexões diretas para todos.

**A rede peer-to-peer do Bitcoin não é literalmente anônima ou não rastreável no nível da rede.** O endereço IP de um nó é visível para seus pares diretos por padrão, que é uma consideração de privacidade genuína e documentada (mitida por ferramentas como Tor, que alguns operadores de nós usam), veja [Privacidade](../society/privacy.md).

## Outras leituras

- [Bitcoin Referência do desenvolvedor principal: Rede P2P](https://developer.bitcoin.org/reference/p2p_networking.html)
- [Whitepaper Bitcoin, Seção 5 (Rede)](https://bitcoin.org/bitcoin.pdf)

---

[← Anterior: Sistemas Distribuídos Básicos](./README.md)
·
[Voltar aos Sistemas Distribuídos](./README.md)
·
[Próximo: Replicação →](./replication.md)
