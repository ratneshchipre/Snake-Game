const playArea = document.querySelector('.play-board'); 
const changeHead = document.querySelector('.snake-head');
const currentScore = document.querySelector('.score');
const highScoreElement = document.querySelector('.high-score');
const controls = document.querySelectorAll('.mobile-controls i');

let gameOver = false;
let foodX, foodY;
let snakeX = 5, snakeY = 10;
let snakeBody = [];
let velocityX = 0, velocityY = 0;
let setTimeoutId;
let score = 0;

let highScore = localStorage.getItem('high-score') || 0;
highScoreElement.innerText = `High Score: ${highScore}`;

const changeFoodPosition = () => {
    foodX = Math.floor(Math.random() * 30) + 1,
    foodY = Math.floor(Math.random() * 30) + 1
};

const controlGameOver = () => {
    clearTimeout(setTimeoutId);
    alert('Game Over! Press OK to play again...');
    location.reload();
}

changeSnakeDirection = (event) => {
    if(event.key === "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    } else if(event.key === "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    } else if(event.key === "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    } else if(event.key === "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    }
    inItGame();
}

controls.forEach(key => {
    key.addEventListener('click', () => changeSnakeDirection({
        key: key.dataset.key
    }));
});

const inItGame = () => {
    if(gameOver) return controlGameOver(); 

    let snakeFood = `<div class="snake-food" style="grid-area: ${foodY} / ${foodX}"></div>`;

    if(snakeX === foodX && snakeY === foodY) {
        changeFoodPosition();
        snakeBody.push([foodX, foodY]);
        score++;

        highScore = score >= highScore ? score : highScore;
        localStorage.setItem('high-score', highScore);

        currentScore.innerText = `Score: ${score}`;
        highScoreElement.innerText = `High Score: ${highScore}`;
    }

    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }

    snakeBody[0] = [snakeX, snakeY];

    snakeX += velocityX;
    snakeY += velocityY;

    if(snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
        gameOver = true;
    }

    for (let i = 0; i < snakeBody.length; i++) {
        snakeFood += `<div class="snake-head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;

        if(i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]) {
            gameOver = true;
        }
    }

    playArea.innerHTML = snakeFood;
};

changeFoodPosition();
setTimeoutId = setInterval(inItGame, 125);

document.addEventListener('keydown', changeSnakeDirection);