import {main} from "http://localhost:3000/globalAssets/js/main.js"
const mainTag = document.querySelector("#levels .content")
let QN = 49 //Alterado pelo banco de dados, enquanto não tem, valor arbitrário

async function content(){
    main()
    const masterRqst = await fetch("http://localhost:3000/globalAssets/json/master.json");
    const master = await masterRqst.json();
    for(let i=0; i<master.length; i++){ //injeta os níveis
        console.log("i")
        if(master[i].type == "intro"){
            mainTag.innerHTML += `<div class='level' id=N${i}'>${i}</div>`
        }
        if(master[i].type == "quiz"){
            mainTag.innerHTML += `<div class='level' id=N${i}'>${i}</div>`
        }
        if(master[i].type == "rpg"){
            mainTag.innerHTML += `<div class='level' id=N${i}'>${i}</div>`
        }
        if(master[i].type == "blocks"){
            mainTag.innerHTML += `<div class='level' id=N${i}'>${i}</div>`
        } 
    }
    const levels = mainTag.querySelectorAll(".level")
    levels.forEach(el=>{
        el.addEventListener("click", ev=>{
            window.location.href = "http://localhost:3000/webSites/intro/index.html"
        })
    })
}
content()

