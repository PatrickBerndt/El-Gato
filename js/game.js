let canvas;
let world;
let keyboard = new Keyboard();
let characterNumber = 1;
let isFullscreen= false;

function init(){
    checkLandscapeMode();
    fitToScreen();
}

window.addEventListener("orientationchange", () => {
    checkLandscapeMode();
});

window.addEventListener('resize', () => {
    fitToScreen();
});

function fitToScreen(){
    var bodyWidth = document.getElementById('body').clientWidth;
    var bodyHeight = document.getElementById('body').clientHeight;
    if(bodyWidth < 725 ){
        let zoomFactorW =  (bodyWidth/725);
        document.getElementById('content').style = `zoom:${zoomFactorW}; ,-moz-transform: scale(${zoomFactorW});`;
    }else if(bodyHeight < 485 ){
        let zoomFactorH =  (bodyHeight/485);
        document.getElementById('content').style = `zoom:${zoomFactorH}; ,-moz-transform: scale(${zoomFactorH});`;
        console.log(zoomFactorH);
    }
};

function checkLandscapeMode(){
    if(screen.availHeight > screen.availWidth){
        this.document.getElementById('rotate').classList.remove('dNone');
        this.document.getElementById('content').classList.add('dNone');
    }else{
        this.document.getElementById('rotate').classList.add('dNone');
        this.document.getElementById('content').classList.remove('dNone');
    }
}

function selectCharacter(index){
    for (let i = 1; i < 4; i++) {
        document.getElementById(`arrow${i}`).classList.add('dNone');
    }
    characterNumber = index;
    document.getElementById(`arrow${index}`).classList.remove('dNone');
}



function makeFullscreen(){
    if(isFullscreen){
        document.exitFullscreen();
        document.getElementById('winImg').classList.remove('stretchToFull');
        isFullscreen = false; 
    }else{
       document.getElementById('youWon').requestFullscreen(); 
       document.getElementById('winImg').classList.add('stretchToFull');
       isFullscreen = true;
    }
}

function optionWindow(){
    document.getElementById('optionOverlay').classList.toggle('dNone');
    
}

function gameplayWindow(){
    document.getElementById('gameplayOverlay').classList.toggle('dNone');
}

function startGame(){
    document.getElementById('wrapper').classList.add('dNone');
    document.getElementById('selectscreen').classList.remove('dNone');
    document.getElementById('startButton').classList.remove('dNone');
    document.getElementById('youWon').classList.add('dNone');
    document.getElementById('youLost').classList.add('dNone');
    menuSound.play();
}

function lostGame(){
    document.getElementById('wrapper').classList.add('dNone');
    document.getElementById('youLost').classList.remove('dNone');
    clearAllIntervals();
}
function wonGame(){
    document.getElementById('wrapper').classList.add('dNone');
    document.getElementById('youWon').classList.remove('dNone');
    clearAllIntervals();
}

function playGame(){
    document.getElementById('playButton').classList.add('dNone');
    document.getElementById('coverimage').classList.add('dNone');
    document.getElementById('startButton').classList.add('dNone');
    document.getElementById('selectscreen').classList.add('dNone');
    document.getElementById('wrapper').classList.remove('dNone');
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    menuSound.pause();
}

function showEndScreen(){
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