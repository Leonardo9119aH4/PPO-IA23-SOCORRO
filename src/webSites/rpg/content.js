import { load } from 'http://localhost:3000/webSites/rpg/main.js'

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
        const commandsjson = await requestcommand.json()
        var inputcommands = input.value.split('\n')
        var gameVars = [new Array(0), new Array(0), new Array(0)]
        load(inputcommands, commandsjson, gameVars, GameDOM)
    }
    button.addEventListener('click', () => {
        main()
    })
})