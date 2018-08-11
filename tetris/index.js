const defaultConfig = {
  squareSize: 20,
  rows: 20,
  columns: 10,
  blankColor: '#111',
  borderColor: '#111',
}

window.addEventListener('load', () => {
  const tetris = new Tetris('tetris');
  tetris.setKeyListeners();
});