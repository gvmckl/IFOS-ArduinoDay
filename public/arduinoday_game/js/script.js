const startButton = document.getElementById('startButton');
const homeButton = document.getElementById('homeButton');
const resetButton = document.getElementById('resetButton'); // Adiciona o botão de reset
const pipe = document.querySelector('.pipe'); // Seleciona o elemento do pipe
let loop; // Variável para controlar o loop do jogo
let timerInterval; // Variável para armazenar o intervalo do cronômetro
let startTime; // Variável para armazenar o tempo de início do cronômetro
const timerDisplay = document.getElementById('cronometro');

startButton.addEventListener('click', () => {
    clearInterval(loop); // Limpa o loop anterior se houver
    startGame();
    toggleButtons(false); // Esconde os botões ao iniciar o jogo
    startTimer(); // Inicia o cronômetro quando o jogo começa
    pipe.style.display = 'block'; // Mostra o pipe quando o jogo começa
});

homeButton.addEventListener('click', () => {
    window.location.href = '/public/arduinoday_site/index.html'; // Redireciona para a página inicial
});

resetButton.addEventListener('click', () => {
    location.reload(); // Recarrega a página para reiniciar o jogo
});

function startGame() {
    resetButton.style.display = 'none'; // Esconde o botão de reset ao iniciar o jogo

    const mario = document.querySelector('.mario');

    mario.style.bottom = '0'; // Reseta a posição vertical do Mario
    mario.src = './images/mario.gif'; // Reseta a imagem do Mario
    mario.style.width = '150px'; // Reseta a largura do Mario
    mario.style.marginLeft = '0'; // Reseta a margem esquerda do Mario

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

            clearInterval(loop); // Limpa o loop do jogo
            toggleButtons(true); // Mostra os botões quando o jogo termina
            stopTimer(); // Para o cronômetro quando o jogo termina
            resetButton.style.display = 'block'; // Mostra o botão de reset quando o personagem morrer
            startButton.style.display = 'none'; // Esconde o botão de start quando o personagem morrer
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
    startTime = new Date().getTime(); // Obtém o tempo atual em milissegundos

    // Atualiza o cronômetro a cada milissegundo
    timerInterval = setInterval(() => {
        const currentTime = new Date().getTime(); // Obtém o tempo atual em milissegundos
        const elapsedTime = currentTime - startTime; // Calcula o tempo decorrido
        const milliseconds = elapsedTime % 1000; // Calcula os milissegundos
        const seconds = Math.floor((elapsedTime / 1000) % 60); // Calcula os segundos
        const minutes = Math.floor((elapsedTime / (1000 * 60)) % 60); // Calcula os minutos
        const hours = Math.floor((elapsedTime / (1000 * 60 * 60))); // Calcula as horas

        // Formata o tempo para exibição (com zero à esquerda se necessário)
        const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`;

        // Atualiza o texto do cronômetro na interface do usuário
        timerDisplay.textContent = formattedTime;
    }, 1);
}

function stopTimer () {
    clearInterval(timerInterval); // Limpa o intervalo do cronômetro
    }
