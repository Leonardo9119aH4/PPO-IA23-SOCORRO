import { listCommands } from "http://localhost:3000/webSites/rpg/commandlist.js"
import { load } from "http://localhost:3000/webSites/rpg/main.js"
export function conditional(input, inputcommands, actualline, commandsjson, gameVars, GameDOM) {
    console.log(gameVars)
    let condition = false
    let expression = []
    input.forEach(el => {
        if(el == '(' || el == ')') {
            condition = !condition
        }
        if(condition) {
            expression.push(el)
        }
    });
    expression.splice(0, 1)
    expression = expression.join('')
    console.log(expression)
    if(eval(expression)) {
        let ifcommands = listCommands(inputcommands, actualline, actualline)[0]
        console.log(ifcommands)
        load(ifcommands, commandsjson, gameVars, GameDOM)
        let elseline = listCommands(inputcommands, actualline, actualline)[1] + 1
        console.log(elseline)
        console.log(inputcommands[elseline])
        if(inputcommands[elseline].indexOf("se nao") != -1 || inputcommands[elseline].indexOf("}se nao") != -1 || inputcommands[elseline].indexOf("se nao{") != -1 || inputcommands[elseline].indexOf("}se nao{") != -1){
            let elsecommands = listCommands(inputcommands, listCommands(inputcommands, actualline)[1] + 1, listCommands(inputcommands, actualline)[1] + 1)[0] + 1
            console.log(elsecommands)
            load(elsecommands, commandsjson, gameVars, GameDOM)
        }
    }
    return listCommands(inputcommands, actualline, actualline)[1] + 1
}