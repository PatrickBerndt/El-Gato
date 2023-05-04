class Level{
    clouds;
    enemies;
    boss;
    fish;
    milk;
    boxes;
    collectFish;
    level_end = 6190;

    constructor(clouds, enemies, boss, fish, milk, boxes,collectFish){
        this.enemies = enemies;
        this.boss = boss;
        this.clouds = clouds;
        this.fish = fish;
        this.milk = milk;
        this.boxes = boxes;
        this.collectFish = collectFish;
    }
}