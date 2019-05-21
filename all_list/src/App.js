import React from 'react';
import { BrowserRouter as Router, Route, Link, withRouter } from 'react-router-dom';
import Board from './Pages/Board';
import Login from './Pages/Login';
import Main from './Pages/Main';
import Team from './Pages/Team';

class App extends React.Component {
  constructor () {
    super()
    this.state = {}
  }

  render () {
    return (
      <Router>
        <div>
          <Route path="/login" exact component={Login}/>
          <Route path="/main" component={Main}/>
          <Route path="/board" component={Board}/>
          <Route path="/team" component={Team}/>
        </div>
      </Router>
    )
  }
}

export default App;
