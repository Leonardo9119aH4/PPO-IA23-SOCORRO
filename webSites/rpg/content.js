import {main} from 'http://localhost:3000/globalAssets/js/main.js'
main()

import { movecalc } from 'http://localhost:3000/webSites/rpg/move.js'
import { conditional } from 'http://localhost:3000/webSites/rpg/conditional.js'

const button = document.querySelector('button#exec')
const input = document.querySelector('div#code_input>textarea')
const csslink = document.querySelector('link#cssinjection')
var gamediv = document.querySelector('section#game>div')
var lv = 1 //TEMPORÁRIO! futura ligação com banco de dados

async function ejsload() {
    var ejsrequest = await fetch(`http://localhost:3000/webSites/rpg/localassets/levels/lv${lv}/content.ejs`)
    gamediv.innerHTML = await ejsrequest.text()
}
ejsload().then(() => {
    var GameDOM = {
        hero: document.querySelector('div#hero'), //personagem
        pxadd: 100, //quantidade de pixels a serem adicionadas a cada execução
        left: hero.getBoundingClientRect().left, //distancia em pixel da esquerda da página
        top: hero.getBoundingClientRect().top, //distancia em pixel de cima da página
        walls: document.querySelectorAll('div.wall'), //constante com todos os obstáculos do mapa
        enemies: document.querySelectorAll('div.enemy'), //constante com todos os inimigos
        end: document.querySelector('div#end') //contante com o final do level
    }
    csslink.setAttribute('href', `http://localhost:3000/webSites/rpg/localassets/levels/lv${lv}/content.css`)
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
    
            if(!condition){
                commandsjson.forEach(commandelement => {
                    if(inputcommands[i] == commandelement.command) { //se o input for igual a algum comando do json executa o código
                        movecalc(commandelement, GameDOM)
                    }
                })
            }
        }
    }
    button.addEventListener('click', () => {
        load()
    })
})