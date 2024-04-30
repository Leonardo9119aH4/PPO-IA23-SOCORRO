import {main} from "http://localhost:3000/globalAssets/js/main.js"
main()

const Ask = document.querySelector("#ask>h1") //referencia a div de pergunta
const AltAns = document.querySelector("#response") //referencia a div que mostram as alternativas
const Life = document.querySelector("#life>h1") //referencia o contador de vidas gráfico
const DocCSS = document.documentElement //constante para alterar CSS pelo JS
const mainImg = document.querySelector("main>div#img") //constante para colocar as imagens dos níveis
const mainTheory = document.querySelector("main>div#theory") //local de injeção do ejs da teoria

var life = 5 //quanto de vida o usuário tem, valor lido pelo banco de dados
var level = 0 //em qual nível o usuário está, valor lido do banco de dados
var GLevel = 1 //em qual grupo de nível o usuário está, valor lido do banco de dados
var score = 100 //pontuação sempre começa com 100
var firstWrong = false //analisa se é o primeiro erro de resposta da questão
var NAsk = 0 //número atual da questão
var sec = 0 //variável para o cronômetro, segundos
var min = 0 //variável para o cronômetro, minutos
var isTheory = false //booleano para saber se uma teoria é exibida

var Master //gambiarra pra conseguir o json
const MasterRqst = new XMLHttpRequest();
MasterRqst.open('GET', "http://localhost:3000/globalAssets/json/master.json", false)
MasterRqst.send()
if (MasterRqst.status === 200) {
    Master = JSON.parse(MasterRqst.responseText)
}
else {
    console.error('Erro ao carregar o arquivo JSON:', MasterRqst.status)
}

var quiz //gambiarra pra conseguir o json
var GLevelURL = "http://localhost:3000/globalAssets/json/quiz/glv" + GLevel + ".json" //obtenção da url conforme respectivo nível do usuário
const request = new XMLHttpRequest();
request.open('GET', GLevelURL, false) //requisição do json do quiz
request.send()
if (request.status === 200) {
    quiz = JSON.parse(request.responseText)
}
else {
    console.error('Erro ao carregar o arquivo JSON:', request.status)
}

function VerifyInit(){ //função para verificação de nível e oferecimento 
    if(Master[level].theory === true){
        var getTheory = "http://localhost:3000/globalAssets/ejs/theory/" + Master[level].get_theory + ".ejs" //obtenção da url conforme ejs da teoria a ser exibida
        const theoryRqst = new XMLHttpRequest()
        theoryRqst.open('GET', getTheory, false)
        theoryRqst.send()
        if (theoryRqst.status === 200) {
            var responseText = theoryRqst.responseText
            mainTheory.innerHTML = responseText
            Ask.innerHTML = Master[level].theory_title
            AltAns.innerHTML = "<button>CONTINUAR</button>"
            DocCSS.style.setProperty("--RepN", 1)
            isTheory = true
        }
        else {
            console.error('Erro ao carregar o arquivo EJS')
        }
    }
    else{
        Asking()
    }
}

function Asking(){
    if(NAsk < quiz.length){
        firstWrong = false
        Ask.innerHTML = quiz[NAsk].ask
        mainImg.innerHTML = "<img src='http://localhost:3000/globalAssets/images/codeImg/test.png'>"
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
    if(!isTheory){
        const AltC = ev.target 
        const aAlt = [...AltAns.children]
        const nAltC = aAlt.indexOf(AltC)
        if(nAltC==quiz[NAsk].ans){
            Correct()
        }
        else {
            Wrong()
        }
    }
    else{
        isTheory=false
        Asking()
    }
})
VerifyInit() //inicia quiz e, se tiver, exibe a teoria antes do quiz

