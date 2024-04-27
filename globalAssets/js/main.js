export function main(){
    const nav = document.querySelector('nav') //referenciar o nav para injeção de html
    var mainRqst = new XMLHttpRequest();
    mainRqst.open('GET', 'http://localhost:3000/globalAssets/ejs/nav.ejs', false);
    mainRqst.send();
    if (mainRqst.status === 200) {
        var responseText = mainRqst.responseText;
        nav.innerHTML += responseText;
    } else {
        console.error('Erro ao carregar o arquivo EJS');
    }
    const btmn = nav.querySelector('button#mnhamburg')
        const subNav = nav.querySelector('div#subNav')
        btmn.addEventListener('click', () => {
            btmn.classList.toggle('open-nav')
            subNav.classList.toggle('open-nav')
        })
}
//te odeio javascript