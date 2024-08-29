import { Terminal } from "/webSites/blocks/terminal.js"
export async function Script(terminalElement, dSec, exp){
    let terminal = new Terminal(terminalElement)
    let a = 2
    terminal.write("Digite um valor para b: ")
    let b = parseInt(await terminal.read())
    let c = 1 + a + b
    terminal.write(c)
    terminal.write(a + b + c)
    terminal.end(dSec, exp)
}
