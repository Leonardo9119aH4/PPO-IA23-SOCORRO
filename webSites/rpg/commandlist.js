export function listCommands(inputcommands, i) {
    inputcommands.split('').splice(0, i - 1)
    let counter = 0
    do{
        if(inputcommands[i].indexOf('{') != 1){
            counter++
        }
        if(inputcommands[i].indexOf('}') != 1){
            counter--
        }
        i++
        console.log()
    } while(counter>0)
    console.log(i)
    const fnline = i
    return inputcommands.slice(0, fnline)
}