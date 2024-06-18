import {Application, Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
export async function signUp(app: Application, prisma: PrismaClient){
    app.post("/api/signup", (req: Request, res: Response)=>{
        let info = req.body.json()
        if(info.login=="qywt"){
            res.status(200).json("foi")
        }
    })
}