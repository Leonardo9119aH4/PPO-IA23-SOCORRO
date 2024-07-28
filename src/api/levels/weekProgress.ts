import { PrismaClient } from "@prisma/client";
import { Application } from "express";

export async function weekProgress(prisma: PrismaClient){
    let now = new Date()
    const users = prisma.user.findMany({
        select: {
            id: true,
            exp: true,
        }
    })
    
}