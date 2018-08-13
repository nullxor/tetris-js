class Tetromino {
  constructor(startX, startY, color, type) {
    [this.x, this.y, this.color, this.type] = [startX, startY, color, type];
    this.rotation = 0;
    this.locked = false;
  }
  
  getX() {
    return this.x;
  }

  getY() {
    return this.y;
  }

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

  getCurrentMatrix() {
    return this.type[this.rotation];
  }

  isLocked() {
    return this.locked;
  }

  lock() {
    this.locked = true;
  }

  rotate() {
    if (!this.locked) this.setRotation(this.rotation + 1);
  }

  setRotation(rotation) {
    this.rotation = rotation % this.type.length;
  }

  moveLeft() {
    if (!this.locked) this.x--;
  }

  moveRight()  {
    if (!this.locked) this.x++;
  }

  moveDown() {
    if (!this.locked) this.y++;
  }
}
