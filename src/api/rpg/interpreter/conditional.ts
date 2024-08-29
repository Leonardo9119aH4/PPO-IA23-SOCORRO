import { listCommands } from "./commandlist"
import { Commands } from "./commands"
import { load } from "./content"

export async function conditional(input: Array<string>, inputcommands: Array<string>, actualline: number, commandsjson: Array<Commands>, gameVars: Array<Array<string>>, phaserCommands: Array<Array<number>>, attackCommandsJson: Array<Commands>) {
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
    })
    expression.splice(0, 1)
    let expressionString: string = expression.join('')
    console.log(expression)
    let elseline = listCommands(inputcommands, actualline, actualline)[1]
    console.log("elseline", elseline)
    console.log(inputcommands[elseline])
    if(eval(expressionString)) {
        let ifcommands: any = listCommands(inputcommands, actualline, actualline)[0]
        console.log("comandos do if: ", ifcommands)
        await load(ifcommands, commandsjson, gameVars, phaserCommands, attackCommandsJson)
    } else if(inputcommands[elseline].indexOf("se nao") != -1 || inputcommands[elseline].indexOf("}se nao") != -1 || inputcommands[elseline].indexOf("se nao{") != -1 || inputcommands[elseline].indexOf("}se nao{") != -1){
        let elsecommands = listCommands(inputcommands, listCommands(inputcommands, actualline, actualline)[1] + 1, listCommands(inputcommands, actualline, actualline)[1] + 1)[0]
        console.log("elsecommands: ", elsecommands)
        await load(elsecommands, commandsjson, gameVars, phaserCommands, attackCommandsJson)
    }
    return listCommands(inputcommands, actualline, actualline)[1]
}