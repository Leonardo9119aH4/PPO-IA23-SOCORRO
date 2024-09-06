export async function loadSecurity() {
    const apply = document.querySelector("#applyBt")
    console.log("apply: ", apply)
    apply.onclick = async function() {
        let password = document.querySelector("#actualPassword").value
        let newPassword = document.querySelector("#newPassword").value
        let newPasswdConfirm = document.querySelector("#newPasswordConfirmation").value
        if(newPassword == newPasswdConfirm){
            let response = await fetch("/api/private/changePassword", {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({password: password, newPassword: newPassword})
            })
            if(response.status == 201){
                alert("senha alterada com sucesso!")
            } else {
                alert("Senha atual incorreta!")
            }
        } else {
            alert("A sua nova senha e a confirmação são diferentes!")
        }
    }
}