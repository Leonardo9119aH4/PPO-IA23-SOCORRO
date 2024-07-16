import { fatalError } from "/globalAssets/js/main.js"
import {main} from "/globalAssets/js/main.js"
const DocCSS = document.documentElement //constante para alterar CSS pelo JS
const Ask = document.querySelector("#ask>h1") //referencia a div de pergunta
const response = document.querySelector("#response") //referencia a div que mostram as alternativas
var responseButton = response.querySelectorAll("button") //referencia todas as alternativas
const Life = document.querySelector("#life>h1") //referencia o contador de vidas gráfico
const mainTag = document.querySelector("main")
const mainImg = mainTag.querySelector("#img") //constante para colocar as imagens dos níveis
const mainTheory = mainTag.querySelector("#theory") //local de injeção do ejs da teoria
const gameOverPopup = mainTag.querySelector("#gameOver") //popup de game over
const winnerPopup = mainTag.querySelector("#winner") //popup de quando vence o quiz
const winnerTime = winnerPopup.querySelector("#time") //exibe o tempo ao vencer o quiz
const winnerScore = winnerPopup.querySelector("#score") //percentual de acertos
const winnerEXP = winnerPopup.querySelector("#exp") //xp obtido
const feedbackPopup = mainTag.querySelector("#feedback") //feedback de erro
const feedbackButton = feedbackPopup.querySelector("button") //botão para fechar o popup
const feedContent = feedbackPopup.querySelector("#feedContent") //texto do feedback

async function getData(){
    let params = new URLSearchParams(window.location.search)
    let level = parseInt(params.get("level"))
    const masterRqst = await fetch("/globalAssets/json/master.json") //requisição do json mestre
    const master = await masterRqst.json()
    const lifeRqst = await fetch("/api/private/lifes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({"action": "get"})
    })
    const life = await lifeRqst.json()
    return [level, master, life] //retorna uma array com o nível, json mestre e quiz
}
async function getQuiz(level){ //obtém as perguntas
    const quizRqst = await fetch(`/globalAssets/json/quiz/glv${level}.json`) //requisição das perguntas conforme grupo de nível
    var quiz = await quizRqst.json()
    for (let i = quiz.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [quiz[i], quiz[j]] = [quiz[j], quiz[i]];
    }
    quiz = quiz.slice(0, 5)
    return quiz
}
async function StartQuiz(){
    let data = await getData()
    let level = data[0]
    let master = data[1]
    let life = data[2]
    Life.innerHTML = life
    try{
        if(master[level].type != "quiz"){
            window.location.href = "/webSites/levels/index.html"
        }
        else{
            let quiz = await getQuiz(level)
            content(level, master, quiz, life)
        }
    }
    catch{
        window.location.href = "/webSites/levels/index.html"
    }
}
async function content(level, master, quiz, life){
    var score = 100 //percentual de acertos
    var firstWrong = true //analisa se é o primeiro erro de resposta da questão
    var NAsk = 0 //número atual da questão
    var dSec = 0 //variável para o cronômetro, décimos de segundos, usado para cálculo do XP diário
    var sec = 0 //variável para o cronômetro, segundos
    var min = 0 //variável para o cronômetro, minutos
    var isTheory = false //booleano para saber se uma teoria é exibida
    var endGame = false //booleano pra saber se o quiz acabou (sem vida ou fim)
    var theoryEJS
    if(master[level].theory === true){
        const getTheory = master[level].get_theory
        const theoryRqst = await fetch(`/globalAssets/ejs/theory/${getTheory}.ejs`) //obtenção da url conforme ejs da teoria a ser exibida
        theoryEJS = await theoryRqst.text()
    }
    function VerifyInit(){ //verificação de nível e mostrar a teoria conforme nível do usuário
        if(master[level].theory === true){
            mainTheory.innerHTML = theoryEJS
            Ask.innerHTML = master[level].theory_title
            response.innerHTML = "<button>CONTINUAR</button>"
            DocCSS.style.setProperty("--RepN", 1)
            isTheory = true
        }
        else{
            Asking()
        }
    }

    function Asking(){ //injeção da pergunta e das alternativas
        firstWrong = true
        Ask.innerHTML = quiz[NAsk].ask
        mainTheory.innerHTML = null
        mainImg.innerHTML = "<img src='/globalAssets/images/codeImg/test.png'>"
        response.innerHTML = " "
        DocCSS.style.setProperty("--RepN", `${quiz[NAsk].alt.length}`)
        for (let i=0; i<quiz[NAsk].alt.length; i++){
            response.innerHTML += `<button>${quiz[NAsk].alt[i]}</button>`
        }
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
        if(--life>0){
            if(firstWrong==true){ //cada questão só pode tirar 1 vida
                firstWrong = false
                Life.innerHTML = life
                score -= 100/quiz.length //cálculo do percentual de acerto
                fetch("/api/private/lifes", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({"action": "reduce", "life": 1})
                }).then(resp => {
                    if(resp.status == 500){
                        fatalError(500)
                    }
                })
            }
            Feedback(false)
        }
        else{
            Life.innerHTML = life
            GameOver()
        }
    }
    function GameOver(){
        endGame = true
        gameOverPopup.classList.add("opened")
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
                if(!isTheory){
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
                }
                else{
                    isTheory=false
                    Asking()
                }
            })
        })
    })
    observer.observe(response, { childList: true, subtree: true })
    VerifyInit() //inicia quiz e, se tiver, exibe a teoria antes do quiz
    setInterval(UpdTime, 100) //cronômetro
}
main()
StartQuiz()
