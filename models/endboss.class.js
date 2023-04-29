class Endboss extends MovableObject {

    IMAGES_IDLE =[
        './img/boss/idle/Idle_1.png',
        './img/boss/idle/Idle_2.png',
        './img/boss/idle/Idle_3.png',
        './img/boss/idle/Idle_4.png',
    ];
    IMAGES_WALK =[
        './img/boss/walk/Walk_1.png',
        './img/boss/walk/Walk_2.png',
        './img/boss/walk/Walk_3.png',
        './img/boss/walk/Walk_4.png',
        './img/boss/walk/Walk_5.png',
        './img/boss/walk/Walk_6.png',
    ];
    IMAGES_HURT =[
        './img/boss/hurt/Hurt_1.png',
        './img/boss/hurt/Hurt_2.png',
    ];
    IMAGES_DEATH =[
        './img/boss/death/Death_1.png',
        './img/boss/death/Death_2.png',
        './img/boss/death/Death_3.png',
        './img/boss/death/Death_4.png',
        './img/boss/death/Death_5.png',
        './img/boss/death/Death_6.png',
    ];
    IMAGES_ATTACK =[
        './img/boss/attack/Attack_1.png',
        './img/boss/attack/Attack_2.png',
        './img/boss/attack/Attack_3.png',
        './img/boss/attack/Attack_4.png',
        './img/boss/attack/Attack_5.png',
        './img/boss/attack/Attack_6.png',
    ];

    y = 225;
    height= 200;
    width = 200;
    currentImage = 0;
    offset_x = 80;
    offset_y = 40;
    offset_width = 80;
    offset_height = 40;
    enemieDirection = 0;
    toClose = false;
    energy = 100;

    constructor(){
        
        super().loadImage('./img/boss/idle/Idle_1.png');
        this.x = 400 + Math.random()*500;
        this.loadImages(this.IMAGES_WALK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_DEATH);
        this.direction();
        this.animate();
    }

    direction(){
        setInterval(() => {
            if(this.toClose == false){
                this.enemieDirection = Math.random();
            }
            
            this.speed = 0.4 + Math.random() * 0.9;
        }, 2000);
    }

    animate(){
        setInterval(() => {
            if(this.isDead()){
                this.loadImage('./img/boss/death/Death_4.png');
            }else if(this.isHurt){
                this.playSingleAnimation(this.IMAGES_HURT);
            }else if(this.enemieDirection <= 0.2 || this.enemieDirection >= 0.8){
                this.playAnimation(this.IMAGES_WALK);
            }else{
                this.playAnimation(this.IMAGES_IDLE);
            }
            
        }, 160);
        
        setInterval(()=>{
            if(!this.isDead()){
                if(this.enemieDirection <= 0.2){
                    this.moveRight();
                }else if(this.enemieDirection >= 0.8){
                    this.moveLeft();
                }else{
                }   
            }
        },1000/60);
       
    }
}