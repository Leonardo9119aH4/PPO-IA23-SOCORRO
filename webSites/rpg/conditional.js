import { movecalc } from "http://localhost:3000/webSites/rpg/move.js";
export function conditional(input, inputcommands, actualline, commandlist) {
    console.log('condicional')
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
        let commands = inputcommands
        let lines = inputcommands.length
        console.log(commands)
        commands.splice(0, actualline)
        console.log(commands)
        commands.forEach((el, index) => {
            if(el == '}') {
                commands.splice(index, lines - index)
                lines = index
                console.log('caiu na condicional')
            }
        });
        commands.shift()
        commands.forEach(el => {
            commandlist.forEach(commandelement => {
                if(el == commandelement.command) { //se o input for igual a algum comando do json executa o código
                    console.log(commandelement)
                    movecalc(commandelement)
                }
            });
        })
        return lines
    } else {
        return actualline
    }
}