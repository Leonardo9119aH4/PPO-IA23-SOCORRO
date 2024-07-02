import {Application, Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
export async function logAuth(app: Application, prisma: PrismaClient){
    app.post("/api/private/logauth", async (req: Request, res: Response)=>{
        try{
            
        }
        catch{
            res.status(500)
        }
    })
}