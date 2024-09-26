//a importação do phaser acontece no html
import {main, fatalError} from "/globalAssets/js/main.js"
const gameOverPopup = document.querySelector("#gameover")
const winPopup = document.querySelector("#win")
const winInfo = winPopup.querySelector("h2")
async function getData(){
    const params = new URLSearchParams(window.location.search)
    const level = parseInt(params.get("level"))
    if(level == null || level == undefined){
        window.location.href = "/webSites/levels/index.html"
    }
    const masterRqst = await fetch("/globalAssets/json/master.json") //requisição do json mestre
    const master = await masterRqst.json()
    if(master[level].type != "rpg"){
        window.location.href = "/webSites/levels/index.html"
    }
    const lifeRqst = await fetch("/api/private/lifes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({"action": "get"})
    })
    if(lifeRqst.status === 401){
        window.location.href = "/webSites/main/index.html"
    }
    if(lifeRqst.status === 500){
        fatalError(500)
        return
    }
    const life = await lifeRqst.json()
    if(life<=0){
        window.location.href="/webSites/levels/index.html"
    }
    return [level, master, life]
}
async function getLevel(level){
    const configRequest = await fetch("/api/private/getrpg", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "level": level,
            "getfile": 0
        })
    })
    const config = await configRequest.json()
    const levelRequest = await fetch("/api/private/getrpg", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "level": level,
            "getfile": 1
        })
    })
    const levelText = await levelRequest.text()
    return [config, levelText]
    
}
async function content(){
    let dSec = 0
    const data1 = await getData() //arquivos primários
    const level = data1[0]
    const master = data1[1]
    const life = data1[2]
    document.querySelector("#lifes").innerHTML = life
    const data2 = await getLevel(level) //arquivos secundários, precisam dos arquivos primários
    // let config = data2[0]
    const levelText = data2[1]
    const levelBlob = new Blob([levelText], { type: 'application/javascript' });
    const levelUrl = URL.createObjectURL(levelBlob);
    const levelScript = await import(levelUrl)
    let gameOver=false
    class Level extends levelScript.Level{}
    const config = { //gambiarra pq o js é burro e não consegue obter isso com json
        width: 210*4,
        height: 210*4,
        parent: 'game',
        "physics": {
            default: "arcade",
            arcade: {
                gravity: 0,
                debug: false
            }
        },
        scene: [Level], 
        type: Phaser.CANVAS //WebGL só aceita dimensões com potência de base 2 
    };
    const game = new Phaser.Game(config)
    setInterval(()=>{
        dSec++
    }, 100)
    document.addEventListener("gameOver", ev=>{ //game over
        gameOver = true
        fetch("/api/private/lifes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "action": "hit"
            })
        })
        gameOverPopup.classList.add("opened")
    })
    document.addEventListener("win", ev=>{ //ganhou
        winPopup.classList.add("opened")
        let sec = Math.round(dSec/10)
        let min = Math.trunc(sec/60)
        sec = sec%60
        const exp = 3030/dSec
        if(sec<10){
            winInfo.innerHTML = `Com tempo de ${min}:0${sec}, obteve ${exp} de XP`
        }
        else{
            winInfo.innerHTML = `Com tempo de ${min}:${sec}, obteve ${exp} de XP`
        }
        fetch("/api/private/exp", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "action": "add",
                "exp": exp
            })
        })
    })
    const inputcommands = document.querySelector("#commands")
    let isRunning = false
    function runCode() {
        isRunning = false
    }
    document.addEventListener('isRunningCode', runCode)
    document.querySelector("button#exec").onclick = async function() {
        if(!(isRunning || gameOver)){
            isRunning = true
            let response = await fetch("/api/private/interpreter", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({inputcommands: inputcommands.value})
            })
            if(response.status === 500){
                fatalError(500)
            } else if (response.status === 409) {
                alert("Código com erro!")
                return
            }
            response = await response.json()
            let realCommands = []
            response.forEach(el => {
                for(let i = 0; i < el[1]; i++){
                    realCommands.push(el[0])
                }
            })
            console.log(response)
            localStorage.setItem("actions", JSON.stringify(realCommands))
            document.dispatchEvent(new Event("executeCode"))
            console.log(localStorage.getItem("actions"))
        }
    }
}
main()
content()