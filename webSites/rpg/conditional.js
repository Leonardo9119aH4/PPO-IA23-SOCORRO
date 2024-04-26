import { movecalc } from "http://localhost:3000/webSites/rpg/move.js";
export function conditional(input, inputcommands, actualline) {
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
    if(eval(expression)) {
        let commands = inputcommands
        let lines = inputcommands.length
        commands.splice(0, actualline)
        commands.forEach((el, index) => {
            if(el == '}') {
                commands.splice(index, lines - index)
                lines = index
            }
        });
        commands.shift()
        commands.forEach(el => {
            console.log(el)
            movecalc(el)
        });
        return lines
    } else {
        return actualline
    }
}