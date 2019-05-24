import React from "react";
import "./MemberList.css";

const MemberList = ({ listIdx, nickname, email, origin_user_idx, handleDelete }) => {
  return (
    <li id={`team-list${listIdx}`} className="s_meber_li">
      {/* nickname */}
      <span className="s_span_nick" >{nickname}</span>
      {/* email */}
      <span className="s_span_mail" >{email}</span>
      <button onClick={e => handleDelete(e, origin_user_idx)} className="s_btn_member_delete"> x </button>
    </li>
  );
};

export default MemberList;
