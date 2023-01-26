export default class Fireball extends Phaser.GameObjects.Sprite {

    cursorKeys;
    keySpace;
    initialPosition;
    floorHeight;
    stepLength; 
    isJumping; 
    maxWidth;

    constructor(scene, x, y, maxWidth) {
        super(scene, x, y, "fireball");
        scene.add.existing(this);
        this.initialPosition = 0;
        this.floorHeight = y;
        scene.physics.add.existing(this);
        this.body.setAllowGravity(true);
        this.goingLeft = true;
        this.maxWidth = maxWidth;
    }

    create(){
        this.enemyFireballs();
    }

    enemyFireballs(){
        if (this.goingLeft){
            this.body.setVelocityX(-400);
        };
    }
}