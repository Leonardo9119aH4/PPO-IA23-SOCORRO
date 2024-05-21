import { movecalc } from "http://localhost:3000/webSites/rpg/move.js";
export function conditional(input, inputcommands, actualline, commandlist, vars) {
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
    let commands = inputcommands
    let lines = inputcommands.length
    commands.splice(0, actualline)
    commands.forEach((el, index) => {
        if(el == '}') {
            commands.splice(index, lines - index)
            lines = index
        }
    })
    console.log(expression)
    if(eval(expression)) {
        commands.shift()
        commands.forEach(el => {
            commandlist.forEach(commandelement => {
                if(el == commandelement.command) { //se o input for igual a algum comando do json executa o código
                    movecalc(commandelement, vars)
                }
            })
        })
        return lines
    } else {
        console.log('Não é uma condicional')
        return lines
    }
}