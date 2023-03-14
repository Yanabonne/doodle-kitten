import "./pages/index.css";

const game = document.querySelector(".game");
const doodler = document.createElement("div");
let doodlerLeftSpace = 50;
let isGameOver = false;
let platforms = [];
let upTimerId;
let downTimerId;
let rightTimerId;
let leftTimerId;
let platformTimerId;
let isJumping = true;
let isGoingLeft = false;
let isGoingRight = false;
let score = 0;
let scoreBest = 0;

let gameHeight = Number(getComputedStyle(game).height.replace("px", ""));
let gameWidth = Number(getComputedStyle(game).width.replace("px", ""));
let platformWidth = (85 / 450) * gameWidth;
let platformHeight = (25 / 85) * platformWidth;
let doodlerWidth = (60 / 450) * gameWidth;
const platformCount = 6;
let startPoint = (1 / 3) * gameWidth;
let doodlerBottomSpace = startPoint;
let platformGap = gameHeight / platformCount;

const popupStart = document.querySelector("#popup_start");
const buttonStart = popupStart.querySelector("#popup-button_start");
const linkToRules = popupStart.querySelector("#popup_link-to-rules");

const popupGameOver = document.querySelector("#popup_game-over");
const buttonGameOver = popupGameOver.querySelector("#popup-button_game-over");

const popupRules = document.querySelector("#popup_rules");
const linkToStart = popupRules.querySelector(".popup__link");

class Platform {
  constructor(newPlatformBottom) {
    this.bottom = newPlatformBottom;
    this.left = Math.random() * (gameWidth - platformWidth);
    this.visual = document.createElement("div");

    const visual = this.visual;
    visual.classList.add("game__platform");
    visual.style.left = `${this.left}px`;
    visual.style.bottom = `${this.bottom}px`;
    game.appendChild(visual);
  }
}

function hidePopup(popup) {
  popup.classList.add("popup_inactive");
}

function showPopup(popup) {
  popup.classList.remove("popup_inactive");
}

function createDoodler() {
  game.appendChild(doodler);
  doodler.classList.add("game__doodler");
  doodlerLeftSpace = platforms[0].left;
  doodler.style.left = `${doodlerLeftSpace}px`;
  doodler.style.bottom = `${doodlerBottomSpace}px`;
}

function createPlatforms() {
  for (let i = 0; i < platformCount; i++) {
    let newPlatformBottom = (1 / 6) * gameHeight + i * platformGap;
    let newPlatform = new Platform(newPlatformBottom);
    platforms.push(newPlatform);
  }
}

function movePlatforms() {
  if (doodlerBottomSpace > (1 / 3) * gameHeight) {
    platforms.forEach((platform) => {
      platform.bottom -= 4;
      let visual = platform.visual;
      visual.style.bottom = `${platform.bottom}px`;
      if (platform.bottom < (1 / 60) * gameHeight) {
        let firstPlatform = platforms[0].visual;
        firstPlatform.classList.remove("game__platform");
        platforms.shift();
        score += 1;
        let newPlatform = new Platform(gameHeight);
        platforms.push(newPlatform);
      }
    });
  }
}

function jump() {
  clearInterval(downTimerId);
  isJumping = true;
  upTimerId = setInterval(function () {
    doodlerBottomSpace += (1 / 30) * gameHeight;
    doodler.style.bottom = `${doodlerBottomSpace}px`;
    if (doodlerBottomSpace > startPoint + (1 / 3) * gameHeight) {
      fall();
    }
  }, 30);
}

function fall() {
  clearInterval(upTimerId);
  isJumping = false;
  downTimerId = setInterval(function () {
    doodlerBottomSpace -= (1 / 120) * gameHeight;
    doodler.style.bottom = `${doodlerBottomSpace}px`;
    if (doodlerBottomSpace <= 0) {
      gameOver();
    }
    platforms.forEach((platform) => {
      if (
        doodlerBottomSpace >= platform.bottom &&
        doodlerBottomSpace <= platform.bottom + platformHeight &&
        doodlerLeftSpace + doodlerWidth >= platform.left &&
        doodlerLeftSpace <= platform.left + platformWidth &&
        !isJumping
      ) {
        startPoint = doodlerBottomSpace;
        jump();
      }
    });
  }, 30);
}

function moveLeft() {
  if (isGoingRight) {
    clearInterval(rightTimerId);
    isGoingRight = false;
  } else {
    if (isGoingLeft) {
      return;
    } else {
      isGoingLeft = true;
      leftTimerId = setInterval(function () {
        if (doodlerLeftSpace >= 0) {
          doodlerLeftSpace -= 5;
          doodler.style.left = `${doodlerLeftSpace}px`;
        } else {
          isGoingLeft = false;
          clearInterval(leftTimerId);
        }
      }, 30);
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
        if (doodlerLeftSpace <= gameWidth - doodlerWidth) {
          doodlerLeftSpace += 5;
          doodler.style.left = `${doodlerLeftSpace}px`;
        } else {
          isGoingRight = false;
          clearInterval(rightTimerId);
        }
      }, 30);
    }
  }
}

function controlDoodleArrows(e) {
  if (e.key === "ArrowLeft") {
    moveLeft();
  } else if (e.key === "ArrowRight") {
    moveRight();
  }
}

function fillScores() {
  if (localStorage.getItem("bestSavedScore")) {
    if (score > localStorage.getItem("bestSavedScore")) {
      localStorage.setItem("bestSavedScore", score);
      scoreBest = score;
    } else {
      scoreBest = localStorage.getItem("bestSavedScore");
    }
  } else if (score > scoreBest) {
    localStorage.setItem("bestSavedScore", score);
    scoreBest = score;
  }
  popupGameOver.querySelector("#score").textContent = `Ваш счёт: ${score}`;
  popupGameOver.querySelector(
    "#best-score"
  ).textContent = `Ваш лучший счёт: ${scoreBest}`;
}

function gameOver() {
  isGameOver = true;
  while (game.firstChild) {
    game.removeChild(game.firstChild);
  }
  clearInterval(upTimerId);
  clearInterval(downTimerId);
  clearInterval(leftTimerId);
  clearInterval(rightTimerId);
  clearInterval(platformTimerId);
  fillScores();
  showPopup(popupGameOver);
  platforms = [];
  score = 0;
}

function startGame() {
  if (!isGameOver) {
    hidePopup(popupStart);
    createPlatforms();
    createDoodler();
    platformTimerId = setInterval(movePlatforms, 30);
    jump();
    document.addEventListener("keyup", controlDoodleArrows);
  }
}

buttonStart.addEventListener("click", startGame);
buttonGameOver.addEventListener("click", function () {
  hidePopup(popupGameOver);
  showPopup(popupStart);
  isGameOver = false;
});

linkToRules.addEventListener("click", function () {
  hidePopup(popupStart);
  showPopup(popupRules);
});
linkToStart.addEventListener("click", function () {
  hidePopup(popupRules);
  showPopup(popupStart);
});
