const COLLISION_TYPE = {
  LEFT: 1,
  RIGHT: 2,
  BOTTOM: 3,
  OTHER: 4   
};

class Tetris {
  constructor(drawer, field, config = defaultConfig) {
    this.field = field;
    this.drawer = drawer;
    this.config = config;
    this.tetrominoes = config.tetrominoes;
    this.drawer.grid(this.config.rows, this.config.columns, this.config.blankColor, this.config.borderColor);
    this.currentTetromino = this.getRandomTetromino();
    this.drawTetromino(this.currentTetromino, this.currentTetromino.color);
    this.score = 0;

    // Events
    this.onUpdateScore = () => {};
  }

  /**
   * Returns a random Tetromino
   */
  getRandomTetromino() {
    const colors = this.config.tetrominoesColor;
    const randomColor = Math.floor(Math.random() * (colors.length));
    const randomIndex = Math.floor(Math.random() * (this.tetrominoes.length));
    return new Tetromino((this.config.columns / 2) - 1 , 0, colors[randomColor], this.tetrominoes[randomIndex]);
  }

  /**
   * Checks if there is collision either with another block or the limits
   * Returns:
   * 0 No collision, 1 Left collision, 2 right collision,
   * 3 bottom collision, 4 another piece bottom collision 
   * @param {number} deltaX Delta X <0 Left, >0 Right
   * @param {number} deltaY Delta Y <0 Top, >0 Bottom 
   */
  isThereCollision(deltaX, deltaY) {
    const matrix = this.currentTetromino.getCurrentMatrix();
    for (let x = matrix.length  - 1; x >= 0; x--) {
      for (let y = matrix.length - 1; y >= 0; y--) {
        if (matrix[y][x]) {
          const testX = this.currentTetromino.getX() + x + deltaX;
          const testY = this.currentTetromino.getY() + y + deltaY;
          if (testX < 0) return COLLISION_TYPE.LEFT;
          if (testX >= this.config.columns) return COLLISION_TYPE.RIGHT;
          if (testY >= this.config.rows) return COLLISION_TYPE.BOTTOM;
          if (this.field.isFullBlock(testX, testY))  return COLLISION_TYPE.OTHER;
        }
      }
    }
    return 0;
  }

  /**
   * Draws a Tetromino
   * @param {Tetromino} tetromino Tetromino
   * @param {string} color Valid css color
   * @param {string} borderColor Valid css color
   */
  drawTetromino(tetromino, color, borderColor = this.config.borderColor) {
    const matrix = tetromino.getCurrentMatrix();
    for (let row = 0; row < matrix.length; row++) {
      for (let col = 0; col < matrix.length; col++) {
        if (matrix[row][col]) {
          const x = tetromino.getX() + col, y = tetromino.getY() + row;
          this.drawer.block(x, y, color, borderColor);
        }
      }
    }
  }

  /**
   * Sets the keys listeners and handles the event
   */
  setKeyListeners() {
    document.addEventListener('keydown', (e) => {
      const isArrow = [37, 38, 39, 40].indexOf(e.keyCode) !== -1;
      if (!isArrow || this.currentTetromino.isLocked()) { 
        return false;
      }
      // Erase current Tetromino
      this.drawTetromino(this.currentTetromino, this.config.blankColor);
      // Left Key
      if (e.keyCode === 37) {
        if (!this.isThereCollision(-1, 0)) {
          this.currentTetromino.moveLeft();
        }
      }
      // Up Key (Rotates the Tetromino)
      if (e.keyCode === 38) {
        const currentRotation = this.currentTetromino.getRotation();
        this.currentTetromino.rotate();
        if (this.isThereCollision(0, 0)) {
          this.currentTetromino.setRotation(currentRotation);
        }
      }
      // Right Key
      if (e.keyCode === 39) {
        if (!this.isThereCollision(1, 0)) {
          this.currentTetromino.moveRight();
        }
      }
      // Down Key
      if (e.keyCode === 40) {
        this.drawTetromino(this.currentTetromino, this.config.blankColor);
        if (this.isThereCollision(0, 1)) {
          this.drawTetromino(this.currentTetromino, this.currentTetromino.color);
          this.currentTetromino.lock();
          let y = this.currentTetromino.getBottomY();
          let removedRows = 0;
          while (y >= this.currentTetromino.getY()) {
            if (this.field.isFullRow(y)) {
              removedRows++;
              this.drawer.moveAllRows(y - 1, y);
            } else {
              y--;
            }
          }
          this.score += this.config.scoreRemoveRow * removedRows;
          this.currentTetromino = this.getRandomTetromino();
        } else {
          this.score += this.config.scoreMoveDown;
          this.currentTetromino.moveDown();
        }
        this.onUpdateScore(this.score);
      }
      // Draws the Tetromino at the new Position / Rotation
      this.drawTetromino(this.currentTetromino, this.currentTetromino.color);
    });
  }

  /**
   * Returns the current score
   */
  getScore() {
    return this.score;
  }
}