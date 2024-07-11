import {main} from '/globalAssets/js/main.js'
main()

const confirmBt = document.querySelector("#entrar")
const exitbt = document.querySelector("#exitbt")
const emailAlert = document.querySelector("#emailAlert")
const comfirmEmailAlert = document.querySelector("#comfirmEmailAlert")
const comfirmPasswordAlert = document.querySelector("#comfirmPassowrdAlert")
const phoneAlert = document.querySelector("#phoneAlert")

exitbt.addEventListener('click', ev => {
    window.location.href = "/webSites/main/index.html"
})
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
    let cad = false
    for(let i = 0, aux = data; i<data; i+=2){
        if(aux>=16){
            phoneAlert.innerHTML = "Este teleofne já consta no sistema!"
            aux/=2
        } else if (aux>=8){
            emailAlert.innerHTML = "Este Email já consta no sistema!"
            aux/=2
        } else if (aux>=4){
            nameAlert.innerHTML = "Este nome de usuário já está cadastrado!"
            aux/=2
        } else if(aux>=2){
            comfirmPasswordAlert.innerHTML = "Há discrepância entre a senha e a confirmação"
            aux/=2
        } else {
            comfirmEmailAlert.innerHTML = "A confirmação de email e o email são diferentes!"
            aux/=2
        }
    }
    if(data === 0){
        window.location.href = "/src/webSites/main/index.html"
    }
}