export default class Storia3 extends Phaser.Scene {

    background;

    constructor(){
		super("storia3");
    }

    init(){
        console.log("storia3 - Executing init()");
    }

    preload() {
        console.log("storia3 - Executing preload()");
        
        this.load.image("storia3", "assets/UI/schermate/storia3.png");
        this.load.image("esci", "assets/UI/bottoni/esci.png");
        this.load.image("frecciastoria_sx", "assets/UI/bottoni/frecciastoria_sx.png");
        this.load.image("+", "assets/UI/bottoni/+.png");
        
    }

    create(){

        this.storia3 = this.add.image(0, 0, "storia3");
        this.storia3.setOrigin(0,0);

        this.indietro = this.add.image(20, 360, "frecciastoria_sx");
        this.indietro.setOrigin(0,0);
        this.indietro.setScale(0.2);

        this.indietro.setInteractive();
            this.indietro.on("pointerdown", ()=>{ 
            this.scene.start("storia2");
        });

        this.avantiX = this.add.image(100, 0, "+");
        this.avantiX.setOrigin(1,0);
        this.avantiX.setScrollFactor(0, 0);
        this.avantiX.setInteractive()

        this.avantiX.on("pointerdown", ()=>{ 
            this.scene.launch('testo3')
            this.scene.pause();
        });

        this.escibutton =  this.add.image(70, 580, "esci");
        this.escibutton.setOrigin(0.5, 0.1);
        this.escibutton.setScale(0.7);
        this.escibutton.setInteractive();

        this.escibutton.on("pointerdown", ()=>{ 
            this.scene.stop("storia3");
            this.scene.start("scene_welcome_menu");
        });

    
    }

    update(){
        //trasarenza dei bottoni quando sei sopra
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

        if (this.escibutton.on("pointerover", ()=> {
            this.escibutton.alpha=0.5;
        }));
        if(this.escibutton.on("pointerout", ()=> {
            this.escibutton.alpha=1;
        }));
    }

}