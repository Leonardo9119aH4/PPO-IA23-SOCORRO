!! Observação do servidor Node.js

Será usado Node.js para implementação do servidor junto à framework express. Será usado a porta 3000 para host do servidor.

=============================================================================
!! Observação da organização de pastas

A pasta "globalAssets" é onde os assets globais (mídia, códigos) são armazenados, eles servem para que qualquer páginas possam puxar esses conteúdos e usá-los.

O arquivo "main.css" é o CSS que será carregado em todas as páginas.

O arquivo "main.js" é o JS que será executado em todas as páginas.

Para criar um CSS e/ou JS local (para uma página ou grupo de páginas), usar o nome "content" ou o nome para sua deferida função.

Para salvar assets localmente, nomear a pasta como "localAssets".

A pasta "webSites" é onde as páginas (arquivos HTMLs e complementares) são armazenados.

A pasta "database" é onde o Banco de Dados e sua implementação serão armazenados.

Se for fazer qualquer alteração, dê commit e salve em sua branch, para depois vermos as alterações e dar merge.

Organização das perguntas do quiz pelo JSON:
Terá vários JSON com perguntas de determinados níveis e/ou grupos de níveis. Cada nível e/ou grupo puxará seu respectivo JSON, a prática puxará todos os JSON do nível da pessoa e níveis abaixos.

Os níveis de quiz e rpg são fixos (ex: nível 1, rpg; nível 2, quiz; ...), para começar qualquer vida, o usuário deverá ter pelo menos 1 vida (máx 5). As práticas não usam vidas e quando concluídas, recuperam 1 vida. Cada erro retira 1 vida.

===========================================================
!! Observação para padronização de código

Comentar todas as variáveis, constantes e funções, especificando o seu uso e a sua função.

Usar if...else, e não early return, para padronização de código.

Referência de diretório (pasta raíz), é via protocolo HTTP. Modelo: http://localhost:<porta>/<diretótios>