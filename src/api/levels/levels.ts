import { Application, Request, Response } from "express"
import { PrismaClient } from "@prisma/client"
import { logAuth } from "../accounts/cookies"
export async function whichLevel(app: Application, prisma: PrismaClient){
    app.post("/api/private/levelsunlocked", async (req: Request, res: Response) => {
        try{ 
            let userId: number = await logAuth(prisma, req)
            if(userId === -1){ //se o usuário não estiver logado
                res.sendStatus(401)
            }
            else if(isNaN(userId)){ //se deu erro na função logAuth
                res.sendStatus(500)
            }
            else{ //caso o usuário esteja logado, envia o id
                if(req.body.action == "get"){
                    const user = await prisma.user.findUnique({ //só para testes
                        where: {
                            id: userId,
                        }
                    })
                    res.status(200).json(user?.level)
                }
                else if(req.body.action == "upLevel"){
                    await prisma.user.update({
                        where: {id: userId},
                        data: {
                            level: {increment: 1}
                        },
                    })
                    res.sendStatus(200)
                }
                else{
                    res.sendStatus(400)
                }
            }
        }
        catch(error){
            res.sendStatus(500)
        }
    })
}
export async function whichLife(app: Application, prisma: PrismaClient, maxLife: number){
    app.post("/api/private/lifes", async (req: Request, res: Response) => {
        try{ 
            let userId: number = await logAuth(prisma, req)
            if(userId === -1){ //se o usuário não estiver logado
                res.sendStatus(401)
            }
            else if(isNaN(userId)){ //se deu erro na função logAuth
                res.sendStatus(500)
            }
            else{
                if(req.body.action == "get"){
                    const user = await prisma.user.findUnique({ //só para testes
                        where: {
                            id: userId,
                        }
                    })
                    res.status(200).json(user?.life)
                }
                else if(req.body.action == "practice"){
                    const user = await prisma.user.findUnique({ 
                        where: {
                            id: userId,
                        }
                    })
                    if(user != null && user.life + 1 > maxLife){
                        res.status(403).json("max life")
                    }
                    else{
                        await prisma.user.update({
                            where: {id: userId},
                            data: {
                                life: {increment: 1}
                            },
                        })
                        res.sendStatus(200)
                    }
                }
                else if(req.body.action == "hit"){
                    const user = await prisma.user.findUnique({ 
                        where: {
                            id: userId,
                        }
                    })
                    if(user != null && user.life - 1 < 0){
                        res.status(403).json("no lifes")
                    }
                    else{
                        await prisma.user.update({
                            where: {id: userId},
                            data: {
                                life: {decrement: 1}
                            },
                        })
                        res.sendStatus(200)
                    }
                }
                else{
                    res.sendStatus(400)
                }
            }
        }
        catch(error){
            res.sendStatus(500)
        }
    })
}
export async function whichEXP(app: Application, prisma: PrismaClient){
    app.post("/api/private/exp", async (req: Request, res: Response) => {
        try{
            let userId: number = await logAuth(prisma, req)
            if(userId === -1){ //se o usuário não estiver logado
                res.sendStatus(401)
            }
            else if(isNaN(userId)){ //se deu erro na função logAuth
                res.sendStatus(500)
            }
            else if(req.body.action != "get" && (req.body.exp === null || req.body.exp === undefined || isNaN(req.body.exp) || req.body.exp < 0)){ //verifca se tem valores ilegais
                res.status(406).json("ilegal value")
            }
            else{
                if(req.body.action == "get"){
                    const user = await prisma.user.findUnique({ //só para testes
                        where: {
                            id: userId,
                        }
                    })
                    res.status(200).json(user?.exp)
                }
                else if(req.body.action == "add"){
                    await prisma.user.update({
                        where: {id: userId},
                        data: {
                            exp: {increment: parseFloat(req.body.exp)}
                        },
                    })
                    res.sendStatus(200)
                }
                else{
                    res.sendStatus(400)
                }
            }
        }
        catch(error){
            res.sendStatus(500)
        }
    })
}
