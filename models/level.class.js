class Level{
    clouds;
    enemies;
    fish;
    milk;
    boxes;
    collectFish;
    level_end = 6190;

    constructor(clouds, enemies, fish, milk, boxes,collectFish){
        this.enemies = enemies;
        this.clouds = clouds;
        this.fish = fish;
        this.milk = milk;
        this.boxes = boxes;
        this.collectFish = collectFish;
    }
}