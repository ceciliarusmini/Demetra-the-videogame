export default class Pausa extends Phaser.Scene {

    background;

    constructor(){
		super("pausa");
    }

    init(){
        console.log("pausa - Executing init()");
    }

    preload() {
        console.log("pausa - Executing preload()");
        
        this.load.image("pausamenu", "assets/UI/schermate/pausa.png");
        this.load.image("background_base", "assets/images/background/background.png");
        this.load.image("replayButton", "assets/UI/bottoni/ricomincia.png");
        this.load.image("esci", "assets/UI/bottoni/esci.png");
        this.load.image("riprendi", "assets/UI/bottoni/riprendi.png");
    }

    create(){

        this.pausa = this.add.image(0, 0, "pausamenu");
        this.pausa.setOrigin(0,0);

        this.riprendi =  this.add.image(650, this.game.config.height/2, "riprendi");
        this.riprendi.setOrigin(0.5, 0.1);
        this.riprendi.setInteractive();
        this.riprendi.on('pointerdown', ()=> {
            this.scene.resume('inferno');
            this.scene.stop();
        })


        this.replaybutton =  this.add.image(400, 390, "replayButton");
        this.replaybutton.setOrigin(0.5, 0.1);
        this.replaybutton.setInteractive(); 

        this.replaybutton.on("pointerdown", ()=>{ 
            this.scene.start("inferno");
            this.game.gameState.lives = 3;
            this.game.gameState.score = 0;
        });

        this.escibutton =  this.add.image(900, 390, "esci");
        this.escibutton.setOrigin(0.5, 0.1);
        this.escibutton.setInteractive();

        this.escibutton.on("pointerdown", ()=>{ 
            this.scene.stop("inferno");
            this.scene.start("scene_welcome_menu");
        });
    }
    
    update(){
        //trasarenza dei bottoni quando sei sopra
        if (this.riprendi.on("pointerover", ()=> {
            this.riprendi.alpha=0.5;
        }));
        if(this.riprendi.on("pointerout", ()=> {
            this.riprendi.alpha=1;
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