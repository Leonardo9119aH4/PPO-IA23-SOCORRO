import {main} from 'http://localhost:3000/globalAssets/js/main.js'
main()
const exitbt = document.querySelector("#exitbt")
exitbt.addEventListener('click', ev => {
    window.location.href = "/webSites/main/index.html"
})