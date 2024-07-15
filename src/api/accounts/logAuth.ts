import {Application, Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import cookieParser from 'cookie-parser'
export async function logAuth(app: Application, prisma: PrismaClient){
    app.post("/api/private/logauth", async (req: Request, res: Response)=>{ //valida o cookie enviado pelo cliente
        try{
            const authKeys = await prisma.authKey.findMany({
                select: {
                    key: true,
                    userId: true,
                }
            })
            authKeys.forEach(async el =>{
                if(req.cookies["authKey"] === el.key){
                    //parei aqui
                }
            })
        }
        catch{
            res.status(500)
        }
    })
}