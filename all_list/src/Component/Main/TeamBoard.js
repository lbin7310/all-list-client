import React from "react";
import "./TeamBoard.css";

const TeamBoard = ({ title, desc, deleteBoard, idx }) => {
  return (
    <li>
      <h3>{title}</h3>
      <h6>{desc}</h6>
      <button onClick = { () => deleteBoard(idx) }>삭제</button>
    </li>
  );
};

export default TeamBoard;
