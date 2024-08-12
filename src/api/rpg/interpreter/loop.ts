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

export function loadLoop(varinputcommand: string, inputlist: Array<string>, line: number, commandsjson: Array<Commands>, gameVars: Array<Array<string>>) {
    console.log(inputlist)
    let loopcommands: Array<string> = listCommands(inputlist, line, line)[0]
    while(eval(expressionString)){
        load(loopcommands, commandsjson, gameVars)
        expressionString = getVars(varinputcommand, expression, gameVars)
    }
    return line
}