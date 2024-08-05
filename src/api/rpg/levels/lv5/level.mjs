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
        this.physics.add.collider(this.player.sprite, enemy)
        this.physics.add.collider(this.player.sprite, wall)
        document.addEventListener('executeCode', this.executeCode.bind(this))
    }
    update(){
        
    }
    executeCode(ev){
        
    }
    shutdown(){
        document.removeEventListener('executeCode', this.executeCode.bind(this))
    }
}