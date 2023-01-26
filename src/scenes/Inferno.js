import Player from "../components/player.js"
import GreenEnergy from "../components/GreenEnergy.js"
import Boss from "../scenes/boss.js"
import Pausa from "../scenes/pausa.js"
import Fallito from "./fallito.js"

export default class PhysicsLive extends Phaser.Scene {

    background;
    player;
    floorHeight;
    cameraNotSet = true;

    constructor() {
        super("inferno");
    }

    init() {
        console.log("Inferno - Executing init()");
        this.floorHeight = this.game.config.height - 30;
        this.worldWidth = 12000;
        this.lastGreenEnergy = 0;
    }

    preload() {
        console.log("Inferno- Executing preload()");

        //sfondi
        this.load.image("sfondo1","assets/images/background/sfondo1.png");
        this.load.image("sfondo2","assets/images/background/sfondo2.png");
        this.load.image("sfondo3","assets/images/background/sfondo3.png");
        this.load.image("livello1","assets/images/background/livello.png"); 
        this.load.image("fiori_testo","assets/UI/attenzione/fiori_testo.png"); 
        this.load.image("gas_testo","assets/UI/attenzione/gas_testo.png"); 

        const comandi_spritesheet_config = {
            frameWidth: 470,
            frameHeight: 200,
        }; 
        this.load.spritesheet("comandi", "assets/images/background/tutorial.png", comandi_spritesheet_config);

        const petrolio_spritesheet_config = {
            frameWidth: 11996,
            frameHeight: 230.8,
        }; 
        this.load.spritesheet("petrolio", "assets/images/background/petrolio.png", petrolio_spritesheet_config);
        
        //elementi mappa
        this.load.image("tubo", "assets/images/environment_elements/tubo.png");
        this.load.image("cisterna", "assets/images/environment_elements/cisterna.png");

        //vite player
        this.load.image("vita1", "assets/UI/vite_player/1vite.png");
        this.load.image("vita2", "assets/UI/vite_player/2vite.png");
        this.load.image("vita3", "assets/UI/vite_player/3vite.png");
        
        //score
        this.load.image("punto0", "assets/UI/fiori/fiori-02.png");
        this.load.image("punto1", "assets/UI/fiori/fiori-03.png");
        this.load.image("punto2", "assets/UI/fiori/fiori-04.png");
        this.load.image("punto3", "assets/UI/fiori/fiori-05.png");
        this.load.image("punto4", "assets/UI/fiori/fiori-06.png");
        this.load.image("punto5", "assets/UI/fiori/fiori-07.png");

        //schermate
        this.add.image("gameover", "assets/UI/schermate/game_over.png");
        this.load.image("pausa", "assets/UI/bottoni/pause_button.png");
        this.load.image("pausamenu", "assets/UI/schermate/pausa.png");

        //elementi scena
        this.load.image("piattaformine", "assets/images/environment_elements/piattaforma.png");
        this.load.image("piattaformine2", "assets/images/environment_elements/piattaforma2.png");
        this.load.image("barili", "assets/images/environment_elements/barili.png");
        this.load.image("barili2", "assets/images/environment_elements/barile2.png");
        this.load.image("tubofumo", "assets/images/environment_elements/tubo_fumo.png");


        //spritesheet
        this.load.spritesheet("fuocoblu", "assets/images/environment_elements/fuoco_caverna.png", {
            frameWidth: 75,
            frameHeight: 125,
        }); 

        const player_spritesheet_config = {
            frameWidth: 28,
            frameHeight: 36,
        }; 
        this.load.spritesheet("playerrun", "assets/images/characters/playerrunandjump.png", player_spritesheet_config);
        
        const playerscivolaa_spritesheet_config = {
            frameWidth: 28,
            frameHeight: 16,
        }; 
        this.load.spritesheet("playerscivola", "assets/images/characters/scivola.png", playerscivolaa_spritesheet_config);

        const enemy_spritesheet_config = {
            frameWidth:  28,
            frameHeight: 36,
        };
        this.load.spritesheet("enemy", "assets/images/characters/enemy.png", enemy_spritesheet_config);

        const freccia_spritesheet_config = {
            frameWidth:  160,
            frameHeight: 160,
        };
        this.load.spritesheet("freccia", "assets/UI/bottoni/freccia_boss.png", freccia_spritesheet_config);

        const freccia2_spritesheet_config = {
            frameWidth:  160,
            frameHeight: 160,
        };
        this.load.spritesheet("freccia2", "assets/UI/bottoni/freccia_boss.png", freccia2_spritesheet_config);


        //comandi
        this.keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);

        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    
    }

    create() {
        console.log("physics_ex - Executing create()");

        this.background1 = this.add.tileSprite(0, 0, 1280, 720, "sfondo1");
        this.background1.setOrigin(0, 0);
        this.background1.setScrollFactor(0, 0);

        this.background2 = this.add.tileSprite(0, 0, 1280, 720, "sfondo2");
        this.background2.setOrigin(0, 0);
        this.background2.setScrollFactor(0, 0);

        this.background3 = this.add.tileSprite(0, 0, 1280, 720, "sfondo3");
        this.background3.setOrigin(0, 0);
        this.background3.setScrollFactor(0, 0);

        this.petrolio = this.add.sprite(0, 660, "petrolio");
        this.physics.add.existing(this.petrolio, true);

        this.background4 = this.add.tileSprite(0, 0, 6000, 720, "livello1");
        this.background4.setOrigin(0, 0);
        this.background4.setScrollFactor(0, 0);

        this.fiori_testo = this.add.image(1030, 250, "fiori_testo");
        this.gas_testo = this.add.image(6300, 100, "gas_testo");

        //floor
        this.floor1 = this.add.rectangle(0, 560, 432, 157.6, 0xFFFFFF, 0);
        this.floor1.setOrigin(0, 0);
        this.floor1.setScrollFactor(0, 0);
        this.physics.add.existing(this.floor1, true);

        this.floor2 = this.add.rectangle(432, 500, 360.5, 271, 0xFFFFFF, 0);
        this.floor2.setOrigin(0, 0);
        this.floor2.setScrollFactor(0, 0);
        this.physics.add.existing(this.floor2, true);

        this.floor3 = this.add.rectangle(1010, 450, 821, 271, 0xFFFFFF, 0);
        this.floor3.setOrigin(0, 0);
        this.floor3.setScrollFactor(0, 0);
        this.physics.add.existing(this.floor3, true);

        this.floor4 = this.add.rectangle(2545, 370, 821, 271, 0xFFFFFF, 0);
        this.floor4.setOrigin(0, 0);
        this.floor4.setScrollFactor(0, 0);
        this.physics.add.existing(this.floor4, true);

        this.floor5 = this.add.rectangle(3810, 450, 725, 271, 0xFFFFFF, 0);
        this.floor5.setOrigin(0, 0);
        this.floor5.setScrollFactor(0, 0);
        this.physics.add.existing(this.floor5, true);

        this.floor6 = this.add.rectangle(4900, 320, 725, 251, 0xFFFFFF, 0);
        this.floor6.setOrigin(0, 0);
        this.floor6.setScrollFactor(0, 0);
        this.physics.add.existing(this.floor6, true);

        this.floor7 = this.add.rectangle(5770, 320, 740, 300, 0xFFFFFF, 0);
        this.floor7.setOrigin(0, 0);
        this.floor7.setScrollFactor(0, 0);
        this.physics.add.existing(this.floor7, true);

        this.floor8 = this.add.rectangle(6850, 450, 780, 350, 0xFFFFFF, 0);
        this.floor8.setOrigin(0, 0);
        this.floor8.setScrollFactor(0, 0);
        this.physics.add.existing(this.floor8, true);

        this.floor9 = this.add.rectangle(7950, 400, 790, 340, 0xFFFFFF, 0);
        this.floor9.setOrigin(0, 0);
        this.floor9.setScrollFactor(0, 0);
        this.physics.add.existing(this.floor9, true);

        this.floor10 = this.add.rectangle(9450, 460, 770, 300, 0xFFFFFF, 0);
        this.floor10.setOrigin(0, 0);
        this.floor10.setScrollFactor(0, 0);
        this.physics.add.existing(this.floor10, true);

        this.floor11 = this.add.rectangle(10550, 355, 1450, 300, 0xFFFFFF, 0);
        this.floor11.setOrigin(0, 0);
        this.floor11.setScrollFactor(0, 0);
        this.physics.add.existing(this.floor11, true);

        this.floorfiore1 = this.add.rectangle(1010, 350, 82, 271, 0xFFFFFF, 0);
        this.floorfiore1.setOrigin(0, 0);
        this.floorfiore1.setScrollFactor(0, 0);
        this.physics.add.existing(this.floorfiore1, true);

        this.floorfiore2 = this.add.rectangle(8500, 350, 82, 271, 0xFFFFFF, 0);
        this.floorfiore2.setOrigin(0, 0);
        this.floorfiore2.setScrollFactor(0, 0);
        this.physics.add.existing(this.floorfiore2, true);

        this.floorfiore3 = this.add.rectangle(10950, 370, 82, 271, 0xFFFFFF, 0);
        this.floorfiore3.setOrigin(0, 0);
        this.floorfiore3.setScrollFactor(0, 0);
        this.physics.add.existing(this.floorfiore3, true);

        //petrolio
        this.floorlava = this.add.rectangle(780, 530, 230, 271, 0xFFFFFF, 0);
        this.floorlava.setOrigin(0, 0);
        this.floorlava.setScrollFactor(0, 0);
        this.physics.add.existing(this.floorlava, true);

        this.floorlava2 = this.add.rectangle(1810, 530, 12000, 271, 0xFFFFFF, 0);
        this.floorlava2.setOrigin(0, 0);
        this.floorlava2.setScrollFactor(0, 0);
        this.physics.add.existing(this.floorlava2, true);

        //istruzioni comandi
        this.tutorial = this.add.sprite(250, 250, "comandi");
        this.physics.add.existing(this.tutorial, true);

        // Player
        const thePlayer = new Player(this, 0, this.floor1.height, 12000);
        this.player = this.physics.add.existing(thePlayer);

        this.physics.add.collider(this.player, this.floor1);
        this.physics.add.collider(this.player, this.floor2);
        this.physics.add.collider(this.player, this.floor3);
        this.physics.add.collider(this.player, this.floor4);
        this.physics.add.collider(this.player, this.floor5);
        this.physics.add.collider(this.player, this.floor6);
        this.physics.add.collider(this.player, this.floor7);
        this.physics.add.collider(this.player, this.floor8);
        this.physics.add.collider(this.player, this.floor9);
        this.physics.add.collider(this.player, this.floor10);
        this.physics.add.collider(this.player, this.floor11);

        this.physics.add.collider(this.player, this.tubo);
        

        //camera
        this.cameras.main.startFollow(this.player, true, 1, 0, 1, 1);
        this.cameras.main.setBounds(0, 0, 12000, this.game.config.maxHeight);
         

        // spritesheet animata del fuoco blu
        this.animatedElement = this.add.sprite(1700, 395, "fuocoblu");
        this.physics.add.existing(this.animatedElement, true);

        this.animatedElement2 = this.add.sprite(3300, 320, "fuocoblu");
        this.physics.add.existing(this.animatedElement2, true);
        
        this.animatedElement3 = this.add.sprite(4280, 395, "fuocoblu");
        this.physics.add.existing(this.animatedElement3, true);

        this.animatedElement4 = this.add.sprite(6200, 265, "fuocoblu");
        this.physics.add.existing(this.animatedElement4, true);

        //spritesheet animata del fumo
        this.animatedElement5 = this.add.sprite(7300, 190, "fumo");
        this.physics.add.existing(this.animatedElement5, true);

        this.animatedElement6 = this.add.sprite(8400, 190, "fumo");
        this.physics.add.existing(this.animatedElement6, true);

        this.animatedElement7 = this.add.sprite(11300, 150, "fumo");
        this.physics.add.existing(this.animatedElement7, true);
      

        //tubo fummo
        this.tubofumo = this.add.image(7300, 10, "tubofumo");
        this.tubofumo = this.add.image(8400, 10, "tubofumo");
        this.tubofumo = this.add.image(11300, 0, "tubofumo");
        

        this.createStaticTubi();
        this.createStaticCisterne();
        
        this.createUI();

        this.createStaticPlatforms();
        this.createStaticPlatforms2();
        this.createStaticPlatforms3();
        this.createStaticPlatforms4();
        this.createStaticPlatforms5();

        this.createStaticBarili();
        this.createStaticBarili2();

        this.insertOggetti();
        this.insertOggetti2();

        this.insertUIFiori();

        this.initAnimations();
        this.initAnimations2();
        this.initAnimations3();
        this.initAnimations4(); 
        this.initAnimations5(); 
        this.initAnimations6();
        this.initAnimations7();


        this.initAnimations9();
        this.initAnimations10();

        this.spritetutorial();
        this.spritepetrolio();

        this.Pausa();
    }

    createUI() {
        //vite player
        this.lives1 = this.add.image(640, 20, "vita1");
        this.lives1.setOrigin(0,0);
        this.lives1.setScrollFactor(0, 0);
        this.lives1.visible = false;

        this.lives2 = this.add.image(640, 20, "vita2");
        this.lives2.setOrigin(0,0);
        this.lives2.setScrollFactor(0, 0);
        this.lives2.visible = false;

        this.lives3 = this.add.image(640, 20, "vita3");
        this.lives3.setOrigin(0,0);
        this.lives3.setScrollFactor(0, 0);
        this.lives3.visible = true;


        //punteggio
        this.uiScore0 = this.add.image(0,10,"punto0");
        this.uiScore0.setOrigin(0,0);
        this.uiScore0.setScale(0.2);
        this.uiScore0.setScrollFactor(0, 0);
        this.uiScore0.visible = true;

        this.uiScore1 = this.add.image(0,10,"punto1");
        this.uiScore1.setOrigin(0,0);
        this.uiScore1.setScale(0.2);
        this.uiScore1.setScrollFactor(0, 0);
        this.uiScore1.visible = false;

        this.uiScore2 = this.add.image(0,10,"punto2");
        this.uiScore2.setOrigin(0,0);
        this.uiScore2.setScale(0.2);
        this.uiScore2.setScrollFactor(0, 0);
        this.uiScore2.visible = false;

        this.uiScore3 = this.add.image(0,10,"punto3");
        this.uiScore3.setOrigin(0,0);
        this.uiScore3.setScale(0.2);
        this.uiScore3.setScrollFactor(0, 0);
        this.uiScore3.visible = true;

        this.uiScore4 = this.add.image(0,10,"punto4");
        this.uiScore4.setOrigin(0,0);
        this.uiScore4.setScale(0.2);
        this.uiScore4.setScrollFactor(0, 0);
        this.uiScore4.visible = false;

        this.uiScore5 = this.add.image(0,10,"punto5");
        this.uiScore5.setOrigin(0,0);
        this.uiScore5.setScale(0.2);
        this.uiScore5.setScrollFactor(0, 0);
        this.uiScore5.visible = false;

        this.freccia = this.add.sprite(11800, 200, "freccia");
        this.freccia.setInteractive()
        this.freccia.on ("pointerdown", () =>{
        this.scene.start('Boss');
        });

        this.freccia2 = this.add.sprite(11800, 200, "freccia2");
        this.freccia2.setInteractive()
        this.freccia2.on ("pointerdown", () =>{

        this.scene.launch('fallito')
        this.scene.pause();
        });
    }
    
    
    createStaticPlatforms(){
        this.staticPlatforms = this.physics.add.staticGroup({
            key: "piattaformine2",
            repeat: 1,
            setXY:{
                x: 900,
                y: 400,
                stepX: 1180,
                stepY: 0
            }
        });

        this.physics.add.collider(this.staticPlatforms, this.player);
    } 

    createStaticPlatforms2(){
        this.staticPlatforms2 = this.physics.add.staticGroup({
            key: "piattaformine",
            repeat: 1,
            setXY:{
                x: 1700,
                y: 300,
                stepX: 700,
                stepY: 0
            }
        });

        this.physics.add.collider(this.staticPlatforms2, this.player);
    } 

    createStaticPlatforms3(){
        this.staticPlatforms3 = this.physics.add.staticGroup({
            key: "piattaformine2",
            repeat: 1,
            setXY:{
                x: 3500,
                y: 340,
                stepX: 1206,
                stepY: 0
            }
        });

        this.physics.add.collider(this.staticPlatforms3, this.player);
    } 

    createStaticPlatforms4(){
        this.staticPlatforms4 = this.physics.add.staticGroup({
            key: "piattaformine",
            repeat: 1,
            setXY:{
                x: 6700,
                y: 380,
                stepX: 2200,
                stepY: 0
            }
        });

        this.physics.add.collider(this.staticPlatforms4, this.player);
    } 

    createStaticPlatforms5(){
        this.staticPlatforms5 = this.physics.add.staticGroup({
            key: "piattaformine",
            repeat: 1,
            setXY:{
                x: 9250,
                y: 350,
                stepX: 1140,
                stepY: 20
            }
        });

        this.physics.add.collider(this.staticPlatforms5, this.player);
    } 

    createStaticBarili(){
        this.staticBarili = this.physics.add.staticGroup({
            key: "barili",
            repeat: 1,
            setXY:{
                x: 1450,
                y: 385,
                stepX: 2600,
                stepY: -0
            }
        });

        this.physics.add.collider(this.staticBarili, this.player);
    } 

    createStaticBarili2(){
        this.staticBarili2 = this.physics.add.staticGroup({
            key: "barili2",
            repeat: 1,
            setXY:{
                x: 3100,
                y: 337,
                stepX: 2900,
                stepY: -53
            }
        });

        this.physics.add.collider(this.staticBarili2, this.player);
    } 

    
    createStaticTubi(){
        this.staticTubi = this.physics.add.staticGroup({
            key: "tubo",
            repeat: 1,
            setXY:{
                x: 7100,
                y: 160,
                stepX: 2900,
                stepY: 10
            }
        });

        this.physics.add.collider(this.staticTubi, this.player);
    } 


    createStaticCisterne(){
        this.staticCisterne = this.physics.add.staticGroup({
            key: "cisterna",
            repeat: 1,
            setXY:{
                x: 5100,
                y: 100,
                stepX: 3000,
                stepY: 80
            }
        });

        this.physics.add.collider(this.staticCisterne, this.player);
    } 


    insertOggetti() {
        this.oggetti = [];
        for (let i = 0; i < 50; i++) {
            const fiori = this.add.image(1000 + 2500*i, 0,  "fiori");
            fiori.setOrigin(0, 1);
            this.oggetti.push(fiori);
        }
        // Creiamo il gruppo per la gestione della fisica
        this.oggettiGroup = this.physics.add.group(this.oggetti);
        // I fiori devono fermarsi sul pavimento/fondo
        this.physics.add.collider(this.floorfiore1, this.oggettiGroup);
        this.physics.add.collider(this.floorfiore2, this.oggettiGroup);
        this.physics.add.collider(this.floorfiore3, this.oggettiGroup);
        this.physics.add.collider(this.floor3, this.oggettiGroup);
        this.physics.add.collider(this.floor4, this.oggettiGroup);
        this.physics.add.collider(this.floor5, this.oggettiGroup);
        this.physics.add.collider(this.floor6, this.oggettiGroup);
        this.physics.add.collider(this.floor7, this.oggettiGroup);
        this.physics.add.collider(this.floor8, this.oggettiGroup);
        this.physics.add.collider(this.floor9, this.oggettiGroup);
        this.physics.add.collider(this.floor10, this.oggettiGroup);
        this.physics.add.collider(this.floor11, this.oggettiGroup);
        this.physics.add.collider(this.staticBarili, this.oggettiGroup);
        this.physics.add.collider(this.staticBarili2, this.oggettiGroup);
        this.physics.add.collider(this.staticPlatforms, this.oggettiGroup);
        this.physics.add.collider(this.staticPlatforms2, this.oggettiGroup);
        this.physics.add.collider(this.staticPlatforms3, this.oggettiGroup);
        this.physics.add.collider(this.staticPlatforms4, this.oggettiGroup);
        this.physics.add.collider(this.staticPlatforms5, this.oggettiGroup);
    }

    insertUIFiori(){
        this.physics.add.collider(this.floorlava, this.oggettiGroup);
        this.physics.add.collider(this.floorlava2, this.oggettiGroup);
        this.physics.add.overlap(this.player, this.oggettiGroup, this.updateScore, null, this);
    }

    insertLava(){
        this.physics.add.collider(this.floorlava, this.player);
        this.physics.add.collider(this.floorlava2, this.player);
        this.physics.add.overlap(this.player, this.floorlava2, this.updateLives, null, this);
        this.physics.add.overlap(this.player, this.floorlava, this.updateLives, null, this);
    }


    insertOggetti2(){
        this.oggetti2 = this.physics.add.group({
            key: "nemici",
            repeat: 10,
            setXY: {
                x: 750,
                y: 80,
                stepX: 500,
                stepY: 0
            }
        });

	// rimbalzo
        this.oggetti2.children.iterate(function(fiori) {
            fiori.setBounce(1,1);
        });

        this.physics.add.collider(this.oggetti2, this.floor2);
        this.physics.add.collider(this.oggetti2, this.floor3);
        this.physics.add.collider(this.oggetti2, this.floor4);
        this.physics.add.collider(this.oggetti2, this.floor5);
        this.physics.add.collider(this.oggetti2, this.floor6);
        this.physics.add.collider(this.oggetti2, this.floor7);
        this.physics.add.collider(this.oggetti2, this.floor8);
        this.physics.add.collider(this.oggetti2, this.floor9);
        this.physics.add.collider(this.oggetti2, this.floor10);
        this.physics.add.collider(this.oggetti2, this.floor11);
     
        this.physics.add.collider(this.oggetti2, this.staticPlatforms);
        this.physics.add.overlap(this.player, this.oggetti2, this.updateLives, null, this);
        this.physics.add.overlap(this.player, this.floorlava, this.updateLives, null, this);
        this.physics.add.overlap(this.player, this.floorlava2, this.updateLives, null, this);
    }

    //regola animazione fuoco
    initAnimations() {
        this.anims.create({
          key: "fuocoblu",
          frames: this.anims.generateFrameNumbers("fuocoblu", {
            start: 0,
            end: 16,
          }),
          frameRate: 9,
          repeat: -1,
        });
        
        this.animatedElement.anims.play("fuocoblu");
        this.physics.add.overlap(this.player, this.animatedElement, this.updateLives, null, this);
    }

    initAnimations2() {
        this.anims.create({
          key: "fuocoblu",
          frames: this.anims.generateFrameNumbers("fuocoblu", {
            start: 3,
            end: 16,
          }),
          frameRate: 10,
          repeat: -1,
        });
        
        this.animatedElement2.anims.play("fuocoblu");
        this.physics.add.overlap(this.player, this.animatedElement2, this.updateLives, null, this);
    }
    
    initAnimations3() {
        this.anims.create({
          key: "fuocoblu",
          frames: this.anims.generateFrameNumbers("fuocoblu", {
            start: 2,
            end: 16,
          }),
          frameRate: 10, 
          repeat: -1,
        });
        
        this.animatedElement3.anims.play("fuocoblu");
        this.physics.add.overlap(this.player, this.animatedElement3, this.updateLives, null, this);
    }

    initAnimations4() {
        this.anims.create({
          key: "fuocoblu",
          frames: this.anims.generateFrameNumbers("fuocoblu", {
            start: 2, 
            end: 16, 
          }),
          frameRate: 10, 
          repeat: -1, 
        });
        
        this.animatedElement4.anims.play("fuocoblu");
        this.physics.add.overlap(this.player, this.animatedElement4, this.updateLives, null, this);
    }

    initAnimations5() {
        this.anims.create({
          key: "fumo",
          frames: this.anims.generateFrameNumbers("fumo", {
            start: 0, 
            end: 10,
          }),
          frameRate: 10,
          repeat: -1,
        });
        
        this.animatedElement5.anims.play("fumo");
        this.physics.add.overlap(this.player, this.animatedElement5, this.updateLives, null, this);
    }

    initAnimations6() {
        this.anims.create({
          key: "fumo",
          frames: this.anims.generateFrameNumbers("fumo", {
            start: 0, 
            end: 10,
          }),
          frameRate: 10,
          repeat: -1,
        });
        
        this.animatedElement6.anims.play("fumo");
        this.physics.add.overlap(this.player, this.animatedElement6, this.updateLives, null, this);
    }

    initAnimations7() {
        this.anims.create({
          key: "fumo",
          frames: this.anims.generateFrameNumbers("fumo", {
            start: 0, 
            end: 10,
          }),
          frameRate: 10,
          repeat: -1,
        });
        
        this.animatedElement7.anims.play("fumo");
        this.physics.add.overlap(this.player, this.animatedElement7, this.updateLives, null, this);
    }

    initAnimations9() {
        this.anims.create({
          key: "freccia",
          frames: this.anims.generateFrameNumbers("freccia", {
            start: 0, 
            end: 3,
          }),
          frameRate: 10,
          repeat: -1,
        });
        
        this.freccia.anims.play("freccia");
    }

    initAnimations10() {
        this.anims.create({
          key: "freccia2",
          frames: this.anims.generateFrameNumbers("freccia2", {
            start: 0, 
            end: 3,
          }),
          frameRate: 10,
          repeat: -1,
        });
        
        this.freccia2.anims.play("freccia2");
    }

    spritetutorial() {
        this.anims.create({
          key: "comandi",
          frames: this.anims.generateFrameNumbers("comandi", {
            start: 0,
            end: 1,
          }),
          frameRate: 3,
          repeat: -1,
        });
        
        this.tutorial.anims.play("comandi");
    }
 
    spritepetrolio() {
        this.anims.create({
          key: "petrolio",
          frames: this.anims.generateFrameNumbers("petrolio", {
            start: 0,
            end: 7,
          }),
          frameRate: 5,
          repeat: -1,
        });
        
        this.petrolio.anims.play("petrolio");
    }
    
    update() {
        this.animateBackground();
        this.player.manageMovements();
        this.manageGreenEnergyLaunch();
        this.manageGreenEnergyLaunch2();
        this.manageGreenEnergyLaunch3();
        this.updateScoreImage();
        this.updateLivesImage();
        this.checkSceneEnd();
    }

    updateScoreImage(){
        if(this.game.gameState.score == 0){
            this.uiScore0.visible = true;
            this.uiScore1.visible = false;
            this.uiScore2.visible = false;
            this.uiScore3.visible = false;
            this.uiScore4.visible = false;
            this.uiScore5.visible = false;
        } else if (this.game.gameState.score == 1){
            this.uiScore0.visible = false;
            this.uiScore1.visible = true;
            this.uiScore2.visible = false;
            this.uiScore3.visible = false;
            this.uiScore4.visible = false;
            this.uiScore5.visible = false;       
         } else if (this.game.gameState.score == 2){
            this.uiScore0.visible = false;
            this.uiScore1.visible = false;
            this.uiScore2.visible = true;
            this.uiScore3.visible = false;
            this.uiScore4.visible = false;
            this.uiScore5.visible = false;
        } else if (this.game.gameState.score == 3){
            this.uiScore0.visible = false;
            this.uiScore1.visible = false;
            this.uiScore2.visible = false;
            this.uiScore3.visible = true;
            this.uiScore4.visible = false;
            this.uiScore5.visible = false;        
        } else if (this.game.gameState.score == 4){
            this.uiScore0.visible = false;
            this.uiScore1.visible = false;
            this.uiScore2.visible = false;
            this.uiScore3.visible = false;
            this.uiScore4.visible = true;
            this.uiScore5.visible = false;
        } else if (this.game.gameState.score == 5){
            this.uiScore0.visible = false;
            this.uiScore1.visible = false;
            this.uiScore2.visible = false;
            this.uiScore3.visible = false;
            this.uiScore4.visible = false;
            this.uiScore5.visible = true;        
        }     
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

    animateBackground() {
        //facciamo muovere la camera da metà schermo
        this.cameras.main.followOffset.y = this.player.body.y + this.player.height/2 - this.game.config.height / 2; 
        
        if (this.player.body.x <= this.game.config.width/2) {
            this.cameras.main.followOffset.x = - this.game.config.width/2 + this.player.body.x; 
        }

        this.background1.tilePositionX = this.cameras.main.scrollX * 0.5;
        this.background2.tilePositionX = this.cameras.main.scrollX * 0.8;
        this.background3.tilePositionX = this.cameras.main.scrollX * 1;
        this.background4.tilePositionX = this.cameras.main.scrollX * 1;

    }

    updateScore(player, fiori) {
        this.game.gameState.score += 1;
        
        this.updateScoreImage();
        fiori.destroy();
    }

    updateLives() {
        console.log(this.game.gameState.lives);
        this.game.gameState.lives--;
        this.updateLivesImage();
        if (this.game.gameState.lives == 0) {
            this.game.gameState.lives = 3;
           this.scene.start("gameover");
        }
        this.player.die();
    }

    updateFire(player, oggetti2) {
        oggetti2.destroy();
    }

    manageGreenEnergyLaunch() {
        const minTimeBetweenLaunches = 500;
        const lastGreenEnergyLaunchTime = this.time.now - this.lastGreenEnergy;

        if (this.keySPACE.isDown && this.keyD.isDown && lastGreenEnergyLaunchTime > minTimeBetweenLaunches) {

            this.lastGreenEnergy = this.time.now;
            const greenenergy = new GreenEnergy(this, this.player.x + 90, this.player.y - 80, this.player.flipX);

            this.physics.add.collider(greenenergy, this.oggetti2, this.destroyOggetti2, null, this);
            greenenergy.fire();
        }
    }

    manageGreenEnergyLaunch2() {
        const minTimeBetweenLaunches = 500;
        const lastGreenEnergyLaunchTime = this.time.now - this.lastGreenEnergy;

        if (this.keySPACE.isDown && this.keyA.isDown && lastGreenEnergyLaunchTime > minTimeBetweenLaunches) {

            this.lastGreenEnergy = this.time.now;
            const greenenergy = new GreenEnergy(this, this.player.x + 10, this.player.y - 80, this.player.flipX);

            this.physics.add.collider(greenenergy, this.oggetti2, this.destroyOggetti2, null, this);
            greenenergy.fire();
        }
    }

    manageGreenEnergyLaunch3() {

        const minTimeBetweenLaunches = 500;
        const lastGreenEnergyLaunchTime = this.time.now - this.lastGreenEnergy;

        if (this.keySPACE.isDown && lastGreenEnergyLaunchTime > minTimeBetweenLaunches) {

            this.lastGreenEnergy = this.time.now;
            const greenenergy = new GreenEnergy(this, this.player.x + 90, this.player.y - 80, this.player.flipX);

            this.physics.add.collider(greenenergy, this.oggetti2, this.destroyOggetti2, null, this);
            greenenergy.fire();
        }
    }

    destroyOggetti2(greenenergy, oggetti2) {
        greenenergy.destroy(this.player, oggetti2);
        this.updateFire(this.player, oggetti2);
    }

    Pausa(){
        this.pausa = this.add.image(1200, 20, "pausa");
        this.pausa.setOrigin(0.5, 0.1);
        this.pausa.setScale(0.5);
        this.pausa.setScrollFactor(0, 0);
        this.pausa.setInteractive()
    
        this.pausa.on("pointerdown", ()=>{ 
        this.scene.launch('pausa')
        this.scene.pause();

    });
    }

    checkSceneEnd(){
       if (this.game.gameState.score == 5){
        this.freccia.visible = true;
        this.freccia2.visible = false;
       } else if (this.game.gameState.score != 5){
        this.freccia.visible = false;
        this.freccia2.visible = true;
       }

    }

}