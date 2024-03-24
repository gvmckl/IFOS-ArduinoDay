const startButton = document.getElementById('startButton');
const homeButton = document.getElementById('homeButton');
const resetButton = document.getElementById('resetButton');
const pipe = document.querySelector('.pipe');
let loop;
let timerInterval; 
let startTime; 
const timerDisplay = document.getElementById('cronometro');

startButton.addEventListener('click', () => {
    clearInterval(loop); 
    startGame();
    toggleButtons(false);
    startTimer();
    pipe.style.display = 'block';
});

homeButton.addEventListener('click', () => {
    window.location.href = '/public/arduinoday_site/index.html';
});

resetButton.addEventListener('click', () => {
    location.reload(); 
});

function startGame() {
    resetButton.style.display = 'none'; 

    const mario = document.querySelector('.mario');

    mario.style.bottom = '0'; 
    mario.src = './images/mario.gif'; 
    mario.style.width = '150px'; 
    mario.style.marginLeft = '0'; 

    const jump = () => {
        mario.classList.add('jump');

        setTimeout(() => {
            mario.classList.remove('jump');
        }, 500);
    }

    loop = setInterval(() => {

        const pipePosition = pipe.offsetLeft;
        const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

        if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {

            pipe.style.animation = 'none';
            pipe.style.left = `${pipePosition}px`;

            mario.style.animation = 'none';
            mario.style.bottom = `${marioPosition}px`;

            mario.src = 'images/game-over.png';
            mario.style.width = '75px'
            mario.style.marginLeft = '50px'

            clearInterval(loop); 
            toggleButtons(true); 
            stopTimer(); 
            resetButton.style.display = 'block'; 
            startButton.style.display = 'none'; 
        }

    }, 10);

    document.addEventListener('keydown', jump);
}

function toggleButtons(show) {
    const buttons = document.querySelectorAll('.game-buttons button');
    buttons.forEach(button => {
        button.style.display = show ? 'block' : 'none';
    });
}

function startTimer() {
    startTime = new Date().getTime(); 
    timerInterval = setInterval(() => {
        const currentTime = new Date().getTime(); 
        const elapsedTime = currentTime - startTime; 
        const milliseconds = elapsedTime % 1000; 
        const seconds = Math.floor((elapsedTime / 1000) % 60); 
        const minutes = Math.floor((elapsedTime / (1000 * 60)) % 60); 
        const hours = Math.floor((elapsedTime / (1000 * 60 * 60))); 
        const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`;

        timerDisplay.textContent = formattedTime;
    }, 1);
}

function stopTimer () {
    clearInterval(timerInterval);
    }
