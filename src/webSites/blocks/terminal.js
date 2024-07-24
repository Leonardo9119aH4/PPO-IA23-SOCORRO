import {fatalError} from "/globalAssets/js/main.js"
export class Terminal{ //objeto do terminal
    constructor(element){
        this.element = element
    }
    write(text){
        this.element.innerHTML += `<div>${text}</div>`
    }
    async read(){
        let element = this.element //gambiarra pro innerHTML funcionar dentro da Promise
        element.innerHTML += "<input type='text' id='input' autocomplete='off'>"
        let inputBox = document.querySelector("input")
        return new Promise((resolve) => {
            inputBox.addEventListener('keydown', function(event) {
                if (event.key === 'Enter') {
                    const value = inputBox.value.trim();
                    inputBox.remove();  // Remove o campo de entrada após leitura
                    element.innerHTML += `<div>${value}</div>` // Substitui o campo por texto
                    resolve(value);  // Resolve a promessa com o valor do input
                }
            });
            inputBox.focus(); // Foco automático para o input box
        });
        
    }
    clear(){
        this.element.innerHTML = ""
    }
    end(){
        this.element.innerHTML += "Programa finalizado com êxito. Aperte qualquer tecla para sair..."
        setTimeout(()=>{ //evita que o usuário saia acidentalmente
            document.addEventListener("keydown", ()=>{
                window.location.href="/webSites/levels/index.html"
            })
        }, 1000)
    }
}
export async function loadScript(terminalElement, level){ //carrega o script do terminal
    let scriptRqst = await fetch("/api/getScript", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "level": level
        })
    })
    if(scriptRqst.status===500){
        fatalError(500)
    }
    let script = await scriptRqst.text()
    eval(script) //parei aqui
}