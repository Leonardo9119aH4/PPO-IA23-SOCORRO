<h1>Requisitos</h1>
Requer o Node.JS instalado na versão mais recente (v21+). Está sendo usado Express.JS, Prisma.JS junto ao SQLite, TypeScript, EJS e Phaser.JS.<br>
<h1>Compilação e uso</h1>
Usar o script install_dependences.ps1 (Windows) ou install_dependences.sh (Linux) para automaticamente instalar as frameworks necessárias (no Linux, instala o Node.JS também), além de gerar o banco de dados.<br>
Usar o script build.ps1 (Windows) ou build.sh (Linux) para transpilar o servidor (TS -> JS).<br>
Usar o comando "node ./src/index.js" para executar o servidor (já transpilado), para executar diretamente do TypeScript, usar o comando "npx ts-node ./src/index.ts" (não transpilado).<br>
Lista de comandos úteis:</br>
<ul>
  <li>"npm install --fix-broken": instala as frameworks usadas automaticamente.</li>
  <li>"npx prisma generate": gera o banco de dados em cima do schema.prisma</li>
  <li>"npx prisma migrate dev": aplica as migrações, este comando, e o de cima, devem ser usados juntos, para o banco de dados funcionar.</li>
  <li>"npx prisma studio": abre o prisma studio, onde o banco de dados pode ser alterado diratamente. OBS: as senhas estão criptografadas.</li>
  <li>"npx ts-node ./src/index.ts": executa o servidor sem transpilá-lo.</li>
  <li>"npx tsc": transpila o repositório (TS->JS).</li>
  <l1>"node ./src/index.js": executa o servidor, usar quando já estover transpilado.</l1>
</ul>
<h1>Terminal</h1>
O servidor possui um terminal com alguns comandos:<br>
<ul>
<li>fixdb: Corrige erros do banco de dados.</li>
<li>exit: Desliga o servidor.</li>
<li>help: exibe essa lista.</li>
<li>?: exibe essa lista.</li>
<li>clear: limpa o terminal.</li>
<li>cls: limpa o terminal.</li>
</ul>
<h1>Completo?</h1>
O projeto contemplará todos os conteúdos de Algoritimos 1 dos cursos de TI. Tomamos como base o PPC de Ciência da Computação (Algoritimos 1° semestre) do IFC Videira para organizar os conteúdos a serem ensinados: https://drive.google.com/file/d/1BQJUvYt-baOfjjg3k2skFFkMnu_uGQqY/view <br>
<h1>OBS</h1>
Repositório quase morto, o repositório no PPO2 será refeito em: https://github.com/Leonardo9119aH4/PPO-IA23-FINAL<br>
