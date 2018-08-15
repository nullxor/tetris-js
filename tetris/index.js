window.addEventListener('load', () => {
  const field = new Field(defaultConfig.rows, defaultConfig.columns);
  const drawer = new Drawer(document.getElementById('tetris'), field,  defaultConfig.blockSize, defaultConfig.blankColor);
  const tetris = new Tetris(drawer, field, defaultConfig);
  tetris.setKeyListeners();
});