import express, { Application, Request, Response } from 'express'
import { setVars, getVars } from './vars'
import {detectLoop, loadLoop} from './loop'
import {conditional} from './conditional'
import { movecalc } from './move'
import fs from 'fs-promise'
import path from 'path'

import { Commands } from './commands'
import { setActions } from '../rpg'

export function runMove(app: Application){
    app.post('/api/private/interpreter', async (req: Request, res: Response) => {
        let inputcommands = req.body.inputcommands
        var gameVars: Array<Array<any>> = [new Array(0), new Array(0), new Array(0)]
        const reqCommands: Array<Commands> = await fs.readJson(path.join(__dirname, 'commands.json'))
        load(inputcommands, reqCommands, gameVars)
        setActions(app, phaserCommands, req)
        res.status(200).json(phaserCommands)
    })
}

var phaserCommands: Array<string>

export function load(inputcommands: Array<string>, commandsjson: Array<Commands>, gameVars: Array<Array<string>>) {
    for(let i = 0; i < inputcommands.length; i++) {
        let inputsplit = inputcommands[i].split('')
        setVars(inputcommands[i], inputsplit, gameVars)
        let varinputcommand = inputcommands[i]
        inputcommands[i] = getVars(inputcommands[i], inputsplit, gameVars)
        inputsplit = inputcommands[i].split('')
        if(detectLoop(inputcommands[i])){
             i = loadLoop(varinputcommand, inputcommands, i, commandsjson, gameVars)
        }
        if(inputcommands[i].indexOf('se ') != -1 || inputcommands[i].indexOf('se(') != -1) {
            i = conditional(inputsplit, inputcommands, i, commandsjson, gameVars)
        }
        commandsjson.forEach((commandelement: Commands) => {
            if(inputcommands[i] == commandelement.command) { //se o input for igual a algum comando do json executa o código
                phaserCommands.push(movecalc(commandelement))
            }
        })
    }
}