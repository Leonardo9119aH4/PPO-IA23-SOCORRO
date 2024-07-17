export async function main(){
    const nav = document.querySelector('nav') //referenciar o nav para injeção de html
    const mainRqst = await fetch("/globalAssets/ejs/nav.ejs")
    const mainEJS = await mainRqst.text()
    nav.innerHTML = mainEJS
    const btmn = nav.querySelector('button#mnhamburg')
    const subNav = nav.querySelector('div#subNav')
    const divUsername = nav.querySelector("p#username")
    btmn.addEventListener('click', () => {
        btmn.classList.toggle('open-nav')
        subNav.classList.toggle('open-nav')
    })
    let username = await fetch("/api/private/username", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({"action": "get"})
    })
    if(username.status === 500 || username.status === 502){
        fatalError(username.status)
    }
    else if(username.status === 401){
        divUsername.innerHTML = ""
    }
    else{
        divUsername.innerHTML = await username.json()
    }
}
export async function fatalError(error){ //função caso de erro fudido no servidor
    document.body.innerHTML = `<h1>Erro interno ${error} no servidor. Tente novamente mais tarde</h1>`
}