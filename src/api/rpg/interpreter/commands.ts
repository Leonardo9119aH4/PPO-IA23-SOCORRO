export interface Commands {
    command: string,
    var: string,
    effect: string
}

export async function returnPureCommand(bruteCommand: string){
    let pureCommand: Array<string> = []
    let commandSplit: Array<string> = bruteCommand.split("");
    for(let i:number = 0; i<commandSplit.length; i++){         
        if(commandSplit[i] != "("){
            pureCommand.push(commandSplit[i])
            continue
        }
        return pureCommand.join("")
    }
    return pureCommand.join("")
}