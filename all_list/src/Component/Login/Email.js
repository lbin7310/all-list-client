import React from "react";

class Email extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <span>Email</span>
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
