export default class testo3_bis extends Phaser.Scene {

    background;

    constructor(){
		super("testo3_bis");
    }

    init(){
        console.log("testo3_bis - Executing init()");
    }

    preload() {
        console.log("testo3_bis - Executing preload()");
        
        this.load.image("testo3_bis", "assets/UI/schermate/testo3.5.png");
        this.load.image("x", "assets/UI/bottoni/x.png");
        this.load.image("playButton", "assets/UI/bottoni/play_button.png");
        this.load.image("sxtesti", "assets/UI/bottoni/sxtesti.png");
    }

    create(){

        this.pausa = this.add.image(0, 0, "testo3_bis");
        this.pausa.setOrigin(0,0);

        this.riprendi =  this.add.image(1255, 30, "x");
        this.riprendi.setOrigin(1, 0);

        this.riprendi.setInteractive();
        this.riprendi.on('pointerdown', ()=> {
            this.scene.stop();
            this.scene.resume('storia3');
        })

        this.indietro = this.add.image(132, 360, "sxtesti");
        this.indietro.setOrigin(0.5, 0.5);

        this.indietro.setInteractive();
        this.indietro.on('pointerdown', () =>{
            this.scene.stop();
            this.scene.start('testo3');
        })

        this.playButton =  this.add.image(640, 507, "playButton");
        this.playButton.setOrigin(0.5, 0.5);
        this.playButton.setInteractive(); 

        this.playButton.on("pointerdown", ()=>{ 
            this.scene.stop();
            this.scene.stop("storia3");
            this.scene.start("inferno");
            this.game.gameState.lives = 3;
            this.game.gameState.score = 0;
        });
    }

    update(){
        //trasarenza dei bottoni quando sei sopra
        if (this.playButton.on("pointerover", ()=> {
            this.playButton.alpha=0.5;
        }));
        if(this.playButton.on("pointerout", ()=> {
            this.playButton.alpha=1;
        }));

        if (this.indietro.on("pointerover", ()=> {
            this.indietro.alpha=0.5;
        }));
        if(this.indietro.on("pointerout", ()=> {
            this.indietro.alpha=1;
        }));

        if (this.riprendi.on("pointerover", ()=> {
            this.riprendi.alpha=0.5;
        }));
        if(this.riprendi.on("pointerout", ()=> {
            this.riprendi.alpha=1;
        }));
    }

}