const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    let filePath = '.' + req.url;
    if (filePath === './') {
        // Se a URL for "/", redireciona para o arquivo index.html dentro de "webSites/main"
        filePath = './webSites/main/index.html';
    } else {
        // Caso contrário, anexa o diretório raiz ao caminho do arquivo
        filePath = './' + req.url;
    }

    // Obtém a extensão do arquivo
    const extname = path.extname(filePath);
    // Define o tipo de conteúdo com base na extensão do arquivo
    let contentType = 'text/html';
    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.jpg':
        case '.jpeg':
            contentType = 'image/jpeg';
            break;
        case '.png':
            contentType = 'image/png';
            break;
    }

    // Lê o arquivo correspondente ao caminho especificado
    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                // Se o arquivo não for encontrado, retorna 404 Not Found
                res.writeHead(404);
                res.end('404 Not Found');
            } else {
                // Se ocorrer outro erro, retorna 500 Internal Server Error
                res.writeHead(500);
                res.end('500 Internal Server Error');
            }
        } else {
            // Se o arquivo for encontrado, envia-o como resposta
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

const port = 3000;
server.listen(port, () => {
    console.log(`Servidor está rodando em http://localhost:${port}/`);
});
