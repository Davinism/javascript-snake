const Snake = require("./snake.js");


class Board {

  constructor() {
    this.snake = new Snake(this);
    this.apple = this.setApple();
  }

  setApple() {
    let row = Math.floor(Math.random() * Board.GRID_HEIGHT);
    let col = Math.floor(Math.random() * Board.GRID_WIDTH);

    while (this.includedIn(this.snake, [row, col])) {
      row = Math.floor(Math.random() * Board.GRID_HEIGHT);
      col = Math.floor(Math.random() * Board.GRID_WIDTH);
    }

    return [row, col];
  }

  includedIn(arr, pos) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i][0] === pos[0] && arr[i][1] === pos[1]) {
        return true;
      }
    }
    return false;
  }

  isValid(pos) {
    if (pos[0] < 0 || pos[0] > Board.GRID_HEIGHT - 1) {
      return false;
    } else if (pos[1] < 0 || pos[1] > Board.GRID_WIDTH - 1) {
      return false;
    } else if (this.includedIn(this.snake.segments, pos)) {
      return false;
    }
    return true;
  }

}

Board.GRID_HEIGHT = 20;
Board.GRID_WIDTH = 20;
module.exports = Board;
