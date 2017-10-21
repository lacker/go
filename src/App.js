import React, { Component } from 'react';
import './App.css';
import Board from './Board';
import BoardView from './BoardView';


class App extends Component {
  constructor(props) {
    super(props);
    this.board = new Board(9);
    this.board.makeMove(3, 3, Board.BLACK);
    this.board.makeMove(2, 5, Board.WHITE);
  }

  render() {
    return (
      <div className="App">
        <BoardView grid={this.board.board} />
      </div>
    );
  }
}

export default App;
