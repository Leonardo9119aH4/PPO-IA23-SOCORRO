import { Application, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { logAuth } from "../accounts/cookies";
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
            const user = await prisma.user.findUnique({
                where: {
                    id: userId
                }
            })
            if(user != null){
                if(req.body.level > user.level){
                    res.sendStatus(403)
                }
                const quizRqst = await fetch(`./lv${req.body.level}.json`)
                let quiz = await quizRqst.json()
                const askNum = 7 + Math.floor(Math.random()*5)
                for (let i = quiz.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [quiz[i], quiz[j]] = [quiz[j], quiz[i]];
                }
                quiz = quiz.slice(0, askNum)
                res.status(200).json(quiz)
            }
        }
        catch{
            res.sendStatus(500)
        }
    })
}