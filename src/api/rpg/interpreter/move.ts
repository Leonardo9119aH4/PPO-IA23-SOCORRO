import { Commands } from './commands'

export function movecalc(command: Commands, time: Number) {
    switch (command.command) { //verfica a variavel do comando para determinar o lado
        case 'MoverCima()':
            return ["setVelocityY(100)", `${time}`]
        case 'MoverBaixo()':  
            return ["setVelocityY(-100)", `${time}`]
        case 'MoverDireita()':
            return ["setVelocityX(100)", `${time}`]
        case 'MoverEsquerda()':
            return ["setVelocityX(-100)", `${time}`]
    }
    return ["sad"]
}