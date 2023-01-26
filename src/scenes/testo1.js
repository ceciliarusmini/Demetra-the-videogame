export default class testo1 extends Phaser.Scene {

    background;

    constructor(){
		super("testo1");
    }

    init(){
        console.log("testo1 - Executing init()");
    }

    preload() {
        console.log("testo1 - Executing preload()");
        
        this.load.image("testo1", "assets/UI/schermate/testo1.png");
        this.load.image("dxtesti", "assets/UI/bottoni/dxtesti.png");
        this.load.image("x", "assets/UI/bottoni/x.png");
    }

    create(){

        this.pausa = this.add.image(0, 0, "testo1");
        this.pausa.setOrigin(0,0);

        this.avanti = this.add.image(1148, 360, "dxtesti");
        this.avanti.setOrigin(0.5,0.5);

        this.avanti.setInteractive();
        this.avanti.on("pointerdown", ()=>{ 
            this.scene.start("testo1_bis");
        });

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
        if (this.avanti.on("pointerover", ()=> {
            this.avanti.alpha=0.5;
        }));
        if(this.avanti.on("pointerout", ()=> {
            this.avanti.alpha=1;
        }));

        if (this.riprendi.on("pointerover", ()=> {
            this.riprendi.alpha=0.5;
        }));
        if(this.riprendi.on("pointerout", ()=> {
            this.riprendi.alpha=1;
        }));
    }

}