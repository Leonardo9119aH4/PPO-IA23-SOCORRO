import { Application, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import ejs from "ejs"
import path from "path";
import * as fs from "fs"
import { logAuth } from "../accounts/cookies";
export async function getBlocks(app: Application, prisma: PrismaClient){
    app.post("/api/private/getBlocks", async (req: Request, res: Response) =>{
        try{
            let userId: number = await logAuth(prisma, req)
            if(userId === -1){ //se o usuário não estiver logado
                res.sendStatus(401)
            }
            else if(isNaN(userId)){ //se deu erro na função logAuth
                res.sendStatus(500)
            }
            const user = await prisma.user.findUnique({
                where: {
                    id: userId
                }
            })
            if(user != null && req.body.level <= user.level){
                try{
                    let asideHtml = fs.readFileSync(`./src/api/blocks/levels/lv${req.body.level}/aside.html`, "utf-8")
                    let codeHtml = fs.readFileSync(`./src/api/blocks/levels/lv${req.body.level}/code.html`, "utf-8")
                    let asideCSS = fs.readFileSync(`./src/api/blocks/levels/lv${req.body.level}/aside.css`, "utf-8")
                    let codeCSS = fs.readFileSync(`./src/api/blocks/levels/lv${req.body.level}/code.css`, "utf-8")
                    let correctSeq = await JSON.parse(fs.readFileSync(`./src/api/blocks/levels/lv${req.body.level}/correctSeq.json`, "utf-8"))
                    let blocksLevel = [asideHtml, asideCSS, codeHtml, codeCSS, correctSeq]
                    res.status(200).json(blocksLevel)
                }
                catch(error){
                    console.log(error)
                    res.sendStatus(400)
                }
            }
            else{
                res.sendStatus(403) //nível ilegal ao usuário
            }
        }
        catch{
            res.sendStatus(500)
        }
    })
}
export async function getScript(app: Application, prisma: PrismaClient){
    app.post("/api/getScript", async (req: Request, res: Response)=>{
        try{
            if(Number.isInteger(req.body.level)){ //verifica se o valor é válido
                res.sendFile(path.join(__dirname, `./levels/lv${req.body.level}/script.js`))
            }
            else{
                res.sendStatus(400)
            }
        }
        catch{
            res.sendStatus(500)
        }
    })
}