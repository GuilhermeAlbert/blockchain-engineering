# Executar um Nó

Executar um nó substitui a confiança em uma API remota com responsabilidade por software, armazenamento, rede, atualizações e monitoramento. O nó verifica as regras do protocolo em si, mas as aplicações ainda podem configurar mal suas interfaces ou ler dados antes de atingir o nível de confirmação que precisam.

## O que o nó verifica

O Bitcoin full node downloads blocos e transações, verifica prova de trabalho e regras de consenso, mantém o conjunto UTXO, e segue a cadeia válida com o trabalho mais acumulado. Um nó Ethereum requer um cliente de execução e um cliente de consenso. O cliente de execução valida transações e transições de estado; o cliente de consenso segue consenso e finalidade da prova de participação. Eles trocam informações de carga e fork-escolha através da API do motor.

Usar um cliente leve muda o modelo de confiança e recursos. Verifica evidências de consenso ao solicitar órgãos, provas de estado ou outros dados de servidores. A poda manteve a história, não a verificação consensual do estado atual. Uma configuração de arquivo mantém o estado histórico necessário para consultas em alturas de bloco antigas.

## Planeamento dos recursos

O armazenamento cresce e as cargas de trabalho do banco de dados são insurgentes. A sincronização inicial pode enfatizar a entrada/saída do disco mais do que a operação constante. Largura de banda de rede, memória, descritores de arquivos, compactação de banco de dados e crescimento de instantâneo precisam de headroom. Requisitos mínimos publicados são um ponto de partida; o tráfego de um indexador ou RPC público altera a carga.

As cópias de segurança não substituem a sincronização da cadeia. Faça backup da configuração, chaves, allowlists, regras de monitoramento e quaisquer dados locais que não possam ser reconstruídos. Os dados da cadeia de nós geralmente podem ser reconstruídos de pares, embora o tempo de restauração possa ser operacionalmente inaceitável.

## Risco de RCP

Interfaces RPC Node podem revelar atividade de conta, consumir recursos caros, enviar transações, desbloquear sinalizadores locais em configurações mais antigas, ou expor métodos administrativos. Ligar interfaces privadas a redes confiáveis, autenticar o acesso, permitir apenas espaços de nomes necessários e separar o tráfego de leitura pública da administração. Nunca coloque na internet pública um objetivo de RPC administrativo não autenticado.

Limites de taxa e limites de tamanho de solicitação protegem o nó da capacidade de exaustão de um cliente. Faixas de log caras, traços e chamadas de estado histórico precisam de políticas mais rigorosas do que simples consultas de cabeça.

## Operações e atualizações

Monitorar a contagem de pares, distância de sincronização, cabeças atuais e finalizadas, capacidade de disco, erros de banco de dados, latência RPC, taxa de erro e concordância com uma referência independente. Um processo pode estar vivo enquanto centenas de blocos atrás.

A diversidade de clientes reduz a dependência de um bug de implementação, mas operar vários clientes requer experiência e procedimentos de atualização separados. Leia notas de lançamento para migrações de banco de dados, alterações de consenso, bandeiras despreparadas e correções de segurança. Teste atualizações contra uma réplica ou instantâneo, em seguida, verifique o acordo de cabeça e o comportamento RPC após reiniciar.

## Falha e recuperação

Documente quanto tempo leva uma resincronização, que os consumidores de dados podem tolerar a lacuna, e como o tráfego se move para um retrocesso. Um nó de reserva no mesmo host, disco, rede, conta na nuvem e versão de software compartilha a maioria dos modos de falha. A independência tem de ser concebida.

## Outras leituras

- [Nós e clientes Ethereum](https://ethereum.org/developers/docs/nodes-and-clients/)
- [Executando um nó Ethereum](https://ethereum.org/developers/docs/nodes-and-clients/run-a-node/)
- [Documentação do Núcleo do Bitcoin](https://bitcoincore.org/en/doc/)
- Ver também: [Nós Completos](../bitcoin/full-nodes.md), [Nós Ethereum](../ethereum/nodes.md)

---

[← Anterior: Infraestrutura Blockchain](./README.md)
·
[Voltar à Infraestrutura](./README.md)
·
[Próximo: RPC →](./rpc.md)
