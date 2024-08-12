import {main} from "/globalAssets/js/main/js"
const mainTag = document.querySelector("main")
const contBt = mainTag.querySelector("button")

async function content(){
    await main()
    contBt.addEventListener("click", ev =>{
        
    })
}
content()