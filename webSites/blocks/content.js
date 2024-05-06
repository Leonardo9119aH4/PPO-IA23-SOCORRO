import {main} from "http://localhost:3000/globalAssets/js/main.js"
import "http://localhost:3000/globalAssets/js/jquery.js"
import "http://localhost:3000/globalAssets/js/jquery-ui.js"

const aside = document.querySelector("aside") //local dos blocos arrastáeis
const header = document.querySelector("header") //cabeçario
const codeBlocks = document.querySelector("main") //onde o scratch fica
const title =  document.querySelector("title") //título

async function content(){
    main()
    var level = 1 //TEMPORÁRIO! Futura ligação com banco de dados (não estou copiando o comentário do William)
    const masterRqst = await fetch("http://localhost:3000/globalAssets/json/master.json")
    const master = await masterRqst.json() //json mestre
    title.innerHTML = master[level].level_title
    header.innerHTML = master[level].level_header
    const asideRqst = await fetch(`http://localhost:3000/webSites/blocks/localAssets/levels/lv${level}/aside.ejs`)
    const asideEJS = await asideRqst.text() //blocos laterais
    const blocksRqst =  await fetch(`http://localhost:3000/webSites/blocks/localAssets/levels/lv${level}/code.ejs`)
    const blocksEJS = await blocksRqst.text()
    codeBlocks.innerHTML = blocksEJS
    aside.innerHTML = asideEJS
    const blocksID = document.querySelectorAll(".blocks")
    const reBlID = document.querySelectorAll(".reBl")
    console.log(blocksID)
    console.log(reBlID)
    $(document).ready(function() {
        $(".blocks").draggable()
        $(".reBl").droppable({
            drop: function(event, ui){
                
            }
        })
    })
}
content()
