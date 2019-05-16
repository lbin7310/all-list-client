import React from "react";
import Signup from "../Component/Login/Signup";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };
  }

  handleEmail = e => {
    this.setState({
      email: e.target.value
    });
  };

  handlePW = e => {
    this.setState({
      password: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    const login_info = {
      method: "POST",
      body: JSON.stringify(this.state),
      headers: {
        "Content-Type": "application/json"
      }
    };
    fetch("http://localhost:9089/login", login_info)
      .then(res => res.json())
      .then(json => console.log(json));
  };

  render() {
    return (
      <Router>
        <div>
          <form onSubmit={this.handleSubmit}>
            <div>
              <span>이메일</span>
              <input
                placeholder="이메일을 입력하세요"
                value={this.state.email}
                onChange={this.handleEmail}
              />
            </div>
            <div>
              <span>비밀번호</span>
              <input
                placeholder="비밀번호를 입력하세요"
                value={this.state.password}
                onChange={this.handlePW}
              />
            </div>
            <div>
              <button type="submit">로그인</button>
              <button>
                <Link to="/signup">회원가입</Link>
              </button>
            </div>
          </form>
        </div>
        <Route path="/signup" component={Signup}></Route>      
      </Router>
    );
  }
}

export default Login;
