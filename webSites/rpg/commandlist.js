export function listCommands(inputcommands, i) {
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
    console.log(inputcommands)
    console.log(inputcommands.slice(1, i+1))
    console.log(i)
    console.log(0)
    return inputcommands.slice(1, i+1)
}