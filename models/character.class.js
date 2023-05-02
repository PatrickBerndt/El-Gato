class Character extends MovableObject{

IMAGES_IDLE =[
        './img/cat01/idle/cat01_idle_1.png',
        './img/cat01/idle/cat01_idle_2.png',
        './img/cat01/idle/cat01_idle_3.png',
        './img/cat01/idle/cat01_idle_4.png',
        './img/cat01/idle/cat01_idle_5.png',
        './img/cat01/idle/cat01_idle_6.png',
        './img/cat01/idle/cat01_idle_7.png',
        './img/cat01/idle/cat01_idle_8.png',        
    ];
    IMAGES_WALK =[
        './img/cat01/walk/cat01_walk_1.png',
        './img/cat01/walk/cat01_walk_2.png',
        './img/cat01/walk/cat01_walk_3.png',
        './img/cat01/walk/cat01_walk_4.png',
        './img/cat01/walk/cat01_walk_5.png',
        './img/cat01/walk/cat01_walk_6.png',
        './img/cat01/walk/cat01_walk_7.png',
        './img/cat01/walk/cat01_walk_8.png',
    ];
    IMAGES_FALL = [
        './img/cat01/fall/cat01_fall_1.png',
        './img/cat01/fall/cat01_fall_2.png',
        './img/cat01/fall/cat01_fall_3.png'
    ];
    IMAGES_JUMP = [
        './img/cat01/jump/cat01_jump_1.png',
        './img/cat01/jump/cat01_jump_2.png',
        './img/cat01/jump/cat01_jump_3.png',
        './img/cat01/jump/cat01_jump_4.png',
    ];
    IMAGES_ATTACK = [
        './img/cat01/attack/cat01_attack_1.png',
        './img/cat01/attack/cat01_attack_2.png',
        './img/cat01/attack/cat01_attack_3.png',
        './img/cat01/attack/cat01_attack_4.png',
        './img/cat01/attack/cat01_attack_5.png',
        './img/cat01/attack/cat01_attack_6.png',
        './img/cat01/attack/cat01_attack_7.png'
    ];
    IMAGES_HURT = [
        './img/cat01/hurt/cat01_hurt_1.png',
        './img/cat01/hurt/cat01_hurt_2.png',
        './img/cat01/hurt/cat01_hurt_3.png',
        './img/cat01/hurt/cat01_hurt_4.png'
        
    ];
    IMAGES_DEATH = [
        './img/cat01/die/cat01_die_1.png',
        './img/cat01/die/cat01_die_2.png',
        './img/cat01/die/cat01_die_3.png',
        './img/cat01/die/cat01_die_4.png',
        './img/cat01/die/cat01_die_5.png',
        './img/cat01/die/cat01_die_6.png',
        './img/cat01/die/cat01_die_7.png',
        './img/cat01/die/cat01_die_8.png'
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
    walkingSound = new Audio('audio/walk.mp3')
    energy = 100 ;

    constructor(){
        super().loadImage('./img/cat01/idle/cat01_idle_1.png');
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