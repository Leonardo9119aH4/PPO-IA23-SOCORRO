const hero = document.querySelector('div#hero') //personagem
const pxadd = 100 //quantidade de pixels a serem adicionadas a cada execução
var left = hero.getBoundingClientRect().left //distancia em pixel da esquerda da página
var top = hero.getBoundingClientRect().top //distancia em pixel de cima da página
const walls = document.querySelectorAll('div.wall') //constante com todos os obstáculos do mapa
const enemies = document.querySelectorAll('div.enemy')
export function collision(div1, div2) { //determina se há colisão e se tiver retoran o lado de colisão da div
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

export function movecalc(command) {
    let brk = false
    //verifica a colisão para cada pixel adicionado
    for(let i = 0; i<=pxadd; i++) {
        walls.forEach(el => { //verifica colisãao com cada parede
            if(collision(hero, el)[0] == command.var || collision(hero, el)[1] == command.var) {
                brk = true
            }
        })
        enemies.forEach(el => {
            if(collision(hero, el)[0] == command.var || collision(hero, el)[1] == command.var) {
                button.removeEventListener()
                brk = true
            }
        });
        if(brk) { //se tiver colisão para a execução do loop
            break
        }
        switch (command.var) { //verfica a variavel para determinar o comando
            case 'top':
                top --
                break
            case 'bottom':  
                top ++
                break
            case 'left':
                left --
                break
            case 'right':
                left ++
                break
        }
        if (command.var == 'top' || command.var == 'bottom') { //verifica a variável do json para adicionar o estilo
            hero.style.top = top + 'px'
        } else {
            hero.style.left = left + 'px'
        }
    }
}

