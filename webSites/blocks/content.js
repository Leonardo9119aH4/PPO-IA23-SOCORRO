import {main} from "http://localhost:3000/globalAssets/js/main.js"
import "http://localhost:3000/frameworks/jquery.js"
import "http://localhost:3000/frameworks/jquery-ui.js"
import "http://localhost:3000/frameworks/jquery-collision.js"

const aside = document.querySelector("aside") //local dos blocos arrastáeis
const header = document.querySelector("header") //cabeçario
const codeBlocks = document.querySelector("main") //onde o scratch fica
const title =  document.querySelector("title") //título
var level = 1 //TEMPORÁRIO! Futura ligação com banco de dados (não estou copiando o comentário do William)

async function loadDOM(){
    const asideRqst = await fetch(`http://localhost:3000/webSites/blocks/localAssets/levels/lv${level}/aside.ejs`)
    const asideEJS = await asideRqst.text() //blocos laterais
    const blocksRqst =  await fetch(`http://localhost:3000/webSites/blocks/localAssets/levels/lv${level}/code.ejs`)
    const blocksEJS = await blocksRqst.text()
    codeBlocks.innerHTML = blocksEJS
    aside.innerHTML = asideEJS
}

async function content(){
    await main()
    await loadDOM()
    const masterRqst = await fetch("http://localhost:3000/globalAssets/json/master.json")
    const master = await masterRqst.json() //json mestre
    title.innerHTML = master[level].level_title
    header.innerHTML = master[level].level_header
    const blocksRef = document.querySelectorAll(".blocks")
    const reBlRef = document.querySelectorAll(".reBl")
    $(document).ready(function() {
        $(".blocks").draggable()
        $(".reBl").droppable({
            drop: function(event, ui){
                
            }
        })
    })
    async function checkCollisions(){
        $(".draggable").collision(".blocks").each(function() {
            // Ação a ser tomada quando houver colisão
        console.log("foi")
        });
    }
    setInterval(checkCollisions, 100)
}
content()
