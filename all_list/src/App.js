import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Board from "./Pages/Board";
import Login from "./Pages/Login";
import Main from "./Pages/Main";
import Team from "./Pages/Team";
import Signup from "./Component/Login/Signup";

class App extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/main" component={Main} />
          <Route path="/board/" component={Board} />
          <Route path="/team" component={Team} />
        </Switch>
      </Router>
    );
  }
}

export default App;
