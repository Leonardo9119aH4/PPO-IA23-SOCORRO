import { PrismaClient } from "@prisma/client";
import { Application, Request, Response } from "express";
import path from "path";
import { logAuth } from "../accounts/cookies";

export async function rpg(app: Application, prisma: PrismaClient){
    type Actions{
        
    }
    app.post("/api/private/getrpg", async (req: Request, res: Response)=>{
        try{
            let userId: number = await logAuth(prisma, req)
            if(userId === -1){ //se o usuário não estiver logado
                res.sendStatus(401)
            }
            else if(isNaN(userId)){ //se deu erro na função logAuth
                res.sendStatus(500)
            }
            else{
                const user = await prisma.user.findUnique({
                    select: {
                        id: userId
                    }
                })
                if(req.body.level > user.level){
                    res.sendStatus(403)
                }
            }
        }
        catch{
            res.sendStatus(500)
        }
    })
}