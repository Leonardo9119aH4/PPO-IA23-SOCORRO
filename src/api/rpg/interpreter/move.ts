import { Commands } from './commands'

export function movecalc(command: Commands, tiles: number) {
    switch (command.command) { //verfica a variavel do comando para determinar o lado
        case `MoverCima(${tiles})`:
            return ["up", `${tiles}`]
        case `MoverBaixo(${tiles})`:  
            return ["down", `${tiles}`]
        case `MoverDireita(${tiles})`:
            return ["rigth", `${tiles}`]
        case `MoverEsquerda(${tiles})`:
            return ["left", `${tiles}`]
        case 'Attack()':
            return ["attack"]
    }
    return ["sad"]
}