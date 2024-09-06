import { Terminal } from "/webSites/blocks/terminal.js"
export async function Script(terminalElement, dSec, exp){
    let terminal = new Terminal(terminalElement)
    let nota, somaNota=0;
    for(let i=1; i<=4; i++){
        terminal.write(`Digite a nota da avaliação ${i}: `)
        nota = parseInt(await terminal.read())
        somaNota += nota
    }
    let medNota = somaNota/4
    terminal.write(`A sua média é ${medNota}`)
    terminal.end(dSec, exp)
}