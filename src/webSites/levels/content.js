import {main} from "/globalAssets/js/main.js"
const mainTag = document.querySelector("#levels .content")

async function getData(){
    let QN = await fetch("/api/private/levelsunlocked", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({})
    })
}
async function content(){
    main()
    let QN = 49 //Alterado pelo banco de dados, enquanto não tem, valor arbitrário
    const masterRqst = await fetch("/globalAssets/json/master.json");
    const master = await masterRqst.json();
    for(let i=0; i<master.length; i++){ //injeta os níveis
        if(master[i].type == "intro"){
            mainTag.innerHTML += `<div class='intro' id=${i}'>${i}</div>`
        }
        if(master[i].type == "quiz"){
            mainTag.innerHTML += `<div class='quiz' id=${i}'>${i}</div>`
        }
        if(master[i].type == "rpg"){
            mainTag.innerHTML += `<div class='rpg' id=${i}'>${i}</div>`
        }
        if(master[i].type == "blocks"){
            mainTag.innerHTML += `<div class='blocks' id=${i}'>${i}</div>`
        } 
    }
    const intro = mainTag.querySelectorAll(".intro")
    const quiz = mainTag.querySelectorAll(".quiz")
    const rpg = mainTag.querySelectorAll(".rpg")
    const blocks = mainTag.querySelectorAll(".blocks")
    intro.forEach(el=>{
        el.addEventListener("click", async ev=>{
            window.location.href = "/webSites/intro/index.html?level=" + el.id
        })
    })
    quiz.forEach(el=>{
        el.addEventListener("click", ev=>{
            window.location.href = "/webSites/quiz/index.html?level=" + el.id
        })
    })
    rpg.forEach(el=>{
        el.addEventListener("click", ev=>{
            window.location.href = "/webSites/rpg/index.html?level=" + el.id
        })
    })
    blocks.forEach(el=>{
        el.addEventListener("click", ev=>{
            window.location.href = "/webSites/blocks/index.html?level=" + el.id
        })
    })
}
content()

