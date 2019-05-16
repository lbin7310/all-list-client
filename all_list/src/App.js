import React from 'react';
import Login from './Component/Login/Login'

class App extends React.Component {
  constructor () {
    super();
    this.state = {};
  }

  render () {
    return (
      <div>
        <Login />
      </div>
    );
  }
};

export default App;
