import { main } from 'http://localhost:3000/globalAssets/js/main.js'
import { movecalc } from 'http://localhost:3000/webSites/rpg/move.js'
import { conditional } from 'http://localhost:3000/webSites/rpg/conditional.js'
import { setVars } from 'http://localhost:3000/webSites/rpg/vars.js'
import { getVars } from 'http://localhost:3000/webSites/rpg/vars.js'
import { detectLoop } from 'http://localhost:3000/webSites/rpg/loop.js'
import { loadLoop } from 'http://localhost:3000/webSites/rpg/loop.js'

const button = document.querySelector('button#exec')
const input = document.querySelector('div#code_input>textarea')
const csslink = document.querySelector('link#cssinjection')
var gamediv = document.querySelector('section#game>div')
var lv = 1 //TEMPORÁRIO! futura ligação com banco de dados
var commandsjson
var gameVars

async function ejsload() {
    await main()
    var ejsrequest = await fetch(`http://localhost:3000/webSites/rpg/localassets/levels/lv${lv}/content.ejs`)
    gamediv.innerHTML = await ejsrequest.text()
}
ejsload().then(() => {
    csslink.setAttribute('href', `http://localhost:3000/webSites/rpg/localassets/levels/lv${lv}/content.css`)
    var GameDOM = {
        hero: document.querySelector('div#hero'), //personagem
        pxadd: 100, //quantidade de pixels a serem adicionadas a cada execução
        left: hero.getBoundingClientRect().left, //distancia em pixel da esquerda da página
        top: hero.getBoundingClientRect().top, //distancia em pixel de cima da página
        walls: document.querySelectorAll('div.wall'), //constante com todos os obstáculos do mapa
        enemies: document.querySelectorAll('div.enemy'), //constante com todos os inimigos
        end: document.querySelector('div#end') //contante com o final do level
    }
    async function main() {
        const requestcommand = await fetch('http://localhost:3000/webSites/rpg/localassets/commands.json')
        commandsjson = await requestcommand.json()
        var inputcommands = input.value.split('\n')
        gameVars = [new Array(0), new Array(0), new Array(0)]
        load(inputcommands)
    }
    function load(inputcommands) {
        for(let i = 0; i < inputcommands.length; i++) {
            let condition = false
            let inputsplit = inputcommands[i].split('')
            setVars(inputcommands[i], inputsplit, gameVars)
            inputcommands[i] = getVars(inputcommands[i], inputsplit, gameVars)
            inputsplit = inputcommands[i].split('')
            if(detectLoop(inputcommands[i])){
                i = loadLoop(inputcommands[i], inputcommands, i)
            }
            inputsplit.forEach(el => {
                if(el == '{') {
                    i = conditional(inputsplit, inputcommands, i, commandsjson, GameDOM)
                    condition = true
                }
            })  
            var inputcommands = input.value.split('\n')
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
        main()
    })
})