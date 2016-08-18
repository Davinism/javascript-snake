const Board = require('./board.js');

class View {

  constructor (board, $el) {
    this.board = board;
    this.$el = $el;
    this.level = null;

    this.bindEvents();
    this.selectLevel();
  }

  bindEvents() {
    let snake = this.board.snake;
    key('w', function(){
      if (snake.direction !== 'S') {
        snake.direction = 'N';
      }
    });
    key('a', function(){
      if (snake.direction !== 'E') {
        snake.direction = 'W';
      }
    });
    key('s', function(){
      if (snake.direction !== 'N') {
        snake.direction = 'S';
      }
    });
    key('d', function(){
      if (snake.direction !== 'W') {
        snake.direction = 'E';
      }
    });

    key('up', function(){
      if (snake.direction !== 'S') {
        snake.direction = 'N';
      }
    });
    key('left', function(){
      if (snake.direction !== 'E') {
        snake.direction = 'W';
      }
    });
    key('down', function(){
      if (snake.direction !== 'N') {
        snake.direction = 'S';
      }
    });
    key('right', function(){
      if (snake.direction !== 'W') {
        snake.direction = 'E';
      }
    });
  }

  makeMove($tower) {
    this.renderBoard();

    let loop = setInterval(() => {
      if (this.board.snake.move()) {
        this.renderBoard();
      } else {
        let $body = $('body');
        let $lost = $(`<h2>Game Over</h2><h2>Snake Length: ${this.board.snake.segments.length}</h2>`);
        let $newGame = $(`<section class="buttons2"><button class="new">New Game</button></section>`);
        $body.append($lost);
        $body.append($newGame);

        $(".new").click((event) => {
          $('.board').children().remove();
          $('h2').remove();
          $('.new').remove();
          const rootEl = $('.board');
          const game = new Board();
          new View(game, rootEl);
        });

        clearInterval(loop);
      }
    }, this.level);
  }

  selectLevel() {
    let $buttons = $('.buttons');
    let $easyButton = $(`<button class="easy">Easy</button>`);
    let $mediumButton = $(`<button class="medium">Medium</button>`);
    let $hardButton = $(`<button class="hard">Hard</button>`);
    let $impossibleButton = $(`<button class="impossible">Impossible</button>`);

    $buttons.append($easyButton);
    $buttons.append($mediumButton);
    $buttons.append($hardButton);
    $buttons.append($impossibleButton);

    let thisView = this;

    let setLevel = function (level) {
      thisView.level = level;
      $("button").remove();
      thisView.makeMove();
    };

    $(".easy").click((event) => {
      setLevel(250);
    });

    $(".medium").click((event) => {
      setLevel(100);
    });

    $(".hard").click((event) => {
      setLevel(50);
    });

    $(".impossible").click((event) => {
      setLevel(10);
    });

  }

  renderBoard() {
    let $ul = $("ul");
    $ul.remove();

    let rows = Board.GRID_HEIGHT;
    let cols = Board.GRID_WIDTH;
    let $board = $('.board');
    for (var i = 0; i < rows; i++) {
      $board.append($('<ul></ul>'));
    }
    $('ul').each( (idx, row) => {
      for (var j = 0; j < cols; j++) {
        $(row).append($('<li></li>'));
      }
    });

    this.setSnake(this.board.snake.segments);
    this.setApple();
  }

  setSnake(arr) {
    let $uls = $('ul');
    arr.forEach((pos) => {
      let $ul = $($uls[pos[0]]);
      let listItems = $ul.children();
      let $li = $(listItems[pos[1]]);
      $li.addClass("snake");
    });
  }
  setApple() {
    let $uls = $('ul');
    let arr = [this.board.apple];
    arr.forEach((pos) => {
      let $ul = $($uls[pos[0]]);
      let listItems = $ul.children();
      let $li = $(listItems[pos[1]]);
      $li.addClass("apple");
    });
  }

}
module.exports = View;
