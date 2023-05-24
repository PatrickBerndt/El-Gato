class CollectableFish extends MovableObject {
    width = 40;
    height = 70;
    offset_x = 0;
    offset_y = 0;
    offset_width = 0;
    offset_height = 0;


    constructor(x, y) {
        super().loadImage('./img/objects/fish.png');
        this.x = x;
        this.y = y;
        this.throw();

    }

    isRising() {
        return this.speed_y < 0 && this.isAboveGround();
    }

    throw() {
        this.speed_y = 30;
        this.applyGravity();
        if (this.isAboveGround()) {
            setInterval(() => {
                this.x += 5;
            }, 25)
        }
        ;

    }
}