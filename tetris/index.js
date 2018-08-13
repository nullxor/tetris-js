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
  const tetris = new Tetris('tetris');
  tetris.setKeyListeners();
});