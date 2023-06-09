class Box extends MovableObject {
    y = 357;
    height = 70;
    width = 70;
    offset_x = 0;
    offset_y = 0;
    offset_width = 0;
    offset_height = 0;
    energy = 100;

    constructor() {
        super().loadImage('./img/objects/box_1.png');
        this.x = 400 + Math.random() * 5000;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.animationFrame();
        }, 100);
    }

    animationFrame(){
        if (this.energy == 0) {
            this.loadImage('./img/objects/box_3.png');
        } else if (this.energy == 50) {
            this.loadImage('./img/objects/box_2.png');
        } else {
            this.loadImage('./img/objects/box_1.png');
        }
    }
}