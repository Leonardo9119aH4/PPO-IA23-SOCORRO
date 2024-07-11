import {Application, Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
export async function signIn(app: Application, prisma: PrismaClient){
    app.post("/api/signin", async (req: Request, res: Response)=>{
        try{
            let userHasFound: Boolean = false
            if(req.body.username == null || req.body.password == null){
                res.status(403).json(-1)
            }
            else{
                const users = await prisma.user.findMany({
                    select: {
                        username: true,
                        password: true,
                    },
                })
                users.forEach(el =>{
                    if(el.username === req.body.username){
                        userHasFound=true
                        if(el.password === req.body.password){
                            res.setHeader
                            res.status(201).json(1)
                        }
                        else{
                            res.status(403).json(-2)
                        }
                    }
                })
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