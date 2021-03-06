import SpotSet from './SpotSet';

const BLACK = -1;
const EMPTY = 0;
const WHITE = 1;

class Board {
  constructor(size) {
    this.size = size;
    this.board = [];
    this.toMove = BLACK;

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

  // Returns a list of stuff adjacent to i, j
  adjacent(i, j) {
    let answer = [];
    if (i > 0) {
      answer.push([i - 1, j]);
    }
    if (j > 0) {
      answer.push([i, j - 1]);
    }
    if (i + 1 < this.size) {
      answer.push([i + 1, j]);
    }
    if (j + 1 < this.size) {
      answer.push([i, j + 1]);
    }
    return answer;
  }

  // Returns a spotset of liberties for the group with the stone at i, j.
  liberties(i, j) {
    if (this.board[i][j] === EMPTY) {
      return -1;
    }
    let seen = new SpotSet();
    let libs = new SpotSet();
    let frontier = [[i, j]];
    while (frontier.length > 0) {
      let [x1, y1] = frontier.pop();
      if (seen.has(x1, y1)) {
        continue;
      }
      seen.add(x1, y1);
      let adj = this.adjacent(x1, y1);
      for (let [x2, y2] of adj) {
        if (this.board[x2][y2] === EMPTY) {
          libs.add(x2, y2);
        }
        if (this.board[x2][y2] === this.board[i][j]) {
          frontier.push([x2, y2])
        }
      }
    }
    return libs;
  }

  // Figure out a decent move to make
  goodMove() {
    // Default to moving randomly
    let bestScore = -1;
    let bestMove = [-1, -1];
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        let score = -2;
        if (this.board[i][j] === EMPTY) {
          score = Math.random() * 0.01;
        } else {
          // Look for captures and escapes
          let libs = this.liberties(i, j);
          if (libs.size() === 1) {
            // Extract spot from x,y form
          }
        }
        if (score > bestScore) {
          bestScore = score;
          bestMove = [i, j];
        }
      }
    }
    return bestMove;
  }

  // Returns whether the move was valid.
  makeMove(i, j) {
    let initialBoard = JSON.stringify(this.board);

    if (!this.isValidSpot(i, j)) {
      throw new Error(`invalid move because of invalid spot: ${i}, ${j}`);
    }
    if (this.board[i][j] !== EMPTY) {
      return false;
    }

    let color = this.toMove;
    this.toMove = -this.toMove;
    this.board[i][j] = color;

    // Check for captures
    let captures = false;
    for (let [a, b] of this.neighbors(i, j)) {
      if (this.board[a][b] === -color) {
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
      let {alive} = this.findGroup(i, j);
      if (!alive) {
        this.board[i][j] = EMPTY;
        return false;
      }
    }

    // Check for ko
    let h = this.hash();
    if (this.hashes.has(h)) {
      // Reset the board state
      this.toMove = -this.toMove;
      this.board = JSON.parse(initialBoard);

      throw new Error('ko');
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
    if (color === EMPTY) {
      throw new Error('no group for empty color');
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
        if (neighborColor === EMPTY) {
          alive = true;
        } else if (neighborColor === color) {
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
