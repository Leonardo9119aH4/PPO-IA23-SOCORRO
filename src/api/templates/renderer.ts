import { Application, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import path from "path";
import ejs from "ejs";
import { logAuth } from "../accounts/cookies";
export async function rendererNav(app: Application, prisma: PrismaClient){
    app.post("/api/getnav", async (req: Request, res: Response)=>{
        try{
            const userId: number = await logAuth(prisma, req)
            let navHtml
            if(userId === -1){
                navHtml = await ejs.renderFile(path.join(__dirname, 'nav.ejs'), {logged: false})
                res.status(200).json(navHtml)
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
                navHtml = await ejs.renderFile(path.join(__dirname, 'nav.ejs'), {username: user?.username, logged: true})
                res.status(200).json(navHtml)
            }
        }
        catch(error){
            res.sendStatus(500)
        }
    })
}
export async function rendererFooter(app: Application, prisma: PrismaClient){
    app.post("/api/getfooter", async (req: Request, res: Response)=>{
        try{
            const userId: number = await logAuth(prisma, req)
            let footerHtml
            if(userId === -1){
                footerHtml = await ejs.renderFile(path.join(__dirname, 'footer.ejs'))
                res.status(200).json(footerHtml)
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
                footerHtml = await ejs.renderFile(path.join(__dirname, 'footer.ejs'))
                res.status(200).json(footerHtml)
            }
        }
        catch(error){
            res.sendStatus(500)
        }
    })
}
