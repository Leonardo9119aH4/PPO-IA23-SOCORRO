export class Level extends Phaser.Scene {
    constructor(){
        super({ key: 'Level' })
    }
    preload(){
        this.load.image("background-tiles", "/webSites/rpg/localAssets/background.png")
        this.load.tilemapTiledJSON("background-map", "/webSites/rpg/localAssets/background.json")
        this.load.spritesheet("playerIdle", "/webSites/rpg/localAssets/sprites/Cicero/CiceroIdle.png",{
            frameWidth: 30*53,
            frameHeight: 30*53
        })
        this.load.spritesheet("playerWalk", "/webSites/rpg/localAssets/sprites/Cicero/CiceroWalk.png",{
            frameWidth: 30*53,
            frameHeight: 30*53
        })
        this.load.spritesheet("playerAttackDown", "/webSites/rpg/localAssets/sprites/Cicero/CiceroAttackDown.png",{
            frameWidth: 30*26,
            frameHeight: 60*26
        })
        this.load.spritesheet("playerAttackUp", "/webSites/rpg/localAssets/sprites/Cicero/CiceroAttackUp.png",{
            frameWidth: 30*26,
            frameHeight: 60*26
        })
        this.load.spritesheet("playerAttackSides", "/webSites/rpg/localAssets/sprites/Cicero/CiceroAttackSides.png",{
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
        console.log("create")

        // Criar o tilemap
        //const backgroundMap = this.make.tilemap({ key: "background-map" });
        // Adicionar o tileset ao tilemap
        //const backgroundTileset = backgroundMap.addTilesetImage("background-tiles", "background-tiles");
        // Criar a camada de fundo a partir do tilemap

        //const backgroundLayer = backgroundMap.createLayer("tiles", backgroundTileset, 0, 0);
        console.log(backgroundMap, backgroundTileset, backgroundLayer)
        backgroundLayer.setScale(2)
        backgroundLayer.setOrigin(0, 0)
        // backgorund.setDisplaySize(534, 401)
        this.player = this.physics.add.sprite(100, 100, 'player')
        this.player.setBounce(0.2)
        this.player.setCollideWorldBounds(true)
        this.player.body.setGravity(0, 0)
        // this.physics.add.collider(this.player.sprite, bug1Idle)
        // this.physics.add.collider(this.player.sprite, bug2Idle)
        // this.physics.add.collider(this.player.sprite, bug3Idle)
        document.addEventListener('executeCode', this.executeCode.bind(this))
        //animações abaixo - Cícero
        this.anims.create({
            key: 'playerIdle', // Nome da animação
            frames: this.anims.generateFrameNumbers('playerIdle', { start: 0, end: 19 }), // Frames da animação
            frameRate: 8, // Taxa de quadros por segundo
            repeat: -1 // Repetir a animação indefinidamente
        })
        this.anims.create({
            key: 'playerWalk', // Nome da animação
            frames: this.anims.generateFrameNumbers('playerWalk', { start: 0, end: 7 }), // Frames da animação
            frameRate: 8, // Taxa de quadros por segundo
            repeat: -1 // Repetir a animação indefinidamente
        })
        this.anims.create({
            key: 'playerAttackUp', // Nome da animação
            frames: this.anims.generateFrameNumbers('playerAttackUp', { start: 0, end: 30 }), // Frames da animação
            frameRate: 8, // Taxa de quadros por segundo
        })
        this.anims.create({
            key: 'playerAttackDown', // Nome da animação
            frames: this.anims.generateFrameNumbers('playerAttackDown', { start: 0, end: 20 }), // Frames da animação
            frameRate: 8, // Taxa de quadros por segundo
        })
        this.anims.create({
            key: 'playerAttackSides', // Nome da animação
            frames: this.anims.generateFrameNumbers('playerAttackSides', { start: 0, end: 23 }), // Frames da animação
            frameRate: 8, // Taxa de quadros por segundo
        })
        // Bug1
        this.anims.create({
            key: 'bug1Idle', 
            frames: this.anims.generateFrameNumbers('bug1Idle', { start: 0, end: 8 }), // Frames da animação
            frameRate: 8, 
            repeat: -1 
        })
        // this.anims.create({
        //     key: 'bug1AttackUp',
        //     frames: this.anims.generateFrameNumbers('bug1AttackUp', { start: 0, end: 8 }), // Frames da animação
        //     frameRate: 8, 
        // })
        // this.anims.create({
        //     key: 'bug1AttackDown', 
        //     frames: this.anims.generateFrameNumbers('bug2AttackDown', { start: 0, end: 8 }), // Frames da animação
        //     frameRate: 8, 
        // })
        this.anims.create({
            key: 'bug1AttackSides', 
            frames: this.anims.generateFrameNumbers('bug1AttackSides', { start: 0, end: 8 }), // Frames da animação
            frameRate: 8, 
        })
        // Bug2
        this.anims.create({
            key: 'bug2Idle', 
            frames: this.anims.generateFrameNumbers('bug2Idle', { start: 0, end: 8 }), // Frames da animação
            frameRate: 8, 
            repeat: -1 
        })
        // this.anims.create({
        //     key: 'bug2AttackUp',
        //     frames: this.anims.generateFrameNumbers('bug2AttackUp', { start: 0, end: 8 }), // Frames da animação
        //     frameRate: 8, 
        // })
        // this.anims.create({
        //     key: 'bug2AttackDown', 
        //     frames: this.anims.generateFrameNumbers('bug2AttackDown', { start: 0, end: 8 }), // Frames da animação
        //     frameRate: 8, 
        // })
        this.anims.create({
            key: 'bug2AttackSides', 
            frames: this.anims.generateFrameNumbers('bug2AttackSides', { start: 0, end: 8 }), // Frames da animação
            frameRate: 8, 
        })
        // Bug3
        this.anims.create({
            key: 'bug3Idle', 
            frames: this.anims.generateFrameNumbers('bug3Idle', { start: 0, end: 8 }), // Frames da animação
            frameRate: 8, 
            repeat: -1 
        })
        // this.anims.create({
        //     key: 'bug3AttackUp',
        //     frames: this.anims.generateFrameNumbers('bug3AttackUp', { start: 0, end: 8 }), // Frames da animação
        //     frameRate: 8, 
        // })
        // this.anims.create({
        //     key: 'bug3AttackDown', 
        //     frames: this.anims.generateFrameNumbers('bug3AttackDown', { start: 0, end: 8 }), // Frames da animação
        //     frameRate: 8, 
        // })
        this.anims.create({
            key: 'bug3AttackSides', 
            frames: this.anims.generateFrameNumbers('bug3AttackSides', { start: 0, end: 8 }), // Frames da animação
            frameRate: 8, 
        })
        this.player.anims.play("playerIdle", true)
        // const backgorund = this.add.image(0, 0, "backgorund-tiles")
        // backgorund.setOrigin(0, 0)
        const wall = this.physics.add.staticGroup()
        // this.physics.add.collider(this.player.sprite, enemy)
        //this.physics.add.collider(this.player.sprite, wall)
        document.addEventListener('executeCode', this.executeCode.bind(this))
        //debug
        this.cursors = this.input.keyboard.createCursorKeys();
        this.SPACEKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        this.wKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
    }
    update(){
        //debug
        if (this.cursors.left.isDown) {
            this.player.anims.play("playerAttackSides", true)
        }
        if (this.cursors.right.isDown) {
            this.player.anims.play("playerAttackSides", true)
        }
        if (this.cursors.up.isDown) {
            this.player.anims.play("playerAttackUp", true)
        }
        if (this.cursors.down.isDown) {
            this.player.anims.play("playerAttackDown", true)
        }
        if(this.wKey.isDown){
            this.player.anims.play("playerWalk", true)
        }
        if(this.SPACEKey.isDown){
            this.player.anims.play("playerIdle", true)
        }
    }
    async executeCode(){
        const actionsRequest = await fetch("/api/private/getExeCode")
        const actions = await actionsRequest.json()
        //executor de código
        for(let i=0; i<actions.length; i++){
            if(actions[i]==="up"){
                this.player.setVelocityY() //quantidade de pixels a ser movida para cima
                this.player.anims.play("playerWalk", true)
                setTimeout(()=>{
                    this.player.setVelocityY(0)
                    this.player.anims.stop()
                }, 1000)
            }
            if(actions[i]==="down"){
                this.player.setVelocityY() //quantidade de pixels a ser movida para cima
                this.player.anims.play("playerWalk", true)
                setTimeout(()=>{
                    this.player.setVelocityY(0)
                    this.player.anims.stop()
                }, 1000)
            }
            if(actions[i]==="right"){
                this.player.setVelocityX() //quantidade de pixels a ser movida para cima
                this.player.anims.play("playerWalk", true)
                setTimeout(()=>{
                    this.player.setVelocityX(0)
                    this.player.anims.stop()
                }, 1000)
            }
            if(actions[i]==="left"){
                this.player.setVelocityX() //quantidade de pixels a ser movida para cima
                this.player.anims.play("playerWalk", true)
                setTimeout(()=>{
                    this.player.setVelocityX(0)
                    this.player.anims.stop()
                }, 1000)
            }
            if(actions[i]==="attack"){
                
            }
        }
    }
    shutdown(){
        document.removeEventListener('executeCode', this.executeCode.bind(this))
    }
}