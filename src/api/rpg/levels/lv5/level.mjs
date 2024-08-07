export class Level extends Phaser.Scene {
    constructor(){
        super({ key: 'Level' })
    }
    preload(){
        this.load.image("background-tiles", "/webSites/rpg/localAssets/background.png")
        this.load.tilemapTiledJSON("background-map", "/webSites/rpg/localAssets/background.json")
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
        const backgroundMap = this.make.tilemap({ key: 'background-map' }) // Adicionar o tileset ao tilemap
        const backgroundTileset = backgroundMap.addTilesetImage('backgorund-tiles') // Criar o layer de fundo a partir do tilemap
        const backgroundLayer = backgroundMap.createLayer('background', backgroundTileset, 0, 0) // Ajustar o layer de fundo para preencher a tela
        backgroundLayer.setScale(2)
        // backgorund.setOrigin(0, 0)
        // backgorund.setDisplaySize(534, 401)
        this.player = this.physics.add.sprite(100, 100, 'player')
        this.player.setBounce(0.2)
        this.player.setCollideWorldBounds(true)
        this.player.body.setGravity(0, 0)
        this.player.health = 100 //vida do jogador
        this.player.defense = 10 //defesa do jogador
        this.player.attack = 10 //ataque do jogador
        // this.physics.add.collider(this.player.sprite, bug1Idle)
        // this.physics.add.collider(this.player.sprite, bug2Idle)
        // this.physics.add.collider(this.player.sprite, bug3Idle)
        document.addEventListener('executeCode', this.executeCode.bind(this))
        //animações abaixo - Cícero
        this.anims.create({
            key: 'playerIdle', // Nome da animação
            frames: this.anims.generateFrameNumbers('playerIdle', { start: 0, end: 8 }), // Frames da animação
            frameRate: 8, // Taxa de quadros por segundo
            repeat: -1 // Repetir a animação indefinidamente
        })
        this.anims.create({
            key: 'playerWalk', // Nome da animação
            frames: this.anims.generateFrameNumbers('playerIdle', { start: 0, end: 8 }), // Frames da animação
            frameRate: 8, // Taxa de quadros por segundo
            repeat: -1 // Repetir a animação indefinidamente
        })
        this.anims.create({
            key: 'playerAttackUp', // Nome da animação
            frames: this.anims.generateFrameNumbers('playerIdle', { start: 0, end: 8 }), // Frames da animação
            frameRate: 8, // Taxa de quadros por segundo
        })
        this.anims.create({
            key: 'playerAttackDown', // Nome da animação
            frames: this.anims.generateFrameNumbers('playerIdle', { start: 0, end: 8 }), // Frames da animação
            frameRate: 8, // Taxa de quadros por segundo
        })
        this.anims.create({
            key: 'playerAttackSides', // Nome da animação
            frames: this.anims.generateFrameNumbers('playerIdle', { start: 0, end: 8 }), // Frames da animação
            frameRate: 8, // Taxa de quadros por segundo
        })
        // Bug1
        this.anims.create({
            key: 'bug1Idle', 
            frames: this.anims.generateFrameNumbers('playerIdle', { start: 0, end: 8 }), // Frames da animação
            frameRate: 8, 
            repeat: -1 
        })
        this.anims.create({
            key: 'bug1Walk', 
            frames: this.anims.generateFrameNumbers('playerIdle', { start: 0, end: 8 }), // Frames da animação
            frameRate: 8, 
            repeat: -1 
        })
        // this.anims.create({
        //     key: 'bug1AttackUp',
        //     frames: this.anims.generateFrameNumbers('playerIdle', { start: 0, end: 8 }), // Frames da animação
        //     frameRate: 8, 
        // })
        // this.anims.create({
        //     key: 'bug1AttackDown', 
        //     frames: this.anims.generateFrameNumbers('playerIdle', { start: 0, end: 8 }), // Frames da animação
        //     frameRate: 8, 
        // })
        this.anims.create({
            key: 'bug1AttackSides', 
            frames: this.anims.generateFrameNumbers('playerIdle', { start: 0, end: 8 }), // Frames da animação
            frameRate: 8, 
        })
        // Bug2
        this.anims.create({
            key: 'bug2Idle', 
            frames: this.anims.generateFrameNumbers('playerIdle', { start: 0, end: 8 }), // Frames da animação
            frameRate: 8, 
            repeat: -1 
        })
        this.anims.create({
            key: 'bug2Walk', 
            frames: this.anims.generateFrameNumbers('playerIdle', { start: 0, end: 8 }), // Frames da animação
            frameRate: 8, 
            repeat: -1 
        })
        // this.anims.create({
        //     key: 'bug2AttackUp',
        //     frames: this.anims.generateFrameNumbers('playerIdle', { start: 0, end: 8 }), // Frames da animação
        //     frameRate: 8, 
        // })
        // this.anims.create({
        //     key: 'bug2AttackDown', 
        //     frames: this.anims.generateFrameNumbers('playerIdle', { start: 0, end: 8 }), // Frames da animação
        //     frameRate: 8, 
        // })
        this.anims.create({
            key: 'bug2AttackSides', 
            frames: this.anims.generateFrameNumbers('playerIdle', { start: 0, end: 8 }), // Frames da animação
            frameRate: 8, 
        })
        // Bug3
        this.anims.create({
            key: 'bug3Idle', 
            frames: this.anims.generateFrameNumbers('playerIdle', { start: 0, end: 8 }), // Frames da animação
            frameRate: 8, 
            repeat: -1 
        })
        this.anims.create({
            key: 'bug3Walk', 
            frames: this.anims.generateFrameNumbers('playerIdle', { start: 0, end: 8 }), // Frames da animação
            frameRate: 8, 
            repeat: -1 
        })
        // this.anims.create({
        //     key: 'bug3AttackUp',
        //     frames: this.anims.generateFrameNumbers('playerIdle', { start: 0, end: 8 }), // Frames da animação
        //     frameRate: 8, 
        // })
        // this.anims.create({
        //     key: 'bug3AttackDown', 
        //     frames: this.anims.generateFrameNumbers('playerIdle', { start: 0, end: 8 }), // Frames da animação
        //     frameRate: 8, 
        // })
        this.anims.create({
            key: 'bug3AttackSides', 
            frames: this.anims.generateFrameNumbers('playerIdle', { start: 0, end: 8 }), // Frames da animação
            frameRate: 8, 
        })
        this.player.anims.play("playerIdle", true)
    }
    update(){
        
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