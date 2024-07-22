import { PrismaClient } from "@prisma/client";
export async function fixDBErrors(prisma: PrismaClient, maxLife: number){
    const users = await prisma.user.findMany({
        select:{
            id: true,
            life: true,
            level: true,
            exp: true
        }
    })
    users.forEach(async user=>{
        if(user.life<0 || isNaN(user.life) || user.life == null || user.life == undefined){ //vida não pode ser negativa
            await prisma.user.update({
                where: {id: user.id},
                data: {
                    life: 0
                }
            })
        }
        if(user.life>5){ //vida acima do limite máximo
            await prisma.user.update({
                where: {id: user.id},
                data: {
                    life: maxLife
                }
            })
        }
        if(user.level<0 || isNaN(user.level) || user.level == null || user.level == undefined){ //nível não pode ser negativo
            await prisma.user.update({
                where: {id: user.id},
                data: {
                    level: 0
                }
            })
        }
        if(user.exp<0 || isNaN(user.exp) || user.exp == null || user.exp == undefined){ //exp não pode ser negativo
            await prisma.user.update({
                where: {id: user.id},
                data: {
                    exp: 0
                }
            }) 
        }
    })
}
export async function regenLife(prisma: PrismaClient, maxLife: number){
    const users = await prisma.user.findMany({
        select:{
            id: true,
            life: true,
        }
    })
    users.forEach(async user=>{
        if(user.life < maxLife){
            await prisma.user.update({
                where: {id: user.id},
                data: {
                    life: {increment: 1}
                }
            })
        }
    })
}
export async function resetExp(prisma: PrismaClient){
    const users = await prisma.user.findMany({
        select:{
            id: true,
            exp: true
        }
    })
    users.forEach(async user=>{
        await prisma.user.update({
            where: {id: user.id},
            data: {
                exp: 0
            }
        })
    })
}