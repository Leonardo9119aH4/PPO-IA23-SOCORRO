import {Application, Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
export async function signIn(app: Application, prisma: PrismaClient){
    app.post("/api/signin", async (req: Request, res: Response)=>{ //rota para receber o login
        try{
            let userHasFound: Boolean = false
            if(req.body.login == null || req.body.password == null || req.body.credential == null){
                res.send(403).json(-1)
            }
            else{
                if(req.body.credential===1){ //by username
                    const users = await prisma.user.findMany({
                        select: {
                            username: true,
                            password: true,
                        },
                    })
                    users.forEach(el => {
                        
                    });
                }
                if(req.body.credential===2){ //by email
                    const users = await prisma.user.findMany({
                        select: {
                            email: true,
                            password: true,
                        },
                    })
                    users.forEach(el => {
                        
                    });
                }
                if(req.body.credential===3){ //by phone
                    const users = await prisma.user.findMany({
                        select: {
                            phone: true,
                            password: true,
                        },
                    })
                    users.forEach(el => {
                        
                    });
                }
                if(!userHasFound){
                    res.status(403).json(-2)
                }
            }
        }
        catch(error){
            res.status(500)
        }
    })
}
/*
-1: algum campo vazio
-2: nome de usuário e/ou senha incorreto
1: êxito ao logar
*/