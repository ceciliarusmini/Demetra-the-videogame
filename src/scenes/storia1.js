export default class Storia1 extends Phaser.Scene {

    background;

    constructor(){
		super("storia1");
    }

    init(){
        console.log("storia1 - Executing init()");
    }

    preload() {
        console.log("storia1 - Executing preload()");
        
        this.load.image("storia1", "assets/UI/schermate/storia1.png");
        this.load.image("frecciastoria_dx", "assets/UI/bottoni/frecciastoria_dx.png");
        this.load.image("+", "assets/UI/bottoni/+.png");
        this.load.image("leggi", "assets/UI/bottoni/storia.png");
    }

    create(){
        console.log("storia1 - Executing create()");

        this.storia1 = this.add.image(0, 0, "storia1");
        this.storia1.setOrigin(0,0);

        this.avanti = this.add.image(1260, 360, "frecciastoria_dx");
        this.avanti.setOrigin(1,0);
        this.avanti.setScale(0.2);

        this.avanti.setInteractive();
        this.avanti.on("pointerdown", ()=>{ 
            this.scene.start("storia2");
        });

        this.avantiX = this.add.image(100, 0, "+");
        this.avantiX.setOrigin(1,0);
        this.avantiX.setScrollFactor(0, 0);
        this.avantiX.setInteractive()

        this.avantiX.on("pointerdown", ()=>{ 
            this.scene.launch('testo1')
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

        if (this.avantiX.on("pointerover", ()=> {
            this.avantiX.alpha=0.5;
        }));
        if(this.avantiX.on("pointerout", ()=> {
            this.avantiX.alpha=1;
        }));
    }
}