import {main} from '/globalAssets/js/main.js'
main()

const confirmBt = document.querySelector("#btConfirm")
const emailAlert = document.querySelector("#emailAlert")
const comfirmEmailAlert = document.querySelector("#confirmEmailAlert")
const comfirmPasswordAlert = document.querySelector("#comfirmPassowrdAlert")
const phoneAlert = document.querySelector("#phoneAlert")

confirmBt.onclick = async function() {
    let email = document.querySelector("#email").value
    let confirmEmail = document.querySelector("#confirmEmail").value
    let password = document.querySelector("#senha").value
    let confirmPassword = document.querySelector("#confirmSenha").value
    let phone = document.querySelector("#telefone").value
    let username = document.querySelector("#nome").value
    let realName = document.querySelector("#realName").value
    let response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email: email, confirmEmail: confirmEmail, password: password, confirmPassword: confirmPassword, username: username, realName: realName, phone: phone})
    })
    let data = await response.json()
    if(data == -1) {
        alert("Algum campo está vazio")
    }
    for(let i = 0, aux = data; i<data; i+=2){
        if(aux>=16){
            phoneAlert.innerHTML = "Este telefone já consta no sistema!"
            aux-=16
        } else if (aux>=8){
            emailAlert.innerHTML = "Este Email já consta no sistema!"
            aux-=8
        } else if (aux>=4){
            nameAlert.innerHTML = "Este nome de usuário já está cadastrado!"
            aux-=4
        } else if(aux>=2){
            comfirmPasswordAlert.innerHTML = "Há discrepância entre a senha e a confirmação"
            aux-=2
        } else {
            comfirmEmailAlert.innerHTML = "A confirmação de email e o email são diferentes!"
            aux-=1
        }
    }
    if(data === 0){
        window.location.href = "/webSites/levels/index.html"
    }
}

const inputs = document.querySelectorAll(".txtInput")
inputs.forEach(input => {
    input.addEventListener("focusin", () => {
        input.setAttribute("class", "isWriting")
    })
    input.addEventListener("focusout", ev => {
        input.setAttribute("class", '')
    }) 
})