class Endboss extends MovableObject {

    IMAGES_IDLE =[
        '../img/boss/idle/Idle_1.png',
        '../img/boss/idle/Idle_2.png',
        '../img/boss/idle/Idle_3.png',
        '../img/boss/idle/Idle_4.png',
    ];
    IMAGES_WALK =[
        '../img/boss/walk/Walk_1.png',
        '../img/boss/walk/Walk_2.png',
        '../img/boss/walk/Walk_3.png',
        '../img/boss/walk/Walk_4.png',
        '../img/boss/walk/Walk_5.png',
        '../img/boss/walk/Walk_6.png',
    ];
    IMAGES_HURT =[
        '../img/boss/hurt/Hurt_1.png',
        '../img/boss/hurt/Hurt_2.png',
    ];
    IMAGES_DEATH =[
        '../img/boss/death/Death_1.png',
        '../img/boss/death/Death_2.png',
        '../img/boss/death/Death_3.png',
        '../img/boss/death/Death_4.png',
        '../img/boss/death/Death_5.png',
        '../img/boss/death/Death_6.png',
    ];
    IMAGES_ATTACK =[
        '../img/boss/attack/Attack_1.png',
        '../img/boss/attack/Attack_2.png',
        '../img/boss/attack/Attack_3.png',
        '../img/boss/attack/Attack_4.png',
        '../img/boss/attack/Attack_5.png',
        '../img/boss/attack/Attack_6.png',
    ];

    y = 225;
    height= 200;
    width = 200;
    currentImage = 0;

    constructor(){
        
        super().loadImage('../img/rat01/idle/Idle_1.png');
        this.x = 150 + Math.random()*500;
        this.loadImages(this.IMAGES_WALK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_DEATH);
        this.speed = 0.6 + Math.random() * 0.5;
        this.animate();
    }

    animate(){
        setInterval(() => {
            this.playAnimation(this.IMAGES_WALK);
            if(this.isHurt){
                this.playSingleAnimation(this.IMAGES_HURT);
            }
        }, 160);
        
        setInterval(()=>{
            this.moveRight();  
        },1000/60);
       
    }
}