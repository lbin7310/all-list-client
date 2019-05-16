import React from 'react';
import Board from './Component/Board/board'
import Team from "./Component/Team/Team";

class App extends React.Component {
  constructor () {
    super()
    this.state = {}
  }

  render () {
    return (
      <div>
        <Board />
        <Team />
      </div>
    )
  }
}

export default App;
