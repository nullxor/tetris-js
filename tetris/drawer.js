/**
 * Allow to draw and handle blocks operations in a Canvas
 */
class Drawer {
  constructor(canvas, field, config = defaultConfig) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.field = field;
    this.config = config;
  }

  block(x, y, color, borderColor) {
    const realX = x * this.config.blockSize, realY = y * this.config.blockSize;
    this.ctx.fillStyle = color;
    this.ctx.fillRect(realX, realY, this.config.blockSize, this.config.blockSize);
    this.ctx.strokeStyle = borderColor;
    this.ctx.strokeRect(realX, realY, this.config.blockSize, this.config.blockSize);
    this.field.setBlock(x, y, color !== this.config.blankColor, color, borderColor);
  }
  
  table() {
    for (let row = 0; row < this.config.rows; row++) {
      for (let col = 0; col < this.config.columns; col++) {
        this.block(col, row, this.config.blankColor, this.config.borderColor);
      }
    }
  }

  moveBlock(yFrom, yTo) {
    let i = 0;
    for (let y = yFrom; y >= 0; y--) {
      this.moveRow(y, yTo - i++);
      this.removeRow(y);
    }
  }  

  moveRow(yFrom, yTo) {
    for (let x = 0; x < this.config.columns; x++) {
      const value = this.field.getBlock(x, yFrom);
      if (value) {
        this.field.setBlock(x, yTo, value.isFull, value.color, value.borderColor)
        this.block(x, yTo, value.color, value.borderColor);  
      }
    }
  }

  removeRow(y) {
    for (let x = 0; x < this.config.columns; x++) {
      this.field.removeBlock(x, y);
      this.block(x, y, this.config.blankColor, this.config.blankColor);
    }
  }
}
