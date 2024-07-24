import { Application } from "express"
import { PrismaClient } from "@prisma/client"
import {whichLevel, whichLife, whichEXP} from "./levels/levels"
import {signUp} from "./accounts/signup"
import {signIn} from "./accounts/signin"
import {logOut} from "./accounts/cookies"
import { regInfo } from "./accounts/regInfo"
import { rendererNav } from "./templates/renderer"
import { runMove } from "./rpg/content"
import { getPractice, getQuiz } from "./quiz/getQuiz"
import { getBlocks, getScript } from "./blocks/getBlocks"
import { fixDBErrors, regenLife, resetExp } from "./levels/update"
export async function executeAll(app: Application, prisma: PrismaClient, maxLife: number){
    whichLevel(app, prisma)
    whichLife(app, prisma,  maxLife)
    whichEXP(app, prisma)
    signUp(app, prisma)
    signIn(app, prisma)
    logOut(app, prisma)
    regInfo(app, prisma)
    rendererNav(app, prisma)
    runMove(app)
    getQuiz(app, prisma)
    getPractice(app, prisma)
    getBlocks(app, prisma)
    getScript(app, prisma)
    setInterval(()=>{ //regenera 1 vida a cada 2h
        regenLife(prisma, maxLife)
    }, 2*60*60*1000)
    setInterval(()=>{ //reseta o xp a cada dia (xp diário)
        resetExp(prisma)
    }, 24*60*60*1000)
    fixDBErrors(prisma, maxLife) //corrige erros no banco de dados
}
