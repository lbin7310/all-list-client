import React from "react";
import "./TeamBoard.css";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

const TeamBoard = ({ title, desc, deleteBoard, idx }) => {
  return (
    <li>
      <Link to={`/board/${idx}`}>
        <h3>{title}</h3>
        <h6>{desc}</h6>
        <button onClick={() => deleteBoard(idx)}>삭제</button>
      </Link>
    </li>
  );
};

export default TeamBoard;
