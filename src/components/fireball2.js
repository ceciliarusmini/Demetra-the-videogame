export default class Fireball2 extends Phaser.GameObjects.Sprite {

    cursorKeys;
    keySpace;
    initialPosition;
    floorHeight;
    stepLength; 
    isJumping;
    maxWidth;

    constructor(scene, x, y, maxWidth) {
        super(scene, x, y, "fireball2");
        scene.add.existing(this);
        this.initialPosition = 0;
        this.floorHeight = y;
        scene.physics.add.existing(this);
        this.body.setAllowGravity(true);
        this.goingLeft = true;
        this.maxWidth = maxWidth;
    }

    create(){
        this.enemyFireballs2();
    }

    enemyFireballs2(){
        if (this.goingLeft){
            this.body.setVelocityX(-400);
            this.body.setVelocityY(-350);
        };

    }

}