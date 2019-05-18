import React from "react";
import "./Modal.css";

// Props = { handleCloseModal, addMemberList, addUser }
class Modal extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div className="MyModal">
        <div className="content">
          <h3>니가 찾는 그 새끼가 이새끼가 맞니?</h3>
          {/* 검색한 친구 들어오는 자리 */}
          <div>
            <span>{this.props.addUser.nickname}</span>
            <span>{this.props.addUser.email}</span>
          </div>
          {/* 친구 등록시, MemberList컴포넌트에 새로운 친구가 추가된다. */}
          <button onClick={this.props.addMemberList}>친구 등록하기</button>
          <button onClick={this.props.handleCloseModal}>닫기</button>
        </div>
      </div>
    );
  }
}

export default Modal;
