import express, { Application, Request, Response } from 'express'
import { setVars, getVars } from './vars'
import {detectLoop, loadLoop} from './loop'
import {conditional} from './conditional'
import { movecalc } from './move'
import fs from 'fs-promise'
import path from 'path'

import { Commands } from './commands'
import { setActions } from '../rpg'
import {getTiles} from './getTiles'

export function runMove(app: Application){
    app.post('/api/private/interpreter', async (req: Request, res: Response) => {
        let inputcommands = req.body.inputcommands.split("\n")
        var gameVars: Array<Array<any>> = [new Array(0), new Array(0), new Array(0)]
        const reqCommands: Array<Commands> = await fs.readJson(path.join(__dirname, 'commands.json'))
        var phaserCommands: Array<Array<string>> = []
        load(inputcommands, reqCommands, gameVars, phaserCommands)
        res.status(200).json(phaserCommands)
    })
}

/*
Estrutura do phaser commands:
[
    ["up", "(quantidade de tiles)"],
    ["down", "(quantidade de tiles)"],
    ["left", "(quantidade de tiles)"],
    ["rigth", "(quantidade de tiles)"]
]
*/

export function load(inputcommands: Array<string>, commandsjson: Array<Commands>, gameVars: Array<Array<string>>, phaserCommands: Array<Array<string>>) {
    for(let i = 0; i < inputcommands.length; i++) {
        console.log("execute")
        let inputsplit = inputcommands[i].split('')
        setVars(inputcommands[i], inputsplit, gameVars)
        let varinputcommand = inputcommands[i]
        inputcommands[i] = getVars(inputcommands[i], inputsplit, gameVars)
        inputsplit = inputcommands[i].split('')
        if(detectLoop(inputcommands[i])){
             i = loadLoop(varinputcommand, inputcommands, i, commandsjson, gameVars, phaserCommands)
        }
        if(inputcommands[i].indexOf('se ') != -1 || inputcommands[i].indexOf('se(') != -1) {
            i = conditional(inputsplit, inputcommands, i, commandsjson, gameVars, phaserCommands)
        }
        let tiles: number = Number(getTiles(inputcommands[i]));
        console.log(tiles)
        commandsjson.forEach((commandelement: Commands) => {
            console.log("quase move")
            if(inputcommands[i] == (commandelement.command + `(${tiles})`)) { //se o input for igual a algum comando do json executa o código
                phaserCommands.push(movecalc(inputcommands[i], tiles))
                console.log("move")
            }
        })
    }
}