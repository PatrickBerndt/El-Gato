class Fish extends MovableObject{

    width = 40;
    height = 70;
    offset_x = 0;
    offset_y = 0;
    offset_width = 0;
    offset_height = 0;
    world;
   
    constructor(x,y){
        super().loadImage('./img/objects/fish.png');
        this.x = x;
        this.y = y;
        this.world = world;
        this.throw();
    }

    throw(){
        this.speed_y = 10;
        this.applyGravity();
        if(this.world.character.mirrorImage){
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