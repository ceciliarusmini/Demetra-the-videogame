export default class Fallito extends Phaser.Scene {

    background;

    constructor(){
		super("fallito");
    }

    init(){
        console.log("fallito - Executing init()");
    }

    preload() {
        console.log("fallito - Executing preload()");
        
        this.load.image("fallito", "assets/UI/schermate/fallito.png");
        this.load.image("replayButton", "assets/UI/bottoni/ricomincia.png");
        this.load.image("esci", "assets/UI/bottoni/esci.png");
        this.load.image("x", "assets/UI/bottoni/x.png");
    }

    create(){
        this.fallito = this.add.image(0, 0, "fallito");
        this.fallito.setOrigin(0,0);

        this.x =  this.add.image(990, 150, "x");
        this.x.setOrigin(0.5, 0.1);
        this.x.setInteractive();
        this.x.on('pointerdown', ()=> {
        this.scene.resume('inferno');
        this.scene.stop();
        })

        this.replaybutton =  this.add.image(590, 470, "replayButton");
        this.replaybutton.setOrigin(0.5, 0.1);
        this.replaybutton.setInteractive(); 

        this.replaybutton.on("pointerdown", ()=>{ 
        this.scene.start("inferno");
        this.game.gameState.lives = 3;
        this.game.gameState.score = 0;
        });

        this.escibutton =  this.add.image(690, 470, "esci");
        this.escibutton.setOrigin(0.5, 0.1);
        this.escibutton.setInteractive();

        this.escibutton.setInteractive();
        this.escibutton.on("pointerdown", ()=>{    
        this.scene.start("scene_welcome_menu");
        });
    }
    
    update(){
        //trasarenza dei bottoni quando sei sopra
        if (this.x.on("pointerover", ()=> {
            this.x.alpha=0.5;
        }));
        if(this.x.on("pointerout", ()=> {
            this.x.alpha=1;
        }));

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

}