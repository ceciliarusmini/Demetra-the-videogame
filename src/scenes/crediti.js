export default class Crediti extends Phaser.Scene {

    background;

    constructor(){
		super("crediti");
    }

    init(){
        console.log("crediti - Executing init()");
    }

    preload() {
        console.log("crediti - Executing preload()");
        this.load.image("creditipage", "assets/UI/schermate/creditipage.png")
        this.load.image("playButton", "assets/UI/bottoni/play_button.png");
        this.load.image("esci", "assets/UI/bottoni/esci.png");
    }

    create(){

        this.crediti = this.add.image(0, 0, "creditipage");
        this.crediti.setOrigin(0,0);

        this.playbutton = this.add.image(300, this.game.config.height/1.2, "playButton");
        this.playbutton.setOrigin(0.5, 0.1);

        this.playbutton.setInteractive();
        this.playbutton.on("pointerdown", ()=>{ 
            this.scene.start("inferno");
            this.game.gameState.lives = 3;
            this.game.gameState.score = 0;
        });

        this.escibutton =  this.add.image(90, 580, "esci");
        this.escibutton.setOrigin(0.5, 0.1);
        this.escibutton.setScale(0.7);

        this.escibutton.setInteractive();
        this.escibutton.on("pointerdown", ()=>{    
        this.scene.start("scene_welcome_menu");
    
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

        if (this.escibutton.on("pointerover", ()=> {
            this.escibutton.alpha=0.5;
        }));
        if(this.escibutton.on("pointerout", ()=> {
            this.escibutton.alpha=1;
        }));
    }

}