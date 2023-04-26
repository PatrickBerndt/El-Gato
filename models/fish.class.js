class Fish extends MovableObject{

    width = 40;
    height = 70;
   
    constructor(x,y){
        super().loadImage('./img/objects/fish.png');
        this.x = x;
        this.y = y;
        this.throw();
    }

    throw(){
        this.speed_y = 10;
        this.applyGravity();
        if(this.mirrorImage){
            setInterval(() => {
                this.x += -15;
              }, 25 );
        }else{
            setInterval(() => {
            this.x += 15;
            }, 25 );
        }
        
    }
}