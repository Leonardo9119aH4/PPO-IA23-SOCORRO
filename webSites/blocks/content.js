import {main} from "http://localhost:3000/globalAssets/js/main.js"
import "http://localhost:3000/globalAssets/js/jquery.js"
import "http://localhost:3000/globalAssets/js/jquery-ui.js"

const aside = document.querySelector("aside")
const header = document.querySelector("header")
const codeBlocks = document.querySelector("main")
const title =  document.querySelector("title")

async function content(){
    main()
    var level = 1 //TEMPORÁRIO! Futura ligação com banco de dados (não estou copiando o comentário do William)
    const masterRqst = await fetch("http://localhost:3000/globalAssets/json/master.json")
    const master = await masterRqst.json()
    title.innerHTML = master[level].level_title
    header.innerHTML = master[level].level_header
    const asideRqst = await fetch(`http://localhost:3000/webSites/blocks/localAssets/levels/lv${level}/aside.ejs`)
    const asideEJS = await asideRqst.text()
    aside.innerHTML = asideEJS
    $(document).ready(function() {
        $('.blocks').draggable()
    })
}
content()
