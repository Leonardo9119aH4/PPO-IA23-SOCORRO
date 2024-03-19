const body = document.querySelector('body');
body.innerHTML += `
    <span id="nav">
        <button id="mnhamburg">
            <span></span>
            <span></span>
            <span></span>
        </button>
        <nav id="menu" class="closed-menu">
            <div id="account">
                <img src="/images/account-img" alt="Foto do seu perfil">
                <p>Seu nome</p>
            </div>
            <a>sla</a>
            <a>sla</a>
            <a>sla</a>
            <a>sla</a>
        </nav>
    </span>
`
const btmn = body.querySelector('button#mnhamburg');
const nav = body.querySelector('nav#menu');
btmn.addEventListener('click', () => {
    btmn.classList.toggle('open-nav');
    nav.classList.toggle('open-nav');
})

