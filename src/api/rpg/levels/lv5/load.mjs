import Phaser from "/globalAssets/js/phaser.js"
export class LoadLevel extends Phaser.Scene {
    constructor(){
        super({ key: 'LoadLevel' })
    }
    preload(){
        this.load.image("scenario", "/webSites/rpg/localAssets/scenario.png")
        this.load.spritesheet("cicero", "/webSites/rpg/localAssets/sprites/cicero.png")
        this.load.music("main-music", "/webSites/rpg/localAssets/music.mp3")
        this.load.spritesheet("enemy", "/webSites/rpg/localAssets/sprites/enemy.png")
        this.load.image("wall", "/webSites/rpg/localAssets/wall.png")
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
            this.scene.start('Level5');
        });
    }
    update(){

    }
}