export function getTiles(inputcommand: string){
    let pos: number = inputcommand.indexOf("(")+1
    let tiles: Array<string> = []
    let inputcommandsplit: Array<string> = inputcommand.split("")
    console.log(pos, tiles, inputcommandsplit)
    while(pos < inputcommandsplit.length){
        if(inputcommandsplit[pos] === ")" || inputcommandsplit[pos] == " "){
            tiles.join("")
            return tiles
        }
        tiles.push(inputcommandsplit[pos])
        pos++
    }
    return tiles
}