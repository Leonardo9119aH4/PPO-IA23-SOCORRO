import { PrismaClient } from "@prisma/client";
import { Application, Request, Response } from "express";
import path from "path";
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
//parte de devolver o código "compilado" ao usuário
type Commands = { //salvar comandos do phaser
    key: String, //cookie do usuário
    commands: Array<Array<string>> //comandos do phaser
}
let usersActions: Array<Commands>
export async function setActions(app: Application, phaserCommands: Array<Array<string>>, req: Request){
    console.log("setActions")
    let actions: Commands = { 
        key: req.cookies["authKey"],
        commands: phaserCommands
    }
    usersActions.push(actions)
}
export async function getActions(app: Application){
    app.get("/api/private/getExeCode", async (req: Request, res: Response) =>{
        try{
            for(let i=0; i<usersActions.length; i++){
                if(usersActions[i].key === req.cookies["authKey"]){
                    res.status(200).json(usersActions[i].commands)
                    delete usersActions[i]
                    break
                }
            }
        }
        catch{
            res.sendStatus(500)
        }
    })
}