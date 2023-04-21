class Milk extends MovableObject{

    width = 60;
    height = 60;

    y = 200;
    constructor(){
        super().loadImage('../img/objects/Milk.png');
        this.x = 200 + Math.random()*6000;
        this.y = 150 + Math.random()*100;
    }
}