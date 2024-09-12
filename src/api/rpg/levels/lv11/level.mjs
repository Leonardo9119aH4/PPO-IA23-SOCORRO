export class Level extends Phaser.Scene {
    constructor(){
        super({ key: 'Level' })
    }
    preload(){
        this.load.tilemapTiledJSON("map", "/webSites/rpg/localAssets/background.json")
        this.load.image("tiles", "/webSites/rpg/localAssets/MapPathOgSize.png")
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
        this.load.spritesheet("playerDeath", "/webSites/rpg/localAssets/sprites/Cicero/CiceroDeath.png",{
            frameWidth: 60*26,
            frameHeight: 30*26
        })
        this.load.spritesheet("bug1Idle", "/webSites/rpg/localAssets/sprites/Bug1/Bug1Idle.png",{
            frameWidth: 30*53,
            frameHeight: 30*53
        })
        this.load.spritesheet("bug1AttackSides", "/webSites/rpg/localAssets/sprites/Bug1/Bug1AttackSides.png",{
            frameWidth: 60*26,
            frameHeight: 30*26
        })
        this.load.spritesheet("bug1AttackUp", "/webSites/rpg/localAssets/sprites/Bug1/Bug1AttackUp.png",{
            frameWidth: 60*26,
            frameHeight: 30*26
        })
        this.load.spritesheet("bug1AttackDown", "/webSites/rpg/localAssets/sprites/Bug1/Bug1AttackDown.png",{
            frameWidth: 60*26,
            frameHeight: 30*26
        })
        this.load.spritesheet("bug1Death", "/webSites/rpg/localAssets/sprites/Bug1/Bug1Death.png",{
            frameWidth: 60*26,
            frameHeight: 30*26
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
            frames: this.anims.generateFrameNumbers('bug1Idle', { start: 0, end: 31 }), // Frames da animação
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
        //     frames: this.anims.generateFrameNumbers('bug1AttackDown', { start: 0, end: 8 }), // Frames da animação
        //     frameRate: 8, 
        // })
        this.anims.create({
            key: 'bug1AttackSides', 
            frames: this.anims.generateFrameNumbers('bug1AttackSides', { start: 0, end: 8 }), // Frames da animação
            frameRate: 8, 
        })
        this.physics.world.setBounds(0, 0, 30 * 7 * 4, 30 * 7 * 4);
        this.player = this.physics.add.sprite(120, 120, 'playerIdle')
        this.player.setCollideWorldBounds(true)
        this.player.setDisplaySize(120, 120).refreshBody()
        this.player.setOrigin(0.5, 0.5)
        this.player.setBounce(0)
        this.player.body.setGravity(0, 0)
        this.player.setOrigin(0, 0) //faz o jogador ficar certo no mapa
        this.player.anims.play("playerIdle", true)
        this.player.setDepth(2)
        //
        this.bug1 = this.physics.add.sprite(240, 240, 'bug1Idle')
        this.bug1.setDisplaySize(120, 120)
        this.bug1.setSize(120, 120)
        this.bug1.body.setGravity(0, 0)
        this.bug1.setOrigin(0, 0) //faz o bug1 ficar certo no mapa
        this.bug1.anims.play("bug1Idle", true)
        this.bug1.setDepth(1)
        document.addEventListener('executeCode', this.executeCode.bind(this))
        //mecânicas e mapa
        const backgroundMap = this.make.tilemap({key: "map"})
        const backgroundTileset = backgroundMap.addTilesetImage("MapPathOgSize", "tiles") // Criar o layer de fundo a partir do tilemap
        const backgroundLayer = backgroundMap.createLayer("Ground", backgroundTileset, 0, 0) // Ajustar o layer de fundo para preencher a tela
        const wallsLayer = backgroundMap.createLayer("Walls", backgroundTileset, 0, 0)
        console.log("paredes", wallsLayer)
        console.log(backgroundMap, backgroundTileset, backgroundLayer)
        wallsLayer.setScale(4)
        backgroundLayer.setScale(4)
        wallsLayer.setCollisionByExclusion([-1])
        this.physics.add.collider(this.player, wallsLayer);
        backgroundLayer.setOrigin(0, 0)
    }
    update(){
        if(this.player.x === 600 && this.player.y === 120){ //verifica se o jogador chegou no final
            if(!this.bug1.active){ //verifica se o jogador matou o bug
                document.dispatchEvent(new Event("win"))
            }
        }
    }
    async executeCode(){ //executor de código
        const actions = await JSON.parse(localStorage.getItem("actions"))
        function bugDistance(player, bug1){
            let distance = Phaser.Math.Distance.Between(player.x, player.y, bug1.x, bug1.y); //distância vetorial em módulo
            let distanceX = player.x - bug1.x; //distância no eixo X, valor positivo -> inimigo à esquerda; valor negativo -> inimigo à direita
            let distanceY = player.y - bug1.y; //distância no eixo Y, valor positivo -> inimigo em cima; valor negativo -> inimigo em baixo
            if(bug1 && bug1.active){
                if(distanceX > 0 && distance < 121){
                    if(Math.abs(distanceX) > Math.abs(distanceY)){
                        return 4 //inimgo à esquerda
                    }
                }
                if(distanceX < 0 && distance < 121){
                    if(Math.abs(distanceX) > Math.abs(distanceY)){
                        return 2 //inimigo à direita
                    }
                }
                if(distanceY > 0 && distance < 121){
                    if(Math.abs(distanceY) > Math.abs(distanceX)){
                        return 1 //inimigo em cima
                    }
                }
                if(distanceY < 0 && distance < 121){
                    if(Math.abs(distanceY) > Math.abs(distanceX)){
                        return 3 //inimigo em baixo
                    }
                }
            }
            return 0 //sem inimigo próximo
        }
        async function bug1Attack(bugPos, player, bug1){
            switch(bugPos){
                case 1: //inimigo em cima
                    //bug1.anims.play("bug1AttackDown", false)
                    bug1.setOrigin(0.5, 0.25)
                    bug1.setDisplaySize(128, 256)
                    await new Promise(resolve => bug1.on("animationcomplete", ()=>{
                        player.destroy()
                        bug1.setDisplaySize(128, 128)
                        bug1.setOrigin(0.5, 0.5)
                        bug1.anims.play("bug1Idle", true)
                        resolve()
                    }))
                    document.dispatchEvent(new Event("gameOver")) //jogador morreu
                    break;
                case 2: //inimigo à direita
                    bug1.anims.play("bug1AttackSides", false)
                    bug1.setDisplaySize(256, 128)
                    bug1.setOrigin(0.5, 0)
                    await new Promise(resolve => bug1.on("animationcomplete", ()=>{
                        player.destroy()
                        bug1.anims.play("bug1Idle", true)
                        bug1.setDisplaySize(128, 128)
                        bug1.setOrigin(0, 0)
                        resolve()
                    }))
                    document.dispatchEvent(new Event("gameOver")) //jogador morreu
                    break;
                case 3: //inimigo em baixo
                    //bug1.anims.play("bug1AttackUp", false)
                    bug1.setOrigin(0.5, 0.75)
                    bug1.setDisplaySize(128, 256)
                    await new Promise(resolve => bug1.on("animationcomplete", ()=>{
                        player.destroy()
                        bug1.setDisplaySize(128, 128)
                        bug1.setOrigin(0.5, 0.5)
                        bug1.anims.play("bug1Idle", true)
                        resolve()
                    }))
                    document.dispatchEvent(new Event("gameOver")) //jogador morreu
                    break;
                case 4: //inimigo à esquerda
                    bug1.anims.play("bug1AttackSides", false)
                    bug1.setDisplaySize(256, 128)
                    bug1.flipX = true
                    await new Promise(resolve => bug1.on("animationcomplete", ()=>{
                        player.destroy()
                        bug1.anims.play("bug1Idle", true)
                        bug1.setDisplaySize(128, 128)
                        bug1.flipX = false
                        resolve()
                    }))
                    document.dispatchEvent(new Event("gameOver")) //jogador morreu
                    break;
            }
        }
        for(let i=0; i<actions.length; i++){ /* 1-Up; 2-Right; 3-Down; 4-Left; 5-Attack Up; 6-Attack Right; 7-Attack Down; 8-Attack Left */
            console.log("X: ",this.player.x, "Y: ", this.player.y)
            if(actions[i]===1){ //up
                let bugPos = bugDistance(this.player, this.bug1)
                if(bugPos!=0){
                    await bug1Attack(bugPos, this.player, this.bug1)
                }
                else{
                    this.player.setVelocityY(-120) //quantidade de pixels a ser movida para cima
                    this.player.anims.play("playerWalk", true)
                    await new Promise(resolve => setTimeout(()=>{
                        this.player.setVelocityY(0)
                        this.player.anims.play("playerIdle", true)
                        resolve()
                    }, 1000))
                    this.player.y = Math.round(this.player.y / 120) * 120 //força as coordenadas serem múltiplas de 120
                } 
            }
            if(actions[i]===3){ //down
                let bugPos = bugDistance(this.player, this.bug1)
                if(bugPos!=0){
                    await bug1Attack(bugPos, this.player, this.bug1)
                }
                else{
                    this.player.setVelocityY(120) //quantidade de pixels a ser movida para baixo
                    this.player.anims.play("playerWalk", true)
                    await new Promise(resolve => setTimeout(()=>{
                        this.player.setVelocityY(0)
                        this.player.anims.play("playerIdle", true)
                        resolve()
                    }, 1000))
                    this.player.y = Math.round(this.player.y / 120) * 120 //força as coordenadas serem múltiplas de 120
                }
            }
            if(actions[i]===2){ //right
                let bugPos = bugDistance(this.player, this.bug1)
                if(bugPos!=0){
                    await bug1Attack(bugPos, this.player, this.bug1)
                }
                else{
                    this.player.setVelocityX(120) //quantidade de pixels a ser movida para cima
                    this.player.anims.play("playerWalk", true)
                    this.player.flipX = false
                    await new Promise(resolve => setTimeout(()=>{
                        this.player.setVelocityX(0)
                        this.player.anims.play("playerIdle", true)
                        resolve()
                    }, 1000))
                    this.player.x = Math.round(this.player.x / 120) * 120 //força as coordenadas serem múltiplas de 120
                }
            }
            if(actions[i]===4){ //left
                let bugPos = bugDistance(this.player, this.bug1)
                if(bugPos!=0){
                    await bug1Attack(bugPos, this.player, this.bug1)
                }
                else{
                    this.player.setVelocityX(-120) //quantidade de pixels a ser movida para cima
                    this.player.anims.play("playerWalk", true)
                    this.player.flipX = true
                    await new Promise(resolve => setTimeout(()=>{
                        this.player.setVelocityX(0)
                        this.player.anims.play("playerIdle", true)
                        resolve()
                    }, 1000))
                    this.player.x = Math.round(this.player.x / 120) * 120 //força as coordenadas serem múltiplas de 120
                }
            }
            if(actions[i]===5){ //attack-up
                this.player.anims.play("playerAttackUp", false)
                this.player.setOrigin(0, 0.5)
                this.player.setDisplaySize(120, 240)
                await new Promise(resolve => this.player.on("animationcomplete", async ()=>{
                    if(bugDistance(this.player, this.bug1)===1){
                        this.bug1.destroy()
                    }
                    else{
                        let bugPos = bugDistance(this.player, this.bug1)
                        await bug1Attack(bugPos, this.player, this.bug1)
                    }
                    this.player.setOrigin(0, 0)
                    this.player.anims.play("playerIdle", true)
                    this.player.setDisplaySize(120, 120)
                    resolve()
                }))
            }
            if(actions[i]===7){ //attack-down
                this.player.anims.play("playerAttackDown", false)
                this.player.setDisplaySize(120, 240)
                await new Promise(resolve => this.player.on("animationcomplete", async ()=>{
                    if(bugDistance(this.player, this.bug1)===3){
                        this.bug1.destroy()
                    }
                    else{
                        let bugPos = bugDistance(this.player, this.bug1)
                        await bug1Attack(bugPos, this.player, this.bug1)
                    }
                    this.player.anims.play("playerIdle", true)
                    this.player.setDisplaySize(120, 120)
                    resolve()
                }))
            }
            if(actions[i]===6){ //attack-right
                this.player.anims.play("playerAttackSides", false)
                this.player.setDisplaySize(240, 120)
                await new Promise(resolve => this.player.on("animationcomplete", async ()=>{
                    if(bugDistance(this.player, this.bug1)===2){
                        this.bug1.destroy()
                    }
                    else{
                        let bugPos = bugDistance(this.player, this.bug1)
                        await bug1Attack(bugPos, this.player, this.bug1)
                    }
                    this.player.anims.play("playerIdle", true)
                    this.player.setDisplaySize(120, 120)
                    resolve()
                }))
            }
            if(actions[i]===8){ //attack-left
                this.player.flipX = true
                this.player.anims.play("playerAttackSides", false)
                this.player.setDisplaySize(240, 120)
                this.player.setOrigin(0.5, 0)
                await new Promise(resolve => this.player.on("animationcomplete", async ()=>{
                    if(bugDistance(this.player, this.bug1)===4){
                        this.bug1.destroy()
                    }
                    else{
                        let bugPos = bugDistance(this.player, this.bug1)
                        await bug1Attack(bugPos, this.player, this.bug1)
                    }
                    this.player.anims.play("playerIdle", true)
                    this.player.setDisplaySize(120, 120)
                    this.player.flipX = false
                    this.player.setOrigin(0, 0)
                    resolve()
                }))
            }
        }
        document.dispatchEvent(new Event("isRunningCode"))
    }
    shutdown(){
        document.removeEventListener('executeCode', this.executeCode.bind(this))
    }
}