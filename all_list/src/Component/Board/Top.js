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
    console.log("aaaa");
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
        <div>
          <div>
            <input
              value={boardEditName}
              name="boardEditName"
              placeholder="보더 이름을 바꾸시오."
              onChange={this.handleChange}
            />
          </div>
          <div>
            <input
              value={boardEditDesc}
              name="boardEditDesc"
              placeholder="보더 설명을 바꾸시오."
              onChange={this.handleChange}
            />
          </div>
          <button onClick={this.handleToggleEdit}>적용</button>
        </div>
      );
    }
    return (
      <nav className="k_top">
        <div className="top_name_and_team_plus">
          <div>
            <h1 className="board_Name">{boardName}</h1>
            <div className="board_Description">{boardDesc}</div>
          </div>
          <div className="k_modify_team_logout">
            <div className="k_modify">
              <span className="fas fa-pen-fancy fa-2x k_pen_fancy"></span>
              <button className="k_button" onClick={this.handleToggleEdit}>수정</button>
            </div>
            <div className="k_goto_team_manage">
              <span className="fas fa-users fa-2x"></span>
              <Link
                to={{
                  pathname: `/user_board/${boardIdx}`,
                  state: {
                    board_title: boardName
                  }
                }}
              >
                <button className="k_button" style={{ display: isPrivate ? "block" : "none" }}>
                  팀원관리
                </button>
              </Link>
            </div>
            <div className="k_top_logout">
              <div className="fas fa-sign-out-alt fa-2x k_sign_out"></div>
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
