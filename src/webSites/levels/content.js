import {main, fatalError} from "/globalAssets/js/main.js"
const mainTag = document.querySelector("#levels .content")
const lifeDOM = document.querySelector("#life>h1")
const rankUser = document.querySelector("#RankUser")
const rankPlayers = document.querySelectorAll(".RankPlayers")
const zeroLifePopup = document.querySelector("#zeroLife") //popup de quando não tem vida
const closePopup = zeroLifePopup.querySelector("button#close") //botão para fechar popup de quando não tem vida
async function getData(){
    const LNRqst = await fetch("/api/private/levelsunlocked", {
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
    if(LNRqst.status===401){
        window.location.href = "/webSites/main/index.html"
        return
    }
    const LN = await LNRqst.json()
    const lifeRqst = await fetch("/api/private/lifes", {
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
    const life = await lifeRqst.json()
    const expRqst = await fetch("/api/private/exp", {
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
    let exp = await expRqst.json()
    const rankingRqst = await fetch("/api/getrank") //método get, delícia
    const ranking = await rankingRqst.json()
    return [LN, life, exp, ranking]
}
async function content(){
    main()
    let data = await getData() //obtém os dados do usuário
    let LN = data[0] //obtém o nível em que o usuário está
    let life = data[1] //obtém as vidas dele
    let exp = data[2] //obtém o xp do usuário
    let ranking = data[3] //obtém o ranking dos jogadores com mais xp
    exp = Math.floor(exp * 100) / 100
    const masterRqst = await fetch("/globalAssets/json/master.json");
    const master = await masterRqst.json();
    lifeDOM.innerHTML = life
    rankUser.innerHTML = `Você: ${exp} XP`
    for(let i=0; i<ranking.length; i++){
       rankPlayers[i].innerHTML = "1. " + ranking[i].username + ": " + Math.floor(ranking[i].exp * 100) / 100 + " XP"
    }
    for(let i=0; i<=LN; i++){ //injeta os níveis
        if(master[i] && master[i].type == "intro"){
            mainTag.innerHTML += `<div class='intro' id=${i}'>${i}</div>`
        }
        if(master[i] && master[i].type == "quiz"){
            mainTag.innerHTML += `<div class='quiz' id=${i}'>${i}</div>`
        }
        if(master[i] && master[i].type == "rpg"){
            mainTag.innerHTML += `<div class='rpg' id=${i}'>${i}</div>`
        }
        if(master[i] && master[i].type == "blocks"){
            mainTag.innerHTML += `<div class='blocks' id=${i}'>${i}</div>`
        }
        if(master[i] && master[i].type == "coming_soon"){
            mainTag.innerHTML += `<div class='coming_soon' id=${i}'>${i}</div>`
        }
    }
    const intro = mainTag.querySelector(".intro") //somente 1 introdução
    const quiz = mainTag.querySelectorAll(".quiz")
    const rpg = mainTag.querySelectorAll(".rpg")
    const blocks = mainTag.querySelectorAll(".blocks")
    const comingSoon = mainTag.querySelector(".coming_soon") //somente 1 "em breve"
    intro.addEventListener("click", ()=>{
        if(life>0){
            window.location.href = "/webSites/intro/index.html?level=" + intro.id
        }
        else{
            zeroLifePopup.classList.add("open")
        }
    })
    quiz.forEach(el=>{
        el.addEventListener("click", ()=>{
            if(life>0){
                window.location.href = "/webSites/quiz/index.html?level=" + el.id
            }
            else{
                zeroLifePopup.classList.add("open")
            }
        })
    })
    rpg.forEach(el=>{
        el.addEventListener("click", ()=>{
            if(life>0){
                window.location.href = "/webSites/rpg/index.html?level=" + el.id
            }
            else{
                zeroLifePopup.classList.add("open")
            }
        })
    })
    blocks.forEach(el=>{
        el.addEventListener("click", ()=>{
            if(life>0){
                window.location.href = "/webSites/blocks/index.html?level=" + el.id
            }
            else{
                zeroLifePopup.classList.add("open")
            }
        })
    })
    /*
    comingSoon.addEventListener("click", ()=>{
        if(life>0){
            window.location.href = "/webSites/comingSoon/index.html?level=" + comingSoon.id
        }
        else{
            zeroLifePopup.classList.add("open")
        }
    })
    */
    closePopup.addEventListener("click", ()=>{
        zeroLifePopup.classList.remove("open")
    })
}
content()

