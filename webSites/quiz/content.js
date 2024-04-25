import {main} from "http://localhost:3000/globalAssets/js/main.js"
main()

const Ask = document.querySelector("#ask>h1") //referencia a div de pergunta
const AltAns = document.querySelector("#response") //referencia a div que mostram as alternativas
const Life = document.querySelector("#life>h1") //referencia
const DocCSS = document.documentElement //constante para alterar CSS pelo JS
const mainImg = document.querySelector("main#div") //constante para colocar as imagens dos níveis, que deverão 

var life = 5 //alterado pelo banco de dados
var score = 100 //pontuação sempre começa com 100
var firstWrong = false //analisa se é o primeiro erro de resposta da questão
var NAsk = 0 //número atual da questão
var sec = 0 //variável para o cronômetro, segundos
var min = 0 //variável para o cronômetro, minutos

var quiz = null
const request = new XMLHttpRequest();
request.open('GET', 'http://localhost:3000/globalAssets/json/quiz/lv1.json', false)
request.send()
if (request.status === 200) {
    quiz = JSON.parse(request.responseText)
} else {
    console.error('Erro ao carregar o arquivo JSON:', request.status)
}

function Asking(){
    if(NAsk < quiz.length){
        firstWrong = false
        Ask.innerHTML = quiz[NAsk].ask
        
        AltAns.innerHTML = " "
        DocCSS.style.setProperty("--RepN", `${quiz[NAsk].alt.length}`)
        for (let i=0; i<quiz[NAsk].alt.length; i++){
            AltAns.innerHTML += `<button>${quiz[NAsk].alt[i]}</button>`
            }
    }
    else{
        Win()
    }
}
function Correct(){
    NAsk++
    Asking()
}
function Wrong(){
    if(life>0){
        if(firstWrong==false){ //cada questão só pode tirar 1 vida
            firstWrong = true
            life--
            Life.innerHTML = life
            score -= 100/quiz.length //pontuação inicial dividido pela quantidade de questões
        }
        Asking()
    }
    else{
        GameOver()
    }
}
function GameOver(){
    console.log("Game Over!")
}
function Win(){
    console.log("Ganhou!")
}
function UpdTime(){
    sec++
    if(sec>=60){
        sec=0
        min++
    }
}

AltAns.addEventListener("click", ev =>{ //implementação para comparar alternativas (erro/acerto)
    const AltC = ev.target 
    const aAlt = [...AltAns.children]
    const nAltC = aAlt.indexOf(AltC)
    if(nAltC==quiz[NAsk].ans){
        Correct()
    }
    else {
        Wrong()
    }
})
Asking()
interval = setInterval(UpdTime, 1000)
