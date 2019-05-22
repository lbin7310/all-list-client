import React from "react";
import "./Main.css";
import PrivateBoard from "../Component/Main/PrivateBoard";
import TeamBoard from "../Component/Main/TeamBoard";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from "react-router-dom";

export default class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      userIdx: "",
      nickname: "",
      privateB: [],
      teamB: [],
      newPBTitle: "",
      newPBdesc: "",
      newTBTitle: "",
      newTBdesc: ""
    };
  }
  //보드 추가, 삭제 후 새롭게 GET요청을 통해 데이터를 받은 후 리랜딩해주는 함수
  reRender = () => {
    const userInfo = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        info: JSON.stringify({
          origin_user_idx: this.state.userIdx
        })
      }
    };
    const userIdx = JSON.parse(window.localStorage.getItem("userInfo")).data[0]
      .origin_user_idx;
    const nickname = JSON.parse(window.localStorage.getItem("userInfo")).data[0]
      .nickname;

    fetch("http://localhost:9089/lender", userInfo)
      .then(res => res.json())
      .then(allBoard => {
        console.log(allBoard, "111111111111111111111111111111111111");
        //개인보드, 팀보드 배열로 나누기
        if (allBoard !== null) {
          const privateB = allBoard.filter(board => board.is_private === 0);
          const teamB = allBoard.filter(board => board.is_private === 1);
          //setState
          this.setState({
            privateB: privateB,
            teamB: teamB,
            userIdx,
            nickname
          });
        } else {
          this.setState({
            privateB: [],
            teamB: [],
            userIdx,
            nickname
          });
        }
      });
  };

  //새로운 보드 타이틀 인풋창
  handleInput = (e, isPrivate) => {
    if (isPrivate === 0) {
      this.setState({
        newPBTitle: e.target.value
      });
    } else if (isPrivate === 1) {
      this.setState({
        newTBTitle: e.target.value
      });
    }
  };

  //새로운 보드 설명 인풋창
  handleDesc = (e, isPrivate) => {
    if (isPrivate === 0) {
      this.setState({
        newPBdesc: e.target.value
      });
    } else if (isPrivate === 1) {
      this.setState({
        newTBdesc: e.target.value
      });
    }
  };

  //보드 추가하기
  addBoard = isPrivate => {
    let title = "";
    let desc = "";

    if (isPrivate === 0) {
      title = this.state.newPBTitle;
      desc = this.state.newPBdesc;
    } else if (isPrivate === 1) {
      title = this.state.newTBTitle;
      desc = this.state.newTBdesc;
    }

    const addInfoBody = {
      board_title: title,
      is_private: isPrivate,
      board_desc: desc,
      origin_user_idx: this.state.userIdx
    };

    const firstFetch = {
      method: "POST",
      body: JSON.stringify(addInfoBody),
      headers: { "Content-Type": "application/json" }
    };

    fetch("http://localhost:9089/board", firstFetch) //첫번째 Fetch
      .then(res => res.json())
      .then(json => {
        const boardData = {
          origin_board_idx: json[0].origin_board_idx,
          origin_user_idx: this.state.userIdx
        };
        const secondFetch = {
          method: "POST",
          body: JSON.stringify(boardData),
          headers: { "Content-Type": "application/json" }
        };
        fetch("http://localhost:9089/user_board", secondFetch); //두번 째 Fetch를 통해, DB user_board Table 데이터를 추가한다.
      })
      .then(res => this.reRender()) // 그리고 세번 째 fetch를 통해 해당 사용자의 모든 보드 정보들을 불러온다.
      .then(res => {
        //인풋창을 모두 reSet시켜준다.
        if (isPrivate === 0) {
          this.setState({
            newPBTitle: "",
            newPBdesc: ""
          });
        } else {
          this.setState({
            newTBTitle: "",
            newTBdesc: ""
          });
        }
      });
  };
  //보드 삭제하기
  deleteBoard = boardID => {
    const deleteBoard = {
      method: "DELETE",
      body: JSON.stringify({ origin_board_idx: boardID }),
      headers: { "Content-Type": "application/json" }
    };

    fetch("http://localhost:9089/board", deleteBoard).then(res =>
      this.reRender()
    );
  };

  //페이지 로딩 되자마자, 로컬스토리지 유저정보를 서버
  componentDidMount = () => {
    this.reRender();
  };

  render() {
    if(this.props.isLogin === false) {
      this.props.history.push('/login')
    } else {
    return (
      <div>
        {/* Top Navigation Bar */}
        <nav id="app_title">
          <div>
            <h1>모두의리스트</h1>
            <h3>{this.state.nickname}</h3>
          </div>
          <button
            onClick={() => {
              window.localStorage.removeItem("userInfo");
              this.props.history.push("/login");
            }}
          >
            로그아웃
          </button>
        </nav>

        <div className="main_center">
          <div className="main_username">보드 정보</div>
          {/* Private Board Section */}
          <section className="main_private">
            <div className="main_private_board">
              <div>Private Board</div>
              <ul>
                {this.state.privateB.map(board => {
                  return (
                    <PrivateBoard
                      title={board.board_title}
                      desc={board.board_desc}
                      key={board.board_idx}
                      idx={board.board_idx}
                      deleteBoard={this.deleteBoard}
                    />
                  );
                })}
              </ul>
              <div>
                <input
                  className="P_TitleInput"
                  onChange={e => this.handleInput(e, 0)}
                  type="text"
                  placeholder="새로운 보드명을 추가해주세요"
                />
                <textarea
                  className="P_DescInput"
                  onChange={e => this.handleDesc(e, 0)}
                  type="text"
                  placeholder="보드를 소개하세요"
                />
                <button
                  onClick={() => {
                    //인풋창을 디폴팅 시켜준다.
                    document.querySelector(".P_TitleInput").value = "";
                    document.querySelector(".P_DescInput").value = "";
                    //제목을 입력하지 않은 경우, 제목입력 하라는 경고창이 뜬다.
                    if (this.state.newPBTitle.length === 0) {
                      alert("보드 제목을 입력하세요");
                    } else {
                      this.addBoard(0);
                    }
                  }}
                >
                  추가하기
                </button>
              </div>
            </div>
          </section>
          {/* Team Board Section */}
          <section className="main_team">
            <div className="main_team_board">
              <div>Team Board</div>
              <ul>
                {this.state.teamB.map(board => {
                  return (
                    <TeamBoard
                      title={board.board_title}
                      desc={board.board_desc}
                      key={board.board_idx}
                      idx={board.board_idx}
                      deleteBoard={this.deleteBoard}
                    />
                  );
                })}
              </ul>
              <div>
                <input
                  className="T_TitleInput"
                  type="text"
                  placeholder="새로운 팀 보드명을 추가해주세요"
                  onChange={e => this.handleInput(e, 1)}
                />
                <textarea
                  className="T_DescInput"
                  onChange={e => this.handleDesc(e, 1)}
                  type="text"
                  placeholder="보드를 소개하세요"
                />
                <button
                  onClick={() => {
                    //인풋창을 디폴팅 시켜준다.
                    document.querySelector(".T_TitleInput").value = "";
                    document.querySelector(".T_DescInput").value = "";
                    //제목을 입력하지 않은 경우, 제목입력 하라는 경고창이 뜬다.
                    if (this.state.newTBTitle.length === 0) {
                      alert("보드 제목을 입력하세요");
                    } else {
                      this.addBoard(1);
                    }
                  }}
                >
                  추가하기
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }}
}
