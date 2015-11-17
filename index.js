const BLACK = -1;
const EMPTY = 0;
const WHITE = 1;

class Board {
  construct(size) {
    this.board = [];
    for (var i = 0; i < size; i++) {
      let row = [];
      for (var j = 0; j < size; j++) {
        row.push(EMPTY);
      }
      this.board.push(row);
    }
  }

  log() {
    for (var row of this.board) {
      console.log(row);
    }
  }
}
