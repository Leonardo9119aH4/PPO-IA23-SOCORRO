export async function main(){
    const nav = document.querySelector('nav') //referenciar o nav para injeção de html
    const mainRqst = await fetch("/api/getnav", {
        method: "POST"
    })
    const mainEJS = await mainRqst.json()
    nav.innerHTML = mainEJS
    const btmn = nav.querySelector('button#mnhamburg')
    const subNav = nav.querySelector('div#subNav')
    const divUsername = nav.querySelector("p#username")
    btmn.addEventListener('click', () => {
        btmn.classList.toggle('open-nav')
        subNav.classList.toggle('open-nav')
    })
}
export async function fatalError(error){ //função caso de erro fudido no servidor
    document.body.innerHTML = `<h1>Erro interno ${error} no servidor. Tente novamente mais tarde</h1>`
}