class World {

    character = new Character();
    enemies = level_1.enemies;
    boss = level_1.boss;
    milk = level_1.milk;
    fish = level_1.fish;
    boxes = level_1.boxes;
    collectFish = level_1.collectFish;
    level = level_1;
    canvas;
    ctx;
    keyboard;
    controllOverlay = new ControllOverlay();
    camera_x = 0;
    energy = 100;
    healthBar = new Statusbar(40, 20, 'red');
    milkBar = new Statusbar(40, 50, 'blue');
    fishBar = new Statusbar(40, 80, 'green')
    overlay = [new StatusOverlay(40, 20), new StatusSymbol(13, 15, 30, 30, 'heart'),
    new StatusOverlay(40, 50), new StatusSymbol(13, 45, 30, 30, 'milk'),
    new StatusOverlay(40, 80), new StatusSymbol(18, 75, 20, 30, 'fish')];
    throwFish = [];
    isImune = false;
    fillMilk = 0;
    fillFish = 0;

    bgLayer1 = new BackgroundObject('./img/background/Background_0.png');
    bgLayer2 = new BackgroundObject('img/background/Background_1.png');
    bgLayer3 = new BackgroundObject('img/background/Background_2.png');
    bgLayer4 = new BackgroundObject('img/background/Background_3.png');
    bgLayer5 = new BackgroundObject('img/background/Background_4.png');

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    offsetBackground() {
        this.bgLayer1.x = -(this.camera_x * 0.8) / 5;
        this.bgLayer2.x = -(this.camera_x * 0.6) / 5;
        this.bgLayer3.x = -(this.camera_x * 0.4) / 5;
        this.bgLayer4.x = -(this.camera_x * 0.2) / 5;
    }

    addBackground() {
        this.addToMap(this.bgLayer1);
        this.addToMap(this.bgLayer2);
        this.addToMap(this.bgLayer3);
        this.addToMap(this.bgLayer4);
        this.addToMap(this.bgLayer5);
    }

    addObjects() {
        this.addObjectToMap(this.fish);
        this.addObjectToMap(this.milk);
        this.addObjectToMap(this.throwFish);
        this.addObjectToMap(this.collectFish);
    }

    addStatusbar() {
        this.addToMap(this.healthBar);
        this.addToMap(this.milkBar);
        this.addToMap(this.fishBar);
        this.addToMap(this.controllOverlay);
        this.addObjectToMap(this.overlay);
    }

    addWalkingObjects() {
        this.addToMap(this.character);
        this.addObjectToMap(this.enemies);
        this.addObjectToMap(this.boss);
    }

    setWorld() {
        this.character.world = this;
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.offsetBackground();
        this.ctx.translate(this.camera_x, 0);
        this.addBackground();
        this.addObjectToMap(this.boxes);
        this.addWalkingObjects();
        this.addObjects();
        this.ctx.translate(-this.camera_x, 0)
        this.addStatusbar();
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    run() {
        setInterval(() => {
            this.checkIsColliding(this.level.enemies);
            this.checkIsColliding(this.level.boss);
            this.checkThrowObject();
            this.collisionWithMilk();
            this.checkPosition(this.level.enemies);
            this.checkPosition(this.level.boss);
            this.checkCollidingFish(this.level.enemies);
            this.checkCollidingFish(this.level.boss);
            this.checkCollisionBox();
            this.checkIfOutsiteLevel();
            this.collisionWithCollectFish();
            this.checkForEndboss();
            this.checkForWin();
        }, 25);
    }

    checkForEndboss() {
        if (this.character.x <= 4500 || this.boss[0].isDead()) {
            gameMusic.play();
            bossMusic.pause();
        } else if (!this.boss[0].isDead()) {
            this.boss[0].endzone = true;
            gameMusic.pause();
            bossMusic.play();
        }
    }

    checkForWin() {
        if (this.boss[0].isDead()) {
            gameMusic.pause();
            bossMusic.pause();
            winSound.play();
            setTimeout(() => {
                winSound.pause();
                wonGame();
            }, 3500);
        } else if (this.character.isDead()) {
            gameMusic.pause();
            bossMusic.pause();
            looseSound.play();
            setTimeout(() => {
                looseSound.pause();
                lostGame();
            }, 2000);
        }
    }

    checkThrowObject() {
        if (this.keyboard.SPACE && !(this.keyboard.SPACE = false) && this.fillFish != 0) {
            if (this.character.mirrorImage) {
                let throwFish = new Fish(this.character.x + 20, this.character.y, this);
                this.fish.push(throwFish);
            } else {
                let throwFish = new Fish(this.character.x + 100, this.character.y, this);
                this.fish.push(throwFish);
            }
            if (this.fillFish != 0) {
                this.fillFish -= 5;
                this.fishBar.statusFill(this.fillFish);
            }
            attackingSound.play();
        }
    }

    checkIfOutsiteLevel() {
        this.fish.forEach((fish, index) => {
            if (fish.y >= 400) {
                this.fish.splice(index, 1);
            }
        })
    }

    checkPosition(enemies) {
        enemies.forEach(enemy => {
            let difference = enemy.x - this.character.x;
            setTimeout(() => {
                if (difference <= 400 && !(difference <= 200)) {
                    this.checkIfEnemyInfront(enemy);
                } else if (difference >= -400 && !(difference >= -200)) {
                    this.checkIfEnemyBehind(enemy);
                } else if (difference <= 200 && !(difference <= 0)) {
                    enemy.toClose = true;
                    this.setDirection(enemy, 0.9, true)
                } else if (difference >= -200 && !(difference >= 0)) {
                    enemy.toClose = true;
                    this.setDirection(enemy, 0.1, true)
                } else if ((this.level.level_end - enemy.x) <= 400) {
                    enemy.toClose = true;
                    enemy.enemieDirection = 0.9;
                }
            }, 125);
        })
    }

    checkIfEnemyInfront(enemy){
        if (enemy instanceof Endboss) {
            enemy.toClose = true;
            this.setDirection(enemy, 0.9, false)
        } else {
            enemy.toClose = true;
            enemy.enemieDirection = 0.1;
        }
    }

    checkIfEnemyBehind(enemy){
        if (enemy instanceof Endboss) {
            enemy.toClose = true;
            this.setDirection(enemy, 0.1, false)
        } else {
            enemy.toClose = true;
            enemy.enemieDirection = 0.9;
        }
    }

    setDirection(enemy, direction, boolValue){
        enemy.attackCharacter = boolValue;
        enemy.enemieDirection = direction;
    }

    checkIsColliding(enemies) {
        enemies.forEach(enemy => {
            if (this.character.isColliding(enemy, 0, 0, 50, 0) && !this.character.isFalling() && !enemy.isDead() && !this.isImune) {
                this.character.hit(20);
                this.healthBar.statusFill(this.character.energy);
                this.character.isHurt = true;
                this.getImune(2000);
                setTimeout(() => {
                    this.character.isHurt = false;
                }, 1000);
            } else if (this.character.isColliding(enemy, 0, 0, 50, 0) && this.character.isFalling()) {
                enemy.isHurt = true;
                this.checkWhoIsHurt(enemy);
                this.getImune(1000);
                setTimeout(() => {
                    enemy.isHurt = false;
                }, 1000);
            }
        });
    }

    checkWhoIsHurt(enemy){
        if (!enemy.isDead()) {
            this.character.speed_y = 20;
            if (enemy instanceof Rat) {
                ratHurtSound.play();
                enemy.hit(50);
            } else if (enemy instanceof Endboss) {
                bossHurtSound.play();
                enemy.hit(20);
            }
        }
    }

    thwowCollectFish(box) {
        let throwcollectFish = new CollectableFish(box.x, box.y,);
        this.collectFish.push(throwcollectFish);
    }

    checkCollidingFish(enemies) {
        enemies.forEach(enemy => {
            this.level.fish.forEach(fish => {
                if (fish.isColliding(enemy, 0, 0, 40, 0) && !this.isImune && !enemy.isDead()) {
                    enemy.isHurt = true;
                    this.getImune(1000);
                    this.checkWhoIsHurtFish(enemy);
                    setTimeout(() => {
                        enemy.isHurt = false;
                    }, 1000);
                }
            })

        })
    }

    checkWhoIsHurtFish(enemy){
        if (!enemy.isDead()) {
            if (enemy instanceof Rat) {
                ratHurtSound.play();
                enemy.hit(50);
            } else if (enemy instanceof Endboss) {
                bossHurtSound.play();
                enemy.hit(20);
            }
        }
    }

    checkCollisionBox() {
        this.level.boxes.forEach((box, index) => {
            if (this.character.isColliding(box, 0, 0, 30, 0) && this.character.isFalling() && !this.isImune) {
                box.hit(50);
                this.getImune(500);
                if (!box.isDead()) {
                    this.character.speed_y = 20;
                    crackingSound.play();
                }
                if (box.isDead()) {
                    this.thwowCollectFish(box);
                    crackingSound.play();
                    setTimeout(() => {
                        this.level.boxes.splice(index, 1);
                    }, 2000);

                }
            }
        })
    }

    getImune(time) {
        this.isImune = true;
        setTimeout(() => {
            this.isImune = false;
        }, time);
    }

    collisionWithMilk() {
        this.level.milk.forEach((milk, index) => {
            if (this.character.isColliding(milk, 0, 0, 0, 0)) {
                if (this.fillMilk != 100) {
                    this.fillMilk += 10;
                    this.milkBar.statusFill(this.fillMilk);
                }
                collectSound.play();
                this.level.milk.splice(index, 1);
            }
        });
    }

    collisionWithCollectFish() {
        this.level.collectFish.forEach((fish, index) => {
            if (this.character.isColliding(fish, 0, 0, 0, 0) && fish.isRising()) {
                if (this.fillFish != 100) {
                    this.fillFish += 10;
                    this.fishBar.statusFill(this.fillFish);
                }
                collectSound.play();
                this.level.collectFish.splice(index, 1);
            }
        });
    }

    addObjectToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(mo) {
        if (mo.mirrorImage) {
            this.flipImage(mo);
        }
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
        if (mo.mirrorImage) {
            this.flipImageBack(mo);
        }
    }

    drawBox(mo) {
        this.ctx.beginPath();
        this.ctx.lineWidth = '2';
        this.ctx.strokeStyle = "red";
        this.ctx.rect(mo.x, mo.y, mo.width, mo.height);
        this.ctx.stroke();
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}