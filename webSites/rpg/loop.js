import { listCommands } from 'http://localhost:3000/webSites/rpg/commandlist.js'

var expression = []

function detectLoop(inputcommand) {
    if(inputcommand.indexOf('enquanto(') || inputcommand.indexOf('enquanto ')){
        let stpos = inputcommand.indexOf('(')
        let endpos = inputcommand.indexOf(')')
        while(stpos <= endpos){
            expression.push(stpos)
            stpos++
        }
        return true
    }
    return false
}

function loadLoop(inputcommands, inputlist, line) {
    let loopcommands = listCommands(inputcommands, line)
    while(eval(expression)){
        load(loopcommands)
    }
    return line
}