class Level {
    enemies;
    boss;
    fish;
    milk;
    boxes;
    collectFish;
    level_end = 6190;

    constructor(enemies, boss, fish, milk, boxes, collectFish) {
        this.enemies = enemies;
        this.boss = boss;
        this.fish = fish;
        this.milk = milk;
        this.boxes = boxes;
        this.collectFish = collectFish;
    }
}