import React, { Component } from 'react';
import Board from './Board';

let styles = {
  black: {
    backgroundColor: "#000000",
  },
  white: {
    backgroundColor: "#FFFFFF",
  },
  empty: {
    backgroundColor: "#777777",
  },
}

function cell({color}) {
  if (color === Board.BLACK) {
    return <div className="Cell" style={styles.black} />;
  }
  if (color === Board.WHITE) {
    return <div className="Cell" style={styles.white} />;
  }
  return <div className="Cell" style={styles.empty} />;
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
