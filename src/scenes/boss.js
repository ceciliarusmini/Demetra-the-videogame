import Player from "../components/player.js"
import GreenEnergy from "../components/GreenEnergy.js";
import Enemy from "../components/enemy.js"
import Pausa from "../scenes/pausa.js"
import Fireball from "../components/fireball.js";
import Fireball2 from "../components/fireball2.js";
import Fireball3 from "../components/fireball3.js";

export default class Boss extends Phaser.Scene {

    background;
    player;
    floorHeight;
    cameraNotSet = true;
    
    
    constructor() {
        super("Boss");
    }

    init() {
        console.log("boss - Executing init()");
        
        this.floorHeight = this.game.config.height - 30;
        this.worldWidth = 1300;
        this.lastGreenEnergy = 0;
        this.lastFireball = -1;
        this.lastFireball2 = -1;
        this.lastFireball3 = -1;
    }

    preload(){
        console.log("boss - Executing init()");

        //background
        this.load.image("sfondoboss","assets/images/background/boss_sfondo.png");

        //healthbarenemy
        this.load.image("vitaAde1","assets/UI/vite_boss/boss_hp-9.png");
        this.load.image("vitaAde2","assets/UI/vite_boss/boss_hp-10.png");
        this.load.image("vitaAde3","assets/UI/vite_boss/boss_hp-11.png");
        this.load.image("vitaAde4","assets/UI/vite_boss/boss_hp-12.png");
        this.load.image("vitaAde5","assets/UI/vite_boss/boss_hp-13.png");
        this.load.image("vitaAde6","assets/UI/vite_boss/boss_hp-14.png");
        this.load.image("vitaAde7","assets/UI/vite_boss/boss_hp-15.png");
        this.load.image("vitaAde8","assets/UI/vite_boss/boss_hp-16.png");
        this.load.image("vitaAde9","assets/UI/vite_boss/boss_hp-17.png");
        this.load.image("vitaAde10","assets/UI/vite_boss/boss_hp-18.png");
        this.load.image("vitaAde11","assets/UI/vite_boss/boss_hp-19.png");
        this.load.image("vitaAde12","assets/UI/vite_boss/boss_hp-20.png");
        this.load.image("vitaAde13","assets/UI/vite_boss/boss_hp-21.png");
        this.load.image("vitaAde14","assets/UI/vite_boss/boss_hp-22.png");
        this.load.image("vitaAde15","assets/UI/vite_boss/boss_hp-23.png");
        this.load.image("vitaAde16","assets/UI/vite_boss/boss_hp-24.png");
        this.load.image("vitaAde17","assets/UI/vite_boss/boss_hp-25.png");

        //vite player
        this.load.image("vita1", "assets/UI/vite_player/1vite.png");
        this.load.image("vita2", "assets/UI/vite_player/2vite.png");
        this.load.image("vita3", "assets/UI/vite_player/3vite.png");

        //elementi
        this.load.image("piattaformine", "assets/images/environment_elements/piattaforma.png");
        this.load.image("piattaformine2", "assets/images/environment_elements/piattaforma.png");

        //fireballs
        this.load.image("fireball", "assets/images/weapons/fireball.png");
        this.load.image("fireball2", "assets/images/weapons/fireball.png");
        this.load.image("fireball3", "assets/images/weapons/fireball.png");

        //spritesheet
        const player_spritesheet_config = {
            frameWidth: 28,
            frameHeight: 36, 
        }; 
        this.load.spritesheet("playerrun", "assets/images/characters/playerrunandjump.png", player_spritesheet_config);

        this.load.spritesheet("enemy", "assets/images/characters/ade.png", {
            frameWidth: 240,
            frameHeight: 270,
        }); 

        //comandi
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.cursorKeys = this.input.keyboard.createCursorKeys();

    }

    create(){
        console.log("boss - Executing init()");

        //sfondo
        this.background1 = this.add.tileSprite(0, 0, 1280, 720, "sfondoboss");
        this.background1.setOrigin(0, 0);

        //floor
        this.floor1 = this.add.rectangle(0, 720, 1280, 25, 0xFFFFFF, 0);
        this.floor1.setOrigin(0, 0);
        this.physics.add.existing(this.floor1, true);

        this.floor2 = this.add.rectangle(1080, 400, 200, 350, 0xFFFFFF, 0);
        this.floor2.setOrigin(0, 0);
        this.physics.add.existing(this.floor2, true);
       
        this.floor3 = this.add.rectangle(0, 450, 320, 350, 0xFFFFFF, 0);
        this.floor3.setOrigin(0, 0);
        this.physics.add.existing(this.floor3, true);

        this.floor4 = this.add.rectangle(1230, 0, 50, 800, 0xFFFFFF, 0);
        this.floor4.setOrigin(0, 0);
        this.physics.add.existing(this.floor4, true);
        this.physics.add.collider(this.floor4, this.enemy);

        //lava 
        this.floorlava = this.add.rectangle(0, 700, 1280, 20, 0xFFFFFF, 0);
        this.floorlava.setOrigin(0, 0);
        this.physics.add.existing(this.floorlava, true);

        // importiamo il player
        const thePlayer = new Player(this, 0, this.floor1.height, 12000);
        this.player = this.physics.add.existing(thePlayer);
      
        this.physics.add.collider(this.player, this.floor1);
        this.physics.add.collider(this.player, this.floor2);
        this.physics.add.collider(this.player, this.floor3);

        this.physics.add.collider(this.player, this.staticPlatforms);

        //importiamo l'enemy

        this.enemy = this.add.sprite(1100, 270, "enemy");
        this.physics.add.existing(this.enemy, true);
        this.physics.add.collider(this.enemy, this.floor2);
        this.physics.add.collider(this.enemy, this.floor4);

        this.createUI();
        this.createfloorlava();
        this.createStaticPlatforms();
        this.createStaticPlatforms2();
        this.initAnimations();
    }

    createUI(){
        //lives Persefone
        this.lives1 = this.add.image(70, 20, "vita1");
        this.lives1.setOrigin(0.5, 0);
        this.lives1.setScrollFactor(0, 0);
        this.lives1.visible = false;

        this.lives2 = this.add.image(70, 20, "vita2");
        this.lives2.setOrigin(0.5, 0);
        this.lives2.setScrollFactor(0, 0);
        this.lives2.visible = false;

        this.lives3 = this.add.image(70, 20, "vita3");
        this.lives3.setOrigin(0.5, 0);
        this.lives3.setScrollFactor(0, 0);
        this.lives3.visible = true;

        //lives Ade
        this.uiEnemyLife1 = this.add.image(640,20,"vitaAde1");
        this.uiEnemyLife1.setOrigin(0.5,0);
        this.uiEnemyLife1.setScale(0.5);
        this.uiEnemyLife1.visible = true;
        
        this.uiEnemyLife2 = this.add.image(640,20,"vitaAde2");
        this.uiEnemyLife2.setOrigin(0.5,0);
        this.uiEnemyLife2.setScale(0.5);
        this.uiEnemyLife2.visible = false;

        this.uiEnemyLife3 = this.add.image(640,20,"vitaAde3");
        this.uiEnemyLife3.setOrigin(0.5, 0);
        this.uiEnemyLife3.setScale(0.5);
        this.uiEnemyLife3.visible = false;

        this.uiEnemyLife4 = this.add.image(640,20,"vitaAde4");
        this.uiEnemyLife4.setOrigin(0.5, 0);
        this.uiEnemyLife4.setScale(0.5);
        this.uiEnemyLife4.visible = false;

        this.uiEnemyLife5 = this.add.image(640,20,"vitaAde5");
        this.uiEnemyLife5.setOrigin(0.5, 0);
        this.uiEnemyLife5.setScale(0.5);
        this.uiEnemyLife5.visible = false;

        this.uiEnemyLife6 = this.add.image(640,20,"vitaAde6");
        this.uiEnemyLife6.setOrigin(0.5, 0);
        this.uiEnemyLife6.setScale(0.5);
        this.uiEnemyLife6.visible = false;

        this.uiEnemyLife7 = this.add.image(640,20,"vitaAde7");
        this.uiEnemyLife7.setOrigin(0.5, 0);
        this.uiEnemyLife7.setScale(0.5);
        this.uiEnemyLife7.visible = false;

        this.uiEnemyLife8 = this.add.image(640,20,"vitaAde8");
        this.uiEnemyLife8.setOrigin(0.5, 0);
        this.uiEnemyLife8.setScale(0.5);
        this.uiEnemyLife8.visible = false;

        this.uiEnemyLife9 = this.add.image(640,20,"vitaAde9");
        this.uiEnemyLife9.setOrigin(0.5, 0);
        this.uiEnemyLife9.setScale(0.5);
        this.uiEnemyLife9.visible = false;

        this.uiEnemyLife10 = this.add.image(640,20,"vitaAde10");
        this.uiEnemyLife10.setOrigin(0.5, 0);
        this.uiEnemyLife10.setScale(0.5);
        this.uiEnemyLife10.visible = false;

        this.uiEnemyLife11 = this.add.image(640,20,"vitaAde11");
        this.uiEnemyLife11.setOrigin(0.5, 0);
        this.uiEnemyLife11.setScale(0.5);
        this.uiEnemyLife11.visible = false;

        this.uiEnemyLife12 = this.add.image(640,20,"vitaAde12");
        this.uiEnemyLife12.setOrigin(0.5, 0);
        this.uiEnemyLife12.setScale(0.5);
        this.uiEnemyLife12.visible = false;

        this.uiEnemyLife13 = this.add.image(640,20,"vitaAde13");
        this.uiEnemyLife13.setOrigin(0.5, 0);
        this.uiEnemyLife13.setScale(0.5);
        this.uiEnemyLife13.visible = false;

        this.uiEnemyLife14 = this.add.image(640,20,"vitaAde14");
        this.uiEnemyLife14.setOrigin(0.5, 0);
        this.uiEnemyLife14.setScale(0.5);
        this.uiEnemyLife14.visible = false;

        this.uiEnemyLife15 = this.add.image(640,20,"vitaAde15");
        this.uiEnemyLife15.setOrigin(0.5, 0);
        this.uiEnemyLife15.setScale(0.5);
        this.uiEnemyLife15.visible = false;

        this.uiEnemyLife16 = this.add.image(640,20,"vitaAde16");
        this.uiEnemyLife16.setOrigin(0.5, 0);
        this.uiEnemyLife16.setScale(0.5);
        this.uiEnemyLife16.visible = false;

        this.uiEnemyLife17 = this.add.image(640,20,"vitaAde17");
        this.uiEnemyLife17.setOrigin(0.5, 0);
        this.uiEnemyLife17.setScale(0.5);
        this.uiEnemyLife17.visible = false;

        //comando sparo
        this.keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);  
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);  
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);  
    }

    createfloorlava(){
        this.physics.add.overlap(this.player, this.floorlava, this.updateLives, null, this);
    }

    createStaticPlatforms(){
        this.staticPlatforms = this.physics.add.staticGroup({
            key: "piattaformine",
            repeat: 1,
            setXY:{
                x: 400,
                y: 400,
                stepX: 500,
                stepY: 0
            }
        });

        this.physics.add.collider(this.staticPlatforms, this.player);
    } 

    createStaticPlatforms2(){
        this.staticPlatforms2 = this.physics.add.staticGroup({
            key: "piattaformine2",
            repeat: 0,
            setXY:{
                x: 640,
                y: 300,
                stepX: 0,
                stepY: 0
            }
        });

        this.physics.add.collider(this.staticPlatforms2, this.player);
    } 

    initAnimations(){
            this.anims.create({
              key: "enemy",
              frames: this.anims.generateFrameNumbers("enemy", {
                start: 0,
                end: 10,
              }),
              frameRate: 12,
              repeat: -1,
            });
            
            this.enemy.anims.play("enemy");
            this.physics.add.overlap(this.player, this.enemy, this.updateLives, null, this);
        }
    

    update() {
        // Azioni che vengono eseguite a ogni frame del gioco
        this.player.manageMovements();
        this.manageGreenEnergyLaunch();
        this.manageGreenEnergyLaunch2();
        this.manageGreenEnergyLaunch3();
        this.updateEnemyLife();
        this.manageEnemyShots();
        this.manageEnemyShots2();
        this.manageEnemyShots3();
        this.updateLivesImage();
        this.Pausa();
        this.finale();
    }
   
    manageGreenEnergyLaunch() {
        const minTimeBetweenLaunches = 500;
        const lastGreenEnergyLaunchTime = this.time.now - this.lastGreenEnergy;

        if (this.keySPACE.isDown && this.keyD.isDown && lastGreenEnergyLaunchTime > minTimeBetweenLaunches) {

            this.lastGreenEnergy = this.time.now;
            const greenenergy = new GreenEnergy(this, this.player.x + 90, this.player.y - 80, this.player.flipX);

            this.physics.add.collider(greenenergy, this.enemy, this.destroyEnemy, null, this);
            greenenergy.fire();
        }
    }

    manageGreenEnergyLaunch2() {
        const minTimeBetweenLaunches = 500;
        const lastGreenEnergyLaunchTime = this.time.now - this.lastGreenEnergy;

        if (this.keySPACE.isDown && this.keyA.isDown && lastGreenEnergyLaunchTime > minTimeBetweenLaunches) {

            this.lastGreenEnergy = this.time.now;
            const greenenergy = new GreenEnergy(this, this.player.x + 10, this.player.y - 80, this.player.flipX);

            this.physics.add.collider(greenenergy, this.enemy, this.destroyEnemy, null, this);
            greenenergy.fire();
        }
    }

    manageGreenEnergyLaunch3() {
        const minTimeBetweenLaunches = 500;
        const lastGreenEnergyLaunchTime = this.time.now - this.lastGreenEnergy;

        if (this.keySPACE.isDown && lastGreenEnergyLaunchTime > minTimeBetweenLaunches) {

            this.lastGreenEnergy = this.time.now;
            const greenenergy = new GreenEnergy(this, this.player.x + 90, this.player.y - 80, this.player.flipX);

            this.physics.add.collider(greenenergy, this.enemy, this.destroyEnemy, null, this);
            greenenergy.fire();
        }
    }

    destroyEnemy(greenenergy, enemy){
        greenenergy.destroy(this.player, enemy);
        this.updateEnemy(this.player, enemy);
    }

    manageEnemyShots(){   
        const minTimeBetweenLaunches = 1000;
        const lastFireballsLaunchTime = this.time.now - this.lastFireball;
        if (lastFireballsLaunchTime > minTimeBetweenLaunches && Phaser.Math.Between(-200,200)){

            this.lastFireball = this.time.now;

            const fireball = new Fireball (this, 1100, this.enemy.y+20);
            fireball.enemyFireballs();

            this.physics.add.overlap(fireball, this.player, this.updateLives, null, this);
        } 
    }
    
    manageEnemyShots2(){   
        const minTimeBetweenLaunches = 1500;
        const lastFireballs2LaunchTime = this.time.now - this.lastFireball2;
        if (lastFireballs2LaunchTime > minTimeBetweenLaunches && Phaser.Math.Between(-200,200)){

            this.lastFireball2 = this.time.now;

            const fireball2 = new Fireball2 (this, 1100, this.enemy.y+20);
            fireball2.enemyFireballs2();

            this.physics.add.overlap(fireball2, this.player, this.updateLives, null, this);
        } 
    }

    manageEnemyShots3(){   
        const minTimeBetweenLaunches = 5000;
        const lastFireballs3LaunchTime = this.time.now - this.lastFireball3;
        if (lastFireballs3LaunchTime > minTimeBetweenLaunches && Phaser.Math.Between(-200,200)){

            this.lastFireball3 = this.time.now;

            const fireball3 = new Fireball3 (this, 1100, this.enemy.y+40);
            fireball3.enemyFireballs3();

            this.physics.add.overlap(fireball3, this.player, this.updateLives, null, this);
        } 
    }

    updateLives() {
        console.log(this.game.gameState.lives);
        this.game.gameState.lives--;
        
        if (this.game.gameState.lives == 0) {
            this.scene.start("gameover");
        }
        this.player.die();
    }

   finale() {
        console.log(this.game.gameState2.lives);
        
        if (this.game.gameState2.lives == 0) {
            this.scene.start("haivinto");
        }
    }

    Pausa(){
        this.pausa = this.add.image(1200, 20, "pausa");
        this.pausa.setOrigin(0.5, 0.1);
        this.pausa.setScale(0.5);
        this.pausa.setScrollFactor(0, 0);
        this.pausa.setInteractive()
    
        this.pausa.on("pointerdown", ()=>{ 
        this.scene.launch('PausaBoss')
        this.scene.pause();

    });
    }

    updateLivesImage(){
        if(this.game.gameState.lives == 3){
            this.lives1.visible = false;
            this.lives2.visible = false;
            this.lives3.visible = true;
        } else if (this.game.gameState.lives == 2){
            this.lives1.visible = false;
            this.lives2.visible = true;
            this.lives3.visible = false;
        } else if (this.game.gameState.lives == 1){
            this.lives1.visible = true;
            this.lives2.visible = false;
            this.lives3.visible = false;
        } else if (this.game.gameState.lives == 0){
            this.lives1.visible = false;
            this.lives2.visible = false;
            this.lives3.visible = true;
        }
    }   

    updateEnemy(player, enemy) {
        this.game.gameState2.lives--;
        if (this.game.gameState2.lives == 0) {
            enemy.destroy();
        }
    }

    
    updateEnemyLife(){
        if(this.game.gameState.lives == 17){
            this.uiEnemyLife17.visible = false;
            this.uiEnemyLife16.visible = false;
            this.uiEnemyLife15.visible = false;
            this.uiEnemyLife14.visible = false;
            this.uiEnemyLife13.visible = false;
            this.uiEnemyLife12.visible = false;
            this.uiEnemyLife11.visible = false;
            this.uiEnemyLife10.visible = false;
            this.uiEnemyLife9.visible = false;
            this.uiEnemyLife8.visible = false;
            this.uiEnemyLife7.visible = false;
            this.uiEnemyLife6.visible = false;
            this.uiEnemyLife5.visible = false;
            this.uiEnemyLife4.visible = false;
            this.uiEnemyLife3.visible = false;
            this.uiEnemyLife2.visible = false;
            this.uiEnemyLife1.visible = true;
        } else if (this.game.gameState2.lives == 16){
            this.uiEnemyLife17.visible = false;
            this.uiEnemyLife16.visible = false;
            this.uiEnemyLife15.visible = false;
            this.uiEnemyLife14.visible = false;
            this.uiEnemyLife13.visible = false;
            this.uiEnemyLife12.visible = false;
            this.uiEnemyLife11.visible = false;
            this.uiEnemyLife10.visible = false;
            this.uiEnemyLife9.visible = false;
            this.uiEnemyLife8.visible = false;
            this.uiEnemyLife7.visible = false;
            this.uiEnemyLife6.visible = false;
            this.uiEnemyLife5.visible = false;
            this.uiEnemyLife4.visible = false;
            this.uiEnemyLife3.visible = false;
            this.uiEnemyLife2.visible = true;
            this.uiEnemyLife1.visible = false;
        } else if (this.game.gameState2.lives == 15){
            this.uiEnemyLife17.visible = false;
            this.uiEnemyLife16.visible = false;
            this.uiEnemyLife15.visible = false;
            this.uiEnemyLife14.visible = false;
            this.uiEnemyLife13.visible = false;
            this.uiEnemyLife12.visible = false;
            this.uiEnemyLife11.visible = false;
            this.uiEnemyLife10.visible = false;
            this.uiEnemyLife9.visible = false;
            this.uiEnemyLife8.visible = false;
            this.uiEnemyLife7.visible = false;
            this.uiEnemyLife6.visible = false;
            this.uiEnemyLife5.visible = false;
            this.uiEnemyLife4.visible = false;
            this.uiEnemyLife3.visible = true;
            this.uiEnemyLife2.visible = false;
            this.uiEnemyLife1.visible = false;
        } else if (this.game.gameState2.lives == 14){
            this.uiEnemyLife17.visible = false;
            this.uiEnemyLife16.visible = false;
            this.uiEnemyLife15.visible = false;
            this.uiEnemyLife14.visible = false;
            this.uiEnemyLife13.visible = false;
            this.uiEnemyLife12.visible = false;
            this.uiEnemyLife11.visible = false;
            this.uiEnemyLife10.visible = false;
            this.uiEnemyLife9.visible = false;
            this.uiEnemyLife8.visible = false;
            this.uiEnemyLife7.visible = false;
            this.uiEnemyLife6.visible = false;
            this.uiEnemyLife5.visible = false;
            this.uiEnemyLife4.visible = true;
            this.uiEnemyLife3.visible = false;
            this.uiEnemyLife2.visible = false;
            this.uiEnemyLife1.visible = false;
        } else if (this.game.gameState2.lives == 13){
            this.uiEnemyLife17.visible = false;
            this.uiEnemyLife16.visible = false;
            this.uiEnemyLife15.visible = false;
            this.uiEnemyLife14.visible = false;
            this.uiEnemyLife13.visible = false;
            this.uiEnemyLife12.visible = false;
            this.uiEnemyLife11.visible = false;
            this.uiEnemyLife10.visible = false;
            this.uiEnemyLife9.visible = false;
            this.uiEnemyLife8.visible = false;
            this.uiEnemyLife7.visible = false;
            this.uiEnemyLife6.visible = false;
            this.uiEnemyLife5.visible = true;
            this.uiEnemyLife4.visible = false;
            this.uiEnemyLife3.visible = false;
            this.uiEnemyLife2.visible = false;
            this.uiEnemyLife1.visible = false;
        } else if (this.game.gameState2.lives == 12){
            this.uiEnemyLife17.visible = false;
            this.uiEnemyLife16.visible = false;
            this.uiEnemyLife15.visible = false;
            this.uiEnemyLife14.visible = false;
            this.uiEnemyLife13.visible = false;
            this.uiEnemyLife12.visible = false;
            this.uiEnemyLife11.visible = false;
            this.uiEnemyLife10.visible = false;
            this.uiEnemyLife9.visible = false;
            this.uiEnemyLife8.visible = false;
            this.uiEnemyLife7.visible = false;
            this.uiEnemyLife6.visible = true;
            this.uiEnemyLife5.visible = false;
            this.uiEnemyLife4.visible = false;
            this.uiEnemyLife3.visible = false;
            this.uiEnemyLife2.visible = false;
            this.uiEnemyLife1.visible = false;
        } else if (this.game.gameState2.lives == 11){
            this.uiEnemyLife17.visible = false;
            this.uiEnemyLife16.visible = false;
            this.uiEnemyLife15.visible = false;
            this.uiEnemyLife14.visible = false;
            this.uiEnemyLife13.visible = false;
            this.uiEnemyLife12.visible = false;
            this.uiEnemyLife11.visible = false;
            this.uiEnemyLife10.visible = false;
            this.uiEnemyLife9.visible = false;
            this.uiEnemyLife8.visible = false;
            this.uiEnemyLife7.visible = true;
            this.uiEnemyLife6.visible = false;
            this.uiEnemyLife5.visible = false;
            this.uiEnemyLife4.visible = false;
            this.uiEnemyLife3.visible = false;
            this.uiEnemyLife2.visible = false;
            this.uiEnemyLife1.visible = false;
        } else if (this.game.gameState2.lives == 10){
            this.uiEnemyLife17.visible = false;
            this.uiEnemyLife16.visible = false;
            this.uiEnemyLife15.visible = false;
            this.uiEnemyLife14.visible = false;
            this.uiEnemyLife13.visible = false;
            this.uiEnemyLife12.visible = false;
            this.uiEnemyLife11.visible = false;
            this.uiEnemyLife10.visible = false;
            this.uiEnemyLife9.visible = false;
            this.uiEnemyLife8.visible = true;
            this.uiEnemyLife7.visible = false;
            this.uiEnemyLife6.visible = false;
            this.uiEnemyLife5.visible = false;
            this.uiEnemyLife4.visible = false;
            this.uiEnemyLife3.visible = false;
            this.uiEnemyLife2.visible = false;
            this.uiEnemyLife1.visible = false;
        } else if (this.game.gameState2.lives == 9){
            this.uiEnemyLife17.visible = false;
            this.uiEnemyLife16.visible = false;
            this.uiEnemyLife15.visible = false;
            this.uiEnemyLife14.visible = false;
            this.uiEnemyLife13.visible = false;
            this.uiEnemyLife12.visible = false;
            this.uiEnemyLife11.visible = false;
            this.uiEnemyLife10.visible = false;
            this.uiEnemyLife9.visible = true;
            this.uiEnemyLife8.visible = false;
            this.uiEnemyLife7.visible = false;
            this.uiEnemyLife6.visible = false;
            this.uiEnemyLife5.visible = false;
            this.uiEnemyLife4.visible = false;
            this.uiEnemyLife3.visible = false;
            this.uiEnemyLife2.visible = false;
            this.uiEnemyLife1.visible = false;
        } else if (this.game.gameState2.lives == 8){
            this.uiEnemyLife17.visible = false;
            this.uiEnemyLife16.visible = false;
            this.uiEnemyLife15.visible = false;
            this.uiEnemyLife14.visible = false;
            this.uiEnemyLife13.visible = false;
            this.uiEnemyLife12.visible = false;
            this.uiEnemyLife11.visible = false;
            this.uiEnemyLife10.visible = true;
            this.uiEnemyLife9.visible = false;
            this.uiEnemyLife8.visible = false;
            this.uiEnemyLife7.visible = false;
            this.uiEnemyLife6.visible = false;
            this.uiEnemyLife5.visible = false;
            this.uiEnemyLife4.visible = false;
            this.uiEnemyLife3.visible = false;
            this.uiEnemyLife2.visible = false;
            this.uiEnemyLife1.visible = false;
        } else if (this.game.gameState2.lives == 7){
            this.uiEnemyLife17.visible = false;
            this.uiEnemyLife16.visible = false;
            this.uiEnemyLife15.visible = false;
            this.uiEnemyLife14.visible = false;
            this.uiEnemyLife13.visible = false;
            this.uiEnemyLife12.visible = false;
            this.uiEnemyLife11.visible = true;
            this.uiEnemyLife10.visible = false;
            this.uiEnemyLife9.visible = false;
            this.uiEnemyLife8.visible = false;
            this.uiEnemyLife7.visible = false;
            this.uiEnemyLife6.visible = false;
            this.uiEnemyLife5.visible = false;
            this.uiEnemyLife4.visible = false;
            this.uiEnemyLife3.visible = false;
            this.uiEnemyLife2.visible = false;
            this.uiEnemyLife1.visible = false;
        } else if (this.game.gameState2.lives == 6){
            this.uiEnemyLife17.visible = false;
            this.uiEnemyLife16.visible = false;
            this.uiEnemyLife15.visible = false;
            this.uiEnemyLife14.visible = false;
            this.uiEnemyLife13.visible = false;
            this.uiEnemyLife12.visible = true;
            this.uiEnemyLife11.visible = false;
            this.uiEnemyLife10.visible = false;
            this.uiEnemyLife9.visible = false;
            this.uiEnemyLife8.visible = false;
            this.uiEnemyLife7.visible = false;
            this.uiEnemyLife6.visible = false;
            this.uiEnemyLife5.visible = false;
            this.uiEnemyLife4.visible = false;
            this.uiEnemyLife3.visible = false;
            this.uiEnemyLife2.visible = false;
            this.uiEnemyLife1.visible = false;
        } else if (this.game.gameState2.lives == 5){
            this.uiEnemyLife17.visible = false;
            this.uiEnemyLife16.visible = false;
            this.uiEnemyLife15.visible = false;
            this.uiEnemyLife14.visible = false;
            this.uiEnemyLife13.visible = true;
            this.uiEnemyLife12.visible = false;
            this.uiEnemyLife11.visible = false;
            this.uiEnemyLife10.visible = false;
            this.uiEnemyLife9.visible = false;
            this.uiEnemyLife8.visible = false;
            this.uiEnemyLife7.visible = false;
            this.uiEnemyLife6.visible = false;
            this.uiEnemyLife5.visible = false;
            this.uiEnemyLife4.visible = false;
            this.uiEnemyLife3.visible = false;
            this.uiEnemyLife2.visible = false;
            this.uiEnemyLife1.visible = false;
        } else if (this.game.gameState2.lives == 4){
            this.uiEnemyLife17.visible = false;
            this.uiEnemyLife16.visible = false;
            this.uiEnemyLife15.visible = false;
            this.uiEnemyLife14.visible = true;
            this.uiEnemyLife13.visible = false;
            this.uiEnemyLife12.visible = false;
            this.uiEnemyLife11.visible = false;
            this.uiEnemyLife10.visible = false;
            this.uiEnemyLife9.visible = false;
            this.uiEnemyLife8.visible = false;
            this.uiEnemyLife7.visible = false;
            this.uiEnemyLife6.visible = false;
            this.uiEnemyLife5.visible = false;
            this.uiEnemyLife4.visible = false;
            this.uiEnemyLife3.visible = false;
            this.uiEnemyLife2.visible = false;
            this.uiEnemyLife1.visible = false;
        } else if (this.game.gameState2.lives == 3){
            this.uiEnemyLife17.visible = false;
            this.uiEnemyLife16.visible = false;
            this.uiEnemyLife15.visible = true;
            this.uiEnemyLife14.visible = false;
            this.uiEnemyLife13.visible = false;
            this.uiEnemyLife12.visible = false;
            this.uiEnemyLife11.visible = false;
            this.uiEnemyLife10.visible = false;
            this.uiEnemyLife9.visible = false;
            this.uiEnemyLife8.visible = false;
            this.uiEnemyLife7.visible = false;
            this.uiEnemyLife6.visible = false;
            this.uiEnemyLife5.visible = false;
            this.uiEnemyLife4.visible = false;
            this.uiEnemyLife3.visible = false;
            this.uiEnemyLife2.visible = false;
            this.uiEnemyLife1.visible = false;
        } else if (this.game.gameState2.lives == 2){
            this.uiEnemyLife17.visible = false;
            this.uiEnemyLife16.visible = true;
            this.uiEnemyLife15.visible = false;
            this.uiEnemyLife14.visible = false;
            this.uiEnemyLife13.visible = false;
            this.uiEnemyLife12.visible = false;
            this.uiEnemyLife11.visible = false;
            this.uiEnemyLife10.visible = false;
            this.uiEnemyLife9.visible = false;
            this.uiEnemyLife8.visible = false;
            this.uiEnemyLife7.visible = false;
            this.uiEnemyLife6.visible = false;
            this.uiEnemyLife5.visible = false;
            this.uiEnemyLife4.visible = false;
            this.uiEnemyLife3.visible = false;
            this.uiEnemyLife2.visible = false;
            this.uiEnemyLife1.visible = false;
        } else if (this.game.gameState2.lives == 1){
            this.uiEnemyLife17.visible = true;
            this.uiEnemyLife16.visible = false;
            this.uiEnemyLife15.visible = false;
            this.uiEnemyLife14.visible = false;
            this.uiEnemyLife13.visible = false;
            this.uiEnemyLife12.visible = false;
            this.uiEnemyLife11.visible = false;
            this.uiEnemyLife10.visible = false;
            this.uiEnemyLife9.visible = false;
            this.uiEnemyLife8.visible = false;
            this.uiEnemyLife7.visible = false;
            this.uiEnemyLife6.visible = false;
            this.uiEnemyLife5.visible = false;
            this.uiEnemyLife4.visible = false;
            this.uiEnemyLife3.visible = false;
            this.uiEnemyLife2.visible = false;
            this.uiEnemyLife1.visible = false;
        }
    }


}