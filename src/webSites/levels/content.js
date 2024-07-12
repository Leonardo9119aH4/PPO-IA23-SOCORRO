import {main, fatalError} from "/globalAssets/js/main.js"
const mainTag = document.querySelector("#levels .content")
const lifeDOM = document.querySelector("#life>h1")
async function getData(){
    let LNRqst = await fetch("/api/private/levelsunlocked", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({"action": "get"})
    })
    if(LNRqst.status===500){
        fatalError(500)
        return
    }
    let LN = await LNRqst.json()
    //
    let lifeRqst = await fetch("/api/private/lifes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({"action": "get"})
    })
    if(lifeRqst.status===500){
        fatalError(500)
        return
    }
    let life = await lifeRqst.json()
    return [LN, life]
}
async function content(){
    main()
    let data = await getData() //obtém os dados do usuário
    let LN = data[0] //obtém o nível em que o usuário está
    let life = data[1] //obtém as vidas dele
    const masterRqst = await fetch("/globalAssets/json/master.json");
    const master = await masterRqst.json();
    lifeDOM.innerHTML = life
    for(let i=0; i<LN; i++){ //injeta os níveis
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

