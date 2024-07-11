import express, { Application, Request, Response } from 'express'

function run(app: Application){
    app.post('/move', (req: Request, res: Response) => {
        let inputcommands = req.body.json();
        var gameVars = [new Array(0), new Array(0), new Array(0)]
        
    })
}

function load(inputcommands: Array<string>, commandsjson: Array<string>, gameVars: Array<Array<string>>, GameDOM: Object) {
    for(let i = 0; i < inputcommands.length; i++) {
        console.log(inputcommands)
        let inputsplit = inputcommands[i].split('')
        setVars(inputcommands[i], inputsplit, gameVars)
        console.log(inputcommands)
        console.log(gameVars, i)
        console.log(GameDOM)
        console.log(i)
        let varinputcommand = inputcommands[i]
        inputcommands[i] = getVars(inputcommands[i], inputsplit, gameVars)
        inputsplit = inputcommands[i].split('')
        if(detectLoop(inputcommands[i])){
             console.log('temloop')
             i = loadLoop(varinputcommand, inputcommands, i, commandsjson, gameVars, GameDOM)
        }
        if(inputcommands[i].indexOf('se ') != -1 || inputcommands[i].indexOf('se(') != -1) {
            console.log('tem condicional')
            i = conditional(inputsplit, inputcommands, i, commandsjson, gameVars, GameDOM)
        }
        commandsjson.forEach(commandelement => {
            if(inputcommands[i] == commandelement.command) { //se o input for igual a algum comando do json executa o código
                movecalc(commandelement, GameDOM)
            }
        })
    }
}