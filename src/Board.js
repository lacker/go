'use strict';

const BLACK = -1;
const EMPTY = 0;
const WHITE = 1;

class Board {
  constructor(size) {
    this.size = size;
    this.board = [];

    // Hashes of every position there has been (after the first one)
    this.hashes = new Set();

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
    if (!this.isValidSpot(i, j)) {
      throw `invalid move because of invalid spot: ${i}, ${j}`
    }
    if (this.board[i][j] != EMPTY) {
      return false;
    }

    this.board[i][j] = color;

    // Check for captures
    let captures = false;
    for (let [a, b] of this.neighbors(i, j)) {
      if (this.board[a][b] == -color) {
        let {spots, alive} = this.findGroup(a, b);
        if (!alive) {
          captures = true;
          for (let [c, d] of spots) {
            this.board[c][d] = EMPTY;
          }
        }
      }
    }

    // Prevent suicide
    if (!captures) {
      let {spots, alive} = this.findGroup(i, j);
      if (!alive) {
        this.board[i][j] = EMPTY;
        return false;
      }
    }

    // Check for ko
    let h = this.hash();
    if (this.hashes.has(h)) {
      throw 'ko';
    }
    this.hashes.add(h);

    return true;
  }

  // Returns a value for the overall board
  // Based on the Java hash function
  hash() {
    let answer = 0;
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        answer = ((answer << 5) - answer) + this.board[i][j];
        answer |= 0; // convert to 32 bit int
      }
    }
    return answer;
  }

  // Returns whether [i, j] is a valid spot on the board.
  isValidSpot(i, j) {
    return (i >= 0 &&
            i < this.size &&
            j >= 0 &&
            j < this.size);
  }

  // Returns a list of [i, j] pairs for all valid neighbors to the
  // provided spot.
  neighbors(i, j) {
    let answer = [];
    for (let [a, b] of [[i + 1, j],
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

Board.BLACK = BLACK;
Board.WHITE = WHITE;
Board.EMPTY = EMPTY;

export default Board;
