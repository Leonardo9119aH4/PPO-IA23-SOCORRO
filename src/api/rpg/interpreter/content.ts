import express, { Application, Request, Response } from 'express'
import { setVars, getVars } from './vars'
import {detectLoop, loadLoop} from './loop'
import {conditional} from './conditional'
//import { attackCalc, moveCalc } from './move'
import fs from 'fs-promise'
import path from 'path'

import { Commands, returnPureCommand } from './commands'
import {getTiles} from './getTiles'

export async function runMove(app: Application){
    app.post('/api/private/interpreter', async (req: Request, res: Response) => {
        let inputcommands = req.body.inputcommands.split("\n")
        var gameVars: Array<Array<any>> = [new Array(0), new Array(0), new Array(0)]
        const moveCommands: Array<Commands> = await fs.readJson(path.join(__dirname, 'move.json'))
        const attackCommands: Array<Commands> = await fs.readJson(path.join(__dirname, 'attack.json'))
        var phaserCommands: Array<Array<number>> = []
        await load(inputcommands, moveCommands, gameVars, phaserCommands, attackCommands)
        console.log("foi:", phaserCommands)
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
    console.log("atacar: ", command)
    switch(command) {
        case 'AtacarCima();':
            return [5, 1]
        case 'AtacarBaixo();':
            return [7, 1]
        case 'AtacarDireita();':
            return [6, 1]
        case 'AtacarEsquerda();':
            return [8, 1]
    }
    return [NaN, NaN]
}

function moveCalc(tiles: number, command: string) {
    console.log("mover: ", command + `(${tiles});`)
    switch (command) { //verfica a variavel do comando para determinar o lado
        case `MoverCima`:
            return [1, tiles]
        case `MoverBaixo`:  
            return [3, tiles]
        case `MoverDireita`:
            return [2, tiles]
        case `MoverEsquerda`:
            return [4, tiles]
    }
    return [NaN, NaN]
}

export async function load(inputcommands: Array<string>, moveCommandsJson: Array<Commands>, gameVars: Array<Array<string>>, phaserCommands: Array<Array<number>>, attackCommandsJson: Array<Commands>) {
    for(let i = 0; i < inputcommands.length; i++) {
        let inputsplit = inputcommands[i].split('')
        setVars(inputcommands[i], inputsplit, gameVars)
        let varinputcommand = inputcommands[i]
        inputcommands[i] = getVars(inputcommands[i], inputsplit, gameVars)
        inputsplit = inputcommands[i].split('')
        if(detectLoop(inputcommands[i])){
            i = await loadLoop(varinputcommand, inputcommands, i, moveCommandsJson, gameVars, phaserCommands, attackCommandsJson)
        }
        if(inputcommands[i].indexOf('se ') != -1 || inputcommands[i].indexOf('se(') != -1) {
            console.log("tem condicional")
            i = await conditional(inputsplit, inputcommands, i, moveCommandsJson, gameVars, phaserCommands, attackCommandsJson)
        }
        console.log(i)
        console.log(inputcommands[i])
        let nextIteration: boolean = false
        attackCommandsJson.forEach((command: Commands) => {
            if(inputcommands[i] == command.command){
                console.log("caiu")
                phaserCommands.push(attackCalc(inputcommands[i]))
                nextIteration = true
            }
        })
        if(nextIteration){
            continue
        }
        console.log("attack")
        let pureCommand = await returnPureCommand(inputcommands[i])
        console.log("pure: ", pureCommand)
        moveCommandsJson.forEach((commandelement: Commands) => {
            if(pureCommand == commandelement.command) { //se o input for igual a algum comando do json executa o código
                let tiles: number = Number(getTiles(inputcommands[i]))
                if(tiles == 0) {
                    tiles = 1
                }
                console.log("tiles: ", tiles)
                phaserCommands.push(moveCalc(tiles, commandelement.command))
                console.log("phaserCommands:", phaserCommands)
            }
        })
    }
}