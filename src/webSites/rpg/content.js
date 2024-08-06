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
    const loadRequest = await fetch("/api/private/getrpg", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "level": level,
            "getfile": 1
        })
    })
    const load = await loadRequest.text()
    const levelRequest = await fetch("/api/private/getrpg", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "level": level,
            "getfile": 2
        })
    })
    const levelText = await levelRequest.text()
    return [config, load, levelText]
    
}
async function content(){
    const data1 = await getData() //arquivos primários
    const level = data1[0]
    const master = data1[1]
    const life = data1[2]
    const data2 = await getLevel(level) //arquivos secundários, precisam dos arquivos primários
    const config = data2[0]
    const loadText = data2[1]
    const levelText = data2[2]
    const loadBlob = new Blob([loadText], { type: 'application/javascript' });
    const loadUrl = URL.createObjectURL(loadBlob);
    const levelBlob = new Blob([levelText], { type: 'application/javascript' });
    const levelUrl = URL.createObjectURL(levelBlob);
    const loadScript = await import(loadUrl)
    const levelScript = await import(levelUrl)
    class LoadLevel extends loadScript.LoadLevel{}
    class Level extends levelScript.Level{}
    const game = new Phaser.Game(config.type)
}
main()
content()