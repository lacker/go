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

  set(i, j, color) {
    this.board[i][j] = color;
  }

  // Returns whether the move was valid.
  makeMove(i, j, color) {
    if (this.board[i][j] != EMPTY) {
      return false;
    }

    // TODO: prevent ko

    this.set(i, j, color);

    // TODO: check for captures

    return true;
  }

  // Returns whether [i, j] is a valid spot on the board.
  isValidSpot(i, j) {
    return (i >= 0 &&
            i < size &&
            j >= 0 &&
            j < size);
  }

  // Returns a list of [i, j] pairs for all valid neighbors to the
  // provided spot.
  neighbors(i, j) {
    let answer = [];
    for ([a, b] of [[i + 1, j],
                    [i - 1, j],
                    [i, j + 1],
                    [i, j - 1]]) {
      if (this.isValidSpot(a, b)) {
        answer.push([a, b]);
      }
    }
    return answer;
  }
}
