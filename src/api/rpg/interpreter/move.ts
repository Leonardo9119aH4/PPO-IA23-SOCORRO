import { win } from './win'
import { gameover } from './gameover'
import { GameDOM } from './gameDOM'
import { HtmlObject } from './HtmlObject'
import { Commands } from './commands'

function collision(div1: HtmlObject, div2: HtmlObject) { //determina se há colisão e se tiver retorna o lado de colisão da div
    var dx = (div1.left + div1.width / 2) - (div2.left + div2.width / 2)
    var dy = (div1.top + div1.height / 2) - (div2.top + div2.height / 2)
    var combinedHalfWidths = (div1.width + div2.width) / 2
    var combinedHalfHeights = (div1.height + div2.height) / 2
    if (Math.abs(dx) < combinedHalfWidths && Math.abs(dy) < combinedHalfHeights) {
        var colside = []
        var overlapX = combinedHalfWidths - Math.abs(dx)
        var overlapY = combinedHalfHeights - Math.abs(dy)
        if (overlapX >= overlapY) {
            if (dy > 0) {
                colside.push("top")
            } else {
                colside.push("bottom")
            }
        } else {
            if (dx > 0) {
                colside.push("left")
            } else {
                colside.push("right")
            }
        }
        return colside
    }
    return [0,0]
}

export function movecalc(command: Commands, vars: GameDOM) {
    let brk: boolean = false
    console.log(vars)
    for(let i = 0; i<vars.pxadd; i++) { //verifica a colisão para cada pixel adicionado
        vars.walls.forEach((el: HtmlObject) => { //verifica colisão com cada parede
            if(collision(vars.heroVal, el)[0] == command.var || collision(vars.heroVal, el)[1] == command.var) {
                brk = true
            }
        })
        vars.enemies.forEach((el: HtmlObject) => { //verifica colisão com inimigos
            if(collision(vars.heroVal, el)[0] == command.var || collision(vars.heroVal, el)[1] == command.var) {
                gameover()
                brk = true
            }
        })
        if(collision(vars.heroVal, vars.end)[0] == command.var || collision(vars.heroVal, vars.end)[1] == command.var) {
            win()
            brk = true
        }
        if(brk) { //se tiver colisão para a execução do loop
            break
        }
        console.log(command)
        switch (command.var) { //verfica a variavel do comando para determinar o lado
            case 'top':
                vars.heroVal.top --
                break
            case 'bottom':  
                vars.heroVal.top ++
                break
            case 'left':
                vars.heroVal.left --
                break
            case 'right':
                vars.heroVal.left ++
                break
        }
    }
    console.log(vars)
    return vars
}