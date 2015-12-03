'use strict';

let Board = require('../Board');

// TODO: do with import
const BLACK = -1;
const EMPTY = 0;
const WHITE = 1;

describe('Board', () => {
  it('can be created', () => {
    let board = new Board(19);
  });

  it('can find a group', () => {
    let board = new Board(2);
    board.makeMove(0, 0, BLACK);
    board.makeMove(0, 1, BLACK);
    expect(board.findGroup(0, 0).spots.length).toEqual(2);
  });

  it('handles captures', () => {
    let board = new Board(2);
    board.makeMove(0, 0, BLACK);
    board.makeMove(0, 1, WHITE);
    board.makeMove(1, 1, BLACK);
    expect(board.board[0][1]).toEqual(EMPTY);
  });

  it('prevents suicide', () => {
    let board = new Board(2);
    board.makeMove(0, 0, BLACK);
    board.makeMove(1, 1, BLACK);
    expect(board.makeMove(0, 1, WHITE)).toEqual(false);
  });
});