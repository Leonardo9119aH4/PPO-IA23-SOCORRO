import { listCommands } from 'http://localhost:3000/webSites/rpg/commandlist.js'
import { load } from 'http://localhost:3000/webSites/rpg/main.js'
import { gameVars, GameDOM, commandsjson } from 'http://localhost:3000/webSites/rpg/content.js'
var expression = []

export function detectLoop(inputcommand) {
    if(inputcommand.indexOf('enquanto(') != -1 || inputcommand.indexOf('enquanto ') != -1){
        let stpos = inputcommand.indexOf('(') + 1
        let endpos = inputcommand.indexOf(')')
        while(stpos < endpos){
            expression.push(inputcommand[stpos])
            stpos++
        }
        expression = expression.join('')
        return true
    }
    return false
}

export function loadLoop(inputcommands, inputlist, line) {
    console.log(inputlist)
    let loopcommands = listCommands(inputlist, line)
    console.log(loopcommands, GameDOM)
    while(eval(expression)){
        load(loopcommands, commandsjson, gameVars, GameDOM)
    }
    return line
}