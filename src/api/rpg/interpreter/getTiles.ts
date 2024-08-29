export function getTiles(inputcommand: string){
    console.log(inputcommand)
    let pos: number = inputcommand.indexOf("(")+1
    let tiles: Array<string> = []
    let inputcommandsplit: Array<string> = inputcommand.split("")
    while(pos < inputcommandsplit.length){
        console.log("pos, tiles, inputcommandsplit[pos] ", pos, tiles, inputcommandsplit[pos])
        if(inputcommandsplit[pos] === ")" || inputcommandsplit[pos] == " "){
            tiles.join("")
            return tiles
        }
        tiles.push(inputcommandsplit[pos])
        pos++
    }
    return tiles
}