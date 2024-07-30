import Phaser from "/globalAssets/js/phaser.js" //aqui
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
async function content(){
    const data = await getData()
    const level = data[0]
    const master = data[1]
    const life = data[2]
    let config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        scene: {
            preload: preload,
            create: create,
            update: update
        }
    } //o json não aceita sem aspas
    let game = new Phaser.Game(config)
    function preload(){
        this.load.spritesheet("player", "/webSites/rpg/localAssets/sprites/pixil-frame-0.png", {
            frameWidth: 646,
            frameHeight: 776 //temporário, precisa refazer os assets
        })
    }
    function create(){
        this.player = this.add.sprite(300, 400, "player")
        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 5 }),
            frameRate: 10,
            repeat: -1
        })
    }
    function update(){

    }
}
main()
content()