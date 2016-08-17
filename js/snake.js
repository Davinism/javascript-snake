

class Snake {

  constructor(board) {
    this.board = board;
    this.segments = [[10, 10]];
    this.direction = "N";
    this.growth = 0;
  }

  nextCoord() {
    let currentHead = this.segments[0];
    if (this.direction === "N") {
      return ([currentHead[0] - 1, currentHead[1]]);
    }
    else if (this.direction === "E") {
      return ([currentHead[0], currentHead[1] + 1]);
    }
    else if (this.direction === "S") {
      return ([currentHead[0] + 1, currentHead[1]]);
    }
    else if (this.direction === "W") {
      return ([currentHead[0], currentHead[1] - 1]);
    }
  }

  move() {
    let nextMove = this.nextCoord();
    if (this.board.isValid(nextMove)) {
      this.segments.unshift(this.nextCoord());
      this.checkEating();

      if (this.growth === 0) {
        this.segments.pop();
      } else {
        this.growth -= 1;
      }

      return true;
    }
    return false;
  }

  checkEating() {
    let apple = this.board.apple;
    let head = this.segments[0];
    if (head[0] === apple[0] && head[1] === apple[1]) {
      this.board.apple = this.board.setApple();
      this.growth += Snake.GROWTH_RATE;
    }
  }
}

Snake.GROWTH_RATE = 3;

module.exports = Snake;
