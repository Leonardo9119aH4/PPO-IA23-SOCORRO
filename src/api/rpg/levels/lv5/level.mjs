export class Level extends Phaser.Scene {
    constructor(){
        super({ key: 'Level' })
    }
    preload(){

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
    }
    update(){
        
    }
    async executeCode(){
        const actionsRequest = await fetch("/api/private/getExeCode")
        const actions = await actionsRequest.json()
        //executor de código
        for(let i=0; i<actions.length; i++){
            if(actions[i]==="up"){

            }
            if(actions[i]==="down"){
                
            }
            if(actions[i]==="right"){
                
            }
            if(actions[i]==="left"){
                
            }
            if(actions[i]==="attack"){
                
            }
        }
    }
    shutdown(){
        document.removeEventListener('executeCode', this.executeCode.bind(this))
    }
}