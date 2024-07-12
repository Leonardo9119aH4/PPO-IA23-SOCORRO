!! Requerimentos

Precisa ter o Node.js instalado.

=============================================================================
!! Servidor

Será usado Node.js com as frameworks express.js e prisma.js

Será usado a porta 3000 para host do servidor.

Estão mapeados os diretórios "globalAssets" e "webSites".

=============================================================================
!! Organização de pastas

Os arquivos e pastas do projeto ficarão na pasta "src", as outras pastas ao lado de "src" são coisas do Node,js e das frameworks, NÃO MEXER NESSAS PASTAS!

A pasta "globalAssets" é onde os assets globais (mídia, códigos) são armazenados, eles servem para que qualquer páginas possam puxar esses conteúdos e usá-los.

O arquivo "main.css" é o CSS que será carregado em todas as páginas. 

O arquivo "main.js" é o JS que será executado em todas as páginas. 

Para criar um CSS e/ou JS local (para uma página ou grupo de páginas), usar o nome "content" para função principal do "content.js", que deverá ser assíncrona e obrigatoriamente executar o "main.js" usando await.

Para salvar assets localmente, nomear a pasta como "localAssets".

As pastas "theory" no globalAssets salvarão os códigos e outros assets para exibição do conteúdo teórico para o usuário.

A pasta "webSites" é onde as páginas (arquivos HTMLs e complementares) são armazenados.

Se for fazer qualquer alteração, dê commit e salve em sua branch, para depois vermos as alterações e dar merge.

Organização das perguntas do quiz pelo JSON:
Terá vários JSON com perguntas de determinados níveis e/ou grupos de níveis. Cada nível e/ou grupo puxará seu respectivo JSON, a prática puxará todos os JSON do nível da pessoa e níveis abaixos.

Os níveis de quiz, rpg e blocos são fixos (ex: nível 1, rpg; nível 2, quiz; ...), para começar qualquer nível, o usuário deverá ter pelo menos 1 vida (máx 5). As práticas não usam vidas e quando concluídas, recuperam 1 vida. Cada erro retira 1 vida.

Cada pessoa terá seu nível global, e deverá ter referência para os níveis locais do rpg e dos blocos. O quiz usará grupo de níveis (equivalente a nível local, mas se repetindo em vários níveis globais).

=============================================================================
!! Padronização de código

Comentar todas as variáveis, constantes e funções, especificando o seu uso e a sua função.

Não usar early return quando não precisa.

Referência de diretório (pasta dos aqruivos do servidor (/src)), é via protocolo HTTP. Modelo: /<diretótios>

=============================================================================
!! Banco de dados

Será usado SQLite junto ao Prisma.js para fazer o banco de dados.

O banco de dados salvará as informações de cada usuário, seu nível e seu XP diário.