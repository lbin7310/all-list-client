import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Board from "./Pages/Board";
import Login from "./Pages/Login";
import Main from "./Pages/Main";
import Team from "./Pages/Team";
import Signup from "./Component/Login/Signup";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isLogin: false,
      init: false
    };
  }

  handleLogin = () => {
    this.setState(preState => ({
      isLogin: !preState.isLogin
    }));
  };

  componentDidMount = () => {
    if(window.localStorage.getItem("userInfo")) {
      this.setState({
        isLogin: true,
        init: true
      })
    } else {
      this.setState({
        init: true
      })
    }
  }

  render() {
    if(!this.state.init) {
      return <div>로딩중...</div>
    }
    return (
      <Router>
        <Route
          path="/main"
          render={props => (
            <Main
              {...props}
              handleLogin={this.handleLogin}
              isLogin={this.state.isLogin}
            />
          )}
        />
        <Route
          path="/board/:id"
          render={props => (
            <Board
              {...props}
              handleLogin={this.handleLogin}
              isLogin={this.state.isLogin}
            />
          )}
        />
        <Route
          path="/user_board/:id"
          
          render={props => (
            <Team
              {...props}
              handleLogin={this.handleLogin}
              isLogin={this.state.isLogin}
            />
          )}
        />

        <Route
          path="/"
          exact
          render={props => (
            <Login
              {...props}
              handleLogin={this.handleLogin}
              isLogin={this.state.isLogin}
            />
          )}
        />
        <Route
          path="/signup"
          render={props => (
            <Signup
              {...props}
              handleLogin={this.handleLogin}
              isLogin={this.state.isLogin}
            />
          )}
        />
      </Router>
    );
  }
}

export default App;
