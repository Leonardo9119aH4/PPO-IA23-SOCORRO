import express, {Application, Request, Response } from 'express'
import path from 'path'
import ejs from "ejs"
import bodyParser from 'body-parser'
import cookieParser from "cookie-parser"
import bcrypt from 'bcrypt'
import { PrismaClient } from '@prisma/client'
import { executeAll } from "./api/map"
import { fixDBErrors } from './api/levels/update'
import readline from 'readline'

const app = express()
const PORT: number = parseInt(process.env.PORT || '3000')
const prisma = new PrismaClient()

async function main(){
  let maxLife: number = 7 //quantidade máxima de vidas
  app.use(bodyParser.json())
  app.use(cookieParser())
  app.set("view engine", "ejs")
  app.use('/webSites', express.static(path.join(__dirname, 'webSites'))) // Mapeia as respectivas pastas para o FrontEnd acessar
  app.use('/globalAssets', express.static(path.join(__dirname, 'globalAssets')))
  app.get('/', (req: Request, res: Response) => { // Redireciona o "/" para "/webSites/main/index.html"
    res.redirect('/webSites/main/index.html');
  })
  app.listen(PORT, () => { // Inicia o servidor
    process.stdout.write(`Servidor iniciado na porta ${PORT}\n$ `);
  })
  await fixDBErrors(prisma, maxLife) //corrige erros do banco de dados
  executeAll(app, prisma, maxLife) 
  const rl = readline.createInterface({ //comando para fixdb a qualquer momento no terminal
    input: process.stdin,
    output: process.stdout,
    terminal: false,
  });
  rl.on('line', (input: string) => {
    if (input.trim() === 'fixdb') {
      fixDBErrors(prisma, 7);
      process.stdout.write("Erros do banco de dados corrigidos\n$ ")
    }
    else if(input.trim() === 'help' || input.trim() === '?'){
      process.stdout.write("Lista de comandos disponíveis:\nfixdb: Corrige erros do banco de dados\nexit: Desliga o servidor\nhelp: exibe essa lista\n?: exibe essa lista\nclear: limpa o terminal\ncls: limpa o terminal\n$ ")
    }
    else if(input.trim() === 'exit'){
      prisma.$disconnect().then(()=>{
        process.exit(1)
      })
    }
    else if(input.trim() === 'clear' || input.trim() === 'cls'){
      process.stdout.write('\x1Bc\n$ ')
    }
    else {
      process.stdout.write(`Comando desconhecido: ${input}\n$ `);
    }
  });
  
}
main().then(async () => {
  await prisma.$disconnect()
}).catch(async (e) => {
  console.error(e)
  await prisma.$disconnect()
  process.exit(1)
})

