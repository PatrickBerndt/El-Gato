attackingSound = new Audio('audio/whoosh.mp3');
collectSound = new Audio('audio/drop.mp3');
ratHurtSound = new Audio('audio/mouse.mp3');
bossHurtSound = new Audio('audio/hurt_2.mp3');
gameMusic = new Audio('audio/gameSound.mp3');
bossMusic = new Audio('audio/bossSound.mp3');
crackingSound = new Audio('audio/cracking.mp3')
winSound = new Audio('audio/winSound.mp3');
looseSound = new Audio('audio/looseSound.mp3');
walkingSound = new Audio('audio/walk.mp3');
menuSound = new Audio('audio/menuSound.mp3');
let muteSoundtoggle = false; 

function volumeControllMusic(vol){
    menuSound.volume = vol;
    gameMusic.volume = vol;
    bossMusic.volume = vol;
}

function volumeControllFX(vol){
    attackingSound.volume = vol;
    collectSound.volume = vol;
    ratHurtSound.volume = vol;
    bossHurtSound.volume = vol;
    crackingSound.volume = vol;
    walkingSound.volume = vol;
    looseSound.volume = vol;
    winSound.volume = vol;

}

function muteSound(){
    document.getElementById('muteButton').classList.toggle('red');
    if(muteButton){
        muteButton= false;
        volumeControllFX(0);
        volumeControllMusic(0);
    }else{
        muteButton= true;
        volumeControllFX(0.5);
        volumeControllMusic(0.5);
    }

}