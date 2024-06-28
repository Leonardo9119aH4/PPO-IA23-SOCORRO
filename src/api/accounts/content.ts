import {Application, Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { config } from 'process'
export async function signUp(app: Application, prisma: PrismaClient){
    app.post("/api/signup", async (req: Request, res: Response)=>{
        let statuscode: number = 0 //statuscode = 0 -> tudo certo, caso contrario é porque teve algum erro
        let info: any = req.body.json()
        if(! info.email == info.confirmEmail){ 
            statuscode += 1
        }
        if(! info.password == info.confirmPassword){
            statuscode += 2
        }

        const users = await prisma.user.findMany({
            select: {
                username: true,
                email: true,
                phone: true,
            },
        });
        users.forEach(el =>{
            if(el.username === info.username){
                statuscode+=4
            }
            if(el.email === info.email){
                statuscode+=8
            }
            if(el.phone === info.phone){
                statuscode+=16
            }
        })
        
        res.status(200).json(statuscode)
        if(statuscode===0){

        }
    })
}
/* statuscode:
1- email e confirmação diferentes
2- senha e confirmação diferentes
4- nome de usuario já cadastrado
8- email já cadastrado
16- telefone já cadastrado
*/