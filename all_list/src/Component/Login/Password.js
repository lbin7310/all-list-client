import React from "react";
import './Password.css'

class Password extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="m_Signup_Password">
        <div id="m_Signup_PW">
          <span>비밀번호</span>
          <br />
          <input
            placeholder="비밀번호 입력"
            value={this.props.value1}
            onChange={this.props.handlePW}
            type="password"
          />
        </div>
        <div id="m_Signup_PW_RE">
          <span>비밀번호 재확인</span>
          <br />
          <input
            placeholder="비밀번호 재입력"
            value={this.props.value2}
            onChange={this.props.handleRE_PW}
            type="password"
          />
          <button onClick={this.props.checkPW}>비밀번호 확인</button>
        </div>
      </div>
    );
  }
}

export default Password;
