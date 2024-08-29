export function listCommands(inputcommands: any, i: number, x: number) {
    let counter = 0
    console.log(inputcommands)
    console.log("i: ", i)
    do{
        console.log("counter: ", counter, "\nlinha: ", i)
        console.log('{: ', inputcommands[i].indexOf('{') != -1)
        console.log('}: ', inputcommands[i].indexOf('}') != -1)
        if(inputcommands[i].indexOf('se nao') != -1){
            console.log("Achou o se nao")
            break
        }
        if(inputcommands[i].indexOf('}') != -1){
            console.log("diminuiu")
            counter--
        }
        if(inputcommands[i].indexOf('{') != -1){
            counter++
        }
        i++
    } while(counter>0)
    console.log("i: ", i, "x: ", x)
    console.log(inputcommands.slice(x+1, i))
    return [inputcommands.slice(x+1, i), i]
}

export function getFinalline(inputcommands: any, i: number) {
    let counter = 0
    console.log(inputcommands)
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
    return i
}