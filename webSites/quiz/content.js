import {main} from "http://localhost:3000/globalAssets/js/main.js"
const Ask = document.querySelector("#ask>h1") //referencia a div de pergunta
const AltAns = document.querySelector("#response") //referencia a div que mostram as alternativas
const Life = document.querySelector("#life>h1") //referencia o contador de vidas gráfico
const DocCSS = document.documentElement //constante para alterar CSS pelo JS
const mainTag = document.querySelector("main")
const mainImg = mainTag.querySelector("#img") //constante para colocar as imagens dos níveis
const mainTheory = mainTag.querySelector("#theory") //local de injeção do ejs da teoria
const gameOverPopup = mainTag.querySelector("#gameOver") //popup de game over
const winnerPopup = mainTag.querySelector("#winner") //popup de quando vence o quiz
const winnerTime = winnerPopup.querySelector("#time") //exibe o tempo ao vencer o quiz

async function content(){
    main()
    var life = 5 //quanto de vida o usuário tem, valor lido pelo banco de dados
    var level = 0 //em qual nível o usuário está, valor lido do banco de dados
    var GLevel = 1 //em qual grupo de nível o usuário está, valor lido do banco de dados
    var score = 100 //pontuação sempre começa com 100
    var firstWrong = false //analisa se é o primeiro erro de resposta da questão
    var NAsk = 0 //número atual da questão
    var sec = 0 //variável para o cronômetro, segundos
    var min = 0 //variável para o cronômetro, minutos
    var isTheory = false //booleano para saber se uma teoria é exibida
    var endGame = false //booleano pra saber se o quiz acabou (sem vida ou fim)
    const MasterRqst = await fetch("http://localhost:3000/globalAssets/json/master.json")
    const Master = await MasterRqst.json()
    const quizRqst = await fetch(`http://localhost:3000/globalAssets/json/quiz/glv${GLevel}.json`)
    const quiz = await quizRqst.json()
    var theoryEJS
    if(Master[level].theory === true){
        const getTheory = Master[level].get_theory
        const theoryRqst = await fetch(`http://localhost:3000/globalAssets/ejs/theory/${getTheory}.ejs`) //obtenção da url conforme ejs da teoria a ser exibida
        theoryEJS = await theoryRqst.text()
    }
    function VerifyInit(){ //função para verificação de nível e oferecimento 
        if(Master[level].theory === true){
            mainTheory.innerHTML = theoryEJS
            Ask.innerHTML = Master[level].theory_title
            AltAns.innerHTML = "<button>CONTINUAR</button>"
            DocCSS.style.setProperty("--RepN", 1)
            isTheory = true
        }
        else{
            Asking()
        }
    }

    function Asking(){
        if(NAsk < quiz.length){
            firstWrong = false
            Ask.innerHTML = quiz[NAsk].ask
            mainTheory.innerHTML = null
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
        if(--life>0){
            if(firstWrong==false){ //cada questão só pode tirar 1 vida
                firstWrong = true
                Life.innerHTML = life
                score -= 100/quiz.length //pontuação inicial dividido pela quantidade de questões
            }
            Asking()
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
            if(!endGame){
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
        }
        else{
            isTheory=false
            Asking()
        }
    })
    VerifyInit() //inicia quiz e, se tiver, exibe a teoria antes do quiz
    setInterval(UpdTime, 1000)

}
content()
