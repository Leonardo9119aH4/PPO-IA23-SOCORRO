import { Application, Request, Response } from "express"
import { PrismaClient } from "@prisma/client"
export async function howLevel(app: Application, prisma: PrismaClient){
    app.post("/api/private/levelsunlocked", async (req: Request, res: Response) => {
        try{
            if(true){
                const users = prisma.user
                
            }
        }
        catch{
            res.status(500)
        }
    })
}