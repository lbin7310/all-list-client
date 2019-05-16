import React from "react";

class Signup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      user: "",
      password: ""
    };
  }
  handleEmail = e => {
    this.setState({
      email: e.target.value
    });
  };

  handleUser = e => {
    this.setState({
      user: e.target.user
    })
  }

  render() {
    return (
      <div>
        <h1>Signup</h1>
        <br />
        <br />
        <form>
          <div>
            <span>Email</span>
            <input
              placeholder="이메일을 입력하세요"
              value={this.state.email}
              onChange={this.handleEmail}
            />
            <button>중복체크</button>
          </div>
          <div>
            <span>User Name</span>
            <input
              placeholder="이름을 입력하세요"
              value={this.state.user}
              onChange={this.handleUser}
            />
            <button>중복체크</button>
          </div>
          <div>
            <span>비밀번호</span>
            <input />
          </div>
          <div>
            <span>비밀번호 재확인</span>
            <input />
            <button>비밀번호 확인</button>
          </div>

          <div>
            <button>가입하기</button>
          </div>
        </form>
      </div>
    );
  }
}

export default Signup;
