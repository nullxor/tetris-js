const defaultConfig = {
  // Block size in pixels
  blockSize: 20,
  
  // Rows in 'Blocks'
  rows: 20,
  
  //Columns in 'Blocks'
  columns: 10,

  // Blank Color
  blankColor: '#111',

  // Border color
  borderColor: '#111',
}

window.addEventListener('load', () => {
  const field = new Field(defaultConfig.rows, defaultConfig.columns);
  const drawer = new Drawer(document.getElementById('tetris'), field,  defaultConfig.blockSize, defaultConfig.blankColor);
  const tetris = new Tetris(drawer, field, defaultConfig);
  tetris.setKeyListeners();
});