import { PrismaClient } from "@prisma/client";
import { Application, Request, Response } from "express";

export async function getRank(app: Application, prisma: PrismaClient){
    app.post("/api/getrank", async (req: Request, res: Response)=>{
        try{
            let bestUsers: any[]
            const users = await prisma.user.findMany({
                select: {
                    id: true,
                    username: true,
                    exp: true
                }
            })
            users.forEach(el=>{
                
            })
        }
        catch{
            res.sendStatus(500)
        }
    })
}