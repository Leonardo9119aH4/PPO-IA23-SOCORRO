import { Application, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { logAuth } from "../accounts/cookies";
import * as fs from "fs"
export async function getQuiz(app: Application, prisma: PrismaClient){
    app.post("/api/private/getquiz", async (req: Request, res: Response)=>{
        try{
            let userId: number = await logAuth(prisma, req)
            if(userId===-1){
                res.sendStatus(401)
            }
            else if(isNaN(userId)){
                res.sendStatus(500)
            }
            else if(req.body.level == null){
                res.sendStatus(400)
            }
            else{
                const user = await prisma.user.findUnique({
                    where: {
                        id: userId
                    }
                })
                if(user != null){
                    if(req.body.level > user.level){
                        res.sendStatus(403)
                    }
                    const quizRqst = fs.readFileSync(`./src/api/quiz/lv${req.body.level}.json`, 'utf-8') //referência da caminho absoluta² (inclui ./src/)
                    let quiz = await JSON.parse(quizRqst)
                    const askNum = 7 + Math.floor(Math.random()*5) //quantidade de questões, 7 a 12
                    for (let i = quiz.length - 1; i > 0; i--) {
                        const j = Math.floor(Math.random() * (i + 1));
                        [quiz[i], quiz[j]] = [quiz[j], quiz[i]];
                    }
                    quiz = quiz.slice(0, askNum)
                    res.status(200).json(quiz)
                }
            }
        }
        catch(error){
            console.log(error)
            res.sendStatus(500)
        }
    })
}
export async function getPractice(app: Application, prisma: PrismaClient){
    app.post("/api/private/getpractice", async (req: Request, res: Response)=>{
        try{
            let userId: number = await logAuth(prisma, req)
            if(userId===-1){
                res.sendStatus(401)
            }
            if(isNaN(userId)){
                res.sendStatus(500)
            }
            else{
                const user = await prisma.user.findUnique({
                    where: {
                        id: userId
                    }
                })
                if(user != null){
                    let quiz: any[] = [] //ts é uma merda, tive que fazer isso
                    for(let i=1; i<=user.level; i++){
                        if(fs.existsSync(`./src/api/quiz/lv${i}.json`)){
                            let quizRqst = fs.readFileSync(`./src/api/quiz/lv${i}.json`, 'utf-8') //referência da caminho absoluta² (inclui ./src/)
                            let quizJSON = await JSON.parse(quizRqst)
                            quiz = quiz.concat(quizJSON)
                        }
                    }
                    let askNum: number //quantidade de questões a serem enviadas
                    if(user.level === 1){ //se for o primeiro nível do usuário
                        askNum = 12
                    }
                    else{
                        askNum = 12 + Math.floor(Math.random()*4) //12 a 16 questões
                    }
                    for (let i = quiz.length - 1; i > 0; i--) {
                        const j = Math.floor(Math.random() * (i + 1));
                        [quiz[i], quiz[j]] = [quiz[j], quiz[i]];
                    }
                    quiz = quiz.slice(0, askNum)
                    res.status(200).json(quiz)
                }
            }
        }
        catch(error){
            console.log(error)
            res.sendStatus(500)
        }
    })
}