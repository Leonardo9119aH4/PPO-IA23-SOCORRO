import {main} from '../../globalAssets/js/main.js'
main()
const exitbt = document.querySelector("#exitbt")
exitbt.addEventListener('click', ev => {
    window.location.href = "/webSites/main/index.html"
    console.log("sla")
})