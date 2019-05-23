import React from "react";

const MemberList = ({ listIdx, nickname, email, origin_user_idx, handleDelete }) => {
  return (
    <li id={`team-list${listIdx}`}>
      {/* nickname */}
      <span>{nickname}</span>
      {/* email */}
      <span>{email}</span>
      <button onClick={e => handleDelete(e, origin_user_idx)}>삭제</button>
    </li>
  );
};

export default MemberList;
