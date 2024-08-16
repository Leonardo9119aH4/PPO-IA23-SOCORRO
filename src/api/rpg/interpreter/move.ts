export function movecalc(command: string, tiles: number) {
    switch (command) { //verfica a variavel do comando para determinar o lado
        case `MoverCima(${tiles})`:
            return ["up", `${tiles}`]
        case `MoverBaixo(${tiles})`:  
            return ["down", `${tiles}`]
        case `MoverDireita(${tiles})`:
            return ["right", `${tiles}`]
        case `MoverEsquerda(${tiles})`:
            return ["left", `${tiles}`]
    }
    return ["to aqui só pro typescript não encher o saco"]
}

export function attackCalc(command: string){
    switch(command) {
        case 'AtacarCima()':
            return ["attack-up"]
        case 'AtacarBaixo()':
            return ["attack-down"]
        case 'AtacarDireita()':
            return ["attack-right"]
        case 'AtacarEsquerda()':
            return ["attack-left"]
    }
    return ["to aqui só pro typescript não encher o saco"]
}