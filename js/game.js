let canvas;
let world;
let keyboard = new Keyboard();
let characterNumber = 1;
let isFullscreen = false;

function init() {
    checkLandscapeMode();
    fitToScreen();
    volumeControllMusic(0.3);
    volumeControllFX(0.3);
}

window.addEventListener("orientationchange", () => {
    checkLandscapeMode();
});

window.addEventListener('resize', () => {
    fitToScreen();
});

window.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement) {
        document.getElementById('content').style = `zoom:1; ,-moz-transform: scale(1);`;
        document.getElementById('overlay').classList.add('dNone');
        isFullscreen = false;
    }
});

function fitToScreen() {
    let bodyWidth = document.getElementById('body').clientWidth;
    let bodyHeight = document.getElementById('body').clientHeight;
    if (bodyWidth < 725) {
        let zoomFactorW = (bodyWidth / 725);
        document.getElementById('content').style = `zoom:${zoomFactorW}; ,-moz-transform: scale(${zoomFactorW});`;
        document.getElementById('overlay').classList.remove('dNone');
        addEventListenersToPanel();
    } else if (bodyHeight < 485 || isFullscreen) {
        let zoomFactorH = (bodyHeight / 485);
        document.getElementById('content').style = `zoom:${zoomFactorH}; ,-moz-transform: scale(${zoomFactorH});`;
        document.getElementById('overlay').classList.remove('dNone');
        addEventListenersToPanel();
    } else {
        document.getElementById('content').style = `zoom:1; ,-moz-transform: scale(1);`;
        document.getElementById('overlay').classList.add('dNone');
    }
};

function checkLandscapeMode() {
    if (screen.availHeight > screen.availWidth) {
        this.document.getElementById('rotate').classList.remove('dNone');
        this.document.getElementById('content').classList.add('dNone');
    } else {
        this.document.getElementById('rotate').classList.add('dNone');
        this.document.getElementById('content').classList.remove('dNone');
    }
}

function selectCharacter(index) {
    for (let i = 1; i < 4; i++) {
        document.getElementById(`arrow${i}`).classList.add('dNone');
    }
    characterNumber = index;
    document.getElementById(`arrow${index}`).classList.remove('dNone');
}

function makeFullscreen() {
    if (isFullscreen) {
        document.exitFullscreen();
        isFullscreen = false;
    } else {
        document.getElementById('body').requestFullscreen();
        isFullscreen = true;
    }
}

function optionWindow() {
    document.getElementById('optionOverlay').classList.toggle('dNone');
}

function gameplayWindow() {
    document.getElementById('gameplayOverlay').classList.toggle('dNone');
}

function startGame() {
    document.getElementById('wrapper').classList.add('dNone');
    document.getElementById('selectscreen').classList.remove('dNone');
    document.getElementById('startButton').classList.remove('dNone');
    document.getElementById('youWon').classList.add('dNone');
    document.getElementById('youLost').classList.add('dNone');
    menuSound.play();
}

function lostGame() {
    document.getElementById('wrapper').classList.add('dNone');
    document.getElementById('youLost').classList.remove('dNone');
    clearAllIntervals();
}
function wonGame() {
    document.getElementById('wrapper').classList.add('dNone');
    document.getElementById('youWon').classList.remove('dNone');
    clearAllIntervals();
}

function playGame() {
    document.getElementById('playButton').classList.add('dNone');
    document.getElementById('coverimage').classList.add('dNone');
    document.getElementById('startButton').classList.add('dNone');
    document.getElementById('selectscreen').classList.add('dNone');
    document.getElementById('wrapper').classList.remove('dNone');
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    menuSound.pause();
}

function showEndScreen() {
    clearAllIntervals();
    location.reload();
}

function clearAllIntervals() {
    for (let i = 1; i < 999; i++) {
        window.clearInterval(i)
    };
}

window.addEventListener('keydown', (event) => {
    if (event.code == 'ArrowLeft') {
        keyboard.LEFT = true;
    }
    if (event.code == 'ArrowRight') {
        keyboard.RIGHT = true;
    }
    if (event.code == 'ArrowUp') {
        keyboard.UP = true;
    }
    if (event.code == 'Space') {
        keyboard.SPACE = true;
    }
});

window.addEventListener('keyup', (event) => {
    if (event.code == 'ArrowLeft') {
        keyboard.LEFT = false;
    }
    if (event.code == 'ArrowRight') {
        keyboard.RIGHT = false;
    }
    if (event.code == 'ArrowUp') {
        keyboard.UP = false;
    }
    if (event.code == 'Space') {
        keyboard.SPACE = false;
    }
});



function addEventListenersToPanel() {
    touchLeft();
    touchRight();
    touchUp();
    touchSpace();
}

function touchLeft() {
    const left = document.getElementById("btnLEFT");

    left.addEventListener("touchstart", (e) => {
        e.preventDefault();
        keyboard.LEFT = true;
    });

    left.addEventListener("touchend", (e) => {
        e.preventDefault();
        keyboard.LEFT = false;
    });
}

function touchRight() {
    const right = document.getElementById("btnRIGHT");

    right.addEventListener("touchstart", (e) => {
        e.preventDefault();
        keyboard.RIGHT = true;
    });

    right.addEventListener("touchend", (e) => {
        e.preventDefault();
        keyboard.RIGHT = false;
    });
}

function touchUp() {
    const jump = document.getElementById("btnUP");

    jump.addEventListener("touchstart", (e) => {
        e.preventDefault();
        keyboard.UP = true;
    });

    jump.addEventListener("touchend", (e) => {
        e.preventDefault();
        keyboard.UP = false;
    });
}

function touchSpace() {
    const space = document.getElementById("btnTHROW");

    space.addEventListener("touchstart", (e) => {
        e.preventDefault();
        keyboard.SPACE = true;
    });

    space.addEventListener("touchend", (e) => {
        e.preventDefault();
        keyboard.SPACE = false;
    });
}
