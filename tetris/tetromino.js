/**
 * Represents a Tetromino in a 2d plane
 * The representation (type) must be an Array
 * of NxN Binary Matrices (each matrix represents a rotation)
 */
export default class Tetromino {
  /**
   * Default constructor
   * @param {Array} type Array of NxN Binary matrices
   * @param {number} startX Initial X position
   * @param {number} startY Initial Y position
   * @param {string} color Valid css color
   * @param {string} borderColor Valid css color
   */
  constructor(type, startX, startY, color, borderColor) {
    [this.type, this.x, this.y, this.color, this.borderColor] = [type, startX, startY, color, borderColor];
    this.rotation = 0;
    this.locked = false;
  }
  
  /**
   * Returns the X position
   */
  getX() {
    return this.x;
  }

  /**
   * Returns the Y position of the First Top block
   */
  getY() {
    return this.y;
  }

  /**
   * Returns the Y position of the First Bottom block
   */
  getBottomY() {
    const matrix = this.getCurrentMatrix();
    for (let y = matrix.length - 1; y >= 0; y--) {
      for (let x = 0; x < matrix.length; x++) {
        if (matrix[y][x]) {
          return this.y + y;
        }
      }
    }
  }

  /**
   * Returns the current Tetromino's matrix
   */
  getCurrentMatrix() {
    return this.type[this.rotation];
  }

  /**
   * Is Locked?
   */
  isLocked() {
    return this.locked;
  }

  /**
   * Locks the tetromino (Can't be rotated or moved)
   */
  lock() {
    this.locked = true;
  }

  /**
   * Rotates the tetromino
   */
  rotate() {
    if (!this.locked) this.setRotation(this.rotation + 1);
  }

  /**
   * Returns the current rotation
   */
  getRotation() {
    return this.rotation;
  }

  /**
   * Sets the current rotation index 
   * @param {number} rotation Rotation index
   */
  setRotation(rotation) {
    this.rotation = rotation % this.type.length;
  }

  /**
   * Moves left
   */
  moveLeft() {
    if (!this.locked) this.x--;
  }

  /**
   * Moves right
   */
  moveRight()  {
    if (!this.locked) this.x++;
  }

  /**
   * Moves down
   */
  moveDown() {
    if (!this.locked) this.y++;
  }
}
