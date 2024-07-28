const applyName = document.querySelector("#applyName")
const applyPhone = document.querySelector("#applyPhone")

applyName.onclick = async function() {
    let newName = document.querySelector("#newName").value
    let response = await fetch('/api/private/reginfo', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({action: "set", newInfoType: "username", newInfo: newName})
    })
    response = await response.json()
    if(response == 0) {
        alert("Nome modificado com sucesso!")
    } else {
        alert("Este nome já existe!")
    }
}

applyPhone.onclick = async function() {
    let newPhone = document.querySelector("#newPhone").value
    let response = await fetch('/api/private/reginfo', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({action: "set", newInfoType: "phone", newInfo: newPhone})
    })
    response = await response.json()
    if(response == 0) {
        alert("Novo telefone cadastrado com suceso!")
    } else if(response == 16) {
        alert("Este telefone já existe!")
    }
}