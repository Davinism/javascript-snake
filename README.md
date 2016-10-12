# [Snake][link]
[link]: https://davinism.github.io/javascript-snake/index

The classic browser-based game with a snake and an apple. 

## Objective

The user controls the snake around the screen, eating the apple and growing, all while avoiding the boundaries and eating itself.

## Implementation Details

This game was created using the jQuery library to manipulate the DOM elements as well as HTML5 Canvas to render the gameplay screen.

#### Movement

In order to give off the illusion of the snake moving, the tail end of the snake was popped off while another square was shifted onto the head. This gave off the illusion of the snake moving ever forward.

```javascript
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
```
