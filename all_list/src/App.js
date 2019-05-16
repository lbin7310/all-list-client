import React from 'react';
import Main from './Component/Main/Main';
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
        <Main />
        <Board />
        <Team />
      </div>
    )
  }
}

export default App;
