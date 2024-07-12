import { Application } from "express"
import { PrismaClient } from "@prisma/client"
import {whichLevel, whichLife} from "./levels/levels"
import {signUp} from "./accounts/signup"
import {signIn} from "./accounts/signin"
import {logAuth} from "./accounts/logAuth"
export async function executeAll(app: Application, prisma: PrismaClient){
    whichLevel(app, prisma)
    whichLife(app, prisma)
    signUp(app, prisma)
    signIn(app, prisma)
    logAuth(app, prisma)
}
