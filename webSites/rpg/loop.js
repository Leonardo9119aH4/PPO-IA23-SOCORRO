import { listCommands } from 'http://localhost:3000/webSites/rpg/commandlist.js'
import { load } from 'http://localhost:3000/webSites/rpg/main.js'
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
    let loopcommands = listCommands(inputcommands, line)
    console.log(loopcommands)
    while(eval(expression)){
        load(loopcommands)
    }
    return line
}