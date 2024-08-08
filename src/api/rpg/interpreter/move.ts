import { Commands } from './commands'

export function movecalc(command: Commands, tiles: number, screenHeigth: number, screenWidth: number) {
    switch (command.command) { //verfica a variavel do comando para determinar o lado
        case `MoverCima(${tiles})`:
            return [`jogador.setVelocityY(${calcTiles(tiles, screenHeigth)})`, "this.anims.play('ciceroWalk', true)"]
        case `MoverBaixo(${tiles})`:  
            return [`jogador.setVelocityY(-${calcTiles(tiles, screenHeigth)})`, "this.anims.play('ciceroWalk', true)"]
        case `MoverDireita(${tiles})`:
            return [`jogador.setVelocityX(${calcTiles(tiles, screenWidth)})`, "this.anims.play('ciceroWalk', true)"]
        case `MoverEsquerda(${tiles})`:
            return [`jogador.setVelocityX(-${calcTiles(tiles, screenWidth)})`, "this.anims.play('ciceroWalk', true)"]
        case 'Attack()':
            return ["jogador.attack()"]
    }
    return ["sad"]
}

function calcTiles(tiles: number, screenSize: number){
    return tiles * screenSize / 2;
}