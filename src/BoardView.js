import React, { Component } from 'react';
import Board from './Board';

// Pixels of a square
const SIZE = 10;

function cell({color, x, y}) {
  let h;
  if (color === Board.BLACK) {
    h = "#000000";
  } else if (color === Board.WHITE) {
    h = "#FFFFFF";
  } else {
    h = "#777777";
  }
  return <div className="Cell" style={{
    left: x * SIZE,
    top: y * SIZE,
    backgroundColor: h,
  }}/>;
}

class BoardView extends Component {
  render() {
    let cells = [];
    for (let y = 0; y < this.props.grid.length; y++) {
      for (let x = 0; x < this.props.grid[y].length; x++) {
        let color = this.props.grid[y][x];
        cells.push(cell({color, x, y}));
      }
    }
    return <div className="Board">{cells}</div>;
  }
}

export default BoardView;
