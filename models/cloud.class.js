class Cloud extends MovableObject {
    width = 200;
    y = 50;
    constructor(){
        super().loadImage('../img/clouds/fluffy-clouds2.png');
        
        this.x = 200 + Math.random()*500;
        this.animate();
    }

    animate(){
        this.moveLeft();
    }
}