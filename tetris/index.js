window.addEventListener('load', () => {
  const scoreElement = document.getElementById('score');
  const field = new Field(defaultConfig.rows, defaultConfig.columns);
  const drawer = new Drawer(document.getElementById('tetris'), field,  defaultConfig.blockSize, defaultConfig.blankColor);
  const tetris = new Tetris(drawer, field, defaultConfig);
  tetris.setKeyListeners();
  tetris.onUpdateScore = (score) => {
    scoreElement.innerText = score;
  }
});