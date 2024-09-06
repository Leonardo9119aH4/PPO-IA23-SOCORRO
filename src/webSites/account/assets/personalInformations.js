export async function loadPersonalInformations() {
    const applyName = document.querySelector("#applyName")
    const applyPhone = document.querySelector("#applyPhone")
    const applyUsername = document.querySelector("#applyUsername")

    applyName.onclick = async function() {
        let newName = document.querySelector("#newName").value
        let response = await fetch('/api/private/reginfo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({action: "set", newInfoType: "realname", newInfo: newName})
        })
        response = await response.json()
        if(response == 0) {
            alert("Nome modificado com sucesso!")
        } else{
            alert("Valor não poder ser nulo!")
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

    applyUsername.onclick = async function() {
        let newUsername = document.querySelector("#newUsername").value
        let response = await fetch('/api/private/reginfo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({action: "set", newInfoType: "username", newInfo: newUsername})
        })
        response = await response.json()
        if(response == 0) {
            alert("Novo nome de usuário cadastrado com suceso!")
        } else if(response == 4) {
            alert("Este nickname já consta no sistema!")
        }
    }
}