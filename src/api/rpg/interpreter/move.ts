import { Commands } from './commands'

    export function movecalc(command: Commands) {
        switch (command.command) { //verfica a variavel do comando para determinar o lado
            case 'MoverCima()':
                return "jogador.setVelocityY(100)"
            case 'MoverBaixo()':  
                return "jogador.setVelocityY(-100)"
            case 'MoverDireita()':
                return "jogador.setVelocityX(100)"
            case 'MoverEsquerda()':
                return "jogador.setVelocityX(-100)"
            case 'Attack()':
                return ""
        }
        return "sad"
    }