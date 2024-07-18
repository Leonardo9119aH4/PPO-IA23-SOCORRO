import {main} from "/globalAssets/js/main.js"
import {DragBlock, ReceiveBlock, Execute} from "/webSites/blocks/dragAndDrop.js"

const aside = document.querySelector("aside") //local dos blocos arrastáeis
const header = document.querySelector("header") //cabeçario
const codeBlocks = document.querySelector("main") //onde o scratch fica
const title =  document.querySelector("title") //título
const exeButton = document.querySelector("section>button") //botão para verificar se o scratch está correto
const output = document.querySelector("section>#output") //saída para saber se houve êxito ou não

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
    const BlocksJson = await Request.json()
    const correctSeq = BlocksJson[4]
    return [level, master, correctSeq, BlocksJson] 
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
    const master = data[1]
    const correctSeq = data[2]
    const BlocksDOM = data[3]
    localStorage.setItem("correctSeq", JSON.stringify(correctSeq)) //salva no localStorage para a função Execute() conseguir acessar
    await loadDOM(BlocksDOM) //carrega o código e os blocos arrastáveis
    title.innerHTML = master[level].level_title
    header.innerHTML = master[level].level_header
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
        correctAnswer = await Execute()
        if(correctAnswer[0]){
            output.innerHTML = "Acertou!"
        }
        else{
            if(correctAnswer[1]===-1){
                output.innerHTML = "Você não completou todas as lacunas!"
            }
            else{
                output.innerHTML = `Errou com ${correctAnswer[1]} erros!`
            }
        }
    });
}
content()
