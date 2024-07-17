import express, { Application, Request, Response } from 'express'
import { setVars, getVars } from './vars'
import {detectLoop, loadLoop} from './loop'
import {conditional} from './conditional'
import { movecalc } from './move'
import fs from 'fs-promise'
import path from 'path'

import { GameDOM } from './gameDOM'


export function runMove(app: Application){
    app.post('/api/move', async (req: Request, res: Response) => {
        let inputcommands = req.body.inputcommands
        let GameDOM: GameDOM = req.body.GameDOM
        var gameVars = [new Array(0), new Array(0), new Array(0)]
        const reqCommands = await fs.readJson(path.join(__dirname, 'commands.json'))    
        load(inputcommands, reqCommands, gameVars, GameDOM)
        res.status(200).send(GameDOM)
    })
}

export function load(inputcommands: Array<string>, commandsjson: Array<Array<string>>, gameVars: Array<Array<string>>, GameDOM: Object) {
    for(let i = 0; i < inputcommands.length; i++) {
        console.log(inputcommands)
        let inputsplit = inputcommands[i].split('')
        setVars(inputcommands[i], inputsplit, gameVars)
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
        commandsjson.forEach((commandelement: any) => {
            if(inputcommands[i] == commandelement.command) { //se o input for igual a algum comando do json executa o código
                //GameDOM = movecalc(commandelement, GameDOM)
            }
        })
    }
}