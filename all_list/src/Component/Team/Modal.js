import React from "react";
import "./Modal.css";
import MemberList from "./MemberList";

class Modal extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const userIdx = this.props.addUser.origin_user_idx;
    return (
      <div className="MyModal">
        <div className="content">
          <h3>찾으시는 친구가 맞으신가요 ? </h3>
          {/* 검색한 친구 들어오는 자리 */}
          <div>
            <span className="s_modal_nick">{this.props.addUser.nickname}</span>
            <span className="s_modal_email">{this.props.addUser.email}</span>
          </div>
          {/* 친구 등록시, MemberList컴포넌트에 새로운 친구가 추가된다. */}

          <button
            onClick={e => {
              var result = false;
              for (var member of this.props.memberList) {
                if (member.origin_user_idx === userIdx) {
                  result = true;
                }
              }
              if (result === true) {
                alert("이미 존재하는 유저입니다")
                this.props.handleCloseModal();
                
              } else {
                this.props.addMemberList(e, userIdx);
              }
            }}
          >
            친구 등록하기
          </button>
          <button onClick={this.props.handleCloseModal}>닫기</button>
        </div>
      </div>
    );
  }
}

export default Modal;
