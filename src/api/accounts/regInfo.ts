import {Application, Request, Response} from 'express'
import { PrismaClient } from '@prisma/client'
import { logAuth } from './cookies'
export async function regInfo(app: Application, prisma:PrismaClient){
    app.post("/api/private/username", async (req: Request, res: Response) =>{
        try{
            if(req.body.action == "get"){
                const userId: number = await logAuth(prisma, req)
                if(userId === -1){
                    res.sendStatus(401) //não autenticado/logado
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
                    res.status(200).json(user?.username) //envia o nome de usuário
                }
            }
            else if(req.body.action == "set"){
                const userId: number = await logAuth(prisma, req)
                if(userId === -1){
                    res.sendStatus(401) //não autenticado/logado
                }
                else if(isNaN(userId)){
                    res.sendStatus(502) //erro na função logAuth
                }
                else{
                    if(req.body.username == null){
                        res.status(400).json("username null")
                    }
                    else{
                        const user = await prisma.user.findUnique({
                            where: {
                                id: userId
                            }
                        })
                        if(user != null){ //tive que fazer isso pq o ts é imbecil (é impossível user ser nulo)
                            prisma.user.update({
                                where: {id: user.id},
                                data: {username: req.body.username}
                            })
                        }
                    }
                }
            }
            else{
                res.sendStatus(400) //ação inválida
            }
            
        }
        catch{
            res.sendStatus(500)
        }
    })
}