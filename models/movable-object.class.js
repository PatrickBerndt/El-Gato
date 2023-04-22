class MovableObject extends DrawableObject {
    
    speed = 0.1;
    mirrorImage = false;
    speed_y = 0;
    acceleration = 2.5;
    isHurt= false;
    isImune=false;
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

    //deadEnemy(enemy) {
    //    let index = this.level.enemies.indexOf(enemy);
    //    if (index > -1 && this.level.enemies[index].energy > 0) {
    //      this.level.enemies[index].energy = 0;
    //      setTimeout(() => {
    //        let deadIndex = this.level.enemies.indexOf(enemy);
    //        if (deadIndex > -1 && this.level.enemies[deadIndex].energy === 0) this.level.enemies.splice(deadIndex, 1);
    //      }, 750);
    //    }
    //  }

    applyGravity(){
        setInterval(() => {
            if(this.isAboveGround() || this.speed_y > 0){
                this.y -= this.speed_y ;
                this.speed_y -= this.acceleration;
            }
            if(!this.isAboveGround()){
                this.y = 295;
            }
        }, 1000/25);
    }

    isAboveGround(){
        if(this instanceof Fish){
            return true;
        }else{
           return this.y < 295; 
        }
        
    }

    isColliding(obj) {
        return  ((this.x +this.offset_x) + (this.width -this.offset_width)) >= obj.x && (this.x +this.offset_x) <= (obj.x + obj.width) && 
                (this.y + this.height - this.offset_height) >= obj.y &&
                (this.y + this.height - this.offset_height) <= (obj.y + obj.height);// &&  
                //obj.onCollisionCourse; // Optional: hiermit könnten wir schauen, ob ein Objekt sich in die richtige Richtung bewegt. Nur dann kollidieren wir. Nützlich bei Gegenständen, auf denen man stehen kann.
    }

    isImune(){
        isImune=true;
        setTimeout(() => {
            isImune=false;
        }, 2000);
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