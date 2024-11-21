import { Terminal } from "/webSites/blocks/terminal.js"
export async function Script(terminalElement, dSec, exp){
    let terminal = new Terminal(terminalElement)
    let numLista = []
    for(let i=0; i<9; i++){
        terminal.write("Digite um valor:")
        numLista.push(await terminal.read())
    }
    terminal.write(numLista)
    let numTabela = []
    for(let x=0; x<3; x++){
        numTabela.push([])
        for(let y=0; y<3; y++){
            numTabela[x].push(numLista[3*x+y])
        }
    }
    terminal.write(numTabela)
    terminal.end(dSec, exp)
}