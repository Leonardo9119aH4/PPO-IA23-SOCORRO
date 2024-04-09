const Ask = document.querySelector("#ask>h1")
const AltAns = document.querySelector("#response")

var life = 5 //alterado pelo banco de dados
var score = 100 //pontuação sempre começa com 100
var firstWrong = false //analisa se é o primeiro erro de resposta da questão

async function main(){
    const request = await fetch("test.json")
    const quiz = await request.json()
    var NAsk = 0
    function Asking(){
        if(NAsk < 1){
            firstWrong = false
            Ask.innerHTML = quiz[NAsk].ask

            AltAns.innerHTML = " "
            for (let i=0; i<quiz[NAsk].alt.length; i++) {
                AltAns.innerHTML += `<button>${quiz[NAsk].alt[i]}</button>`
              }
        }
    }
    function Correct(){
        NAsk++
        Asking()
    }
    function Wrong(){
        if(life>0){
            life--
            if(firstWrong==false){
                firstWrong==true
                score-- //temporario
            }
            Asking()
        }
        else{
            GameOver()
        }
    }
    function GameOver(){

    }
    Asking()
}
main()