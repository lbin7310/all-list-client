import React from "react";
import MemberList from "../Component/Team/MemberList";
import {
  BrowserRouter as Router,
  Link,
  withRouter,
  Redirect
} from "react-router-dom";
import "./Team.css";
import Modal from "../Component/Team/Modal";
import ModalPortal from "../Component/Team/ModalPortal";
import serverUrl from "../Pages/serverURL";

class Team extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: false,
      memberList: [],
      searchValue: "",
      addUser: null,
      board_idx: null,
      board_title: ""
    };
  }

  reRender = () => {
    const boardIdx = this.props.match.params.id;
    const boardIdxInfo = { origin_board_idx: boardIdx };

    const currentBoardInfo = {
      method: "POST",
      body: JSON.stringify(boardIdxInfo),
      headers: {
        "Content-Type": "application/json"
      }
    };

    fetch(serverUrl + "/user_board/find", currentBoardInfo)
      .then(res => res.json())
      .then(json => {
        this.setState({
          memberList: json,
          board_idx: boardIdx
        });
      });
  };

  handleOpenModal = () => {
    this.setState({
      modal: true
    });
  };

  handleCloseModal = () => {
    this.setState({
      modal: false
    });
  };

  addMemberList = (e, idx) => {
    e.preventDefault();

    const addMember = {
      origin_user_idx: idx,
      origin_board_idx: this.state.board_idx
    };

    const newMember = {
      method: "POST",
      body: JSON.stringify(addMember),
      headers: {
        "Content-Type": "application/json"
      }
    };

    fetch(serverUrl + "/user_board", newMember)
      .then(res => res.json())
      .then(json => {
        if (json === true) {
          this.reRender();
        }
      })
      .then(this.handleCloseModal());
  };

  // 해당 보드에서 해당 유저아이디를 삭제
  // 서버에 boardIdx와 userIdx를 날린다.
  handleDelete = (e, v) => {
    e.preventDefault();

    const deleteUser = {
      origin_board_idx: this.state.board_idx,
      origin_user_idx: v
    };

    const deleteInfo = {
      method: "DELETE",
      body: JSON.stringify(deleteUser),
      headers: {
        "Content-Type": "application/json"
      }
    };
    // 서버로 부터 memberList데이터를 다시 받아 리랜더한다.
    fetch(serverUrl + "/user_board", deleteInfo)
      .then(res => res.json)
      .then(json => {
        this.reRender();
      });
  };

  handleSearch = e => {
    e.preventDefault();
    this.setState({
      searchValue: e.target.value
    });
  };

  //현재 인풋창에 있는 value값과 동일한 nickname이 있는지 찾아보는 함수
  //있으면, state의 addUser에 값을 setState해준다.
  //리랜딩이 되면 handleOpenModal을 통해 모달을 열어주며 addUser의 값을 Modal Component로 넘겨준다.
  searchUser = e => {
    e.preventDefault();

    const searchNickname = {
      method: "POST",
      body: JSON.stringify({ nickname: this.state.searchValue }),
      headers: { "Content-Type": "application/json" }
    };
    // JSON.stringify({ nickname: this.state.searchValue }
    fetch(serverUrl + "/user_board/search", searchNickname)
      .then(res => res.json())
      .then(json => {
        if (json.length === 0) {
          alert("찾으시는 사용자가 없습니다");
          this.setState({
            searchValue: ""
          });
        } else {
          this.setState({
            addUser: json[0]
          });
          this.handleOpenModal();
        }
      });
  };

  componentDidMount = () => {
    this.reRender();
  };

  render() {
    if (this.props.isLogin === false) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        <header className="s_Team_header">
          <Link className="s_Team_header_a" to={`/board/${this.state.board_idx}`}>
            {this.props.location.state.board_title}
          </Link>
          <button
            onClick={() => {
              window.localStorage.removeItem("userInfo");
              this.props.handleLogin();
              this.props.history.push("/");
            }}
            className="s_btn_member"
          >
            로그아웃
          </button>
        </header>
        <section className="Team_sidebar_left">
          <h3>Team Members</h3>
          {/* 스테이트에 저장 된 현재 팀원목록들을 MemberList로 보낸다 */}
          <ul>
            {this.state.memberList
              .filter(
                member =>
                  member.origin_user_idx !==
                  JSON.parse(window.localStorage.getItem("userInfo")).data[0]
                    .origin_user_idx
              )
              .map((member, idx) => {
                return (
                  <MemberList
                    listIdx={idx}
                    origin_user_idx={member.origin_user_idx}
                    nickname={member.nickname}
                    email={member.email}
                    key={idx}
                    // {member.orign_userboard_idx}
                    handleDelete={this.handleDelete}
                  />
                );
              })}
          </ul>
        </section>
        <section className="Team_sidebar_right">
          <h4>친구를 보드에 초청하세요</h4>
          <div>
            <input
              className="userNickname"
              type="text"
              placeholder="유저이름을 입력하세요"
              onChange={this.handleSearch}
            />
            {/* <button onClick={this.handleOpenModal}>친구찾기</button> */}
            <button className="s_btn_invite" onClick={this.searchUser}>친구찾기</button>
            {this.state.modal && (
              <ModalPortal>
                {/* ModalPotal의 지시에 따라, APP내부가 아닌 APP외부의 DOM에 Modal을 띄워줌. --> index.html 확인 */}
                <Modal
                  handleCloseModal={this.handleCloseModal}
                  addMemberList={this.addMemberList}
                  addUser={this.state.addUser}
                  memberList={this.state.memberList}
                />
              </ModalPortal>
            )}
          </div>
        </section>
      </div>
    );
  }
}

export default withRouter(Team);
