const btmn = document.querySelector('button#mnhamburg');
const nav = document.querySelector('nav#menu');
btmn.addEventListener('click', () => {
    btmn.classList.toggle('open-nav');
    nav.classList.toggle('open-nav');
})