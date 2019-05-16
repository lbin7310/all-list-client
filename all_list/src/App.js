import React from 'react';
import Login from './Component/Login/Login'
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
        <Login />
        <Main />
        <Board />
        <Team />
      </div>
    )
  }
}

export default App;
