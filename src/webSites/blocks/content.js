import {main, fatalError} from "/globalAssets/js/main.js"
import {DragBlock, ReceiveBlock, Execute} from "/webSites/blocks/dragAndDrop.js"
import {loadScript} from "/webSites/blocks/terminal.js"

const aside = document.querySelector("aside") //local dos blocos arrastáeis
const headerTitle = document.querySelector("header>h1") //cabeçario
const codeBlocks = document.querySelector("section#code") //onde o scratch fica
const lifeDOM = document.querySelector("#life>div") //número de vidas
const title =  document.querySelector("title") //título
const exeButton = document.querySelector("button#run") //botão de execução do pseudocódigo
const wrongPopup = document.querySelector("#wrong") //popup de erro
const output = wrongPopup.querySelector("#output>p") //saída dos erros
const closeWrongPopup = wrongPopup.querySelector("button.close") //botão para fechar o popup
const gameOverPopup = document.querySelector("#gameOver") //popup de fim de jogo
const terminalPopup = document.querySelector("#terminal") //terminal simulando o código completo
const terminalContainer = terminalPopup.querySelector(".content") //terminal em si

async function getData(){
    let params = new URLSearchParams(window.location.search)
    let level = parseInt(params.get("level"))
    const masterRqst = await fetch("/globalAssets/json/master.json") //json mestre
    const master = await masterRqst.json()
    try{
        if(master[level].type != "blocks"){
            window.location.href = "/webSites/levels/index.html"
        }
    } 
    catch{
        window.location.href = "/webSites/levels/index.html"
    }
    const Request = await fetch("/api/private/getBlocks", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({"level": level})
    })
    if(Request.status === 400 || Request.status === 401 || Request.status === 403){
        window.location.href = "/webSites/levels/index.html"
    }
    if(Request.status === 500){
        fatalError(500)
    }
    const BlocksJson = await Request.json()
    const correctSeq = BlocksJson[4]
    let lifesRqst = await fetch("/api/private/lifes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "action": "get"
        })
    })
    let lifes = await lifesRqst.json()
    if(lifes<=0){
        window.location.href="/webSites/levels/index.html"
    }
    return [level, lifes, master, correctSeq, BlocksJson] 
}
async function loadDOM(BlocksJson){
    const asideHtml = BlocksJson[0]
    const asideCss = BlocksJson[1]
    const codeHtml = BlocksJson[2]
    const codeCss = BlocksJson[3]
    aside.innerHTML = asideHtml //injeção dos HTMLs e CSSs
    codeBlocks.innerHTML = codeHtml 
    const asideCssDOM = document.createElement("style")
    asideCssDOM.textContent = asideCss
    const codeCssDOM = document.createElement("style")
    codeCssDOM.textContent = codeCss
    document.head.appendChild(asideCssDOM)
    document.head.append(codeCssDOM)
}
async function content(){
    main()
    const data = await getData()
    const level = data[0]
    let lifes = data[1]
    const master = data[2]
    const correctSeq = data[3]
    const BlocksDOM = data[4]
    let dSec = 0; //tempo decorrido em décimos de segundos
    await loadDOM(BlocksDOM) //carrega o código e os blocos arrastáveis
    title.innerHTML = master[level].level_title
    headerTitle.innerHTML = master[level].level_header
    lifeDOM.innerHTML = lifes
    var correctAnswer = null
    const reBlRef = document.querySelectorAll(".reBl") //referencia as divs .reBl (receive Blocks) após o carregamento do DOM
    const dragBlockRef = document.querySelectorAll(".dragBlock") //referencia as divs .dragBlock após o carregamento do DOM
    const receiveBlocks = [] //array para passar as divs para checar colisão para classe receiveBlocks
    dragBlockRef.forEach(dragBlock => new DragBlock(dragBlock)) //referencia cada div .dragBlock da nodelist
    reBlRef.forEach(reBl => {
        const receiveBlock = new ReceiveBlock(reBl) //atribui .reBl à classe ReceiveBlocks
        receiveBlocks.push(receiveBlock)
    });
    exeButton.addEventListener("click", async () => { //chama detecção ao clicar em "EXECUTAR"
        receiveBlocks.forEach(reBl => reBl.checkCollision(dragBlockRef)); //precisa ficar fora do Execute() por causa do escopo
        correctAnswer = await Execute(correctSeq)
        if(correctAnswer[0]){
           win()
        }
        else{
            wrong(correctAnswer[1])
            
        }
    });
    closeWrongPopup.addEventListener("click", () =>{
        wrongPopup.classList.remove("open")
    })
    async function win(){
        const exp = 3030/dSec //cálculo do xp obtido pelo tempo (inversamente proporcional)
        fetch("/api/private/exp", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "action": "add",
                "exp": exp 
            })
        }).then(resp =>{
            if(resp.status===500){
                fatalError(500)
            }
        })
        fetch("/api/private/levelsunlocked", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({"action": "get"})
        }).then(async resp=>{
            if(resp.status === 500){
                fatalError(500)
            }
            const userLevel = await resp.json()
            if(userLevel === level){
                fetch("/api/private/levelsunlocked", {
                    method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "action": "upLevel",
                    })
                }).then(resp =>{
                    if(resp.status===500){
                        fatalError(500)
                    }
                })
            }
        })
        terminalPopup.classList.add("open")
        loadScript(terminalContainer, level, dSec, exp) //simula o script e mostra no terminal
    }
    async function wrong(errors){
        lifes--
        lifeDOM.innerHTML = lifes
        fetch("/api/private/lifes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "action": "hit",
            })
        }).then(resp =>{
            if(resp.status === 500){
                fatalError(500)
            }
        })
        if(lifes>0){
            wrongPopup.classList.add("open")
            if(errors===-1){
                output.innerHTML = "Você não completou todas as lacunas!"
            }
            else{
                output.innerHTML = `Errou com ${errors} erros!`
            }
        }
        else{
            gameOver()
        }
    }
    async function gameOver(){
        gameOverPopup.classList.add("open")
    }
    setInterval(()=>{
        dSec++
    }, 100) //atualiza o cronômetro
}
content()
