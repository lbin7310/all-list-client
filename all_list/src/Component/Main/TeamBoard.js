import React from "react";
import "./TeamBoard.css";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

const TeamBoard = ({ title, desc, deleteBoard, idx }) => {
  return (
    <li className="s_li_team">
      <div className="s_section_t_btn">
        <button className="s_btn_t_delete" onClick={() => deleteBoard(idx)}>x</button>
      </div>
      <div className="s_section_t_title">
      <Link to={`/board/${idx}`}>
        <h3 className="s_t_title">{title}</h3>
        <h6 className="s_t_desc">{desc}</h6>
      </Link>
      </div>
      
    </li>
  );
};

export default TeamBoard;
