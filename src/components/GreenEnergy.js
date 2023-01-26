export default class GreenEnergy extends Phaser.GameObjects.Sprite {

    goingRight;
    initialX;
    movementSemiLength;

    constructor(scene, x, y, goingRight) {

		super(scene, x, y, "greenenergy");
        scene.add.existing(this);
        this.initialX = x;
        this.goingRight = goingRight;
        this.floorHeight = y;
        this.setScale(1);
        scene.physics.add.existing(this);
        this.body.setAllowGravity(false);

    }

    fire() {
        if (this.goingRight) {
            this.body.setVelocityX(-400);
        } else {
            this.body.setVelocityX(400);
        }
        this.flipX = this.body.velocity.x < 0;
    }

}