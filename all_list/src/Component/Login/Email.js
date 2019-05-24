import React from "react";
import './Email.css'

class Email extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="m_Signup_Email">
        <span>이메일</span>
        <br/>
        <input
          placeholder="이메일을 입력하세요"
          value={this.props.value}
          onChange={this.props.handleEmail}
        />
        <button onClick={this.props.checkEmail}>중복체크</button>
      </div>
    );
  }
}

export default Email;
