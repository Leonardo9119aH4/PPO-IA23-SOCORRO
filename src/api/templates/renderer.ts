import { Application, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import ejs from "ejs";
import { logAuth } from "../accounts/cookies";
export async function rendererNav(app: Application, prisma: PrismaClient){
    console.log("1")
    app.post("/api/getnav", async (req: Request, res: Response)=>{
        console.log("2")
        try{
            console.log("3")
            const userId: number = await logAuth(prisma, req)
            let html
            if(userId === -1){
                html = await ejs.renderFile("./nav.ejs", {username: null, logged: false})
                res.status(200).json(html)
            }
            else if(isNaN(userId)){
                res.sendStatus(502) //erro na função logAuth
            }
            else{
                const user = await prisma.user.findUnique({
                    where: {
                        id: userId
                    }
                })
                html = ejs.renderFile("./nav.ejs", {username: user?.username, logged: true})
                res.status(200).json(html)
            }
        }
        catch{
            res.sendStatus(500)
        }
    })
}