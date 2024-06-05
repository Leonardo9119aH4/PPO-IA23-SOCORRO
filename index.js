import {connection} from "./database/connection.js"
const express = require('express')
const path = require('path')

const app = express()
const PORT = process.env.PORT || 3000
app.use('/webSites', express.static(path.join(__dirname, 'webSites'))) // Mapeia as respectivas pastas para o FrontEnd acessar
app.use('/globalAssets', express.static(path.join(__dirname, 'globalAssets')))
app.use('/frameworks', express.static(path.join(__dirname, 'frameworks')))
app.get('/', (req, res) => { // Redireciona o "/" para "/webSites/main/index.html"
  res.redirect('/webSites/main/index.html')
})
app.listen(PORT, () => { // Inicia o servidor
  console.log(`Servidor iniciado na porta ${PORT}`)
})
