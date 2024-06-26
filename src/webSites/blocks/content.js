import {main} from "/globalAssets/js/main.js"
import {DragBlock, ReceiveBlock, Execute} from "/webSites/blocks/localAssets/dragAndDrop.js"

const aside = document.querySelector("aside") //local dos blocos arrastáeis
const header = document.querySelector("header") //cabeçario
const codeBlocks = document.querySelector("main") //onde o scratch fica
const title =  document.querySelector("title") //título
const exeButton = document.querySelector("section>button") //botão para verificar se o scratch está correto
const output = document.querySelector("section>#output") //saída para saber se houve êxito ou não
var level = 1 //TEMPORÁRIO! Futura ligação com banco de dados (não estou copiando o comentário do William)

async function loadDOM(){
    const asideRqst = await fetch(`/webSites/blocks/localAssets/levels/lv${level}/aside.ejs`) //blocos laterais
    const asideEJS = await asideRqst.text() 
    const dragBlockRqst =  await fetch(`/webSites/blocks/localAssets/levels/lv${level}/code.ejs`) //código a ser preenchido
    const dragBlockEJS = await dragBlockRqst.text()
    codeBlocks.innerHTML = dragBlockEJS
    aside.innerHTML = asideEJS
}

async function content(){
    await main()
    await loadDOM() //carrega o código e os blocos arrastáveis
    const masterRqst = await fetch("/globalAssets/json/master.json") //json mestre
    const master = await masterRqst.json() 
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
