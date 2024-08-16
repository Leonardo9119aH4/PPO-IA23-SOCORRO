//a importação do phaser acontece no html
import {main, fatalError} from "/globalAssets/js/main.js"
async function getData(){
    const params = new URLSearchParams(window.location.search)
    const level = parseInt(params.get("level"))
    if(level == null || level == undefined){
        window.location.href = "/webSites/levels/index.html"
    }
    const masterRqst = await fetch("/globalAssets/json/master.json") //requisição do json mestre
    const master = await masterRqst.json()
    if(master[level].type != "rpg"){
        window.location.href = "/webSites/levels/index.html"
    }
    const lifeRqst = await fetch("/api/private/lifes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({"action": "get"})
    })
    if(lifeRqst.status === 401){
        window.location.href = "/webSites/main/index.html"
    }
    if(lifeRqst.status === 500){
        fatalError(500)
        return
    }
    const life = await lifeRqst.json()
    if(life<=0){
        window.location.href="/webSites/levels/index.html"
    }
    return [level, master, life]
}
async function getLevel(level){
    const configRequest = await fetch("/api/private/getrpg", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "level": level,
            "getfile": 0
        })
    })
    const config = await configRequest.json()
    const levelRequest = await fetch("/api/private/getrpg", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "level": level,
            "getfile": 1
        })
    })
    const levelText = await levelRequest.text()
    return [config, levelText]
    
}
async function content(){
    const data1 = await getData() //arquivos primários
    const level = data1[0]
    const master = data1[1]
    const life = data1[2]
    const data2 = await getLevel(level) //arquivos secundários, precisam dos arquivos primários
    // let config = data2[0]
    const levelText = data2[1]
    const levelBlob = new Blob([levelText], { type: 'application/javascript' });
    const levelUrl = URL.createObjectURL(levelBlob);
    const levelScript = await import(levelUrl)
    class Level extends levelScript.Level{}
    const config = { //gambiarra pq o js é burro e não consegue obter isso com json
        width: 1100,
        height: 700,
        parent: 'game',
        "physics": {
            default: "arcade",
            arcade: {
                gravity: 0,
                debug: false
            }
        },
        scene: [Level], 
        type: Phaser.CANVAS //WebGL só aceita dimensões com potência de base 2 
    };
    const game = new Phaser.Game(config)
}
main()
content()