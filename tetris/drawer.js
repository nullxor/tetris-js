/**
 * Allow to draw and handle blocks operations in a Canvas
 */
class Drawer {
  constructor(canvas, field, blockSize, blankColor) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.field = field;
    this.blockSize = blockSize;
    this.blankColor = blankColor;
  }

  block(x, y, backgroundColor, borderColor = backgroundColor) {
    const realX = x * this.blockSize, realY = y * this.blockSize;
    this.ctx.fillStyle = backgroundColor;
    this.ctx.fillRect(realX, realY, this.blockSize, this.blockSize);
    this.ctx.strokeStyle = borderColor;
    this.ctx.strokeRect(realX, realY, this.blockSize, this.blockSize);
    this.field.setBlock(x, y, backgroundColor !== this.blankColor, backgroundColor, borderColor);
  }
  
  grid(rows, cols, backgroundColor, borderColor) {
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        this.block(col, row, backgroundColor, borderColor);
      }
    }
  }

  moveRows(yFrom, yTo) {
    let i = 0;
    for (let y = yFrom; y >= 0; y--) {
      this.moveRow(y, yTo - i++);
      this.removeRow(y);
    }
  }  

  moveRow(yFrom, yTo) {
    const columns = this.field.getRow(yFrom).length;
    for (let x = 0; x < columns; x++) {
      const value = this.field.getBlock(x, yFrom);
      if (value) {
        this.field.setBlock(x, yTo, value.isFull, value.color, value.borderColor)
        this.block(x, yTo, value.color, value.borderColor);  
      }
    }
  }

  removeRow(rowNumber) {
    const columns = this.field.getRow(rowNumber).length;
    for (let x = 0; x < columns; x++) {
      this.field.removeBlock(x, rowNumber);
      this.block(x, rowNumber, this.blankColor, this.blankColor);
    }
  }
}
