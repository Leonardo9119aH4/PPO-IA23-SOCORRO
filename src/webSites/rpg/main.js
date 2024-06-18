import { movecalc } from 'http://localhost:3000/webSites/rpg/move.js'
import { conditional } from 'http://localhost:3000/webSites/rpg/conditional.js'
import { setVars } from 'http://localhost:3000/webSites/rpg/vars.js'
import { getVars } from 'http://localhost:3000/webSites/rpg/vars.js'
import { detectLoop } from 'http://localhost:3000/webSites/rpg/loop.js'
import { loadLoop } from 'http://localhost:3000/webSites/rpg/loop.js'

export function load(inputcommands, commandsjson, gameVars, GameDOM) {
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