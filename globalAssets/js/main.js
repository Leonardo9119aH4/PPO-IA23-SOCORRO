export function main(){
    const nav = document.querySelector('nav') //referenciar o nav para injeção de html
    function postDOM(){ //função para funcionamento dos botões, tá gambiarra? tá. tudo culpa do js
        const btmn = nav.querySelector('button#mnhamburg')
        const subNav = nav.querySelector('div#subNav')
        btmn.addEventListener('click', () => {
            btmn.classList.toggle('open-nav')
            subNav.classList.toggle('open-nav')
        })
    }

    const mainRqst = new XMLHttpRequest()
    mainRqst.open("get", 'http://localhost:3000/globalAssets/ejs/nav.ejs', true) //a injeção do html será feita pelo ejs
    mainRqst.onreadystatechange = function() {
        if (mainRqst.readyState === XMLHttpRequest.DONE) {
            if (mainRqst.status === 200) {
                nav.innerHTML += mainRqst.responseText
                postDOM() //gambiara para aquele código só ser executado depois da injeção deo ejs no dom, pq a me### do await fetch quebra o código e pelo XMLHTTPRequest o js não espera a injeção para executar o resto
            } else {
                console.error('Erro ao carregar o arquivo:', mainRqst.status)
            }
        }
    };
    mainRqst.send()
    
}
//te odeio javascript
