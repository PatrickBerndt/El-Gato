class StatusSymbol extends DrawableObject{

    x = 20;
    y = 20;
    width = 133;
    height = 24;

    constructor(x,y,w,h,symbol){
        super();
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;

        if(symbol == 'fish'){
            this.loadImage('./img/objects/fish.png');
        }else if(symbol == 'milk'){
            this.loadImage('./img/objects/Milk.png');
        }else if(symbol == 'heart'){
            this.loadImage('./img/objects/heart.png');            
        }
    }
}