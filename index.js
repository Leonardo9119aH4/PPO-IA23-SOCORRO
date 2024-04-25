const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Mapeia as pastas '/webSites' e '/globalAssets' para que sejam acessíveis
app.use('/webSites', express.static(path.join(__dirname, 'webSites')));
app.use('/globalAssets', express.static(path.join(__dirname, 'globalAssets')));

// Define uma rota para redirecionar para '/webSites/main/index.html' ao acessar '/'
app.get('/', (req, res) => {
  res.redirect('/webSites/main/index.html');
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor iniciado na porta ${PORT}`);
});
