import { Commands } from './commands'

export function movecalc(command: Commands, time: Number) {
    switch (command.command) { //verfica a variavel do comando para determinar o lado
        case 'MoverCima()':
            return ["jogador.setVelocityY(100)", `${time}`]
        case 'MoverBaixo()':  
            return ["jogador.setVelocityY(-100)", `${time}`]
        case 'MoverDireita()':
            return ["jogador.setVelocityX(100)", `${time}`]
        case 'MoverEsquerda()':
            return ["jogador.setVelocityX(-100)", `${time}`]
        case 'Attack()':
            return [""]
    }
    return ["sad"]
}