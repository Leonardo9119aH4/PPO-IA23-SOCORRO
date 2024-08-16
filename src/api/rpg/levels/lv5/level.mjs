export class Level extends Phaser.Scene {
    constructor(){
        super({ key: 'Level' })
    }
    preload(){
        // this.load.tilemapTiledJSON("background", "/webSites/rpg/localAssets/background.json")
        // this.load.image("background-tiles", "/webSites/rpg/localAssets/background-2.png")
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
        this.load.spritesheet("bug1Idle", "/webSites/rpg/localAssets/sprites/Bug1/Bug1Idle.png",{
            frameWidth: 30*26,
            frameHeight: 30*26
        })
        this.load.spritesheet("bug1AttackSides", "/webSites/rpg/localAssets/sprites/Bug1/Bug1AttackSides.png", {
            frameWidth: 60*26,
            frameHeight: 30*26
        })
        this.load.spritesheet("bug2Idle", "/webSites/rpg/localAssets/sprites/Bug2/Bug2Idle.png", {
            frameWidth: 30*26,
            frameHeight: 30*26
        })
        this.load.spritesheet("bug2AttackSides", "/webSites/rpg/localAssets/sprites/Bug2/Bug2AttackSides.png", {
            frameWidth: 60*26,
            frameHeight: 30*26
        })
        this.load.spritesheet("bug3Idle", "/webSites/rpg/localAssets/sprites/Bug3/Bug3Idle.png",{
            frameWidth: 30*53,
            frameHeight: 30*53
        })
        this.load.spritesheet("bug3AttackSides", "/webSites/rpg/localAssets/sprites/Bug3/Bug3AttackSides.png",{
            frameWidth: 60*53,
            frameHeight: 30*53
        })
        // this.load.music("main-music", "/webSites/rpg/localAssets/music.mp3")
    }
    create(){
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
        //mecânicas e mapa
        // const backgroundMap = this.make.tilemap({ key: 'background-map' })
        // const backgroundTileset = backgroundMap.addTilesetImage('background-tiles') // Criar o layer de fundo a partir do tilemap
        // const backgroundLayer = backgroundMap.createLayer('background-tiles', backgroundTileset, 0, 0) // Ajustar o layer de fundo para preencher a tela
        // backgroundLayer.setScale(2)
        // backgroundLayer.setOrigin(0, 0)
        // backgorund.setDisplaySize(534, 401)
        this.player = this.physics.add.sprite(128, 128, 'playerIdle')
        this.player.setDisplaySize(128, 128)
        this.player.setSize(128, 128)
        this.player.setBounce(0.2)
        this.player.setCollideWorldBounds(true)
        this.player.body.setGravity(0, 0)
        this.player.anims.play("playerIdle", true)
        // this.bug1 = this.physics.add.sprite(512, 512, 'bug1Idle')
        // this.bug2 = this.physics.add.sprite(320, 320, 'bug2Idle')
        this.bug3 = this.physics.add.sprite(256, 256, 'bug3Idle')
        // this.bug1.setDisplaySize(128, 128)
        // this.bug1.setSize(128, 128)
        // this.bug2.setDisplaySize(128, 128)
        // this.bug2.setSize(128, 128)
        this.bug3.setDisplaySize(128, 128)
        this.bug3.setSize(128, 128)
        // this.bug1.body.setGravity(0, 0)
        // this.bug2.body.setGravity(0, 0)
        this.bug3.body.setGravity(0, 0)
        // this.bug1.anims.play("bug1Idle", true)
        // this.bug2.anims.play("bug2Idle", true)
        this.bug3.anims.play("bug3Idle", true)
        // const wall = this.physics.add.staticGroup()
        // this.physics.add.collider(this.player.sprite, bug1Idle)
        // this.physics.add.collider(this.player.sprite, bug2Idle)
        // this.physics.add.collider(this.player.sprite, bug3Idle)
        // this.physics.add.collider(this.player.sprite, wall)
        document.addEventListener('executeCode', this.executeCode.bind(this))
        /* debug */
        this.cursors = this.input.keyboard.createCursorKeys();
        this.SPACEKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        this.wKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
        /* endDebug */
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
            console.log("X: ", this.player.x)
            console.log("Y: ", this.player.y)
        }
        //endDebug
    }
    async executeCode(){
        const actions = await JSON.parse(localStorage.getItem("actions"))
        //executor de código
        function bugDistance(player, bug3){
            let distance = Phaser.Math.Distance.Between(player.x, player.y, bug3.x, bug3.y);
            let distanceX = player.x - bug3.x;
            let distanceY = player.y - bug3.y;
            console.log(distance)
            if(player.x - bug3.x > 0){
                console.log("inimigo a esquerda")
                if(distance < 130){
                    console.log("ataque!")
                }
            }
            if(player.x - bug3.x < 0){
                console.log("inimigo a direita")
                if(distance < 130){
                    console.log("ataque!")
                }
            }
            if(player.y - bug3.y > 0){
                console.log("inimigo em cima")
                if(distance < 130){
                    console.log("ataque!")
                }
            }
            if(player.y - bug3.y < 0){
                console.log("inimigo em baixo")
                if(distance < 130){
                    console.log("ataque!")
                }
            }
        }
        for(let i=0; i<actions.length; i++){
            if(actions[i]==="up"){
                this.player.setVelocityY(-64) //quantidade de pixels a ser movida para cima
                this.player.anims.play("playerWalk", true)
                await new Promise(resolve => setTimeout(()=>{
                    this.player.setVelocityY(0)
                    this.player.anims.play("playerIdle", true)
                    resolve()
                }, 1000))
                bugDistance(this.player, this.bug3)
            }
            if(actions[i]==="down"){
                this.player.setVelocityY(64) //quantidade de pixels a ser movida para baixo
                this.player.anims.play("playerWalk", true)
                await new Promise(resolve => setTimeout(()=>{
                    this.player.setVelocityY(0)
                    this.player.anims.play("playerIdle", true)
                    resolve()
                }, 1000))
                bugDistance(this.player, this.bug3)
            }
            if(actions[i]==="right"){
                this.player.setVelocityX(64) //quantidade de pixels a ser movida para cima
                this.player.anims.play("playerWalk", true)
                await new Promise(resolve => setTimeout(()=>{
                    this.player.setVelocityX(0)
                    this.player.anims.play("playerIdle", true)
                    resolve()
                }, 1000))
                bugDistance(this.player, this.bug3)
            }
            if(actions[i]==="left"){
                this.player.setVelocityX(-64) //quantidade de pixels a ser movida para cima
                this.player.anims.play("playerWalk", true)
                await new Promise(resolve => setTimeout(()=>{
                    this.player.setVelocityX(0)
                    this.player.anims.play("playerIdle", true)
                    resolve()
                }, 1000))
                bugDistance(this.player, this.bug3)
            }
            if(actions[i]==="attack-up"){
                let distance = Phaser.Math.Distance.Between(this.player.x, this.player.y, this.bug3.x, this.bug3.y)
                console.log(distance)
            }
            if(actions[i]==="attack-down"){
                
            }
            if(actions[i]==="attack-right"){
                
            }
            if(actions[i]==="attack-left"){
                
            }
        }
    }
    shutdown(){
        document.removeEventListener('executeCode', this.executeCode.bind(this))
    }
}