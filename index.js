const express = require('express')
const path = require('path')
const mysql = require('mysql2')
const connection = require("./database/connection.js")

const app = express()
const PORT = process.env.PORT || 3000
app.use('/webSites', express.static(path.join(__dirname, 'webSites'))) // Mapeia as respectivas pastas para o FrontEnd acessar
app.use('/globalAssets', express.static(path.join(__dirname, 'globalAssets')))
app.get('/', (req, res) => { // Redireciona o "/" para "/webSites/main/index.html"
  res.redirect('/webSites/main/index.html')
})
app.listen(PORT, () => { // Inicia o servidor
  console.log(`Servidor iniciado na porta ${PORT}`)
})
