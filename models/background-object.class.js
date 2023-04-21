class BackgroundObject extends MovableObject {
    x = 0
    y = 0;
    width = 6825;
    height = 480;

    constructor(path, offset){
        super().loadImage(path);
    }

}