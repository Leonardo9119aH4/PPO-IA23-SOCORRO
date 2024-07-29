import { PrismaClient } from "@prisma/client";
import { Application, Request, Response } from "express";
import Phaser from "phaser";
import { logAuth } from "../accounts/cookies";

export async function rpg(app: Application, prisma: PrismaClient){
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
                res.sendStatus(200)
            }
        }
        catch{
            res.sendStatus(500)
        }
    })
}