import {Application, Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
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
        try {
            async function genCookie(user: any) {
                let key: string = user.id + "#" + randomString(20);
                await prisma.authKey.create({
                    data: {
                        key: key,
                        userId: user.id,
                    },
                });
                res.cookie('authKey', key, {
                    path: '/',
                    secure: false,
                    httpOnly: true,
                    sameSite: true,
                });
            }

            let userHasFound = false;
            if (!req.body.login || !req.body.password || !req.body.credential) {
                return res.status(403).json(-1);
            } 
            else {
                let users;
                if (req.body.credential === 1) {
                    // By username
                    users = await prisma.user.findMany({
                        select: {
                            id: true,
                            username: true,
                            password: true,
                        },
                    });
                }
                else if (req.body.credential === 2) {
                    // By email
                    users = await prisma.user.findMany({
                        select: {
                            id: true,
                            email: true,
                            password: true,
                        },
                    });
                }
                else if (req.body.credential === 3) {
                    // By phone
                    users = await prisma.user.findMany({
                        select: {
                            id: true,
                            phone: true,
                            password: true,
                        },
                    });
                }
                else {
                    return res.status(403).json(-2); // Invalid credential type
                }

                for (const el of users) {
                    let isMatch = false;
                    if (req.body.credential === 1) isMatch = el.username === req.body.login;
                    if (req.body.credential === 2) isMatch = el.email === req.body.login;
                    if (req.body.credential === 3) isMatch = el.phone === req.body.login;

                    if (isMatch && await bcrypt.compare(req.body.password, el.password)) {
                        await genCookie(el);
                        return res.status(200).json(1);
                    }
                }

                if (!userHasFound) {
                    return res.status(403).json(-2);
                }
            }
        } 
        catch (error) {
            return res.sendStatus(500)
        }
    })
}
/*
-1: algum campo vazio
-2: nome de usuário e/ou senha incorreto
1: êxito ao logar
*/