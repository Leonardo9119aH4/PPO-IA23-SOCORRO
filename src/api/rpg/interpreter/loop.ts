import { listCommands } from './commandlist'
import { Commands } from './commands'
import { load } from './content'
import { getVars } from './vars'
var expression: Array<string>
var expressionString: string

export function detectLoop(inputcommand: string) {
    expression = []
    if(inputcommand.indexOf('enquanto(') != -1 || inputcommand.indexOf('enquanto ') != -1){
        let stpos = inputcommand.indexOf('(') + 1
        let endpos = inputcommand.indexOf(')')
        while(stpos < endpos){
            expression.push(inputcommand[stpos])
            stpos++
        }
        expressionString = expression.join('')
        return true
    }
    return false
}

export async function loadLoop(varinputcommand: string, inputlist: Array<string>, line: number, commandsjson: Array<Commands>, gameVars: Array<Array<string>>, phaserCommands: Array<Array<number>>, attackCommandsJson) {
    console.log(inputlist)
    let loopcommands: Array<string> = listCommands(inputlist, line, line)[0]
    while(eval(expressionString)){
        await load(loopcommands, commandsjson, gameVars, phaserCommands, attackCommandsJson)
        expressionString = getVars(varinputcommand, expression, gameVars)
    }
    return line
}