/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const SnakeBoard = __webpack_require__(2);
	const SnakeView = __webpack_require__(1);

	$( () => {
	  const rootEl = $('.board');
	  const game = new SnakeBoard();
	  new SnakeView(game, rootEl);
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const Board = __webpack_require__(2);

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


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	const Snake = __webpack_require__(3);


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


/***/ },
/* 3 */
/***/ function(module, exports) {

	

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


/***/ }
/******/ ]);