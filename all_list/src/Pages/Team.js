import React from "react";
import MemberList from "../Component/Team/MemberList";
import {
  BrowserRouter as Router,
  Route,
  Link,
  withRouter
} from "react-router-dom";
import "./Team.css";
import Modal from "../Component/Team/Modal";
import ModalPortal from "../Component/Team/ModalPortal";

//board네임 - Props로 받는다.
//닉네임 - 로컬스토리지서 받는다.

class Team extends React.Component {
  constructor(props) {
    super(props);
    // Props로 origin_board_idx를 받아야한다. --> Board 컴포넌트에서 받아야 한다
    //memberList의 형태는 [{nickname: , email: ,origin_user_idx: }, {nickname: , email: ,origin_user_dix: }]
    //addUser의 형태는 {nickname: , email: , origin_user_idx: }
    this.state = {
      modal: false,
      memberList: [],
      searchValue: "",
      addUser: null,
      board_idx: null,
      board_title: "Google HR Team"
    };
  }

  reRender = () => {
    const boardIdx = { origin_board_idx: this.props.match.params.id };

    const currentBoardInfo = {
      method: "POST",
      body: JSON.stringify(boardIdx),
      headers: {
        "Content-Type": "application/json"
      }
    };

    fetch("http://localhost:9089/user_board/find", currentBoardInfo)
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
    // e.preventDefault();

    const addMember = {
      origin_user_idx: idx,
      origin_board_idx: this.state.board_idx
    };
    console.log(addMember);

    // 새로 등록할 친구를 db에 저장 했다가, 새로 업데이트된 멤버리스트를 다시 받아와야함
    // memberList의 형태는 [{nickname: , email: ,origin_user_idx: }, {nickname: , email: ,origin_user_idx: }]
    const newMember = {
      method: "POST",
      body: JSON.stringify(addMember),
      headers: {
        "Content-Type": "application/json"
      }
    };

    fetch("http://localhost:9089/user_board", newMember)
      .then(res => res.json())
      .then(json => {
        if (json === true) {
          this.reRender();
        }
      });
  };

  // 해당 보드에서 해당 유저아이디를 삭제
  // 서버에 boardIdx와 userIdx를 날린다.
  handleDelete = (e, v) => {
    e.preventDefault();
    console.log(v);

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
    fetch("http://localhost:9089/user_board", deleteInfo)
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
    fetch("http://localhost:9089/user_board/search", searchNickname)
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
    //json = [{email: , nickname : origin_user_idx, password: }]
  };

  componentDidMount = () => {
    // const boardIdx = { boardIdx: this.props.match.params.boardIdx }
    this.reRender();
  };

  render() {
    return (
      <Router>
        <div>
          <header className="Team_header">
            <Link to={`/board/${this.state.board_idx}`}>
              {this.props.location.state.board_title}
            </Link>
            <button
              onClick={() => {
                window.localStorage.removeItem("userInfo");
                this.props.history.push("/login");
              }}
            >
              로그아웃
            </button>
          </header>
          <section className="Team_sidebar_left">
            <h3>Team Members</h3>
            {/* 스테이트에 저장 된 현재 팀원목록들을 MemberList로 보낸다 */}
            <ul>
              {this.state.memberList.map((member, idx) => {
                console.log(idx);
                return (
                  <MemberList
                    listIdx={idx}
                    origin_user_idx={member.origin_user_idx}
                    nickname={member.nickname}
                    email={member.email}
                    key={member.orign_userboard_idx}
                    handleDelete={this.handleDelete}
                  />
                );
              })}
            </ul>
          </section>
          <section className="Team_sidebar_right">
            <h4>니 친구를 초대해!!!!</h4>
            <div>
              <input
                className="userNickname"
                type="text"
                placeholder="유저이름을 입력하세요"
                onChange={this.handleSearch}
              />
              {/* <button onClick={this.handleOpenModal}>친구찾기</button> */}
              <button onClick={this.searchUser}>친구찾기</button>
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
      </Router>
    );
  }
}

export default withRouter(Team);
