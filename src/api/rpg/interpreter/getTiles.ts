export function getTiles(inputcommand: string){
    let pos: number = inputcommand.indexOf("(")
    let tiles: Array<string> = []
    while(pos < inputcommand.length){
        tiles.push(inputcommand[pos])
        if(inputcommand[pos] === ")" || inputcommand[pos] == " "){
            tiles.join("")
            return tiles
        }
        pos++
    }
    return tiles
}