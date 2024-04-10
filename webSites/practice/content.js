const Ask = document.querySelector("#ask>h1")
const AltAns = document.querySelector("#response")

var score = 100 //pontuação sempre começa com 100
var firstWrong = false //analisa se é o primeiro erro de resposta da questão
var NAsk = 0 //número atual da questão

async function main(){
    const request = await fetch("test.json")
    const quiz = await request.json()
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
                firstWrong==true
                score -= 100/quiz.lenght //pontuação inicial dividido pela quantidade de questões
            }
            Asking()
        }
    }
    function Win(){
        
    }
    Asking()
}
main()