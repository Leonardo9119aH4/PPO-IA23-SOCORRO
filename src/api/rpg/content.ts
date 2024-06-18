import express, { Application, Request, Response } from 'express'

function run(app: Application){
    app.post('/move', (req: Request, res: Response) => {
        let inputcommands = req.body.json();
        var gameVars = [new Array(0), new Array(0), new Array(0)]
        //parei aqui
    })
}