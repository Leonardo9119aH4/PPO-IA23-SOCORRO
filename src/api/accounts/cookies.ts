import {Application, Request, Response} from 'express'
import { PrismaClient } from '@prisma/client'
export async function logAuth(prisma: PrismaClient, req: Request){
    try{
        let userId: number = -1 //retorna -1 se não achou a chave de autenticação
        const authKeys = await prisma.authKey.findMany({
            select: {
                key: true,
                userId: true,
            }
        })
        authKeys.forEach(async el =>{
            if(req.cookies["authKey"] === el.key){
                userId = el.userId //retorna o id do usuário que o cookie referencia
            }
        })
        return userId
    }
    catch{
        return NaN //se der erro fudido, retorna NaN
    }
}
export async function logOut(app: Application, prisma: PrismaClient){
    app.post("/api/logout", async (req: Request, res: Response)=>{
        try{
            const authKeys = await prisma.authKey.findMany({
                select: {
                    key: true,
                    userId: true,
                }
            })
            authKeys.forEach(el =>{
                if(req.cookies["authKey"] === el.key){
                    prisma.authKey.delete({ //deleta a chave de autenticação do banco de dados
                        where: {key: req.cookies["authKey"]}
                    })
                }
            })
            res.clearCookie("authKey")
            res.sendStatus(200) //logout bem-sucedido
        }
        catch{
            res.sendStatus(500) //bug ao deslogar
        }
        
    })
}