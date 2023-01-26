export default class testo3 extends Phaser.Scene {

    background;

    constructor(){
		super("testo3");
    }

    init(){
        console.log("testo3 - Executing init()");
    }

    preload() {
        console.log("testo3 - Executing preload()");
        
        this.load.image("dxtesti", "assets/UI/bottoni/dxtesti.png");
        this.load.image("testo3", "assets/UI/schermate/testo3.png");
        this.load.image("x", "assets/UI/bottoni/x.png");
    }

    create(){

        this.pausa = this.add.image(0, 0, "testo3");
        this.pausa.setOrigin(0,0);

        this.avanti = this.add.image(1148, 360, "dxtesti");
        this.avanti.setOrigin(0.5, 0.5);

        this.avanti.setInteractive();
        this.avanti.on("pointerdown", ()=>{
            this.scene.stop(); 
            this.scene.start("testo3_bis");
        });

        this.riprendi =  this.add.image(1255, 30, "x");
        this.riprendi.setOrigin(1, 0);

        this.riprendi.setInteractive();
        this.riprendi.on('pointerdown', ()=> {
            this.scene.resume('storia3');
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