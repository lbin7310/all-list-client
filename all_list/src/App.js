import React from 'react';
import Board from './Component/Board/board'

class App extends React.Component {
  constructor () {
    super()
    this.state = {}
  }

  render () {
    return (
      <div>
        <Board />
      </div>
    )
  }
}

export default App;
