export default class SceneGameOver extends Phaser.Scene {

    background;       

    constructor(){
		super("gameover");
    }

    preload() {
        console.log("gameover");

        this.load.image("gameover", "assets/UI/schermate/haiperso.png");
        this.load.image("replayButton", "assets/UI/bottoni/ricomincia.png");
        this.load.image("esci", "assets/UI/bottoni/esci.png");
    }    

    create() {
        console.log("gameover");

        // immagine gameover
        this.background = this.add.image(0, 0, "gameover");
        this.background.setOrigin(0,0);

        //bottoni ricomincia e esci  
        this.replaybutton =  this.add.image(260, 450, "replayButton");
        this.replaybutton.setOrigin(0.5, 0.5);
        this.replaybutton.setInteractive();

        this.replaybutton.on("pointerdown", ()=>{ 
            this.scene.start("inferno");
            this.game.gameState.lives = 3;
            this.game.gameState.score = 0;
        });

        this.escibutton =  this.add.image(456, 445, "esci");
        this.escibutton.setOrigin(0.5, 0.5);
        this.escibutton.setInteractive();

        this.escibutton.on("pointerdown", ()=>{ 
            this.scene.start("scene_welcome_menu");
        });

    }

    update(){
        //trasarenza dei bottoni quando sei sopra

        if (this.replaybutton.on("pointerover", ()=> {
            this.replaybutton.alpha=0.5;
        }));
        if(this.replaybutton.on("pointerout", ()=> {
            this.replaybutton.alpha=1;
        }));
        if (this.escibutton.on("pointerover", ()=> {
            this.escibutton.alpha=0.5;
        }));
        if(this.escibutton.on("pointerout", ()=> {
            this.escibutton.alpha=1;
        }));
    }

};
