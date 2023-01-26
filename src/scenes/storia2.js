export default class Storia2 extends Phaser.Scene {

    background;

    constructor(){
		super("storia2");
    }

    init(){
        console.log("storia2 - Executing init()");
    }

    preload() {
        console.log("storia2 - Executing preload()");

        this.load.image("storia2", "assets/UI/schermate/storia2.png");

        this.load.image("frecciastoria_dx", "assets/UI/bottoni/frecciastoria_dx.png");
        this.load.image("+", "assets/UI/bottoni/+.png");
        this.load.image("frecciastoria_sx", "assets/UI/bottoni/frecciastoria_sx.png");
    }

    create(){

        this.storia2 = this.add.image(0, 0, "storia2");
        this.storia2.setOrigin(0,0);

        this.avanti = this.add.image(1260, 360, "frecciastoria_dx");
        this.avanti.setOrigin(1,0);
        this.avanti.setScale(0.2);

        this.avanti.setInteractive();
            this.avanti.on("pointerdown", ()=>{ 
            this.scene.start("storia3");
        });

        
        this.indietro = this.add.image(20, 360, "frecciastoria_sx");
        this.indietro.setOrigin(0,0);
        this.indietro.setScale(0.2);

        this.indietro.setInteractive();
        this.indietro.on("pointerdown", ()=>{ 
            this.scene.start("storia1");
        });

        this.avantiX = this.add.image(100, 0, "+");
        this.avantiX.setOrigin(1,0);
        this.avantiX.setScrollFactor(0, 0);
        this.avantiX.setInteractive()

        this.avantiX.on("pointerdown", ()=>{ 
            this.scene.launch('testo2')
            this.scene.pause();

        });

    }

    update(){
        //trasarenza dei bottoni quando sei sopra
        if (this.avanti.on("pointerover", ()=> {
            this.avanti.alpha=0.5;
        }));
        if(this.avanti.on("pointerout", ()=> {
            this.avanti.alpha=1;
        }));

        if (this.indietro.on("pointerover", ()=> {
            this.indietro.alpha=0.5;
        }));
        if(this.indietro.on("pointerout", ()=> {
            this.indietro.alpha=1;
        }));

        if (this.avantiX.on("pointerover", ()=> {
            this.avantiX.alpha=0.5;
        }));
        if(this.avantiX.on("pointerout", ()=> {
            this.avantiX.alpha=1;
        }));
    }

}