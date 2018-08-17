window.addEventListener('load', () => startNewGame());

function startNewGame() {
  const gameOverElement = document.getElementById('gameover');
  gameOverElement.style = 'visibility: hidden';
  const cfg = defaultConfig;
  const scoreElement = document.getElementById('score');
  const timeElement = document.getElementById('time');
  const field = new Field(cfg.rows, cfg.columns);
  const drawer = new Drawer(document.getElementById('tetris'), field, cfg.blockSize, cfg.blankColor);
  const tetris = new Tetris(drawer, field, window, cfg);
  const fieldNextPiece = new Field(5, 5);
  const drawerNextPiece = new Drawer(document.getElementById('nextPiece'), fieldNextPiece, 15, cfg.blankColor);
  tetris.setListeners();
  scoreElement.innerText = timeElement.innerText = 0;
  tetris.onUpdateScore = (score) => {
    scoreElement.innerText = score;
  };
  tetris.onGameOver = () => {
    gameOverElement.style = 'visibility: visible';
  };
  tetris.onElapsedSecond = (totalSeconds) => {
    timeElement.innerText = totalSeconds;
  };
  tetris.onRandomTetromino = (tetromino) => {
    drawerNextPiece.reset();
    drawerNextPiece.drawTetromino(tetromino);
  }
  tetris.start();
}