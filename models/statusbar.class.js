class Statusbar extends DrawableObject{

    x;
    y;
    width = 133;
    height = 24;
    path;

    constructor(x, y, color){
        super();
       if(color == 'red'){
        this.path = '../img/objects/Fill_Red.png';
        this.statusFill(100);
       }else if(color == 'green'){
        this.path = '../img/objects/Fill_Green.png';
        this.statusFill(0);
       }else if(color == 'blue'){
        this.path = '../img/objects/Fill_Blue.png';
        this.statusFill(0);
       };
       this.x = x;
       this.y = y;
    }

    statusFill(fill){
            this.width = (133 * fill)/100 ;
            this.loadImage(this.path); 
    }
}