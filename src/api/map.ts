import { Application } from "express"
import { PrismaClient } from "@prisma/client"
import {howLevel} from "./quiz/levelRqst"
import {signUp, signIn} from "./accounts/content"
export async function executeAll(app: Application, prisma: PrismaClient){
    howLevel()
    signUp(app, prisma)
    signIn(app, prisma)
}
