import express, { Application, Request, Response } from 'express'
import { setVars, getVars } from './vars'
import {detectLoop, loadLoop} from './loop'
import {conditional} from './conditional'
//import { attackCalc, moveCalc } from './move'
import fs from 'fs-promise'
import path from 'path'

import { Commands } from './commands'
import {getTiles} from './getTiles'

export function runMove(app: Application){
    app.post('/api/private/interpreter', async (req: Request, res: Response) => {
        let inputcommands = req.body.inputcommands.split("\n")
        var gameVars: Array<Array<any>> = [new Array(0), new Array(0), new Array(0)]
        const moveCommands: Array<Commands> = await fs.readJson(path.join(__dirname, 'move.json'))
        const attackCommands: Array<Commands> = await fs.readJson(path.join(__dirname, 'attack.json'))
        var phaserCommands: Array<Array<number>> = []
        load(inputcommands, moveCommands, gameVars, phaserCommands, attackCommands)
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

function attackCalc(command: string){
    switch(command) {
        case 'AtacarCima()':
            return [5, 1]
        case 'AtacarBaixo()':
            return [7, 1]
        case 'AtacarDireita()':
            return [6, 1]
        case 'AtacarEsquerda()':
            return [8, 1]
    }
    return [NaN, NaN]
}

function moveCalc(command: string, tiles: number) {
    switch (command) { //verfica a variavel do comando para determinar o lado
        case `MoverCima(${tiles})`:
            return [1, tiles]
        case `MoverBaixo(${tiles})`:  
            return [3, tiles]
        case `MoverDireita(${tiles})`:
            return [2, tiles]
        case `MoverEsquerda(${tiles})`:
            return [4, tiles]
    }
    return [NaN, NaN]
}

export function load(inputcommands: Array<string>, moveCommandsJson: Array<Commands>, gameVars: Array<Array<string>>, phaserCommands: Array<Array<number>>, attackCommandsJson: Array<Commands>) {
    for(let i = 0; i < inputcommands.length; i++) {
        console.log("execute")
        let inputsplit = inputcommands[i].split('')
        setVars(inputcommands[i], inputsplit, gameVars)
        let varinputcommand = inputcommands[i]
        inputcommands[i] = getVars(inputcommands[i], inputsplit, gameVars)
        inputsplit = inputcommands[i].split('')
        if(detectLoop(inputcommands[i])){
             i = loadLoop(varinputcommand, inputcommands, i, moveCommandsJson, gameVars, phaserCommands, attackCommandsJson)
        }
        if(inputcommands[i].indexOf('se ') != -1 || inputcommands[i].indexOf('se(') != -1) {
            i = conditional(inputsplit, inputcommands, i, moveCommandsJson, gameVars, phaserCommands, attackCommandsJson)
        }
        let tiles: number = Number(getTiles(inputcommands[i]));
        console.log(inputcommands[i], tiles)
        moveCommandsJson.forEach((commandelement: Commands) => {
            if(inputcommands[i] == (commandelement.command + `(${tiles})`)) { //se o input for igual a algum comando do json executa o código
                phaserCommands.push(moveCalc(inputcommands[i], tiles))
            }
        })
        attackCommandsJson.forEach((command: Commands) => {
            if(inputcommands[i] == command.command){
                console.log("caiu")
                phaserCommands.push(attackCalc(inputcommands[i]))
            }
        })
    }
}