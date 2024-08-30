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
            window.location.href = "/webSites/levels/index.html"
            break
        case 500:
            alert("Erro interno do servidor!")
            break
    }
}

function changePlaceholder() {
    console.log("foi")
    if(userCheck.checked){
        email.setAttribute("placeholder", "Insira seu nome de usuário")
    } else if(telefone.checked){
        email.setAttribute("placeholder", "Insira seu número de telefone")
    } else {
        email.setAttribute("placeholder", "Insira seu e-mail")
    }
}

document.querySelectorAll(".radioInput").forEach(input => {
    console.log("detectou")
})

document.querySelectorAll("#metododiv div").forEach(radio => {
    radio.onclick = function () {
        radio.querySelector("input").checked = true    
        changePlaceholder()
    }
})

const inputs = document.querySelectorAll(".txtInput")
inputs.forEach(input => {
    input.addEventListener("focusin", () => {
        input.setAttribute("class", "isWriting")
    })
    input.addEventListener("focusout", ev => {
        input.setAttribute("class", '')
    }) 
})