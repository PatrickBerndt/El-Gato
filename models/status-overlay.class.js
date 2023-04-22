class StatusOverlay extends DrawableObject{

    x = 20;
    y = 20;
    width = 133;
    height = 24;

    constructor(x,y){
        super();
        this.x = x;
        this.y = y;
       this.loadImage('../img/objects/Progressbar.png');
        
    }

    
}