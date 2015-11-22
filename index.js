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

  // Returns whether the move was valid.
  makeMove(i, j, color) {
    if (this.board[i][j] != EMPTY) {
      return false;
    }

    // TODO: prevent ko

    this.board[i][j] = color;

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

  // Finds the group of stones that contains the current spot.
  // A group has two parameters:
  //   spots: a list of the [i, j] spots involved
  //   alive: a boolean
  findGroup(i, j) {
    let color = this.board[i][j];
    if (color == EMPTY) {
      throw 'no group for empty color';
    }

    // Contains strings of the form "i,j"
    let seen = new Set();
    let spots = [];
    let alive = false;
    let pending = [[i, j]];
    while (pending.length > 0) {
      let [a, b] = pending.pop();
      let key = a + "," + b;
      if (seen.has(key)) {
        continue;
      }
      seen.add(key);
      spots.push([a, b]);

      for (let [c, d] of this.neighbors(a, b)) {
        let neighborColor = this.board[c][d];
        if (neighborColor == EMPTY) {
          alive = true;
        } else if (neighborColor == color) {
          pending.push([c, d]);
        }
      }
    }

    return {spots, alive};
  }
}
