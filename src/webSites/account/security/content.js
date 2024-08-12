const apply = document.querySelector("applyBt")

apply.onclick = async function() {
    let actualPassword = document.querySelector("#actualPassword")
    let newPassword = document.querySelector("#newPassword").value
    let newPasswdConfirm = document.querySelector("#newPasswordConfirmation").value
    if(newPassword == newPasswdConfirm){
        let response = await fetch("/api/private/newPassword", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({actualPassword: actualPassword, newPassword: newPassword})
        })
        response = await response.json()
        if(response == 0){
            alert("senha alterada com sucesso!")
        } else {
            alert("Senha atual incorreta!")
        }
    } else {
        alert("A sua nova senha e a confirmação são diferentes!")
    }
}