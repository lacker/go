import React, { Component } from 'react';
import Board from './Board';

// Pixels of a square
// Needs to also reflect App.css
const SIZE = 100;

function cell({color, x, y, onClick}) {
  let h;
  if (color === Board.BLACK) {
    h = "#000000";
  } else if (color === Board.WHITE) {
    h = "#FFFFFF";
  } else {
    h = "#777777";
  }
  return <div className="Cell"
              onClick={() => onClick(x, y)}
              key={'' + x + '-' + y}
              style={{
    left: x * SIZE,
    top: y * SIZE,
    height: '' + SIZE + 'px',
    width: '' + SIZE + 'px',
    backgroundColor: h,
  }}/>;
}

class BoardView extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick(x, y) {
    console.log('click on ' + x + ', ' + y);
    this.props.board.makeMove(x, y);

    // Make the opponent's move too
    let [i, j] = this.props.board.goodMove();
    this.props.board.makeMove(i, j);

    // Should be a better way to do this
    this.setState({});
  }

  render() {
    let grid = this.props.board.board;
    let cells = [];
    for (let y = 0; y < grid.length; y++) {
      for (let x = 0; x < grid[y].length; x++) {
        let color = grid[x][y];
        cells.push(cell({color, x, y, onClick: this.onClick}));
      }
    }
    return <div className="Board">{cells}</div>;
  }
}

export default BoardView;
