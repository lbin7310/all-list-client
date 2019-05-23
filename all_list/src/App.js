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
    console.log(process.env.NODE_ENV);
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
          // component={Board}
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
          // component={Team}
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
          // component={Login}
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
          // component={Signup}
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

  // return (
  //   <Router>

  //       <Access isLogin = {this.state.isLogin} handleLogin = {this.handleLogin}>
  //       <Route path="/" exact component={Login} isLoin={this.state.isLogin} />
  //       <Route path="/signup" component={Signup} />

  //       <NotAccess isLogin ={ this.state.isLoginw}>
  //       <Route path="/main" component={Main} />
  //       <Route path="/board/:id" component={Board} />
  //       <Route path="/user_board/:id" component={Team} />
  //       </NotAccess>
  //     </Switch>
  //   </Router>
  // );
}

export default App;
