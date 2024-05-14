import {main} from 'http://localhost:3000/globalAssets/js/main.js'
import { movecalc } from 'http://localhost:3000/webSites/rpg/move.js'
import { conditional } from 'http://localhost:3000/webSites/rpg/conditional.js'

const button = document.querySelector('button#exec')
const input = document.querySelector('div#code_input>textarea')
const csslink = document.querySelector('link#cssinjection')
var gamediv = document.querySelector('section#game>div')
var lv = 1 //TEMPORÁRIO! futura ligação com banco de dados

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
    async function load() {
        const requestcommand = await fetch('http://localhost:3000/webSites/rpg/localassets/commands.json')
        const commandsjson = await requestcommand.json()
        var inputcommands = input.value.split('\n')
        var gamevars = [new Array(1), new Array(1)]
        for(let i = 0; i < inputcommands.length; i++) {
            let condition = false
            let inputsplit = String(inputcommands[i]).split('')
            let posint = inputcommands[i].indexOf('int ')
            if(posint != -1){
                console.log(inputsplit)
                let varname = []
                let letcount
                for(let i = posint + 4; i < inputsplit.length; i++){
                    console.log(i)
                    if((inputsplit[letcount] == " ") || (inputsplit[letcount] == "=")){
                        console.log('break')
                        letcount = i
                    } else {
                        varname.push(inputsplit[i])
                    }
                }
                varname.join('')
                var varvalue = []
                console.log(inputsplit, letcount)
                console.log(inputsplit[letcount])
                while(letcount < inputsplit.length) {
                    if((inputsplit[letcount] != " ") && (inputsplit[letcount] != "=")){
                        varvalue.push(inputsplit[letcount])
                    }
                    letcount++
                }
                gamevars[0].push(varvalue)
                gamevars[1].push(varname)
                console.log(gamevars[0])
                console.log(gamevars[1])
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
        load()
    })
})