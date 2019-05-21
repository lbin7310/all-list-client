import React from "react";

const MemberList = ({ nickname, email, origin_user_idx, handleDelete }) => {
  return (
    <div>
      <li>
        {/* nickname */}
        <span>{nickname}</span>
        {/* email */}
        <span>{email}</span>
        <button onClick={ (e) => handleDelete(e, origin_user_idx)}>삭제</button>
      </li>
    </div>
  );
};

export default MemberList;
