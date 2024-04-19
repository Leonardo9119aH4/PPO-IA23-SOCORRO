const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname)));

// Redirecionamento da raiz para "http://localhost:3000/webSites/main/index.html"
app.get('/', (req, res) => {
    res.redirect('/webSites/main/index.html');
});

// Rota para todas as outras rotas
app.get('*', (req, res) => {
    // Combine o caminho da requisição com o diretório raiz do servidor
    const filePath = path.join(__dirname, req.url);
    
    // Verifica se o arquivo existe
    res.sendFile(filePath, err => {
        // Se ocorrer um erro ao enviar o arquivo, responda com 404
        if (err) {
            res.status(404).send('Arquivo não encontrado');
        }
    });
});

// Inicia o servidor na porta 3000
const port = 3000;
app.listen(port, () => {
    console.log(`Servidor está rodando em http://localhost:${port}/`);
});
