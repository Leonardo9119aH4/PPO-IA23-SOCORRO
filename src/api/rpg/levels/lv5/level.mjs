import Phaser from "/globalAssets/js/phaser.js"
export class Level5 extends Phaser.Scene {
    constructor(){
        super({ key: 'Level5' })
    }
    preload(){

    }
    create(){
        const backgorund = this.add.image(0, 0, "scenario")
        backgorund.setOrigin(0, 0)
        this.player = new this.player(this)
    }
    update(){

    }
}