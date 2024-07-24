const Terminal = require("../../../../webSites/blocks/terminal")
async function termScript(terminalElement){
    let terminal = new Terminal(terminalElement)
    terminal.write("oi")
    terminal.write("tchau")
    let X = parseInt(await terminal.read())
    let Y = parseInt(await terminal.read())
    let Z = X+Y
    terminal.write(Z)
    terminal.end()
}
