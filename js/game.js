let canvas;
let world;
let keyboard = new Keyboard();
let characterNumber = 1;

function init(){
    
    
}

function selectCharacter(index){
    for (let i = 1; i < 4; i++) {
        document.getElementById(`arrow${i}`).classList.add('dNone');
    }
    characterNumber = index;
    document.getElementById(`arrow${index}`).classList.remove('dNone');
}

function startGame(){
    document.getElementById('wrapper').classList.add('dNone');
    document.getElementById('selectscreen').classList.remove('dNone');
   
}

function playGame(){
    document.getElementById('playButton').classList.add('dNone');
    document.getElementById('coverimage').classList.add('dNone');
    document.getElementById('startButton').classList.add('dNone');
    document.getElementById('wrapper').classList.remove('dNone');
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}

function showEndScreen(){
    document.getElementById('playButton').classList.remove('dNone');
    document.getElementById('coverimage').classList.remove('dNone');
    clearAllIntervals();
    location.reload();
}

function clearAllIntervals(){
    for (let i = 1; i < 999; i++){
        window.clearInterval(i)
    }; 
}

window.addEventListener('keydown', (event)=>{
    if(event.code == 'ArrowLeft'){
        keyboard.LEFT = true;
    }
    if(event.code == 'ArrowRight'){
        keyboard.RIGHT = true;
    }
    if(event.code == 'ArrowUp'){
        keyboard.UP = true;
    }
    if(event.code == 'ArrowDown'){
        keyboard.DOWN = true;
    }
    if(event.code == 'Space'){
        keyboard.SPACE = true;
    }
});

window.addEventListener('keyup', (event)=>{
    if(event.code == 'ArrowLeft'){
        keyboard.LEFT = false;
    }
    if(event.code == 'ArrowRight'){
        keyboard.RIGHT = false;
    }
    if(event.code == 'ArrowUp'){
        keyboard.UP = false;
    }
    if(event.code == 'ArrowDown'){
        keyboard.DOWN = false;
    }
    if(event.code == 'Space'){
         keyboard.SPACE = false;      
    }
});