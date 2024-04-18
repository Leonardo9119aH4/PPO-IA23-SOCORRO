import {main} from '../../globalAssets/js/main.js'
main()
const graphic = document.querySelector("div#graphic")
var previousvacon = 0, cont = 0, xlayerunits = 7, ylayerunits = 10 , scale = 1000;

graphic.style.gridTemplateColumns = `repeat(${xlayerunits}, 1fr)`;
graphic.style.gridTemplateRows = `repeat(${ylayerunits}, 1fr)`;

for(let i = 0; i < xlayerunits * ylayerunits; i++) {
    graphic.innerHTML += "<span></span>";
}