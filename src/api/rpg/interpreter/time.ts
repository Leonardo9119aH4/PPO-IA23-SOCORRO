const algorisms: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9]

export function detectTime(command: string) {
    var time: Array<number>
    if(!detectNumber(command)) {
        return 1
    } else {
        for (let i: number; i<command.length; i++){
            if(detectNumber(command)) {
                time.push(+command[i])
            }
        }
        return Number(time.join(''))
    }
}

function detectNumber(command: string) {
    algorisms.forEach((el: Number) => {
        command.indexOf(`${el}`)
        if(command.indexOf(`${el}`) != -1) {
            return true
        }
    })
    return false
}