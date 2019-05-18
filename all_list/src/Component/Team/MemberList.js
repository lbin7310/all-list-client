import React from "react";

const MemberList = ({ nickname, email }) => {
  //필요 props : 각 유저의 email, 각 유저의 nickname 정보
  return (
    <div>
      <li>
        {/* nickname */}
        <span>{nickname}</span>
        {/* email */}
        <span>{email}</span>
      </li>
    </div>
  );
};

export default MemberList;
