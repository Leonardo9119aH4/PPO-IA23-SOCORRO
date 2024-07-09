import {main} from '/globalAssets/js/main.js'
main()
const confirmBt = document.querySelector("#entrar")
const exitbt = document.querySelector("#exitbt")
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
    for(let i = 0, aux = data; i<data; i+=2){
        if(aux>=16){
            phoneAlert()
            alert("Telefone já cadastrado!")
            aux/=2
        } else if (aux>=8){
            emailAlert()
            alert("Email já cadastrado!")
            aux/=2
        } else if (aux>=4){
            nameAlert()
            alert("Este nome de usuário já está cadstrado!")
            aux/=2
        } else if(aux>=2){
            passwdAlert()
            alert("A senha e a confirmação são diferentes!")
            aux/=2
        } else {
            emailDifferenceAlert()
            alert("A confirmação de email são diferentes!")
            aux/=2
        }
    }
}

function phoneAlert(){
    
}