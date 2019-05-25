import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import "./Top.css";

class Top extends Component {
  constructor() {
    super();
    this.state = {
      boardEditName: "",
      boardEditDesc: "",
      editing: false
    };
  }

  handleToggleEdit = () => {
    const { editing } = this.state;
    this.setState({ editing: !editing });
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  componentDidUpdate(prevProps, prevState) {
    const { boardName, boardDesc, onEditBoard, boardIdx } = this.props;
    const { boardEditName, boardEditDesc } = this.state;
    if (!prevState.editing && this.state.editing) {
      this.setState({
        boardEditName: boardName,
        boardEditDesc: boardDesc
      });
    }

    if (prevState.editing && !this.state.editing) {
      onEditBoard(boardIdx, {
        boardName: boardEditName,
        boardDesc: boardEditDesc
      });
    }
  }

  render() {
    const { boardDesc, boardName, isPrivate, boardIdx } = this.props;
    const { editing } = this.state;

    const { boardEditDesc, boardEditName } = this.state;
    if (editing) {
      return (
        <div className="k_top">
          <div className="top_name_and_team_plus">
            <input className="k_input"
              value={boardEditName}
              name="boardEditName"
              placeholder="보더 이름을 바꾸시오."
              onChange={this.handleChange}
            />
            <input className="k_input"
              value={boardEditDesc}
              name="boardEditDesc"
              placeholder="보더 설명을 바꾸시오."
              onChange={this.handleChange}
            />
            <div className="k_top_check">
              <div className="fas fa-check"></div>
              <button className="k_button" onClick={this.handleToggleEdit}>적용</button>
            </div>
          </div>
          <div>
          </div>
        </div>
      );
    }
    return (
      <nav className="k_top">
        <div className="top_name_and_team_plus">
          <div className="k_top_name_description">
            <div className="board_Name">{boardName}</div>
            <div className="board_Description">{boardDesc}</div>
          </div>
          <div className="k_modify_team_logout">
            <div className="k_goto_team_manage">
              <span className="fas fa-users" style={{ display: isPrivate ? "block" : "none" }}></span>
              <Link
                to={{
                  pathname: `/user_board/${boardIdx}`,
                  state: {
                    board_title: boardName
                  }
                }}
              >
                <button className="k_button" style={{ display: isPrivate ? "block" : "none" }}>
                  Team
                </button>
              </Link>
            </div>
            <div className="k_modify">
              <span className="fas fa-pen-fancy k_pen_fancy"></span>
              <button className="k_button" onClick={this.handleToggleEdit}>Modify</button>
            </div>
            <div className="k_top_logout">
              <div className="fas fa-sign-out-alt k_sign_out"></div>
              <button className="k_button"
                onClick={() => {
                  window.localStorage.removeItem("userInfo");
                  this.props.handleLogin();
                  this.props.history.push("/");
                }}
              >Log Out</button>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default withRouter(Top);
