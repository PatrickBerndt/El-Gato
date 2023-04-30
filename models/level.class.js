class Level{
    clouds;
    enemies;
    fish;
    milk;
    boxes;
    level_end = 6190;

    constructor(clouds, enemies, fish, milk, boxes){
        this.enemies = enemies;
        this.clouds = clouds;
        this.fish = fish;
        this.milk = milk;
        this.boxes = boxes;
    }
}