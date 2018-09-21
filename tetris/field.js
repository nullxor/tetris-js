/**
 * Represents a Matrix field for a Tetris game
 * Each item is accessed by its X / Y Coordinate
 * For this project the block color and borderColor can be any valid CSS color:
 * The return value for a given coordinate is an Object of this type
 * { isFull: true, color: 'color', borderColor: 'bordercolor' }
 */
export default class Field {
  /**
   * Default constructor
   * @param {number} rows Rows 
   * @param {number} cols Columns
   */
  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.field = [];
    for (let row = 0; row < this.rows; row++) {
      this.field.push(new Array(this.cols));
    }
  }

  /**
   * Sets a block value for the given X - Y coordinate 
   * @param {number} x X
   * @param {number} y Y
   * @param {boolean} isFull Indicates if this block is full 
   * @param {string} color Color 
   * @param {string} borderColor Border Color
   */
  setBlock(x, y, isFull, color, borderColor = color) {
    if (this.field[y][x]) {
      this.field[y][x].isFull = isFull;
      this.field[y][x].color = color;
      this.field[y][x].borderColor = borderColor;
    } else {
      this.field[y][x] = { isFull: isFull, color: color, borderColor: borderColor };
    }
  }

  /**
   * Gets a block value at the given X - Y Coordinate
   * @param {number} x X
   * @param {number} y Y
   */
  getBlock(x, y) {
    return this.field[y][x];
  }

  /**
   * Checks if the block is full at the given X - Y coordinates 
   * @param {number} x X
   * @param {number} y Y
   */
  isFullBlock(x, y) {
    return this.field[y][x] && this.field[y][x].isFull;
  }

  /**
   * Removes a block from the given X - Y Coordinate
   * @param {number} x X
   * @param {number} y Y
   */
  removeBlock(x, y) {
    this.field[y][x] = false;
  }

  /**
   * Retrieves the row at the given rowNumber
   * @param {number} rowNumber Row number
   */
  getRow(rowNumber) {
    return this.field[rowNumber];
  }

  /**
   * Checks if the row has any full block at the given rowNumber
   * @param {number} rowNumber Row number
   */
  rowHasAnyFull(rowNumber) {
    for (let x = 0; x < this.field[rowNumber].length; x++) {
      if (this.field[rowNumber][x].isFull) return true;
    }
    return false;
  }

  /**
   * Checks if the whole row is full at the given rowNumber
   * @param {number} rowNumber Row number
   */
  isFullRow(rowNumber) {
    for (let x = 0; x < this.cols; x++) {
      if (!this.field[rowNumber][x].isFull) return false;
    }
    return true;
  }
}
