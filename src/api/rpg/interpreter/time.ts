const algorisms: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9]

export function detectTime(command: string) {
    if(!detectNumber(command)) {
        return 1
    } else {
        var time: Array<number> = [0]
        for (let i: number = 0; i<command.length; i++){
            if(detectNumber(command)) {
                time.push(+command[i])
            }
        }
        return Number(time.join(''))
    }
}
//
function detectNumber(command: string) {
    algorisms.forEach((el: Number) => {
        command.indexOf(`${el}`)
        if(command.indexOf(`${el}`) != -1) {
            return true
        }
    })
    return false
}