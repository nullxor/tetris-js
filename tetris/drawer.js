/**
 * Allow to draw and handle blocks operations in a Canvas
 */
export default class Drawer {
  /**
   * Default constructor
   * @param {Canvas} canvas Canvas element
   * @param {Field} field Field class implementation
   * @param {number} blockSize Size of the block in pixels 
   * @param {string} blankColor Valid css color
   */
  constructor(canvas, field, blockSize, blankColor) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.field = field;
    this.blockSize = blockSize;
    this.blankColor = blankColor;
  }

  /**
   * Draws a block
   * @param {number} x X axis
   * @param {number} y Y axis
   * @param {string} backgroundColor Valid css color
   * @param {string} borderColor Valid css color
   */
  block(x, y, backgroundColor, borderColor = backgroundColor) {
    const realX = x * this.blockSize, realY = y * this.blockSize;
    this.ctx.fillStyle = backgroundColor;
    this.ctx.fillRect(realX, realY, this.blockSize, this.blockSize);
    this.ctx.strokeStyle = borderColor;
    this.ctx.strokeRect(realX, realY, this.blockSize, this.blockSize);
    this.field.setBlock(x, y, backgroundColor !== this.blankColor, backgroundColor, borderColor);
  }
  
  /**
   * Draws a grid with blocks
   * @param {number} rows Number of rows
   * @param {number} cols Number of columns
   * @param {string} backgroundColor Valid css color
   * @param {string} borderColor Valid css color
   */
  grid(rows, cols, backgroundColor, borderColor) {
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        this.block(col, row, backgroundColor, borderColor);
      }
    }
  }

  /**
   * Clear the canvas
   */
  reset() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  /**
   * Draws a Tetromino
   * @param {Tetromino} tetromino Tetromino
   * @param {string} color Valid css color
   * @param {string} borderColor Valid css color
   */
  drawTetromino(tetromino, color = tetromino.color, borderColor = tetromino.borderColor) {
    const matrix = tetromino.getCurrentMatrix();
    for (let row = 0; row < matrix.length; row++) {
      for (let col = 0; col < matrix.length; col++) {
        if (matrix[row][col]) {
          const x = tetromino.getX() + col, y = tetromino.getY() + row;
          this.block(x, y, color, borderColor);
        }
      }
    }
  }

  /**
   * Moves a row from source row number to dest row number
   * removing the previous row
   * @param {number} rowNumberFrom Row number from
   * @param {number} rowNumberTo Row number to
   */
  moveRow(rowNumberFrom, rowNumberTo) {
    const columns = this.field.getRow(rowNumberFrom).length;
    for (let x = 0; x < columns; x++) {
      const value = this.field.getBlock(x, rowNumberFrom);
      if (value) {
        this.field.setBlock(x, rowNumberTo, value.isFull, value.color, value.borderColor);
        this.block(x, rowNumberTo, value.color, value.borderColor);  
      }
    }
  }

  /**
   * Moves all the rows starting from source (rowNumberFrom) to
   * dest (rowNumberTo) and all the previous rows until yAxis = 0
   * The best use case for this method is when there is one or 
   * more full rows of blocks and we want remove the full lines
   * and move the rest of rows to its new places until the top
   * @param {number} rowNumberFrom Row number from
   * @param {number} rowNumberTo Row number to
   */
  moveAllRows(rowNumberFrom, rowNumberTo) {
    let i = 0;
    for (let y = rowNumberFrom; y >= 0; y--) {
      this.moveRow(y, rowNumberTo - i++);
      this.removeRow(y);
    }
  }  

  /**
   * Removes the row at rowNumber
   * @param {number} rowNumber Row number
   */
  removeRow(rowNumber) {
    const columns = this.field.getRow(rowNumber).length;
    for (let x = 0; x < columns; x++) {
      this.field.removeBlock(x, rowNumber);
      this.block(x, rowNumber, this.blankColor, this.blankColor);
    }
  }
}
