import React, { Component } from 'react';
import Board from './Board';

let cellStyle = {
  height: 10,
  width: 10,
};

let styles = {
  black: {
    backgroundColor: "#000000",
    ...cellStyle,
  },
  white: {
    backgroundColor: "#FFFFFF",
    ...cellStyle,
  },
  empty: {
    backgroundColor: "#777777",
    ...cellStyle,
  },
};

function cell({color}) {
  if (color === Board.BLACK) {
    return <div className="Cell" style={[styles.black, styles.cell]} />;
  }
  if (color === Board.WHITE) {
    return <div className="Cell" style={[styles.white, styles.cell]} />;
  }
  return <div className="Cell" style={[styles.empty, styles.cell]} />;
}

function row(items) {
  return <div className="Row">{items.map(cell)}</div>;
}

class BoardView extends Component {
  render() {
    // TODO: expand props.grid
    let rows = this.props.grid.map(row);
    return <div className="Board">{rows}</div>;
  }
}

export default BoardView;
