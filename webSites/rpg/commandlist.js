function listCommands(inputcommands, i) {
    inputcommands.splice(0, i - 1)
    let counter = 0
    do{
        if(inputcommands[i].indexOf('{') != 1){
            counter++
        }
        if(inputcommands[i].indexOf('}') != 1){
            counter--
        }
        i++
    } while(counter>0)
    const fnline = i
    return inputcommands.slice(0, fnline)
}