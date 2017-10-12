import React, { Component } from 'react';
import Board from './Board';

function cell({color}) {
  if (color === Board.BLACK) {
    return <div className="Cell" backgroundColor="#000000" />;
  }
  if (color === Board.WHITE) {
    return <div className="Cell" backgroundColor="#FFFFFF" />;
  }
  return <div className="Cell" backgroundColor="#777777" />;
}

class BoardView extends Component {
  render(props) {
    // TODO: expand props.grid
  }
}

export default BoardView;
