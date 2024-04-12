const Ask = document.querySelector("#ask>h1")
const AltAns = document.querySelector("#response")
const DocCSS = document.documentElement //constante para alterar CSS pelo JS

var life = 5 //alterado pelo banco de dados
var score = 100 //pontuação sempre começa com 100
var firstWrong = false //analisa se é o primeiro erro de resposta da questão
var NAsk = 0 //número atual da questão

const request = new XMLHttpRequest()
request.open('GET', '../../globalAssets/json/quiz/lv1.json', false) 
request.send()
const quiz = JSON.parse(request.responseText)

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
        console.log("GANHOU")
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
AltAns.addEventListener("click", ev =>{ //implementação para comparar alternativas (erro/acerto)
    console.log("AE")
    const AltC = ev.target 
    const aAlt = [...AltAns.children]
    const nAltC = aAlt.indexOf(AltC)
    if(nAltC==quiz[NAsk].ans){
        Correct()
    }
})
Asking()

