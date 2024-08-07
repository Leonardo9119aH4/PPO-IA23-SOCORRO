export class Level extends Phaser.Scene {
    constructor(){
        super({ key: 'Level' })
    }
    preload(){

    }
    create(){
        const backgorund = this.add.image(0, 0, "scenario")
        backgorund.setOrigin(0, 0)
        const wall = this.physics.add.staticGroup()
        this.player = new this.player(this)
        this.physics.add.collider(this.player.sprite, bug1Idle)
        this.physics.add.collider(this.player.sprite, bug2Idle)
        this.physics.add.collider(this.player.sprite, bug3Idle)
        this.physics.add.collider(this.player.sprite, wall)
        document.addEventListener('executeCode', this.executeCode.bind(this))
    }
    update(){
        
    }
    executeCode(ev){
        setTimeout(async ()=>{
            const actionsRequest = await fetch("/api/private/getExeCode")
            const actions = await actionsRequest.json()
            eval(actions)
        }, 100)
    }
    shutdown(){
        document.removeEventListener('executeCode', this.executeCode.bind(this))
    }
}