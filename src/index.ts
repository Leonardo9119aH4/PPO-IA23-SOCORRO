import express, { Request, Response } from 'express'
import path from 'path'
import { PrismaClient } from '@prisma/client'
import * as map from "./api/map"

const app = express()
const PORT: number = parseInt(process.env.PORT || '3000')
const prisma = new PrismaClient()

async function main(){
  app.use('/webSites', express.static(path.join(__dirname, 'webSites'))) // Mapeia as respectivas pastas para o FrontEnd acessar
  app.use('/globalAssets', express.static(path.join(__dirname, 'globalAssets')))
  app.get('/', (req: Request, res: Response) => { // Redireciona o "/" para "/webSites/main/index.html"
    res.redirect('/webSites/main/index.html');
  })
  app.listen(PORT, () => { // Inicia o servidor
    console.log(`Servidor iniciado na porta ${PORT}`);
  })
}
main().then(async () => {
  await prisma.$disconnect()
}).catch(async (e) => {
  console.error(e)
  await prisma.$disconnect()
  process.exit(1)
})
