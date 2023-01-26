export default class Fireball2 extends Phaser.GameObjects.Sprite {

    cursorKeys;
    keySpace;
    initialPosition;
    floorHeight;
    stepLength;
    isJumping;
    maxWidth;

    constructor(scene, x, y, maxWidth) {
        super(scene, x, y, "fireball3");
        scene.add.existing(this);
        this.initialPosition = 0;
        this.floorHeight = y;
        scene.physics.add.existing(this);
        this.body.setAllowGravity(false);
        this.goingLeft = true;

        this.maxWidth = maxWidth;
    }

    create(){
        this.enemyFireballs3();
    }

    enemyFireballs3(){
        if (this.goingLeft){
            this.body.setVelocityX(-200);
        };
    }

}