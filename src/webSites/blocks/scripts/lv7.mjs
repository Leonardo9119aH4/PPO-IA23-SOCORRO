import { Terminal } from "/webSites/blocks/terminal.js"
export async function Script(terminalElement, dSec, exp){
    let terminal = new Terminal(terminalElement)
    terminal.write("Digite o seu nome: ") //escreve no terminal (saída)
    let nome = await terminal.read() //lê o que o usuário digitou (entrada)
    terminal.write("Digite a sua idade: ")
    let idade = parseInt(await terminal.read())
    terminal.write(`${nome} possui ${idade} anos.`)
    terminal.clear() //limpa o terminal
    terminal.write("Digite a idade do seu pai: ")
    let idadePai = parseInt(await terminal.read())
    let difIdade = idadePai - idade
    terminal.write(`${nome} é ${difIdade} anos mais novo que seu pai.`)
    terminal.end(dSec, exp) //finaliza o nível
}
