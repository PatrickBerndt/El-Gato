class World {

    character = new Character();
    enemies = level_1.enemies;
    clouds = level_1.clouds;
    milk = level_1.milk;
    fish = level_1.fish;
    boxes = level_1.boxes;
    collectFish = level_1.collectFish;
    level = level_1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    energy = 100;
    healthBar = new Statusbar(20,20,'red');
    milkBar = new Statusbar(20,50, 'blue');
    fishBar = new Statusbar(20,80,'green')
    overlay = [new StatusOverlay(20,20),new StatusOverlay(20,50),new StatusOverlay(20,80)];
    throwFish =[];
    isImune=false;
    fillMilk=0;
    fillFish=0;
    


    

    
    bgLayer1 = new BackgroundObject('./img/background/Background_0.png');
    bgLayer2 = new BackgroundObject('img/background/Background_1.png');
    bgLayer3 = new BackgroundObject('img/background/Background_2.png');
    bgLayer4 = new BackgroundObject('img/background/Background_3.png');
    bgLayer5 = new BackgroundObject('img/background/Background_4.png');

    constructor(canvas, keyboard){
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

   


    offsetBackground(){
        this.bgLayer1.x = -(this.camera_x * 0.8)/5;
        this.bgLayer2.x = -(this.camera_x * 0.6)/5;
        this.bgLayer3.x = -(this.camera_x * 0.4)/5;
        this.bgLayer4.x = -(this.camera_x * 0.2)/5;
    }

    setWorld(){
        this.character.world  = this;
    }

    draw(){
        this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height);
        this.offsetBackground();
        this.ctx.translate(this.camera_x, 0)
        this.addToMap(this.bgLayer1);
        this.addToMap(this.bgLayer2);
        this.addToMap(this.bgLayer3);
        this.addToMap(this.bgLayer4);
        this.addToMap(this.bgLayer5);

        this.addObjectToMap(this.boxes);
        this.addToMap(this.character);
        this.addObjectToMap(this.clouds);
        this.addObjectToMap(this.enemies);
        this.addObjectToMap(this.fish);
        this.addObjectToMap(this.milk);
        this.addObjectToMap(this.throwFish);
        this.addObjectToMap(this.collectFish);

        this.ctx.translate(-this.camera_x, 0)
        this.addToMap(this.healthBar);
        this.addToMap(this.milkBar);
        this.addToMap(this.fishBar);
        this.addObjectToMap(this.overlay);
        let self = this;
        requestAnimationFrame(function(){
            self.draw();
        });
    }

    run(){
        setInterval(() => {
            this.checkIsColliding();
            this.checkThrowObject();
            this.collisionWithMilk();
            this.checkPosition();
            this.checkCollidingFish();
            this.checkCollisionBox();
            this.checkIfOutsiteLevel();
            this.collisionWithCollectFish();
        }, 50);
    }

    checkThrowObject(){
        if(this.keyboard.SPACE && !(this.keyboard.SPACE = false) && this.fillFish != 0 ){ 
            if(this.character.mirrorImage){
                let throwFish = new Fish(this.character.x + 20  , this.character.y, this);
                this.fish.push(throwFish);
            }else{
                let throwFish = new Fish(this.character.x + 100 , this.character.y, this);
                this.fish.push(throwFish);
            }
            if(this.fillFish != 0){
                this.fillFish -= 10;
                this.fishBar.statusFill(this.fillFish);
            }
        }
    }

    checkIfOutsiteLevel(){
        this.fish.forEach((fish,index) => {
            if (fish.y >= 400 ) {
                this.fish.splice(index, 1);
            }
        })
    }

   

    checkPosition(){
        this.level.enemies.forEach(enemy=>{
            let difference = enemy.x - this.character.x;
            if(difference <= 400 && !(difference <= 200)){
                enemy.toClose = true;
                enemy.enemieDirection = 0.1;
            }else if(difference >= -400 && !(difference >= -200)){
                enemy.toClose = true;
                enemy.enemieDirection = 0.9;
            }else if(difference <= 200 && !(difference <= 0)){
                enemy.toClose = true;
                enemy.enemieDirection = 0.9;
            }else if(difference >= -200 && !(difference >= 0)){
                enemy.toClose = true;
                enemy.enemieDirection = 0.1;
            }
        })
    }



    checkIsColliding(){
        this.level.enemies.forEach(enemy => {
            if(this.character.isColliding(enemy,0,0,25,0) && !this.character.isFalling() && !enemy.isDead() && !this.isImune){
                this.character.hit(5);
                this.healthBar.statusFill(this.character.energy);
                this.character.isHurt= true;
                this.getImune(2000);
                setTimeout(() => {
                    this.character.isHurt = false;
                },1000);
            }else if(this.character.isColliding(enemy,0,0,25,0) && this.character.isFalling()){
                enemy.hit(50);
               enemy.isHurt= true;
               if(!enemy.isDead()){
                    this.character.speed_y = 20;
               }
                setTimeout(() => {
                   enemy.isHurt = false;
                },1000);
            }
        });
    }

    thwowCollectFish(box){
        let throwcollectFish = new CollectableFish(box.x, box.y,);
        this.collectFish.push(throwcollectFish);
        
    }

    checkCollidingFish(){
        this.level.enemies.forEach(enemy =>{
            this.level.fish.forEach(fish =>{
                if(fish.isColliding(enemy,0,0,40,0) && !this.isImune){
                    enemy.hit(25);
                    enemy.isHurt= true;
                    this.getImune(50);
                    setTimeout(() => {
                        enemy.isHurt = false;
                    },1000);
                }
            })
            
        })
    }

    checkCollisionBox(){
        this.level.boxes.forEach((box, index) => {
            if(this.character.isColliding(box,0,0,30,0)&& this.character.isFalling() && !this.isImune){
                box.hit(50);
                this.getImune(500);
                if(!box.isDead()){
                    this.character.speed_y = 20;
               }
               if(box.isDead()){
                this.thwowCollectFish(box);
                setTimeout(() => {
                    this.level.boxes.splice(index, 1);   
                }, 2000);
                
               }
            }
        } )
    }

    getImune(time){
        this.isImune=true;
        setTimeout(() => {
            this.isImune=false;
        }, time);
    }

    collisionWithMilk(){
        this.level.milk.forEach((milk, index) => {
            if (this.character.isColliding(milk,0,0,0,0)) {
              if(this.fillMilk != 100){
                this.fillMilk += 10;
                this.milkBar.statusFill(this.fillMilk);
              }
              //this.checkSoundAndPlay(this.audio.collectedCoin_sound, 1, false);
              this.level.milk.splice(index, 1);
            }
        });
    }
    collisionWithCollectFish(){
        this.level.collectFish.forEach((fish, index) => {
            if (this.character.isColliding(fish,0,0,0,0) && fish.isRising()) {
                if(this.fillFish != 100){
                    this.fillFish += 10;
                    this.fishBar.statusFill(this.fillFish);
                }
                   //this.checkSoundAndPlay(this.audio.collectedCoin_sound, 1, false);
                this.level.collectFish.splice(index, 1);  
            }
        });
    }

    addObjectToMap(objects){
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(mo){
        if(mo.mirrorImage){
            this.flipImage(mo);
        }
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height); 
        
       //this.drawBox(mo);

        if(mo.mirrorImage){
            this.flipImageBack(mo);
        }
    }

    drawBox(mo){
       
            this.ctx.beginPath();
            this.ctx.lineWidth = '2';
            this.ctx.strokeStyle = "red";
            this.ctx.rect(mo.x, mo.y, mo.width, mo.height);
            this.ctx.stroke();   
    }

    flipImage(mo){
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1,1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo){
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}