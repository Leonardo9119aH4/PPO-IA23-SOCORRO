import {Request} from 'express'
import { PrismaClient } from '@prisma/client'
export async function logAuth(prisma: PrismaClient, req: Request){
    try{
        const authKeys = await prisma.authKey.findMany({
            select: {
                key: true,
                userId: true,
            }
        })
        authKeys.forEach(async el =>{
            if(req.cookies["authKey"] === el.key){
                return el.userId //retorna o id do usuário que o cookie referencia
            }
        })
        return -1 //se não achou o cookie
    }
    catch{
        return NaN //se der erro fudido, retorna NaN
    }
}