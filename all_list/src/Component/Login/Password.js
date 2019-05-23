import React from "react";

class Password extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div>
          <span>비밀번호</span>
          <input
            placeholder="비밀번호 입력"
            value={this.props.value1}
            onChange={this.props.handlePW}
            type="password"
          />
        </div>
        <div>
          <span>비밀번호 재확인</span>
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
