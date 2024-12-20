import {Application, Request, Response} from 'express'
import { PrismaClient, User } from '@prisma/client'
import { logAuth } from './cookies'
import bcrypt from 'bcrypt'
export async function regInfo(app: Application, prisma:PrismaClient){
    app.post("/api/private/reginfo", async (req: Request, res: Response) =>{
        try{
            if(req.body.action == "get"){
                const userId: number = await logAuth(prisma, req)
                if(userId === -1){
                    res.sendStatus(401) //não autenticado/logado
                }
                else if(isNaN(userId)){
                    res.sendStatus(502) //erro na função logAuth
                }
                else{
                    const user = await prisma.user.findUnique({
                        where: {
                            id: userId
                        },
                        select: {
                            username: true,
                            realname: true,
                            email: true,
                            phone: true,
                            level: true,
                            exp: true,
                            life: true
                        }
                    })
                    res.status(200).json(user) //envia o nome de usuário
                }
            }
            else if(req.body.action == "set"){
                const userId: number = await logAuth(prisma, req)
                if(userId === -1){
                    res.sendStatus(401) //não autenticado/logado
                }
                else if(isNaN(userId)){
                    res.sendStatus(502) //erro na função logAuth
                }
                else{
                    if(req.body.newInfo == null || req.body.newInfoType == null){
                        res.status(400).json("valor não pode ser nulo")
                    }
                    else if(req.body.newInfoType === "password" || req.body.newInfoType === "id"){ //proibir alterações ilegais de senha
                        res.status(405).json("não é possível alterar id ou senha por esse método")
                    }
                    else{
                        const user = await prisma.user.findUnique({
                            where: {
                                id: userId
                            }
                        })
                        const users = await prisma.user.findMany({
                            select: {
                                username: true,
                                email: true,
                                phone: true,
                            }
                        })
                        if(req.body.newInfoType === "username" && user != null){
                            if(regInfoConflict(users, "username", req.body.newInfo)){
                                res.status(403).json(4) //segue a lista de conflito localizada em signup.ts
                            }
                            else{
                                await prisma.user.update({
                                    where: {id: user.id},
                                    data: {username: req.body.newInfo}
                                })
                                res.status(201).json(0)
                            }
                        }
                        else if(req.body.newInfoType === "realname" && user != null){
                            await prisma.user.update({
                                where: {id: user.id},
                                data: {realname: req.body.newInfo}
                            })
                            res.status(201).json(0)
                        }
                        else if(req.body.newInfoType === "email" && user != null){
                            if(regInfoConflict(users, "email", req.body.newInfo)){
                                res.status(403).json(8) //segue a lista de conflito localizada em signup.ts
                            }
                            else{
                                await prisma.user.update({
                                    where: {id: user.id},
                                    data: {email: req.body.newInfo}
                                })
                                res.status(201).json(0)
                            }
                        }
                        else if(req.body.newInfoType === "phone" && user != null){
                            if(regInfoConflict(users, "phone", req.body.newInfo)){
                                res.status(403).json(16) //segue a lista de conflito localizada em signup.ts
                            }
                            else{
                                await prisma.user.update({
                                    where: {id: user.id},
                                    data: {phone: req.body.newInfo}
                                })
                                res.status(201).json(0) //êxito ao alterar
                            }
                        }
                    }
                }
            }
            else{
                res.sendStatus(400) //ação inválida
            }
            
        }
        catch{
            res.sendStatus(500)
        }
    })
}
export function regInfoConflict(users: any[], type: String, info: String): Boolean{ //função para verificar se existe conflito de username, email e/ou phone
    if(type === "username"){
        users.forEach(el =>{
            if(el.username === info){
                return true
            }
        })
    }
    if(type === "email"){
        users.forEach(el =>{
            if(el.username === info){
                return true
            }
        })
    }
    if(type === "phone"){
        users.forEach(el =>{
            if(el.username === info){
                return true
            }
        })
    }
    return false
}
export async function changePassword(app: Application, prisma: PrismaClient){
    app.post("/api/private/changePassword", async (req: Request, res: Response)=>{
        try{
            let userId = await logAuth(prisma, req)
            if(userId===-1){
                res.sendStatus(401)
            }
            else{
                const user = await prisma.user.findUnique({
                    where: {id: userId}
                })
                if(user?.password != undefined) {
                    console.log("senhadigitada: ", req.body.password)
                    console.log("senhadobanco: ", user?.password)
                    console.log("engual?: ", await bcrypt.compare(req.body.password, user?.password))
                    if(await bcrypt.compare(req.body.password, user?.password)){
                        await prisma.user.update({
                            where: {id: userId},
                            data: {
                                password: await bcrypt.hash(req.body.newPassword, 10)
                            }
                        })
                        res.sendStatus(201)
                    }
                    else{
                        res.sendStatus(403)
                    }
                }
            }   
        }
        catch{
            res.sendStatus(500)
        }
    })
}