export async function main(){
    const nav = document.querySelector('nav') //referenciar o nav para injeção de html
    const mainRqst = await fetch("/globalAssets/ejs/nav.ejs")
    const mainEJS = await mainRqst.text()
    nav.innerHTML = mainEJS
    const btmn = nav.querySelector('button#mnhamburg')
    const subNav = nav.querySelector('div#subNav')
    btmn.addEventListener('click', () => {
        btmn.classList.toggle('open-nav')
        subNav.classList.toggle('open-nav')
    })
}
//te odeio javascript