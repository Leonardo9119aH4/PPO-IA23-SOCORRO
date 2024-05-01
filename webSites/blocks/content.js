import {main} from "http://localhost:3000/globalAssets/js/main.js"

const aside = document.querySelector("aside")
const header = document.querySelector("header")
const codeBlocks = document.querySelector("main")

async function content(){
    main()
    const asideRqst = await fetch("http://localhost:3000/webSites/blocks/localAssets/levels/lv1/aside.ejs")
    const asideEJS = await asideRqst.text()
    aside.innerHTML = asideEJS
}
content()
