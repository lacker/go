import Board from './Board';

describe('Board', () => {
  it('should be constructable', () => {
    let b = new Board(9);
  });

  it('should have basic libs working', () => {
    let b = new Board(9);
    b.makeMove(4, 4);
    let s = b.liberties(4, 4);
    console.log(s);
    expect(s.has(4, 5)).toBeTruthy();
    expect(s.has(4, 3)).toBeTruthy();
    expect(s.has(3, 4)).toBeTruthy();
    expect(s.has(5, 4)).toBeTruthy();
    expect(s.size()).toBe(4);
  });

  it('should work with a capture', () => {
    let b = new Board(9);
    b.makeMove(0, 1);
    b.makeMove(0, 0);
    b.makeMove(1, 1);
    b.makeMove(1, 0);
    expect(b.liberties(0, 0).size).toBe(1);
    b.makeMove(2, 0);
    expect(b.liberties(2, 0).size).toBe(3);
  })
});
