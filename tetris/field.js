class Field {
  constructor(canvas, config = defaultConfig) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.config = config;
    this.field = [];
    for (let row = 0; row < this.config.rows; row++) {
      this.field.push(new Array(this.config.columns));
    }
  }

  square(x, y, color, borderColor) {
    const realX = x * this.config.squareSize, realY = y * this.config.squareSize;
    this.ctx.fillStyle = color;
    this.ctx.fillRect(realX, realY, this.config.squareSize, this.config.squareSize);
    this.ctx.strokeStyle = borderColor;
    this.ctx.strokeRect(realX, realY, this.config.squareSize, this.config.squareSize);
    if (this.field[y][x]) {
      this.field[y][x].isFull = color !== this.config.blankColor;
      this.field[y][x].color = color;
      this.field[y][x].borderColor = borderColor;
    } else {
      this.field[y][x] = { isFull: color !== this.config.blankColor, color: color, borderColor: borderColor };
    }
  }
  
  moveRow(yFrom, yTo) {
    for (let x = 0; x < this.config.columns; x++) {
      this.field[yTo][x] = this.field[yFrom][x];
      this.square(x, yTo, this.field[yTo][x].color, this.field[yTo][x].borderColor);  
    }
  }

  moveBlock(yFrom, yTo) {
    let i = 0;
    for (let y = yFrom; y >= 0; y--) {
      this.moveRow(y, yTo - i++);
      this.removeRow(y);
    }
  }  

  rowHasAnyFull(y) {
    for (let x = 0; x < this.field[y].length; x++) {
      if (this.field[y][x].isFull) return true;
    }
    return false;
  }

  isFull(x, y) {
    return this.field[y][x].isFull;
  }

  isFullRow(y) {
    for (let x = 0; x < this.config.columns; x++) {
      if (!this.field[y][x].isFull) return false;
    }
    return true;
  }

  removeRow(y) {
    for (let x = 0; x < this.config.columns; x++) {
      this.field[y][x] = false;
      this.square(x, y, this.config.blankColor, this.config.blankColor);
    }
  }

  table() {
    for (let row = 0; row < this.config.rows; row++) {
      for (let col = 0; col < this.config.columns; col++) {
        this.square(col, row, this.config.blankColor, this.config.borderColor);
      }
    }
  }
}
