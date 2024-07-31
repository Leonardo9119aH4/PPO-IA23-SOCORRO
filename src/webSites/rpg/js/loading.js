import Phaser from "/globalAssets/js/phaser.js"
export class LoadScene extends Phaser.Scene {
    constructor() {
        var walls
        var player
    }
    preload ()
    {
        this.load.image('greenSquare', '/pages/main/localAssets/sprites/green_square.png')
        this.load.image('wall', '/pages/main/localAssets/sprites/wall.png')
    }
    
    walls
    player
    lastKey = function(){}
    
    create ()
    {
        walls = this.physics.add.staticGroup()
        walls.create(500, 25, 'wall').setDisplaySize(1000, 50).refreshBody()
        walls.create(500, 775, 'wall').setDisplaySize(1000, 50).refreshBody()
        walls.create(25, 400, 'wall').setDisplaySize(50, 800).refreshBody()
        walls.create(975, 400, 'wall').setDisplaySize(50, 800).refreshBody()
        player = this.physics.add.sprite(500, 400, 'greenSquare').setDisplaySize(50, 50)
        this.physics.add.collider(player, walls)
    }
    
    update ()
    {
        
    }
}