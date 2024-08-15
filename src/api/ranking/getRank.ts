import { PrismaClient } from "@prisma/client";
import { Application, Request, Response } from "express";

export async function getRank(app: Application, prisma: PrismaClient){
    app.get("/api/getrank", async (req: Request, res: Response)=>{
        try{
            let bestUsers: any[] = []
            const users = await prisma.user.findMany({
                select: {
                    id: true,
                    username: true,
                    exp: true
                }
            })
            users.forEach((el, i)=>{
                if(i==0){
                    for(let x=0; x<5; x++){
                        bestUsers[x] = el
                    }
                }
                else if(el.exp > bestUsers[0]){
                    for(let x=4; x>0; x--){
                        bestUsers[x] = bestUsers[x-1]
                    }
                    bestUsers[0] = el
                }
            })
            if(users.length<5){ //se a quantidade de usuários for menor que 5, limita a array para não ter usuários multiplicados
                bestUsers.length = users.length
            }
            res.status(200).json(bestUsers)
        }
        catch{
            res.sendStatus(500)
        }
    })
}