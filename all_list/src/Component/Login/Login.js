import React from "react";
import Signup from "./Signup";

class Login extends React.Component {
  render() {
    return (
      <div>
        <form>
          <div>
            <span>로그인</span>
            <input />
          </div>
          <div>
            <span>비밀번호</span>
            <input />
          </div>
          <div>
            <button>로그인</button>
            <button>회원가입</button>
          </div>
        </form>
      </div>
    );
  }
}

export default Login;
