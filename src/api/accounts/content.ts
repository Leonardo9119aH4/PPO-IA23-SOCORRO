import {Application, Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
export async function signUp(app: Application, prisma: PrismaClient){
    app.post("/api/signup", (req: Request, res: Response)=>{
        let statuscode: number = 0 // 1 -> emails não batem, 2 -> senhas não batem, 4 -> já existe um usuário com esse username. Se o statuscode for 0, é tudo OK, se não, somar a tabela e verificar os erros
        let info = req.body.json()
        if(! info.email == info.confirmEmail){ 
            statuscode += 1
        }
        if(! info.password == info.confirmPassword){
            statuscode +=2
        }
        //
    })
}