import {main} from '/globalAssets/js/main.js'
main()

const bt = document.querySelector("button.lors")

bt.onclick = async function() {
    let logado = await fetch('/api/private/reginfo', {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({action: "get"})
    })
    console.log(logado.status)
    if(logado.status == 200){
        window.location.href = "/webSites/levels/index.html"
    } else if(logado.status == 401){
        window.location.href = "/webSites/login/index.html"
    } else {
        alert("Ocorreu um erro na verificação de login!")
    }
}