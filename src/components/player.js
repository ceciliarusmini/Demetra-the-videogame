export default class Player extends Phaser.GameObjects.Sprite {
 
  keyA;
  keyD;
  keyS;
  keySpace;
  initialPosition;
  floorHeight;
  stepLength; 
  isJumping; 
  isRolling;
  maxWidth;
  prevAnimation;

  
  constructor(scene, x, y, maxWidth) {
    
    super(scene, x, y, "playerrun", "playerscivola", "playershoot");
    scene.add.existing(this);
    this.initialPosition = x;
    this.floorHeight = y;
    this.setOrigin(0, 1);
    


    this.isJumping = false; 
    this.stepLength = 20;
    this.maxWidth = maxWidth;

    this.isRolling = false; 
    this.maxWidth = maxWidth;


    this.keySPACE = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    this.keyA = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    
    this.keyD = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

    this.keyW = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);

    this.keyS = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    
    this.initAnimations();
  }


  initAnimations() {
    
    // corsa
    this.anims.create({
      key: "playerMove",
      frames: this.anims.generateFrameNumbers("playerrun", {
        start: 0, 
        end: 15, 
      }),
      frameRate: 10, 
      repeat: -1, 
    });

    // stop
    this.anims.create({
      key: "playerStop",
      frames: this.anims.generateFrameNumbers("playerrun", {
        start: 4, 
        end: 4, 
      }),
      frameRate: 15, 
      repeat: -1, 
    });

    // stop e shoot
    this.anims.create({
      key: "playerStopAndShoot",
      frames: this.anims.generateFrameNumbers("playershoot", {
        start: 0, 
        end: 3, 
      }),
      frameRate: 15, 
      repeat: -1, 
    });

    // jump
    this.anims.create({
      key: "playerJump",
      frames: this.anims.generateFrameNumbers("playerrun", {
        start: 16,
        end: 16, 
      }),
      frameRate: 10, 
      repeat: -1,
    });

    // jump e shoot
    this.anims.create({
      key: "playerJumpAndShoot",
      frames: this.anims.generateFrameNumbers("playershoot", {
        start: 4,
        end: 5, 
      }),
      frameRate: 10, 
      repeat: -1,
    });


    // rolling
    this.anims.create({
      key: "playerRoll",
      frames: this.anims.generateFrameNumbers("playerscivola", {
        start: 0, 
        end: 2, 
      }),
      frameRate: 15, 
      repeat: -1,
    });

    this.anims.play("playerStop");
  }


  manageAnimations() {

    const curr_anim = this.anims.currentAnim.key; 
    

    if (this.keyS.isDown) {

      if(curr_anim != "playerRoll" && this.body.velocity.x != 0) {
        this.anims.play("playerRoll");
        this.body.setSize(105, 100, false);
      }
      
    } 

    else {

      this.body.setSize(105, 145, true);

      if (this.body.velocity.y != 0 && this.keySPACE.isUp) {

        if (curr_anim != "playerJump") {
          this.anims.play("playerJump");
        }
      }

      else if (this.body.velocity.y != 0 && this.keySPACE.isDown) {

        if (curr_anim != "playerJumpAndShoot") {
          this.anims.play("playerJumpAndShoot");
        }

      }

      else if (this.body.velocity.x != 0) {

        if (curr_anim != "playerMove") {
          this.anims.play("playerMove");
        }

      }

      else if (this.keySPACE.isDown) {

        if (curr_anim != "playerStopAndShoot") {
          this.anims.play("playerStopAndShoot");
        }
      }
    

     
      else {
        this.anims.play("playerStop");
      }

    }

    

    this.flipX = this.body.velocity.x < 0;

    this.prevAnimation = curr_anim
  }


  manageMovements() {

    if (this.keyA.isDown && this.x >= 0) {
      this.body.setVelocityX(-200);
    } 
    
    else if (this.keyD.isDown && this.x <= this.maxWidth - this.displayWidth) {
      this.body.setVelocityX(200);
    } 
    
    else {
      this.body.setVelocityX(0);
    }

    if (this.keyW.isDown && this.body.touching.down) {

      this.isJumping = true;
      this.body.setVelocityY(-400);
      
    }

    
    this.manageAnimations();
  }


  die() {
    
    this.x = this.initialPosition;

  }

}