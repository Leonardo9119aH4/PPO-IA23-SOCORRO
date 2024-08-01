import { PrismaClient } from "@prisma/client";
import { Application, Request, Response } from "express";
import path from "path";
import { logAuth } from "../accounts/cookies";

export async function getRpg(app: Application, prisma: PrismaClient){
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
                    where: {
                        id: userId
                    }
                })
                if(user != null && req.body.level > user.level){ 
                    res.sendStatus(403)
                }
                else{
                    try{
                        if(req.body.getfile === 0){
                            res.sendFile(path.join(__dirname, `./levels/lv${req.body.level}/config.json`)) //configuração das cenas
                        }
                        else if(req.body.getfile === 1){
                            res.sendFile(path.join(__dirname, `./levels/lv${req.body.level}/load.mjs`)) //carregador do nível
                        }
                        else if(req.body.getfile === 2){
                            res.sendFile(path.join(__dirname, `./levels/lv${req.body.level}/level.mjs`)) //o nível em si
                        }
                        else{
                            res.sendStatus(400) //não tem o que enviar
                        }
                            
                    }
                    catch{
                        res.sendStatus(404)
                    }
                }
            }
        }
        catch{
            res.sendStatus(500)
        }
    })
}
export async function getActions(app: Application, phaserCommands: Array<Array<String>>){
    type Commands {
        
    }
}