import { Application, Request, Response } from "express"
import { PrismaClient } from "@prisma/client"
export async function howLevel(app: Application, prisma: PrismaClient){
    app.post("/api/private/levelrqst", async (req: Request, res: Response) => {
        try{
            let level = req.body.level
        }
        catch{
            res.status(500)
        }
    })
}