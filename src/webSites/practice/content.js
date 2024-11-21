import { fatalError } from "/globalAssets/js/main.js"
import {main} from "/globalAssets/js/main.js"
const DocCSS = document.documentElement //constante para alterar CSS pelo JS
const Ask = document.querySelector("#ask>h1") //referencia a div de pergunta
const response = document.querySelector("#response") //referencia a div que mostram as alternativas
var responseButton = response.querySelectorAll("button") //referencia todas as alternativas
const mainElement = document.querySelector("main>div#theory")
const mainImg = mainElement.querySelector("#img") //constante para colocar as imagens dos níveis
const winnerPopup = document.querySelector("#winner") //popup de quando vence o quiz
const winnerTime = winnerPopup.querySelector("#time") //exibe o tempo ao vencer o quiz
const winnerScore = winnerPopup.querySelector("#score") //percentual de acertos
const winnerEXP = winnerPopup.querySelector("#exp") //xp obtido
const feedbackPopup = document.querySelector("#feedback") //feedback de erro
const feedbackButton = feedbackPopup.querySelector("button") //botão para fechar o popup
const feedContent = feedbackPopup.querySelector("#feedContent") //texto do feedback

async function getData(){
    const quizRqst = await fetch("/api/private/getpractice", {
        method: "POST",
    })
    if(quizRqst.status === 400 || quizRqst.status === 401 || quizRqst.status === 403){
        window.location.href = "/webSites/main/index.html"
    }
    if(quizRqst.status === 500){
        fatalError(500)
        return
    }
    const quiz = await quizRqst.json()
    return quiz
}
async function content(){
    let quiz = await getData()
    var score = 100 //percentual de acertos
    var firstWrong = true //analisa se é o primeiro erro de resposta da questão
    var NAsk = 0 //número atual da questão
    var dSec = 0 //variável para o cronômetro, décimos de segundos, usado para cálculo do XP diário
    var sec = 0 //variável para o cronômetro, segundos
    var min = 0 //variável para o cronômetro, minutos
    var endGame = false //booleano pra saber se o quiz acabou (sem vida ou fim)
    function Asking(){ //injeção da pergunta e das alternativas
        firstWrong = true
        Ask.innerHTML = quiz[NAsk].ask
        if(quiz[NAsk].image != null && quiz[NAsk].image != undefined){
            mainElement.innerHTML = `<img src='/globalAssets/images/codeImg/${quiz[NAsk].image}'>` //todas as imagens do quiz estão na pasta codeImg
            loadImg(quiz[NAsk].ask)
        }
        else{
            mainElement.innerHTML = null
            unloadImg(quiz[NAsk].ask, "Pratice")
        }
        response.innerHTML = " "
        DocCSS.style.setProperty("--RepN", `${quiz[NAsk].alt.length}`)
        for (let i=0; i<quiz[NAsk].alt.length; i++){
            response.innerHTML += `<button>${quiz[NAsk].alt[i]}</button>`
        }
    }
    function unloadImg(quest, title) {
        document.querySelector("div#theory").innerHTML = `<p id='question'>${quest}</p>`
        document.querySelector("div#ask").innerHTML = `<h1>${title}</h1>`
    }

    function loadImg(quest) {
        document.querySelector("div#ask").innerHTML = `<h1>${quest}</h1>`// parei aqui
    }
    function Correct(){
        NAsk++
        if(NAsk < quiz.length){
            Asking()
            Feedback(true)
        }
        else{
            Win()
        }
    }
    function Wrong(){
        Feedback(false)
        if(firstWrong==true){ //cada erro é por questão
            firstWrong = false
            score -= 100/quiz.length //cálculo do percentual de acerto
        }
    }
    function Win(){
        endGame = true
        winnerPopup.classList.add("opened")
        if(sec>=0 && sec<=9){
            winnerTime.innerHTML = `Com tempo de ${min}:0${sec}`
        }
        else{
            winnerTime.innerHTML = `Com tempo de ${min}:${sec}`
        }
        winnerScore.innerHTML = `Acertou ${score}% das perguntas`
        let exp = 0 //quantidade de xp obtida conforme percentual de acerto/erro, tempo e quantidade de questões
        const K = quiz.length/5 //constante multiplicador conforme a quantidade de questões
        exp = (100-K*((Math.log(0.1*dSec))/Math.log(1.7)))*(score/100) //cáculo do XP obtido
        winnerEXP.innerHTML = `Obteve ${exp} XP`
        fetch("/api/private/exp", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({"action": "add", "exp": exp})
        })
        fetch("/api/private/lifes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({"action": "practice"}) //rota para incrementar 1 vida
        })
    }
    function Feedback(isCorrect){
        feedbackPopup.classList.add("opened")
        if(isCorrect){
            feedContent.innerHTML = "ACERTOU!"
            DocCSS.style.setProperty("--feedColor", "rgba(0, 255, 0, 0.7)")
        }
        else{
            feedContent.innerHTML = "ERROU!"
            DocCSS.style.setProperty("--feedColor", "rgba(255, 0, 0, 0.7)")
        }
    }
    function UpdTime(){ //cronômetro
        dSec++
        if(dSec%10==0 && dSec!=0){
            sec++ //não precisa zeras os décimos, pois eles não serão mostrados
        }
        if(sec>=60){
            sec=0
            min++
        }
    }
    feedbackButton.addEventListener("click", ev =>{
        feedbackPopup.classList.remove("opened")
    })
    function updRespBtList(){ //atualiza a nodeList contendo as alternativas
        responseButton = response.querySelectorAll("button")
    }
    const observer = new MutationObserver(()=>{ //detecta alterações no DOM para poder chamar o forEach
        updRespBtList()
        responseButton.forEach((el, i)=>{
            el.addEventListener("click", ev =>{ //implementação para comparar alternativas (erro/acerto)
                if(!endGame){
                    const AltC = ev.target 
                    const aAlt = [...response.children]
                    const nAltC = aAlt.indexOf(AltC)
                    if(nAltC==quiz[NAsk].ans){
                        Correct()
                    }
                    else {
                        Wrong()
                    }
                }
            })
        })
    })
    observer.observe(response, { childList: true, subtree: true })
    Asking()
    setInterval(UpdTime, 100) //cronômetro
}
main()
content()
