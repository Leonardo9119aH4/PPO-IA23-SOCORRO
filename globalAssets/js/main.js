export function main(){
    const body = document.querySelector('body');
    fetch('http://localhost:3000/globalAssets/ejs/nav.ejs')
    .then(response => response.text())
    .then(html => {
        body.innerHTML += html;
    })    
    const btmn = body.querySelector('button#mnhamburg');
    const nav = body.querySelector('nav#menu');
    btmn.addEventListener('click', () => {
        btmn.classList.toggle('open-nav');
        nav.classList.toggle('open-nav');
    })
}

