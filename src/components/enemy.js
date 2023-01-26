
export default class Enemy extends Phaser.GameObjects.Sprite {

    //vocabolario di robin, servono per il codice
    cursorKeys;
    keySpace;
    initialPosition;
    floorHeight;
    stepLength; // lunghezza del passo
    isJumping; // verifichiamo se l'animazione del giocatore è già in salto o no
    maxWidth;

    // costruttore della classe base Phaser.scene che prende come argomento la scena
    constructor(scene, x, y, maxWidth) {
        super(scene, x, y, "enemy");
        scene.add.existing(this);
        this.initialPosition = x;
        this.floorHeight = y;
        this.setOrigin(0, 1); // punto pivot in basso a sx
        this.setScale(4.0); // scala le dimensioni del giocatore

        // inizializzare valori di alcune proprietà
        this.maxWidth = maxWidth;

        this.initAnimations();
        
    }


    initAnimations() {
       
        this.anims.create({
            key: "enemy", // KEY è il nome univoco dell'animazione
            frames: this.anims.generateFrameNumbers("enemy", {
                start: 0, // frame di partenza
                end: 4, // frame di arrivo,
            }),
            frameRate: 10, 
            repeat: -1 
        
    });
    this.anims.play("enemy"); //facciamo partire l'animazione del personaggio, questa volta fermo
    }

    initPhysics() {
        this.body.setImmovable(true);
        this.body.allowGravity = false;
    }
}