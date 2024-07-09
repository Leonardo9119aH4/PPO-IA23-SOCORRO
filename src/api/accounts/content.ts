import {Application, Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { config } from 'process'
export async function signUp(app: Application, prisma: PrismaClient){
    app.post("/api/signup", async (req: Request, res: Response)=>{
        try{
            let statuscode: number = 0 //statuscode = 0 -> tudo certo, caso contrario é porque teve algum erro
            console.log(req.body)
            if(req.body.username == null || req.body.email == null || req.body.phone == null || req.body.realName == null || req.body.password == null){
                console.log("caiu")
                statuscode=-1
            }
            else{
                if(! (req.body.email == req.body.confirmEmail)){ 
                    statuscode += 1
                }
                if(! (req.body.password == req.body.confirmPassword)){
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
                    if(el.username === req.body.username){
                        statuscode+=4
                    }
                    if(el.email === req.body.email){
                        statuscode+=8
                    }
                    if(el.phone === req.body.phone){
                        statuscode+=16
                    }
                })
            }
            
            if(statuscode===0){
                try{
                    prisma.user.create({
                        data: {
                            username: req.body.username,
                            password: req.body.password,
                            realname: req.body.realName,
                            email: req.body.email,
                            phone: req.body.phone,
                        },
                    });
                    res.status(201).json(statuscode)
                }
                catch(error){
                    res.status(500).json(statuscode)
                }
            }
            else{
                res.status(200).json(statuscode)
            }
        } 
        catch(error) {
            res.status(500).json(NaN)
        }
    })
}
/* statuscode:
-1: algum campo está vazio
0: exito
1: email e confirmação diferentes
2: senha e confirmação diferentes
4: nome de usuario já cadastrado
8: email já cadastrado
16: telefone já cadastrado
*/
export async function signIn(app: Application, prisma: PrismaClient){
    app.post("/api/signin", async (req: Request, res: Response)=>{

    })
}