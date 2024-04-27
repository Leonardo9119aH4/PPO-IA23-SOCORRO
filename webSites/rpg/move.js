import { win } from 'http://localhost:3000/webSites/rpg/win.js'
import { gameover } from 'http://localhost:3000/webSites/rpg/gameover.js'
function collision(div1, div2) { //determina se há colisão e se tiver retoran o lado de colisão da div
    var pos1 = div1.getBoundingClientRect()
    var pos2 = div2.getBoundingClientRect()
    var differenceX = (pos1.left + pos1.width / 2) - (pos2.left + pos2.width / 2)
    var differenceY = (pos1.top + pos1.height / 2) - (pos2.top + pos2.height / 2)
    var sumwidht = (pos1.width + pos2.width) / 2
    var sumheight = (pos1.height + pos2.height) / 2
    if (Math.abs(differenceX) < sumwidht && Math.abs(differenceY) < sumheight) {
        var colside = []
        if (differenceX > 0) {
            colside.push("left")
        } else {
            colside.push("right")
        }
        if (differenceY > 0) {
            colside.push("top")
        } else {
            colside.push("bottom")
        }
        return colside
    }
    return [0,0]
}

export function movecalc(command, vars) {
    let brk = false
    for(let i = 0; i<=vars.pxadd; i++) { //verifica a colisão para cada pixel adicionado
        vars.walls.forEach(el => { //verifica colisão com cada parede
            if(collision(vars.hero, el)[0] == command.var || collision(vars.hero, el)[1] == command.var) {
                brk = true
            }
        })
        vars.enemies.forEach(el => { //verifica colisão com inimigos
            if(collision(vars.hero, el)[0] == command.var || collision(vars.hero, el)[1] == command.var) {
                gameover()
                brk = true
            }
        })
        if(collision(vars.hero, end)[0] == command.var || collision(vars.hero, end)[1] == command.var) {
            win()
            brk = true
        }
        if(brk) { //se tiver colisão para a execução do loop
            break
        }
        switch (command.var) { //verfica a variavel do comando para determinar o lado
            case 'top':
                vars.top --
                break
            case 'bottom':  
                vars.top ++
                break
            case 'left':
                vars.left --
                break
            case 'right':
                vars.left ++
                break
        }
        if (command.var == 'top' || command.var == 'bottom') { //verifica a variável do json para adicionar o estilo
            vars.hero.style.top = vars.top + 'px'
        } else {
            vars.hero.style.left = vars.left + 'px'
        }
    }
}