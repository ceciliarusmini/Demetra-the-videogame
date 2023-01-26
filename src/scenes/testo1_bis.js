export default class testo1_bis extends Phaser.Scene {

    background;

    constructor(){
		super("testo1_bis");
    }

    init(){
        console.log("testo1_bis - Executing init()");
    }

    preload() {
        console.log("testo1_bis - Executing preload()");
        
        this.load.image("testo1", "assets/UI/schermate/testo1.png");
        this.load.image("testo1.5", "assets/UI/schermate/testo1.5.png");
        this.load.image("sxtesti", "assets/UI/bottoni/sxtesti.png");
        this.load.image("x", "assets/UI/bottoni/x.png");
    }

    create(){

        this.pausa = this.add.image(0, 0, "testo1.5");
        this.pausa.setOrigin(0,0);

        this.indietro = this.add.image(132, 360, "sxtesti");
        this.indietro.setOrigin(0.5, 0.5);

        this.indietro.setInteractive();
        this.indietro.on('pointerdown', () =>{
            this.scene.stop();
            this.scene.start('testo1');
        })

        this.riprendi =  this.add.image(1255, 30, "x");
        this.riprendi.setOrigin(1, 0);

        this.riprendi.setInteractive();
        this.riprendi.on('pointerdown', ()=> {
            this.scene.resume('storia1');
            this.scene.stop();
        })
    }

    update(){
        //trasarenza dei bottoni quando sei sopra
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