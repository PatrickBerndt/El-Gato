let canvas;
let world;
let keyboard = new Keyboard();
let characterNumber = 2;

function init(){
    
    
}


function startGame(){
    document.getElementById('playButton').classList.add('dNone');
    document.getElementById('coverimage').classList.add('dNone');
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}

function showEndScreen(){
    document.getElementById('playButton').classList.remove('dNone');
    document.getElementById('coverimage').classList.remove('dNone');
    clearAllIntervals();
    
}

function clearAllIntervals(){
    for (let i = 1; i < 9999; i++){
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