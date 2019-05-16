import React from "react";

class Signup extends React.Component {
  render() {
    return (
      <div>
        <h1>Signup</h1>
        <br />
        <br />
        <form>
          <div>
            <span>Email</span>
            <input />
            <button>중복체크</button>
          </div>
          <div>
            <span>User Name</span>
            <input />
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
