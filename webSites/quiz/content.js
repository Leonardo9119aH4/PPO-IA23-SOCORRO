const Ask = document.querySelector("#ask>h1")
const AltAns = document.querySelector("#response")

var life = 5 //alterado pelo banco de dados
var score = 100 //pontuação sempre começa com 100
var firstWrong = false //analisa se é o primeiro erro de resposta da questão
var NAsk = 0 //número atual da questão

const request = new XMLHttpRequest()
request.open('GET', 'test.json', false)
request.send()
const quiz = JSON.parse(request.responseText)

function Asking(){
    if(NAsk < quiz.length){
        firstWrong = false
        Ask.innerHTML = quiz[NAsk].ask

        AltAns.innerHTML = " "
        for (let i=0; i<quiz[NAsk].alt.length; i++) {
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
            score -= 100/quiz.length //pontuação inicial dividido pela quantidade de questões
        }
        Asking()
    }
    else{
        GameOver()
    }
}
function GameOver(){

}
function Win(){
    
}
Asking()

