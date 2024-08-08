export class LoadLevel extends Phaser.Scene {
    constructor(){
        super({ key: 'LoadLevel' })
    }
    preload(){
        this.load.image("background-tiles", "/webSites/rpg/localAssets/background.png")
        this.load.tilemapTiledJSON("background-map", "/webSites/rpg/localAssets/scenario.json")
        this.load.spritesheet("ciceroIdle", "/webSites/rpg/localAssets/sprites/Cicero/CiceroIdle.png",{
            frameWidth: 30*26,
            frameHeight: 30*26
        })
        this.load.spritesheet("ciceroWalk", "/webSites/rpg/localAssets/sprites/Cicero/CiceroWalk.png",{
            frameWidth: 30*26,
            frameHeight: 30*26
        })
        this.load.spritesheet("ciceroAttackDown", "/webSites/rpg/localAssets/sprites/Cicero/CiceroAttackDown.png",{
            frameWidth: 30*26,
            frameHeight: 60*26
        })
        this.load.spritesheet("ciceroAttackUp", "/webSites/rpg/localAssets/sprites/Cicero/CiceroAttackUp.png",{
            frameWidth: 30*26,
            frameHeight: 60*26
        })
        this.load.spritesheet("ciceroAttackSides", "/webSites/rpg/localAssets/sprites/Cicero/CiceroAttackSides.png",{
            frameWidth: 60*26,
            frameHeight: 30*26
        })
        this.load.spritesheet("bug1Idle", "/webSites/rpg/localAssets/sprites/Bug 1/Bug1Idle.png",{
            frameWidth: 30*26,
            frameHeight: 30*26
        })
        this.load.spritesheet("bug1AttackSides", "/webSites/rpg/localAssets/sprites/Bug 1/Bug1AttackSides.png", {
            frameWidth: 60*26,
            frameHeight: 30*26
        })
        this.load.spritesheet("bug2Idle", "/webSites/rpg/localAssets/sprites/Bug 2/Bug2Idle.png", {
            frameWidth: 30*26,
            frameHeight: 30*26
        })
        this.load.spritesheet("bug2AttackSides", "/webSites/rpg/localAssets/sprites/Bug 2/Bug2AttackSides.png", {
            frameWidth: 60*26,
            frameHeight: 30*26
        })
        this.load.spritesheet("bug3Idle", "/webSites/rpg/localAssets/sprites/Bug 3/Bug3Idle.png",{
            frameWidth: 30*26,
            frameHeight: 30*26
        })
        this.load.spritesheet("bug3AttackSides", "/webSites/rpg/localAssets/sprites/Bug 3/Bug3AttackSides.png",{
            frameWidth: 60*26,
            frameHeight: 30*26
        })
        // this.load.music("main-music", "/webSites/rpg/localAssets/music.mp3")
    }
    create(){
        const gameWidth = this.sys.canvas.width;
        const progressbar = this.add.graphics();
        const barWidth = 0.8 * gameWidth;
        this.load.on('progress', (value) => {
            progressbar.clear();
            progressbar.fillStyle(0xffffff, 1);
            progressbar.fillRect((gameWidth - barWidth) / 2, this.sys.game.config.height / 2, barWidth * value, 20);
            progressbar.lineStyle(4, 0xffff00, 1);
            progressbar.strokeRect((gameWidth - barWidth) / 2, this.sys.game.config.height / 2, barWidth, 20);
        });
        this.load.on('complete', () => {
            this.scene.start('Level');
        });
        jogador.
    }
    update(){

    }
}