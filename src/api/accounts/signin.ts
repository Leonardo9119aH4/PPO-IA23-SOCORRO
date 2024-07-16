import {Application, Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
export async function signIn(app: Application, prisma: PrismaClient){
    function randomString(count: number): string{ //gera a chave de autenticação a ser salva no cookie
        const chars: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
        let result: string = ""
        for(let i=0; i<count; i++){
            result += chars.charAt(Math.floor(Math.random()*chars.length))
        }
        return result
    }
    app.post("/api/signin", async (req: Request, res: Response)=>{ //rota para receber o login
        try{
            async function genCookie(user: any){ //envia o cookie ao cliente e salva-o no banco de dados
                let key: string = user.id + "#" + randomString(20)
                await prisma.authKey.create({
                    data: {
                        key: key,
                        userId: user.id,
                    },
                })
                res.cookie('authKey', key, { 
                    path: '/',
                    secure: false,
                    httpOnly: true,
                    sameSite: true,
                })
            }
            //requisições abaixo
            let userHasFound: Boolean = false
            if(req.body.login == null || req.body.password == null || req.body.credential == null){
                res.send(403).json(-1)
            }
            else{
                if(req.body.credential===1){ //by username
                    const users = await prisma.user.findMany({
                        select: {
                            id: true,
                            username: true,
                            password: true,
                        },
                    })
                    users.forEach(async el => {
                        if(el.username==req.body.login && el.password==req.body.password){
                            userHasFound=true
                            console.log(el)
                            await genCookie(el)
                            res.status(200).json(1)
                        }
                    });
                }
                if(req.body.credential===2){ //by email
                    const users = await prisma.user.findMany({
                        select: {
                            email: true,
                            password: true,
                        },
                    })
                    users.forEach(async el => {
                        if(el.email==req.body.login && el.password==req.body.password){
                            userHasFound=true
                            await genCookie(el)
                            res.status(200).json(1)
                        }
                    });
                }
                if(req.body.credential===3){ //by phone
                    const users = await prisma.user.findMany({
                        select: {
                            phone: true,
                            password: true,
                        },
                    })
                    users.forEach(async el => {
                        if(el.phone==req.body.login && el.password==req.body.password){
                            userHasFound=true
                            await genCookie(el)
                            res.status(200).json(1)
                        }
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