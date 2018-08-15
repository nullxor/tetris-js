window.addEventListener('load', () => {
  const scoreElement = document.getElementById('score');
  const gameOverElement = document.getElementById('gameover');
  const timeElement = document.getElementById('time');
  const field = new Field(defaultConfig.rows, defaultConfig.columns);
  const drawer = new Drawer(document.getElementById('tetris'), field,  defaultConfig.blockSize, defaultConfig.blankColor);
  const tetris = new Tetris(drawer, field, window, defaultConfig);
  tetris.setListeners();
  tetris.onUpdateScore = (score) => {
    scoreElement.innerText = score;
  };
  tetris.onGameOver = () => {
    gameOverElement.style = 'visibility: visible';
  };
  tetris.onElapsedSecond = (totalSeconds) => {
    timeElement.innerText = totalSeconds;
  };
});