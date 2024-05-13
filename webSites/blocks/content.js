import {main} from "http://localhost:3000/globalAssets/js/main.js"
import {dragBlock, receiveBlock} from "http://localhost:3000/webSites/blocks/localAssets/dragAndDrop.js"

const aside = document.querySelector("aside") //local dos blocos arrastáeis
const header = document.querySelector("header") //cabeçario
const codeBlocks = document.querySelector("main") //onde o scratch fica
const title =  document.querySelector("title") //título
var level = 1 //TEMPORÁRIO! Futura ligação com banco de dados (não estou copiando o comentário do William)

async function loadDOM(){
    const asideRqst = await fetch(`http://localhost:3000/webSites/blocks/localAssets/levels/lv${level}/aside.ejs`)
    const asideEJS = await asideRqst.text() //blocos laterais
    const dragBlockRqst =  await fetch(`http://localhost:3000/webSites/blocks/localAssets/levels/lv${level}/code.ejs`)
    const dragBlockEJS = await dragBlockRqst.text()
    codeBlocks.innerHTML = dragBlockEJS
    aside.innerHTML = asideEJS
}

async function content(){
    await main()
    await loadDOM()
    const masterRqst = await fetch("http://localhost:3000/globalAssets/json/master.json")
    const master = await masterRqst.json() //json mestre
    title.innerHTML = master[level].level_title
    header.innerHTML = master[level].level_header
    const reBlRef = document.querySelectorAll(".reBl") //referencia as divs .reBl (receive Blocks) após o carregamento do DOM
    const dragBlockRef = document.querySelectorAll(".dragBlock") //referencia as divs .dragBlock após o carregamento do DOM
    dragBlockRef.forEach((element) => { //atribui a classe dragBlock as divs .dragBlock
        new dragBlock(element)
    })

    const receiveBlocks = [];
    document.querySelectorAll('.reBl').forEach((element, index) => {
        const id = index + 1;
        const receiveBlockObj = new receiveBlock(element, id);
        // Adicione todos os elementos reBl à instância de receiveBlock
        const reBlElements = document.querySelectorAll(`#reBl${id}`);
        reBlElements.forEach(reBlElement => {
            receiveBlockObj.addReBlElement(reBlElement);
        });
    
        receiveBlocks.push(receiveBlockObj);
    });
    
    document.addEventListener('mousemove', function() {
        document.querySelectorAll('.dragBlock').forEach(dragBlock => {
            receiveBlocks.forEach(reBl => {
                reBl.checkCollision(dragBlock);
            });
        });
    });
}
content()
