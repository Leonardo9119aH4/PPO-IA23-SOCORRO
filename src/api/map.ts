import { Application } from "express"
import { PrismaClient } from "@prisma/client"
import {whichLevel, whichLife, whichEXP} from "./levels/levels"
import {signUp} from "./accounts/signup"
import {signIn} from "./accounts/signin"
import {logOut} from "./accounts/cookies"
import { regInfo } from "./accounts/regInfo"
import { rendererNav } from "./templates/renderer"
import { runMove } from "./rpg/content"
import { getQuiz } from "./quiz/getQuiz"
export async function executeAll(app: Application, prisma: PrismaClient){
    whichLevel(app, prisma)
    whichLife(app, prisma)
    whichEXP(app, prisma)
    signUp(app, prisma)
    signIn(app, prisma)
    logOut(app, prisma)
    regInfo(app, prisma)
    rendererNav(app, prisma)
    runMove(app)
    getQuiz(app, prisma)
}
