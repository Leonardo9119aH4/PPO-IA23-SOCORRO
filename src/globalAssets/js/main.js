export async function main(){
    const nav = document.querySelector('nav') //referencia o nav para injeção de html
    const footer = document.querySelector('footer') //referencia o footer para injeção de footer
    const navRqst = await fetch("/api/getnav", {
        method: "POST"
    })
    const navEJS = await navRqst.json()
    nav.innerHTML = navEJS
    const btmn = nav.querySelector('button#mnhamburg')
    const subNav = nav.querySelector('div#subNav')
    const logOut = nav.querySelector('#logout') //botão de sair
    btmn.addEventListener('click', () => {
        btmn.classList.toggle('open-nav')
        subNav.classList.toggle('open-nav')
    })
    if(logOut){ //verifica se o logout não é nulo
        logOut.addEventListener('click', async ()=>{
            fetch("/api/logout", {
                method: "POST"
            })
            window.location.href = "/webSites/main/index.html"
        })
    }
    if(footer){ //verifica se o footer não é nulo
        const footerRqst = await fetch("/api/getfooter", {
            method: "POST"
        })
        const footerEJS = await footerRqst.json()
        footer.innerHTML = footerEJS
    }
}  
export async function fatalError(error){ //função caso dê erro fudido no servidor
    document.body.innerHTML = `<h1>Erro interno ${error} no servidor. Tente novamente mais tarde</h1>`
}