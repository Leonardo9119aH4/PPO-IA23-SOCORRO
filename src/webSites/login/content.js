import {main} from '/globalAssets/js/main.js'
main()

let email = document.querySelector('#email')
let password = document.querySelector("#password")

let btConfirm = document.querySelector("#btConfirm")

let userCheck = document.querySelector("#metodouser")
let emailCheck = document.querySelector("#metodoemail")
let telefone = document.querySelector("#metodotelefone")

let status

btConfirm.onclick = async function() {
    if(userCheck.checked){
        status = 1
    } else if (emailCheck.checked){
        status = 2
    } else if (telefone.checked){
        status = 3
    } else {
        alert("Selecione um método!")
    }
    let response = await fetch('/api/signin', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({credential: status, login: email.value, password: password.value})
    })
    let data = await response.json()
    switch(data){
        case -1:
            alert("Há um campo vazio!")
            break
        case -2:
            alert("usuário não encontrado")
            break
        case 1:
            window.location.href = "/webSites/main/index.html"
            break
        case 500:
            alert("Erro interno do servidor!")
            break
    }
}