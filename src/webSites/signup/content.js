import {main} from 'http://localhost:3000/globalAssets/js/main.js'
main()
let email = document.querySelector("#email").value
let confirmEmail = document.querySelector("#confirmEmail").value
let passwd = document.querySelector("#senha").value
let confirmPasswd = document.querySelector("#confirmPasswd").value
let name = document.querySelector("#nome").value
let realName = document.querySelector("#realName").value
const confirmBt = document.querySelector("#entrar")
const exitbt = document.querySelector("#exitbt")
exitbt.addEventListener('click', ev => {
    window.location.href = "/webSites/main/index.html"
})
confirmBt.onclick = async function() {
    let response = await fetch('http://localhost:3000/api/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email: email, confirmEmail: confirmEmail, passwd: passwd, confirmPasswd: confirmPasswd, name: name, realName: realName})
    })
    let data = await response.json()
    if(data == 0){
        alert("foi")
        switch(data){
            case 1:
                
        }
    }
}