export function attackCalc(command: string){
    console.log("atacar: ", command)
    switch(command) {
        case 'AtacarCima();':
            return [5, 1]
        case 'AtacarBaixo();':
            return [7, 1]
        case 'AtacarDireita();':
            return [6, 1]
        case 'AtacarEsquerda();':
            return [8, 1]
    }
    return [NaN, NaN]
}

export function moveCalc(tiles: number, command: string) {
    console.log("mover: ", command + `(${tiles});`)
    switch (command) { //verfica a variavel do comando para determinar o lado
        case `MoverCima`:
            return [1, tiles]
        case `MoverBaixo`:  
            return [3, tiles]
        case `MoverDireita`:
            return [2, tiles]
        case `MoverEsquerda`:
            return [4, tiles]
    }
    return [NaN, NaN]
}