const game = document.querySelector('.game');
const doodler = document.createElement('div');
let doodlerLeftSpace = 50;
let isGameOver = false;
let platforms = [];
let upTimerId;
let downTimerId;
let isJumping = true;
let isGoingLeft = false;
let isGoingRight = false;
let score = 0;

let gameHeight = Number(getComputedStyle(game).height.replace('px',''));
let gameWidth = Number(getComputedStyle(game).width.replace('px',''));
let platformWidth = (85/450 * gameWidth);
let platformHeight = (25/85 * platformWidth);
let doodlerWidth = (60/450 * gameWidth);
let platformCount = 6;
let startPoint = (1/3 * gameWidth);
let doodlerBottomSpace = startPoint;

class Platform {
    constructor(newPlatformBottom) {
        this.bottom = newPlatformBottom;
        this.left = Math.random() * (gameWidth - platformWidth);
        this.visual = document.createElement('div');

        const visual = this.visual;
        visual.classList.add('game__platform');
        visual.style.left = `${this.left}px`;
        visual.style.bottom = `${this.bottom}px`
        game.appendChild(visual);
    }
}

function createDoodler () {
    game.appendChild(doodler);
    doodler.classList.add('game__doodler');
    doodlerLeftSpace = platforms[0].left;
    doodler.style.left = `${doodlerLeftSpace}px`;
    doodler.style.bottom = `${doodlerBottomSpace}px`
}

function createPlatforms() {
    for (let i = 0; i < platformCount; i++) {
        let platformGap = gameHeight / platformCount;
        let newPlatformBottom = (1/6 * gameHeight) + i * platformGap;
        let newPlatform = new Platform(newPlatformBottom);
        platforms.push(newPlatform);
    }
}

function movePlatforms() {
    if (doodlerBottomSpace > (1/3 * gameHeight)) {
        platforms.forEach(platform => {
            platform.bottom -= 4;
            let visual = platform.visual;
            visual.style.bottom = `${platform.bottom}px`;
            if (platform.bottom < (1/60 * gameHeight)) {
                let firstPlatform = platforms[0].visual;
                firstPlatform.classList.remove('game__platform');
                platforms.shift();
                score += 1;
                let newPlatform = new Platform(gameHeight);
                platforms.push(newPlatform);
            }
        })
    }
}

function jump() {
    clearInterval(downTimerId);
    isJumping = true;
    upTimerId = setInterval(function () {
        doodlerBottomSpace += (1/30 * gameHeight);
        doodler.style.bottom = `${doodlerBottomSpace}px`;
        if (doodlerBottomSpace > (startPoint + (1/3 * gameHeight))) {
            fall();
        }
    }, 30);
}

function fall() {
    clearInterval(upTimerId);
    isJumping = false;
    downTimerId = setInterval(function () {
        doodlerBottomSpace -= (1/120 * gameHeight);
        doodler.style.bottom = `${doodlerBottomSpace}px`;
        if (doodlerBottomSpace <= 0) {
            gameOver();
    }
    platforms.forEach(platform => {
        if (
            (doodlerBottomSpace >= platform.bottom) &&
            (doodlerBottomSpace <= (platform.bottom + platformHeight)) &&
            ((doodlerLeftSpace + doodlerWidth) >= platform.left) && 
            (doodlerLeftSpace <= (platform.left + platformWidth)) &&
            !isJumping
        ) {
            startPoint = doodlerBottomSpace;
            jump();
        }
    })
    }, 30);
}

function moveLeft() {
    if (isGoingRight) {
        clearInterval(rightTimerId)
        isGoingRight = false;
    } else {
        if (isGoingLeft) {
            return;
        } else {
            isGoingLeft = true;
            leftTimerId = setInterval(function() {
                if (doodlerLeftSpace >= 0) {
                    doodlerLeftSpace -= 5;
                    doodler.style.left = `${doodlerLeftSpace}px`;
                } else {
                    isGoingLeft = false;
                    clearInterval(leftTimerId);
                };
            }, 30)
        }
    }
}

function moveRight() {
    if (isGoingLeft) {
        clearInterval(leftTimerId);
        isGoingLeft = false;
    } else {
        if (isGoingRight) {
            return;
        } else {
            isGoingRight = true;
            rightTimerId = setInterval(function () {
                if (doodlerLeftSpace <= (gameWidth - doodlerWidth)) {
                    doodlerLeftSpace += 5;
                    doodler.style.left = `${doodlerLeftSpace}px`;
                } else {
                    isGoingRight = false;
                    clearInterval(rightTimerId);
                };
            },30)
        }
    }
}

function controlDoodleArrows(e) {
    if (e.key === "ArrowLeft") {
        moveLeft();
    } else if (e.key === "ArrowRight") {
        moveRight();
    } else if (e.key === "ArrowUp") {

    }
}

function gameOver() {
    isGameOver = true;
    while(game.firstChild) {
       game.removeChild(game.firstChild);
    };
    game.innerHTML = score;
    clearInterval(upTimerId);
    clearInterval(downTimerId);
    clearInterval(leftTimerId);
    clearInterval(rightTimerId);
}

function startGame() {
    if (!isGameOver) {
        createPlatforms();
        createDoodler();
        setInterval(movePlatforms, 30);
        jump();
        document.addEventListener('keyup',controlDoodleArrows);
    };
}

startGame();