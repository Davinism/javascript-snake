const SnakeBoard = require('./board.js');
const SnakeView = require('./snake-view.js');

$( () => {
  const rootEl = $('.board');
  const game = new SnakeBoard();
  new SnakeView(game, rootEl);
});
