const TETROMINO_I =
[
  [
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ], 
  [
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0]
  ]
];

const TETROMINO_Q =
[
  [
    [1, 1, 0],
    [1, 1, 0],
    [0, 0, 0],
  ], 
];

const TETROMINO_S =
[
  [
    [1, 1, 0],
    [0, 1, 1],
    [0, 0, 0],
  ], 
  [
    [0, 1, 0],
    [1, 1, 0],
    [1, 0, 0],
  ],
];

const TETROMINO_T =
[
  [
    [0, 1, 0],
    [1, 1, 1],
    [0, 0, 0],
  ], 
  [
    [0, 1, 0],
    [0, 1, 1],
    [0, 1, 0],
  ],
  [
    [1, 1, 1],
    [0, 1, 0],
    [0, 0, 0],
  ],
  [
    [0, 1, 0],
    [1, 1, 0],
    [0, 1, 0],
  ],  
];

const TETROMINO_L =
[
  [
    [1, 0, 0],
    [1, 1, 1],
    [0, 0, 0],
  ], 
  [
    [0, 1, 1],
    [0, 1, 0],
    [0, 1, 0],
  ],
  [
    [1, 1, 1],
    [0, 0, 1],
    [0, 0, 0],
  ],
  [
    [0, 0, 1],
    [0, 0, 1],
    [0, 1, 1],
  ],  
];

class Tetris {
  constructor(drawer, field, config = defaultConfig) {
    this.field = field;
    this.drawer = drawer;
    this.config = config;
    this.drawer.grid(this.config.rows, this.config.columns, this.config.blankColor, this.config.borderColor);
    this.tetrominoes = [TETROMINO_I, TETROMINO_S, TETROMINO_T, TETROMINO_Q, TETROMINO_L];
    this.currentTetromino = this.getRandomTetromino();
    this.drawTetromino(this.currentTetromino, this.currentTetromino.color);
  }

  getRandomTetromino() {
    const colors = ['#d11', '#1d1', '#11d', '#dd1', '#d1d', '#1cd', '#fdd'];
    const randomColor = Math.floor(Math.random() * (colors.length));
    const randomIndex = Math.floor(Math.random() * (this.tetrominoes.length));
    return new Tetromino((this.config.columns / 2) - 1 , 0, colors[randomColor], this.tetrominoes[randomIndex]);
  }

  // 1 Left collision, 2 right collision, 3 bottom collision
  // 4 another piece bottom collision, 5 another piece collision
  isThereCollision(deltaX, deltaY) {
    const matrix = this.currentTetromino.getCurrentMatrix();
    for (let x = matrix.length  - 1; x >= 0; x--) {
      for (let y = matrix.length - 1; y >= 0; y--) {
        if (matrix[y][x]) {
          const testX = this.currentTetromino.getX() + x + deltaX;
          const testY = this.currentTetromino.getY() + y + deltaY;
          if (testX < 0) return 1;
          if (testX >= this.config.columns) return 2;
          if (testY >= this.config.rows) return 3;
          if (this.field.isFullBlock(testX, testY))  return 4;
        }
      }
    }
    return false;
  }

  drawTetromino(tetromino, color, borderColor = this.config.borderColor) {
    const matrix = tetromino.getCurrentMatrix();
    for (let row = 0; row < matrix.length; row++) {
      for (let col = 0; col < matrix.length; col++) {
        if (matrix[row][col] > 0) {
          const x = tetromino.getX() + col, y = tetromino.getY() + row;
          this.drawer.block(x, y, color, borderColor);
        }
      }
    }
  }

  setKeyListeners() {
    document.addEventListener('keydown', (e) => {
      if (this.currentTetromino.isLocked()) {
        return false;
      }

      const isArrow = [37, 38, 39, 40].indexOf(e.keyCode) !== -1;
      if (isArrow) { 
        this.drawTetromino(this.currentTetromino, this.config.blankColor);
      }
      // Left
      if (e.keyCode === 37) {
        if (!this.isThereCollision(-1, 0)) {
          this.currentTetromino.moveLeft();
        }
      }
      // Up
      if (e.keyCode === 38) {
        const currentRotation = this.currentTetromino.rotation;
        this.currentTetromino.rotate();
        const collisionType = this.isThereCollision(0, 0);
        if (collisionType) {
          switch (collisionType) {
            case 1:
              this.currentTetromino.moveRight();
              break;
            case 2:
              this.currentTetromino.moveLeft();
              break;          
            default:
              this.currentTetromino.setRotation(currentRotation);
              break;
          }
        }
      }
      // Right
      if (e.keyCode === 39) {
        if (!this.isThereCollision(1, 0)) {
          this.currentTetromino.moveRight();
        }
      }
      // Down
      if (e.keyCode === 40) {
        this.checkDown();
        return;
      }
      if (isArrow) {
        this.drawTetromino(this.currentTetromino, this.currentTetromino.color);
      }
    });
  }

  checkDown() {
    this.drawTetromino(this.currentTetromino, this.config.blankColor);
    if (this.isThereCollision(0, 1)) {
      this.drawTetromino(this.currentTetromino, this.currentTetromino.color);
      this.currentTetromino.lock();
      let y = this.currentTetromino.getBottomY();
      while (y >= this.currentTetromino.getY()) {
        if (this.field.isFullRow(y)) {
          this.drawer.moveAllRows(y - 1, y);
        } else {
          y--;
        }
      }
      this.currentTetromino = this.getRandomTetromino();
    } else {
      this.currentTetromino.moveDown();
    }
    this.drawTetromino(this.currentTetromino, this.currentTetromino.color);
  }
}