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
        this.player.setOrigin(0.5, 0.5)
        this.player.setBounce(0)
        this.player.setCollideWorldBounds(true)
        this.player.body.setGravity(0, 0)
        this.player.anims.play("playerIdle", true)
        this.player.setDepth(2)
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
        //this.bug1.setDepth(2)
        //this.bug2.setDepth(2)
        this.bug3.setDepth(1)
        // const wall = this.physics.add.staticGroup()
        // this.physics.add.collider(this.player.sprite, bug1Idle)
        // this.physics.add.collider(this.player.sprite, bug2Idle)
        // this.physics.add.collider(this.player.sprite, bug3Idle)
        // this.physics.add.collider(this.player.sprite, wall)
        document.addEventListener('executeCode', this.executeCode.bind(this))
    }
    update(){

    }
    async executeCode(){ //executor de código
        const actions = await JSON.parse(localStorage.getItem("actions"))
        function bugDistance(player, bug3){
            let distance = Phaser.Math.Distance.Between(player.x, player.y, bug3.x, bug3.y); //distância vetorial em módulo
            let distanceX = player.x - bug3.x; //distância no eixo X, valor positivo -> inimigo à esquerda; valor negativo -> inimigo à direita
            let distanceY = player.y - bug3.y; //distância no eixo Y, valor positivo -> inimigo em cima; valor negativo -> inimigo em baixo
            if(bug3 && bug3.active){
                if(distanceX > 0 && distance < 130){
                    if(Math.abs(distanceX) > Math.abs(distanceY)){
                        return 4 //inimgo à esquerda
                    }
                }
                if(distanceX < 0 && distance > -130){
                    if(Math.abs(distanceX) > Math.abs(distanceY)){
                        return 2 //inimigo à direita
                    }
                }
                if(distanceY > 0 && distance < 130){
                    if(Math.abs(distanceY) > Math.abs(distanceX)){
                        return 1 //inimigo em cima
                    }
                }
                if(distanceY < 0 && distance > -130){
                    if(Math.abs(distanceY) > Math.abs(distanceX)){
                        return 3 //inimigo em baixo
                    }
                }
            }
            return 0 //sem inimigo próximo
        }
        async function bug3Attack(bugPos, player, bug3){
            switch(bugPos){
                case 1: //inimigo em cima
                    //bug3.anims.play("bug3AttackDown", false)
                    bug3.setOrigin(0.5, 0.25)
                    bug3.setDisplaySize(128, 256)
                    await new Promise(resolve => bug3.on("animationcomplete", ()=>{
                        player.destroy()
                        bug3.setDisplaySize(128, 128)
                        bug3.setOrigin(0.5, 0.5)
                        bug3.anims.play("bug3Idle", true)
                        resolve()
                    }))
                    document.dispatchEvent(new Event("gameOver")) //jogador morreu
                    break;
                case 2: //inimigo à direita
                    //bug3.anims.play("bug3AttackSides", false)
                    bug3.setOrigin(0.75, 0.5)
                    bug3.setDisplaySize(256, 128)
                    await new Promise(resolve => bug3.on("animationcomplete", ()=>{
                        player.destroy()
                        bug3.setDisplaySize(128, 128)
                        bug3.setOrigin(0.5, 0.5)
                        bug3.anims.play("bug3Idle", true)
                        resolve()
                    }))
                    document.dispatchEvent(new Event("gameOver")) //jogador morreu
                    break;
                case 3: //inimigo em baixo
                    //bug3.anims.play("bug3AttackUp", false)
                    bug3.setOrigin(0.5, 0.75)
                    bug3.setDisplaySize(128, 256)
                    await new Promise(resolve => bug3.on("animationcomplete", ()=>{
                        player.destroy()
                        bug3.setDisplaySize(128, 128)
                        bug3.setOrigin(0.5, 0.5)
                        bug3.anims.play("bug3Idle", true)
                        resolve()
                    }))
                    document.dispatchEvent(new Event("gameOver")) //jogador morreu
                    break;
                case 4: //inimigo à esquerda
                    //bug3.anims.play("bug3AttackSides", false)
                    bug3.setOrigin(0.25, 0.5)
                    bug3.setDisplaySize(256, 128)
                    await new Promise(resolve => bug3.on("animationcomplete", ()=>{
                        player.destroy()
                        bug3.setDisplaySize(128, 128)
                        bug3.setOrigin(0.5, 0.5)
                        bug3.anims.play("playerIdle", true)
                        resolve()
                    }))
                    document.dispatchEvent(new Event("gameOver")) //jogador morreu
                    break;
            }
        }
        for(let i=0; i<actions.length; i++){ /* 1-Up; 2-Right; 3-Down; 4-Left; 5-Attack Up; 6-Attack Right; 7-Attack Down; 8-Attack Left */
            if(actions[i]===1){ //up
                let bugPos = bugDistance(this.player, this.bug3)
                if(bugPos!=0){
                    await bug3Attack(bugPos, this.player, this.bug3)
                }
                else{
                    this.player.setVelocityY(-64) //quantidade de pixels a ser movida para cima
                    this.player.anims.play("playerWalk", true)
                    await new Promise(resolve => setTimeout(()=>{
                        this.player.setVelocityY(0)
                        this.player.anims.play("playerIdle", true)
                        resolve()
                    }, 1000))
                } 
            }
            if(actions[i]===3){ //down
                let bugPos = bugDistance(this.player, this.bug3)
                if(bugPos!=0){
                    await bug3Attack(bugPos, this.player, this.bug3)
                }
                else{
                    this.player.setVelocityY(64) //quantidade de pixels a ser movida para baixo
                    this.player.anims.play("playerWalk", true)
                    await new Promise(resolve => setTimeout(()=>{
                        this.player.setVelocityY(0)
                        this.player.anims.play("playerIdle", true)
                        resolve()
                    }, 1000))
                }
            }
            if(actions[i]===2){ //right
                let bugPos = bugDistance(this.player, this.bug3)
                if(bugPos!=0){
                    await bug3Attack(bugPos, this.player, this.bug3)
                }
                else{
                    this.player.setVelocityX(64) //quantidade de pixels a ser movida para cima
                    this.player.anims.play("playerWalk", true)
                    await new Promise(resolve => setTimeout(()=>{
                        this.player.setVelocityX(0)
                        this.player.anims.play("playerIdle", true)
                        resolve()
                    }, 1000))
                }
            }
            if(actions[i]===4){ //left
                let bugPos = bugDistance(this.player, this.bug3)
                if(bugPos!=0){
                    await bug3Attack(bugPos, this.player, this.bug3)
                }
                else{
                    this.player.setVelocityX(-64) //quantidade de pixels a ser movida para cima
                    this.player.anims.play("playerWalk", true)
                    await new Promise(resolve => setTimeout(()=>{
                        this.player.setVelocityX(0)
                        this.player.anims.play("playerIdle", true)
                        resolve()
                    }, 1000))
                }
            }
            if(actions[i]===5){ //attack-up
                if(bugDistance(this.player, this.bug3)===1){
                    this.player.anims.play("playerAttackUp", false)
                    this.player.setOrigin(0.5, 0.75)
                    this.player.setDisplaySize(128, 256)
                    await new Promise(resolve => this.player.on("animationcomplete", ()=>{
                        this.bug3.destroy()
                        this.player.setDisplaySize(128, 128)
                        this.player.setOrigin(0.5, 0.5)
                        this.player.anims.play("playerIdle", true)
                        resolve()
                    }))
                }
                else{
                    console.log("Errado")
                }
            }
            if(actions[i]===7){ //attack-down
                if(bugDistance(this.player, this.bug3)===3){
                    this.player.anims.play("playerAttackDown", false)
                    this.player.setOrigin(0.5, 0.25)
                    this.player.setDisplaySize(128, 256)
                    await new Promise(resolve => this.player.on("animationcomplete", ()=>{
                        this.bug3.destroy()
                        this.player.anims.play("playerIdle", true)
                        this.player.setOrigin(0.5, 0.5)
                        this.player.setDisplaySize(128, 128)
                        resolve()
                    }))
                }
                else{
                    console.log("Errado")
                }
            }
            if(actions[i]===6){ //attack-right
                if(bugDistance(this.player, this.bug3)===2){
                    this.player.anims.play("playerAttackSides", false)
                    this.player.setOrigin(0.25, 0.5)
                    this.player.setDisplaySize(256, 128)
                    await new Promise(resolve => this.player.on("animationcomplete", ()=>{
                        this.bug3.destroy()
                        this.player.anims.play("playerIdle", true)
                        this.player.setOrigin(0.5, 0.5)
                        this.player.setDisplaySize(128, 128)
                        resolve()
                    }))
                }
                else{
                    console.log("Errado")
                }
            }
            if(actions[i]===8){ //attack-left
                if(bugDistance(this.player, this.bug3)===4){
                    this.player.anims.play("playerAttackSides", false)
                    this.player.setOrigin(0.75, 0.5)
                    this.player.setDisplaySize(256, 256)
                    await new Promise(resolve => this.player.on("animationcomplete", ()=>{
                        this.bug3.destroy()
                        this.player.anims.play("playerIdle", true)
                        this.player.setOrigin(0.5, 0.5)
                        this.player.setDisplaySize(128, 128)
                        resolve()
                    }))
                }
                else{
                    console.log("Errado")
                }
            }
        }
    }
    shutdown(){
        document.removeEventListener('executeCode', this.executeCode.bind(this))
    }
}