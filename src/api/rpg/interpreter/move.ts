import { GameDOM } from './gameDOM'
import { Commands } from './commands'

export function movecalc(command: Commands, vars: GameDOM) {
    switch (command.var) { //verfica a variavel do comando para determinar o lado
        case 'top':
            
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
    return vars
}