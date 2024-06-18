let order = [];
let playerOrder = [];
let flash;
let turn;
let good;
let compTurn;
let intervalId;
let strict = false;
let noise = true;
let on = false;
let win;

const turnCounter = document.querySelector("#turn");
const topLeft = document.querySelector("#topleft");
const topRight = document.querySelector("#topright");
const bottomLeft = document.querySelector("#bottomleft");
const bottomRight = document.querySelector("#bottomright");
const strictButton = document.querySelector("#strict");
const onButton = document.querySelector("#on");
const startButton = document.querySelector("#start");

strictButton.addEventListener('click', () => {
  strict = strictButton.checked;
});

onButton.addEventListener('click', () => {
  on = onButton.checked;
  updateGameStatus();
});

startButton.addEventListener('click', () => {
  if (on) {
    startGame();
  }
});

function startGame() {
  win = false;
  order = [];
  playerOrder = [];
  flash = 0;
  turn = 1;
  turnCounter.innerHTML = 1;
  good = true;

  for (let i = 0; i < 20; i++) {
    order.push(Math.floor(Math.random() * 4) + 1);
  }

  compTurn = true;
  intervalId = setInterval(gameTurn, 800);
}

function gameTurn() {
  on = false;

  if (flash == turn) {
    clearInterval(intervalId);
    compTurn = false;
    clearColor();
    on = true;
  }

  if (compTurn) {
    clearColor();
    setTimeout(() => {
      switch(order[flash]) {
        case 1:
          one();
          break;
        case 2:
          two();
          break;
        case 3:
          three();
          break;
        case 4:
          four();
          break;
      }
      flash++;
    }, 200);
  }
}

function one() {
  playSoundAndLight("clip1", topLeft, "lightgreen");
}

function two() {
  playSoundAndLight("clip2", topRight, "tomato");
}

function three() {
  playSoundAndLight("clip3", bottomLeft, "yellow");
}

function four() {
  playSoundAndLight("clip4", bottomRight, "lightskyblue");
}

function playSoundAndLight(audioId, element, color) {
  if (noise) {
    document.getElementById(audioId).play();
  }
  noise = true;
  element.style.backgroundColor = color;
}

function clearColor() {
  topLeft.style.backgroundColor = "darkgreen";
  topRight.style.backgroundColor = "darkred";
  bottomLeft.style.backgroundColor = "goldenrod";
  bottomRight.style.backgroundColor = "darkblue";
}

function flashColor() {
  topLeft.style.backgroundColor = "lightgreen";
  topRight.style.backgroundColor = "tomato";
  bottomLeft.style.backgroundColor = "yellow";
  bottomRight.style.backgroundColor = "lightskyblue";
}

[topLeft, topRight, bottomLeft, bottomRight].forEach((element, index) => {
  element.addEventListener('click', () => {
    if (on) {
      playerOrder.push(index + 1);
      check();
      switch(index + 1) {
        case 1:
          one();
          break;
        case 2:
          two();
          break;
        case 3:
          three();
          break;
        case 4:
          four();
          break;
      }
      if (!win) {
        setTimeout(() => {
          clearColor();
        }, 300);
      }
    }
  });
});

function check() {
  if (playerOrder[playerOrder.length - 1] !== order[playerOrder.length - 1]) {
    good = false;
  }

  if (!good) {
    flashColor();
    turnCounter.innerHTML = "NO!";
    setTimeout(() => {
      turnCounter.innerHTML = "";
      stopGame();
    }, 800);
    noise = false;
    return;
  }

  if (playerOrder.length === 20 && good) {
    winGame();
  }

  if (turn === playerOrder.length && good && !win) {
    turn++;
    playerOrder = [];
    compTurn = true;
    flash = 0;
    turnCounter.innerHTML = turn;
    intervalId = setInterval(gameTurn, 800);
  }
}

function winGame() {
  flashColor();
  turnCounter.innerHTML = "WIN!";
  on = false;
  win = true;
}

function updateGameStatus() {
  if (!on) {
    turnCounter.innerHTML = "";
    clearColor();
    clearInterval(intervalId);
  } else {
    turnCounter.innerHTML = "-";
  }
}

function stopGame() {
  clearInterval(intervalId);
  compTurn = false;
  playerOrder = [];
  flash = 0;
  turnCounter.innerHTML = "";
  clearColor();
}
