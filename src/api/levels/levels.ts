import { Application, Request, Response } from "express"
import { PrismaClient } from "@prisma/client"
export async function whichLevel(app: Application, prisma: PrismaClient){
    app.post("/api/private/levelsunlocked", async (req: Request, res: Response) => {
        try{ //jeito GoHorse, pq estamos esperando o varela ajudar
            if(req.body.action == "get"){
                const userTest = await prisma.user.findUnique({ //só para testes
                    where: {
                        id: 0,
                    }
                })
                res.status(200).json(userTest?.level)
            }
            else if(req.body.action == "set"){
                prisma.user.update({
                    where: {id: 0},
                    data: {level: req.body.level},
                })
            }
            else{
                res.status(400)
            }
        }
        catch(error){
            res.status(500)
        }
    })
}
export async function whichLife(app: Application, prisma: PrismaClient){
    app.post("/api/private/lifes", async (req: Request, res: Response) => {
        try{ //jeito GoHorse, pq estamos esperando o varela ajudar
            const userTest = await prisma.user.findUnique({ //só para testes
                where: {
                    id: 0,
                }
            })
            res.status(200).json(userTest?.life)
        }
        catch(error){
            res.status(500)
        }
    })
}