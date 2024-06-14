export function listCommands(inputcommands, i, x) {
    let counter = 0
    while(true) {
        if(inputcommands[i].indexOf('{') != -1){
            counter++
        }
        if(inputcommands[i].indexOf('}') != -1){
            counter--
        }
        if(counter==0){
            break
        }
        i++
    }
    console.log(inputcommands)
    console.log(inputcommands.slice(1, i+1))
    console.log(i)
    console.log(0)
    return [inputcommands.slice(x+1, i), i]
}