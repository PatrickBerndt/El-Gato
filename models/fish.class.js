class Fish extends MovableObject{

    width = 40;
    height = 70;
   
    constructor(x,y){
        super().loadImage('../img/objects/fish.png');
        this.x = x;
        this.y = y;
        this.throw();
    }

    throw(){
        this.speed_y = 20;
        this.applyGravity();
        setInterval(() => {
            this.x += 15;
          }, 25 );
    }
}