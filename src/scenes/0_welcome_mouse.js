export default class SceneWelcomeMenu extends Phaser.Scene {

    background;        

    constructor(){
		super("scene_welcome_menu");
    }

    init(){
        console.log("scene_welcome - Executing init()");
    }

    preload() {
        console.log("scene_welcome - Executing preload()");
        
        //background
        this.load.image("background_base", "assets/images/background/background.png");
        this.load.image("playButton", "assets/UI/bottoni/play_button.png");

        //spritesheet
        const player_spritesheet_config = {
            frameWidth: 105,
            frameHeight: 145,
        }; 
        this.load.spritesheet("playerrun", "assets/images/characters/playerrunandjump.png", player_spritesheet_config);

        const playerscivola_spritesheet_config = {
            frameWidth: 105,
            frameHeight: 100,
        }; 
        this.load.spritesheet("playerscivola", "assets/images/characters/scivola.png", playerscivola_spritesheet_config);

        const playershoot_spritesheet_config = {
            frameWidth: 105,
            frameHeight: 145,
        }; 
        this.load.spritesheet("playershoot", "assets/images/characters/spara.png", playershoot_spritesheet_config);
        
        this.load.spritesheet("fuocoblu", "assets/images/environment_elements/fuoco_caverna.png", {
            frameWidth: 75,
            frameHeight: 125,
        })
    
        this.load.spritesheet("fumo", "assets/images/environment_elements/fumo.png", {
            frameWidth: 113,
            frameHeight: 180,
        });

        this.load.spritesheet("enemy", "assets/images/characters/ade.png", {
            frameWidth: 240,
            frameHeight: 270,
        });

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
        


        // elementi nella scena
        this.load.image("fiori", "assets/images/environment_elements/fiori.png");
        this.load.image("nemici", "assets/images/environment_elements/nemici.png");
        this.load.image("greenenergy", "assets/images/weapons/crocs.png");
        this.load.image("piattaformine", "assets/images/environment_elements/piattaforma.png");
        this.load.image("storia", "assets/UI/bottoni/storia.png");
        this.load.image("crediti", "assets/UI/bottoni/crediti.png");
        this.load.image("fireball", "assets/images/weapons/fireball.png");
    }

    create() {
        console.log("scene_welcome - Executing create()");

        this.background = this.add.image(0, 0, "background_base");
        this.background.setOrigin(0,0);
        
        //UI
        this.playbutton = this.add.image(this.game.config.width/2, 210, "playButton");
        this.playbutton.setOrigin(0.5, 0.1);
        this.playbutton.setInteractive();

        this.playbutton.on("pointerdown", ()=>{ 
            this.scene.start("inferno");
            this.game.gameState.score = 0;
            this.game.gameState.score = 0;
        });

        this.storiabutton = this.add.image(this.game.config.width/2, 520, "storia");
        this.storiabutton.setOrigin(0.5, 0.1);
        this.storiabutton.setInteractive(); 

        this.storiabutton.on("pointerdown", ()=>{ 
            this.scene.start("storia1");
        });


        this.creditibutton =  this.add.image(this.game.config.width/2, 600, "crediti");
        this.creditibutton.setOrigin(0.5, 0.1);
        this.creditibutton.setInteractive();

        this.creditibutton.on("pointerdown", ()=>{ 
            this.scene.start("crediti");
        });

    }

    update(){
        //trasarenza dei bottoni quando sei sopra
        if (this.playbutton.on("pointerover", ()=> {
            this.playbutton.alpha=0.5;
        }));
        if(this.playbutton.on("pointerout", ()=> {
            this.playbutton.alpha=1;
        }));

        if (this.storiabutton.on("pointerover", ()=> {
            this.storiabutton.alpha=0.5;
        }));
        if(this.storiabutton.on("pointerout", ()=> {
            this.storiabutton.alpha=1;
        }));

        if (this.creditibutton.on("pointerover", ()=> {
            this.creditibutton.alpha=0.5;
        }));
        if(this.creditibutton.on("pointerout", ()=> {
            this.creditibutton.alpha=1;
        }));
    }
};
