class Character extends MovableObject{

IMAGES_IDLE =[
        `./img/cat0${characterNumber}/idle/cat0${characterNumber}_idle_1.png`,
        `./img/cat0${characterNumber}/idle/cat0${characterNumber}_idle_2.png`,
        `./img/cat0${characterNumber}/idle/cat0${characterNumber}_idle_3.png`,
        `./img/cat0${characterNumber}/idle/cat0${characterNumber}_idle_4.png`,
        `./img/cat0${characterNumber}/idle/cat0${characterNumber}_idle_5.png`,
        `./img/cat0${characterNumber}/idle/cat0${characterNumber}_idle_6.png`,
        `./img/cat0${characterNumber}/idle/cat0${characterNumber}_idle_7.png`,
        `./img/cat0${characterNumber}/idle/cat0${characterNumber}_idle_8.png`,        
    ];
    IMAGES_WALK =[
        `./img/cat0${characterNumber}/walk/cat0${characterNumber}_walk_1.png`,
        `./img/cat0${characterNumber}/walk/cat0${characterNumber}_walk_2.png`,
        `./img/cat0${characterNumber}/walk/cat0${characterNumber}_walk_3.png`,
        `./img/cat0${characterNumber}/walk/cat0${characterNumber}_walk_4.png`,
        `./img/cat0${characterNumber}/walk/cat0${characterNumber}_walk_5.png`,
        `./img/cat0${characterNumber}/walk/cat0${characterNumber}_walk_6.png`,
        `./img/cat0${characterNumber}/walk/cat0${characterNumber}_walk_7.png`,
        `./img/cat0${characterNumber}/walk/cat0${characterNumber}_walk_8.png`,
    ];
    IMAGES_FALL = [
        `./img/cat0${characterNumber}/fall/cat0${characterNumber}_fall_1.png`,
        `./img/cat0${characterNumber}/fall/cat0${characterNumber}_fall_2.png`,
        `./img/cat0${characterNumber}/fall/cat0${characterNumber}_fall_3.png`
    ];
    IMAGES_JUMP = [
        `./img/cat0${characterNumber}/jump/cat0${characterNumber}_jump_1.png`,
        `./img/cat0${characterNumber}/jump/cat0${characterNumber}_jump_2.png`,
        `./img/cat0${characterNumber}/jump/cat0${characterNumber}_jump_3.png`,
        `./img/cat0${characterNumber}/jump/cat0${characterNumber}_jump_4.png`,
    ];
    IMAGES_ATTACK = [
        `./img/cat0${characterNumber}/attack/cat0${characterNumber}_attack_1.png`,
        `./img/cat0${characterNumber}/attack/cat0${characterNumber}_attack_2.png`,
        `./img/cat0${characterNumber}/attack/cat0${characterNumber}_attack_3.png`,
        `./img/cat0${characterNumber}/attack/cat0${characterNumber}_attack_4.png`,
        `./img/cat0${characterNumber}/attack/cat0${characterNumber}_attack_5.png`,
        `./img/cat0${characterNumber}/attack/cat0${characterNumber}_attack_6.png`,
        `./img/cat0${characterNumber}/attack/cat0${characterNumber}_attack_7.png`
    ];
    IMAGES_HURT = [
        `./img/cat0${characterNumber}/hurt/cat0${characterNumber}_hurt_1.png`,
        `./img/cat0${characterNumber}/hurt/cat0${characterNumber}_hurt_2.png`,
        `./img/cat0${characterNumber}/hurt/cat0${characterNumber}_hurt_3.png`,
        `./img/cat0${characterNumber}/hurt/cat0${characterNumber}_hurt_4.png`
        
    ];
    IMAGES_DEATH = [
        `./img/cat0${characterNumber}/die/cat0${characterNumber}_die_1.png`,
        `./img/cat0${characterNumber}/die/cat0${characterNumber}_die_2.png`,
        `./img/cat0${characterNumber}/die/cat0${characterNumber}_die_3.png`,
        `./img/cat0${characterNumber}/die/cat0${characterNumber}_die_4.png`,
        `./img/cat0${characterNumber}/die/cat0${characterNumber}_die_5.png`,
        `./img/cat0${characterNumber}/die/cat0${characterNumber}_die_6.png`,
        `./img/cat0${characterNumber}/die/cat0${characterNumber}_die_7.png`,
        `./img/cat0${characterNumber}/die/cat0${characterNumber}_die_8.png`
    ];
    
    height = 160;
    width = 160;
    speed = 5;
    offset_x = 30;
    offset_y = 30;
    offset_width = 60;
    offset_height = 30;
    currentImage = 0;
    world;
    walkingSound = new Audio('audio/walk.mp3');
   
    energy = 100 ;

    constructor(){
        super().loadImage(`./img/cat0${characterNumber}/idle/cat0${characterNumber}_idle_1.png`);

        this.loadImages(this.IMAGES_WALK);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_FALL);
        this.loadImages(this.IMAGES_JUMP);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEATH);
        this.animate();
        this.applyGravity();
    }

    isFalling(){
        return this.speed_y < 0 && this.isAboveGround();
    }


    animate(){
        setInterval(() => {
            if(this.world.keyboard.RIGHT && this.x < this.world.level.level_end && !this.isDead()){
                this.moveRight();
            }
            if(this.world.keyboard.LEFT && this.x > 100 && !this.isDead()){
                this.moveLeft();
            }
            if(this.world.keyboard.UP &! this.isAboveGround() && !this.isDead()){
                this.jump();
            }
            this.world.camera_x = -this.x +100;
        }, 16);

        setInterval(() => {
            this.walkingSound.pause();
            if(this.isDead()){
                this.loadImage('../img/cat01/die/cat01_die_8.png')
            }else if(this.isAboveGround() && this.speed_y < 0){
                this.playAnimation(this.IMAGES_FALL);
            }else if(this.isAboveGround() && this.speed_y > 0){
                this.playAnimation(this.IMAGES_JUMP);
            }else{
                if(this.world.keyboard.RIGHT || this.world.keyboard.LEFT){
                    this.playAnimation(this.IMAGES_WALK);
                    this.walkingSound.play();
                }else{
                    this.playAnimation(this.IMAGES_IDLE);
                }   
            }
            if(this.world.keyboard.SPACE && !this.isDead() ){
                this.playSingleAnimation(this.IMAGES_ATTACK);
            }
            if(this.isHurt && !this.isDead()){
                this.playSingleAnimation(this.IMAGES_HURT);
            }
        }, 160);
    }
}