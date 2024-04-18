import {main} from "../../globalAssets/js/main.js"
main()

const Niveis = document.querySelector("#levels .content")
let QN = 49 //Alterado pelo banco de dados, enquanto não tem, valor arbitrário

for(let i=0; i<49; i++){ //injeta os níveis
    Niveis.innerHTML += `<div class='nivel' id=N${i}'>${i}</div>` 
}

