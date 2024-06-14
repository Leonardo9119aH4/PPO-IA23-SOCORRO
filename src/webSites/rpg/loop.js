import { listCommands } from 'http://localhost:3000/webSites/rpg/commandlist.js'
import { load } from 'http://localhost:3000/webSites/rpg/main.js'
import { getVars } from 'http://localhost:3000/webSites/rpg/vars.js'
var expression

export function detectLoop(inputcommand) {
    expression = []
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

export function loadLoop(varinputcommand, inputlist, line, commandsjson, gameVars, GameDOM) {
    console.log(inputlist)
    let loopcommands = listCommands(inputlist, line, line)[0]
    console.log(loopcommands, GameDOM)
    while(eval(expression)){
        load(loopcommands, commandsjson, gameVars, GameDOM)
        expression = getVars(varinputcommand, expression.split(''), gameVars)
    }
    return line
}