export default class testo2 extends Phaser.Scene {

    background;

    constructor(){
		super("testo2");
    }

    init(){
        console.log("testo2 - Executing init()");
    }

    preload() {
        console.log("testo2 - Executing preload()");
        
        this.load.image("testo2", "assets/UI/schermate/testo2.png");
        this.load.image("x", "assets/UI/bottoni/x.png");
    }

    create(){

        this.pausa = this.add.image(0, 0, "testo2");
        this.pausa.setOrigin(0,0);

        this.riprendi =  this.add.image(1255, 30, "x");
        this.riprendi.setOrigin(1, 0);

        this.riprendi.setInteractive();
        this.riprendi.on('pointerdown', ()=> {
            this.scene.resume('storia2');
            this.scene.stop();
        })

    }
    update(){
        //trasarenza dei bottoni quando sei sopra

        if (this.riprendi.on("pointerover", ()=> {
            this.riprendi.alpha=0.5;
        }));
        if(this.riprendi.on("pointerout", ()=> {
            this.riprendi.alpha=1;
        }));
    }

}