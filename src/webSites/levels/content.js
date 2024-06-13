import {main} from "http://localhost:3000/globalAssets/js/main.js"
const mainTag = document.querySelector("#levels .content")
let QN = 49 //Alterado pelo banco de dados, enquanto não tem, valor arbitrário

async function content(){
    main()
    const masterRqst = await fetch("http://localhost:3000/globalAssets/json/master.json");
    const master = await masterRqst.json();
    for(let i=0; i<master.length; i++){ //injeta os níveis
        if(master[i].type == "intro"){
            mainTag.innerHTML += `<div class='intro' id=N${i}'>${i}</div>`
        }
        if(master[i].type == "quiz"){
            mainTag.innerHTML += `<div class='quiz' id=N${i}'>${i}</div>`
        }
        if(master[i].type == "rpg"){
            mainTag.innerHTML += `<div class='rpg' id=N${i}'>${i}</div>`
        }
        if(master[i].type == "blocks"){
            mainTag.innerHTML += `<div class='blocks' id=N${i}'>${i}</div>`
        } 
    }
    const intro = mainTag.querySelectorAll(".intro")
    const quiz = mainTag.querySelectorAll(".quiz")
    const rpg = mainTag.querySelectorAll(".rpg")
    const blocks = mainTag.querySelectorAll(".blocks")
    intro.forEach(el=>{
        el.addEventListener("click", ev=>{
            window.location.href = "http://localhost:3000/webSites/intro/index.html"
        })
    })
    quiz.forEach(el=>{
        el.addEventListener("click", ev=>{
            window.location.href = "http://localhost:3000/webSites/quiz/index.html"
        })
    })
    rpg.forEach(el=>{
        el.addEventListener("click", ev=>{
            window.location.href = "http://localhost:3000/webSites/rpg/index.html"
        })
    })
    blocks.forEach(el=>{
        el.addEventListener("click", ev=>{
            window.location.href = "http://localhost:3000/webSites/blocks/index.html"
        })
    })
}
content()

