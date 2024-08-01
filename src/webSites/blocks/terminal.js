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
    end(dSec, exp){
        let sec = Math.round(dSec/10)
        let min = Math.trunc(sec/60)
        sec = sec%60
        if(sec>0 && sec<10){
            this.element.innerHTML += `Programa concluído em ${min}:0${sec}\nObteve ${exp} de XP\nAperte qualquer tecla para sair...`
        }
        else{
            this.element.innerHTML += `Programa concluído em ${min}:${sec}\nObteve ${exp} de XP\nAperte qualquer tecla para sair...`
        }
        setTimeout(()=>{ //evita que o usuário saia acidentalmente
            document.addEventListener("keydown", ()=>{
                window.location.href="/webSites/levels/index.html"
            })
        }, 1000)
    }
}
export async function loadScript(terminalElement, level, dSec, exp){ //carrega o script do terminal
    const script = await import(`/webSites/blocks/scripts/lv${level}.mjs`)
    script.Script(terminalElement, dSec, exp)
}