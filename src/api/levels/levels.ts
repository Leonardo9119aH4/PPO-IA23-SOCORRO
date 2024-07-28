import { Application, Request, Response } from "express"
import { PrismaClient } from "@prisma/client"
import { logAuth } from "../accounts/cookies"
export async function whichLevel(app: Application, prisma: PrismaClient){
    app.post("/api/private/levelsunlocked", async (req: Request, res: Response) => {
        try{ //jeito GoHorse, pq estamos esperando o varela ajudar
            let userId: number = await logAuth(prisma, req)
            if(userId === -1){ //se o usuário não estiver logado
                res.sendStatus(401)
            }
            else if(isNaN(userId)){ //se deu erro na função logAuth
                res.sendStatus(500)
            }
            else if(req.body.action != "get" && (req.body.level === null || req.body.level === undefined || isNaN(req.body.level) || req.body.level < 0)){ //verifca se tem valores ilegais
                res.status(406).json("ilegal value")
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
                else if(req.body.action == "set"){
                    await prisma.user.update({
                        where: {id: userId},
                        data: {level: req.body.level},
                    })
                    res.sendStatus(200)
                }
                else if(req.body.action == "add"){
                    await prisma.user.update({
                        where: {id: userId},
                        data: {
                            level: {increment: req.body.level}
                        },
                    })
                    res.sendStatus(200)
                }
                else if(req.body.action == "reduce"){
                    const user = await prisma.user.findUnique({ 
                        where: {
                            id: userId,
                        }
                    })
                    if(user != null && user.level - req.body.level < 0){
                        res.status(403).json("level cannot be negative")
                    }
                    else{
                        await prisma.user.update({
                            where: {id: userId},
                            data: {
                                level: {decrement: req.body.level}
                            },
                        })
                        res.sendStatus(200)
                    }    
                }
                else{
                    res.sendStatus(400).json("unrecognized action")
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
            else if(req.body.action != "get" && (req.body.life === null || req.body.life === undefined || isNaN(req.body.life) || req.body.life < 0 || req.body.life > maxLife)){ //verifca se tem valores ilegais
                res.status(406).json("ilegal value")
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
                else if(req.body.action == "set"){
                    await prisma.user.update({
                        where: {id: userId},
                        data: {life: req.body.life},
                    })
                    res.sendStatus(200)
                }
                else if(req.body.action == "add"){
                    const user = await prisma.user.findUnique({ 
                        where: {
                            id: userId,
                        }
                    })
                    if(user != null && user.life + req.body.life > maxLife){
                        res.status(403).json("life outside of limit")
                    }
                    else{
                        await prisma.user.update({
                            where: {id: userId},
                            data: {
                                life: {increment: req.body.life}
                            },
                        })
                        res.sendStatus(200)
                    }
                }
                else if(req.body.action == "reduce"){
                    const user = await prisma.user.findUnique({ 
                        where: {
                            id: userId,
                        }
                    })
                    if(user != null && user.life - req.body.life < 0){
                        res.status(403).json("life cannot be negative")
                    }
                    else{
                        await prisma.user.update({
                            where: {id: userId},
                            data: {
                                life: {decrement: req.body.life}
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
                else if(req.body.action == "set"){
                    await prisma.user.update({
                        where: {id: userId},
                        data: {exp: req.body.exp},
                    })
                    res.sendStatus(200)
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
                else if(req.body.action == "reduce"){
                    const user = await prisma.user.findUnique({ 
                        where: {
                            id: userId,
                        }
                    })
                    if(user != null && user.exp - req.body.exp < 0){
                        res.status(403).json("exp cannot be negative")
                    }
                    else{
                        await prisma.user.update({
                            where: {id: userId},
                            data: {
                                exp: {decrement: req.body.exp}
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
