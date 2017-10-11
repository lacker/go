import React, { Component } from 'react';
import './App.css';
import Board from './Board';
import BoardView from './BoardView';


class App extends Component {
  constructor(props) {
    super(props);
    this.board = new Board();
  }

  render() {
    return (
      <div className="App">
        <BoardView grid=board.grid />
      </div>
    );
  }
}

export default App;
