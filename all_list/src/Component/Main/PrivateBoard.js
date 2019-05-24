import React from "react";
import "./PrivateBoard.css";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

const PrivateBoard = ({ title, desc, deleteBoard, idx }) => {
  return (
    <li className="s_li_private">
      <div className="s_section_p_btn">
      <button className="s_btn_p_delete" onClick={() => deleteBoard(idx)}>x</button>
      </div>
      <div className="s_section_p_title">
      <Link to={`/board/${idx}`}>
        <h3 className="s_p_title">{title}</h3>
        <h6 className="s_p_desc">{desc}</h6>
      </Link>
      </div>
    </li>
  );
};

export default PrivateBoard;
