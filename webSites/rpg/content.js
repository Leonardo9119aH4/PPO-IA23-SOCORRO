import {main} from 'http://localhost:3000/globalAssets/js/main.js'
main()
import { movecalc } from 'http://localhost:3000/webSites/rpg/move.js'
import { conditional } from 'http://localhost:3000/webSites/rpg/conditional.js'

const button = document.querySelector('button#exec')
const input = document.querySelector('div#code_input>textarea')

async function move() {
    const requestcommand = await fetch('http://localhost:3000/webSites/rpg/localassets/commands.json')
    const commandsjson = await requestcommand.json()
    const inputcommands = input.value.split('\n')
    for(let i = 0; i < inputcommands.length; i++) {
        let condition = false
        let inputsplit = inputcommands[i].split('')
        inputsplit.forEach(el => {
            if(el == '{') {
                i = conditional(inputsplit, inputcommands, i)
                condition = true
            }
        });
        if(condition){
            commandsjson.forEach(commandelement => {
                if(inputcommands[i] == commandelement.command) { //se o input for igual a algum comando do json executa o código
                    movecalc(commandelement)
                }
            })
        }
    }
}

button.addEventListener('click', () => {
    move()
})