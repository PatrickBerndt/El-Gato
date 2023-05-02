class MovableObject extends DrawableObject {
    
    speed = 0.1;
    mirrorImage = false;
    speed_y = 0;
    acceleration = 2.5;
    isHurt= false;
    animationCounter = 0;


    
    playAnimation(images){
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    playSingleAnimation(images){
        if (this.animationCounter < images.length){
            let i = this.animationCounter;
            let path = images[i];
            this.img = this.imageCache[path];
            this.animationCounter++;   
        }else{
            this.animationCounter = 0;  
        }
    }

    

    applyGravity(){
        setInterval(() => {
            if(this.isAboveGround() || this.speed_y > 0){
                this.y -= this.speed_y ;
                this.speed_y -= this.acceleration;
            }
            if(this instanceof CollectableFish && !this.isAboveGround()){
                this.y = 352;
            }else if(!this.isAboveGround()){
                this.y = 295;
            }
            
        }, 1000/25);
    }

    isAboveGround(){
        if(this instanceof Fish){
            return true;
        }else if(this instanceof CollectableFish){
            return this.y < 355;
        }else{
           return this.y < 295; 
        }
        
        
    }

    isColliding(obj, reduceLeftDistance, reduceRightDistance, reduceUpperDistance, reduceLowerDistance) {
        return (
          this.x + this.width - this.offset_x >= obj.x + reduceLeftDistance &&
          this.x + this.offset_width <= obj.x + obj.width - reduceRightDistance &&
          this.y + this.height - this.offset_height >= obj.y + reduceUpperDistance &&
          this.y + this.offset_y <= obj.y + obj.height - reduceLowerDistance
        );
      }

    

    isDead(){
        return this.energy == 0;
    }

    hit(damage){
        if(this.energy != 0){
            this.energy -= damage;
        }
    }

    

    moveRight() {
        this.x += this.speed;
        this.mirrorImage = false;
    }
    
    moveLeft(){
        this.x -= this.speed;
        this.mirrorImage = true;
    }

    jump(){
        this.speed_y = 26;
    }
    
}