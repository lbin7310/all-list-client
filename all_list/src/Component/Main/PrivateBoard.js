import React from "react";
import "./PrivateBoard.css";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

const PrivateBoard = ({ title, desc, deleteBoard, idx }) => {
  return (
    <li>
      <Link to={`/board/${idx}`}>
        <h3>{title}</h3>
        <h6>{desc}</h6>
      </Link>
      <button onClick={() => deleteBoard(idx)}>삭제</button>
    </li>
  );
};

export default PrivateBoard;
