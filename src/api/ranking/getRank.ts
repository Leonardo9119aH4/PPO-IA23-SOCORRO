import { PrismaClient } from "@prisma/client";
import { Application, Request, Response } from "express";

export async function getRank(app: Application, prisma: PrismaClient){
    app.get("/api/getrank", async (req: Request, res: Response)=>{
        try{
            const users = await prisma.user.findMany({
                select: {
                    id: true,
                    username: true,
                    exp: true
                }
            })
            const bestUsers = users
                .sort((a, b) => b.exp - a.exp) // Ordena em ordem decrescente
                .slice(0, 5); // Pega os 5 maiores

            res.status(200).json(bestUsers)
        }
        catch{
            res.sendStatus(500)
        }
    })
}