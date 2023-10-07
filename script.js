let grid = document.querySelector(".grid");
let popup = document.querySelector(".popup");
let playAgain = document.querySelector(".playAgain");
let scoreDisplay = document.querySelector(".scoreDisplay");
let width = 10;
let currentIndex = 0;
let appleIndex = 0;
let trapIndex = 0;
let currentSnake = [2, 1, 0];
let direction = 1;
let score = 0;
let speed = 0.8;
let intervalTime = 500;
let interval = 0;
document.addEventListener("DOMContentLoaded", function () {
    document.addEventListener("keyup", control);
    gameBoard();
    startGame();
  });
function startGame() {
    let squares = document.querySelectorAll(".grid div");
    randomApple(squares)
    randomTrap(squares)
    direction = 1;
    scoreDisplay.innerHTML = "Score : " + score;
    intervalTime = 500;
    currentSnake = [2, 1, 0];
    currentIndex = 0;
    currentSnake.forEach((index) => squares[index].classList.add("snake"));
    interval = setInterval(moveOutcome, intervalTime)
    score = 0
    alert("u need to get 3 score")
  }
function gameBoard() {
    for (let i = 0; i < 100; i++) {
        let div = document.createElement("div")
        grid.appendChild(div)
    }
}
function randomTrap(squares){
  do {
    trapIndex = Math.floor(Math.random() * squares.length)
    squares[trapIndex].classList.add("trap")
  } while (squares[trapIndex].classList.contains("snake") && squares[appleIndex].classList.contains("apple"));
}
function eatTrap(squares, tail){
  if (squares[currentSnake[0]].classList.contains("trap")) {
    squares[currentSnake[0]].classList.remove("trap")
    currentSnake.pop()
    squares[tail].classList.remove("snake")
    score--
    scoreDisplay.textContent = score;
    clearInterval(interval)
    intervalTime = 500
    interval = setInterval(moveOutcome, intervalTime);
    randomTrap(squares)
  }
}

function randomApple(squares) {
    do {
      appleIndex = Math.floor(Math.random() * squares.length);
    } while (squares[appleIndex].classList.contains("snake"));
    squares[appleIndex].classList.add("apple");
  }
  function eatApple(squares, tail) {
    if (squares[currentSnake[0]].classList.contains("apple")) {
      squares[currentSnake[0]].classList.remove("apple");
      squares[tail].classList.add("snake");
      currentSnake.push(tail);
      randomApple(squares);
      score++;
      scoreDisplay.textContent = score;
      clearInterval(interval);
      intervalTime = 500
      interval = setInterval(moveOutcome, intervalTime);
    }
  }
function moveSnake(squares) {
    let tail = currentSnake.pop();
    squares[tail].classList.remove("snake")
    squares[currentSnake[0]].classList.remove("snake_head")
    squares[currentSnake[0]].classList.add("snake")
    currentSnake.unshift(currentSnake[0] + direction)
    squares[currentSnake[0]].classList.add("snake_head")
    eatApple(squares, tail);
    eatTrap(squares, tail)
}
function moveOutcome() {
    let squares = document.querySelectorAll(".grid div");
    if (checkForHits(squares)) {
        alert("you hit something");
        return clearInterval(interval);
    }    
    else if(score === 5){
      nextLevel();
    }
    else{
        moveSnake(squares)
    }
}
function checkForHits(squares) {
    if (
      (currentSnake[0] + width >= width * width && direction === width) ||
      (currentSnake[0] % width === width - 1 && direction === 1) ||
      (currentSnake[0] % width === 0 && direction === -1) ||
      (currentSnake[0] - width <= 0 && direction === -width) ||
      squares[currentSnake[0] + direction].classList.contains("snake")
    ) {
      return true;
    } else {
      return false;
    }
  }
  function control(e) {
    if (e.keyCode === 39) {
      direction = 1;
    } else if (e.keyCode === 38) {
      direction = -width;
    } else if (e.keyCode === 37) {
      direction = -1;
    } else if (e.keyCode === 40) {
      direction = +width;
    }
  }
  
  let Up = document.querySelector(".top")
  let bottom = document.querySelector(".bottom")
  let left = document.querySelector(".left")
  let right = document.querySelector(".right")
  Up.addEventListener('click', () => {
    direction = -width
  })
  bottom.addEventListener('click', () => {
    direction = width
  })
  left.addEventListener('click', () => {
    direction = -1
  })
  right.addEventListener('click', () => {
    direction = 1
  })

 timer = document.getElementById("timer")
 const start = new Date()
 start.setSeconds(start.getSeconds() + 60)

 function updateTimer(){
    const currentTime = new Date()
    const timeDiff = new Date(start - currentTime)
    const seconds = timeDiff.getSeconds()
    intervalTime = 1000;
    timer.innerText = `${seconds.toString().padStart(2, "0")}`
    if (timeDiff<=0) {
        clearInterval(interval)
        retry()
    }
 }
 updateTimer()
 interval = setInterval(updateTimer, intervalTime)

 function clearBoard() {
  let squares = document.querySelectorAll(".grid div");
  currentSnake.forEach(i => {
    squares[i].classList.remove("snake");
    squares[i].classList.remove("snake_head")
  });
  squares[appleIndex].classList.remove("apple");
  appleIndex = -1;
}

function retry(){
  let retry = confirm("u need to get 3 score. Try again")
    if (retry) {
        clearBoard()
        clearInterval(interval)
        startGame()
        score = 0
    }     
}
function nextLevel(){
  let nextLevel = confirm("U won, wanna go to the next level?")
  if (nextLevel) {
    clearBoard()
    clearInterval(interval)
    startGame()
    score = 0
  } else {
    alert("Okay maybe next time")
    clearBoard()
  }
}