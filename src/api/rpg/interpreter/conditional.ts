import { listCommands } from "./commandlist"
import { Commands } from "./commands"
import { load } from "./content"
import { GameDOM } from "./gameDOM"

export function conditional(input: Array<string>, inputcommands: Array<string>, actualline: number, commandsjson: Array<Commands>, gameVars: Array<Array<string>>, GameDOM: GameDOM) {
    console.log(gameVars)
    let condition = false
    let expression: Array<string> = []
    input.forEach(el => {
        if(el == '(' || el == ')') {
            condition = !condition
        }
        if(condition) {
            expression.push(el)
        }
    });
    expression.splice(0, 1)
    let expressionString: string = expression.join('')
    console.log(expression)
    if(eval(expressionString)) {
        let ifcommands: any = listCommands(inputcommands, actualline, actualline)[0]
        console.log(ifcommands)
        load(ifcommands, commandsjson, gameVars, GameDOM)
        let elseline = listCommands(inputcommands, actualline, actualline)[1] + 1
        console.log(elseline)
        console.log(inputcommands[elseline])
        if(inputcommands[elseline].indexOf("se nao") != -1 || inputcommands[elseline].indexOf("}se nao") != -1 || inputcommands[elseline].indexOf("se nao{") != -1 || inputcommands[elseline].indexOf("}se nao{") != -1){
            let elsecommands = listCommands(inputcommands, listCommands(inputcommands, actualline, actualline)[1] + 1, listCommands(inputcommands, actualline, actualline)[1] + 1)[0] + 1
            console.log(elsecommands)
            load(elsecommands, commandsjson, gameVars, GameDOM)
        }
    }
    return listCommands(inputcommands, actualline, actualline)[1] + 1
}