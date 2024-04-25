import {main} from 'http://localhost:3000/globalAssets/js/main.js'
main()
import { move } from 'http://localhost:3000/webSites/rpg/move.js'

const hero = document.querySelector('div#hero') //personagem
const button = document.querySelector('button#exec')
const input = document.querySelector('div#code_input>input')
const pxadd = 100 //quantidade de pixels a serem adicionadas a cada execução
var left = hero.getBoundingClientRect().left //distancia em pixel da esquerda da página
var top = hero.getBoundingClientRect().top //distancia em pixel de cima da página
const walls = document.querySelectorAll('div.wall') //constante com todos os obstáculos do mapa

button.onclick = async function() {
    move()
}

input.addEventListener('keypress', ev => {
    if(ev.key == 'Enter') {
        move()
    }
})