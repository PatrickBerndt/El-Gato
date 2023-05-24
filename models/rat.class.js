class Rat extends MovableObject {

    IMAGES_IDLE = [
        './img/rat01/idle/Idle_1.png',
        './img/rat01/idle/Idle_2.png',
        './img/rat01/idle/Idle_3.png',
        './img/rat01/idle/Idle_4.png',
    ];
    IMAGES_WALK = [
        './img/rat01/walk/Walk_1.png',
        './img/rat01/walk/Walk_2.png',
        './img/rat01/walk/Walk_3.png',
        './img/rat01/walk/Walk_4.png',
    ];
    IMAGES_HURT = [
        './img/rat01/hurt/Hurt_1.png',
        './img/rat01/hurt/Hurt_2.png',
    ];
    IMAGES_DEATH = [
        './img/rat01/death/Death_1.png',
        './img/rat01/death/Death_2.png',
        './img/rat01/death/Death_3.png',
        './img/rat01/death/Death_4.png',
    ];
    x;
    y = 345;
    offset_x = 0;
    offset_y = 40;
    offset_width = 0;
    offset_height = 40;
    currentImage = 0;
    enemieDirection = 0;
    toClose = false;
    energy = 100;




    constructor() {

        super().loadImage('./img/rat01/idle/Idle_1.png');
        this.x = 400 + Math.random() * 6000;
        this.loadImages(this.IMAGES_WALK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEATH);
        this.loadImages(this.IMAGES_IDLE);
        this.animate();
        this.direction();
    }

    direction() {
        setInterval(() => {
            if (this.toClose == false) {
                this.enemieDirection = Math.random();
            }

            this.speed = 0.4 + Math.random() * 0.9;
        }, 2000);
    }


    animate() {
        setInterval(() => {
            if (this.isDead()) {
                this.loadImage('./img/rat01/death/Death_4.png');
            } else if (this.isHurt) {
                this.playSingleAnimation(this.IMAGES_HURT);
            } else if (this.enemieDirection <= 0.2 || this.enemieDirection >= 0.8) {
                this.playAnimation(this.IMAGES_WALK);
            } else {
                this.playAnimation(this.IMAGES_IDLE);
            }
        }, 160);

        setInterval(() => {

            if (!this.isDead()) {
                if (this.enemieDirection <= 0.2) {
                    this.moveRight();
                } else if (this.enemieDirection >= 0.8) {
                    this.moveLeft();
                } else {
                }
            }
        }, 1000 / 60);
    }


}