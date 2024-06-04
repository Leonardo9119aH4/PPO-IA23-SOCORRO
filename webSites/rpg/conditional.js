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
        let ifcommands = listCommands(inputcommands, actualline)[0]
        console.log(ifcommands)
        load(ifcommands, commandsjson, gameVars, GameDOM)
    }
    return listCommands(inputcommands, actualline)[1] + 1
}