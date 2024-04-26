import {main} from 'http://localhost:3000/globalAssets/js/main.js'

import { movecalc } from 'http://localhost:3000/webSites/rpg/move.js'
import { conditional } from 'http://localhost:3000/webSites/rpg/conditional.js'

const button = document.querySelector('button#exec')
const input = document.querySelector('div#code_input>textarea')

async function load() {
    const requestcommand = await fetch('http://localhost:3000/webSites/rpg/localassets/commands.json')
    const commandsjson = await requestcommand.json()
    const inputcommands = input.value.split('\n')
    let condition = false
    for(let i = 0; i < inputcommands.length; i++) {
        let inputsplit = inputcommands[i].split('')
        inputsplit.forEach(el => {
            if(el == '{') {
                i = conditional(inputsplit, inputcommands, i, commandsjson)
                condition = true
            }
            if(el == '}') {
                condition = false
            }
        });
        console.log(condition)
        if(!condition){
            commandsjson.forEach(commandelement => {
                if(inputcommands[i] == commandelement.command) { //se o input for igual a algum comando do json executa o código
                    console.log(inputcommands[i])
                    movecalc(commandelement)
                }
            })
        }
    }
}

button.addEventListener('click', () => {
    console.log('botao')
    load()
})