export function listCommands(inputcommands: any, i: number, x: number) {
    let counter = 0
    while(true) {
        console.log("counter: ", counter, "\nlinha: ", i)
        if(inputcommands[i].indexOf("se nao") != -1 || inputcommands[i].indexOf("}se nao") != -1 || inputcommands[i].indexOf("se nao{") != -1 || inputcommands[i].indexOf("}se nao{") != -1){
            break
        }
        if(inputcommands[i].indexOf('{') != -1){
            counter++
        }
        if(inputcommands[i].indexOf('}') != -1){
            console.log("diminuiu")
            counter--
        }
        if(counter==0){
            break
        }
        i++
    }
    console.log(inputcommands.slice(x+1, i))
    return [inputcommands.slice(x+1, i), i]
}