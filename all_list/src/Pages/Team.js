import React from "react";
import MemberList from "../Component/Team/MemberList";
import "./Team.css";
import Modal from "../Component/Team/Modal";
import ModalPortal from "../Component/Team/ModalPortal";
import {
  BrowserRouter as Router,
  Route,
  Link,
  withRouter
} from "react-router-dom";

// const userInfo = JSON.parse(window.localStorage.getItem("userInfo")

// 1.현재 팀에 등록 된 친구들 목록 뿌리기
// -local 스토리지 userInfo전체를 JSON.strigify 해서 서버로 보내준다.
// -해당 요청 팀에 관련된 유저 목록들이 담긴 데이터를 받는다./Server Side/
// -그 데이터의 길이만큼 맵핑해서 MemberList 컴포넌트를 뿌려준다. ==> 데이터안에 nickname, email 값을 props로 넘겨준다.

// 2. 친구 검색 및 추가하기
// - 닉네임으로 검색한다 --> this.state.value 로 값을 넘긴다.
// - '검색'버튼을 누른다.
// - this.state.value 의 값을 POST방식으로 전송한다.
// - 없으면 "일치하는 회원정보가 없습니다"
// - 있으면 "유저 nickname, 유저 email" 정보가 담긴 모달창을 띄운다.
// - 추가하기를 누르면 리스트에 값이 추가된다.
// - 그리고 모달창은 꺼진다.

class Team extends React.Component {
  constructor(props) {
    super(props);
    // Props로 origin_board_idx를 받아야한다. --> Board 컴포넌트에서 받아야 한다
    //memberList의 형태는 [{nickname: , email: ,origin_user_idx: }, {nickname: , email: ,origin_user_dix: }]
    //addUser의 형태는 {nickname: , email: , origin_user_idx: }
    this.state = {
      modal: false,
      memberList: [
        { email: "이메일", nickname: "닉네임", origin_user_idx: 1 },
        { email: "이메일2", nickname: "닉네임2", origin_user_idx: 2 }
      ], //<-- fakedata
      searchValue: "",
      addUser: null,
      board_idx: 4,
      board_title: "Google HR Team Board"
    };
  }

  handleOpenModal = e => {
    e.preventDefault();
    this.setState({
      modal: true
    });
  };

  handleCloseModal = e => {
    e.preventDefault();
    this.setState({
      modal: false
    });
  };

  addMemberList = e => {
    e.preventDefault();
    //새로 등록할 친구를 db에 저장 했다가, 새로 업데이트된 멤버리스트를 다시 받아와야함
    //memberList의 형태는 [{nickname: , email: ,origin_user_idx: }, {nickname: , email: ,origin_user_dix: }]
    const newMember = {
      method: "POST",
      body: JSON.stringify(this.state.addUser),
      headers: {
        "Content-Type": "application/json"
      }
    };
    fetch("http://localhost:9089/team", newMember)
      .then(res => res.json())
      .then(json => {
        this.setState({
          memberList: json
        });
      });
  };

  //해당 보드에서 해당 유저아이디를 삭제
  //서버에 boardIdx와 userIdx를 날린다.
  handleDelete = (e, v) => {
    e.preventDefault();
    console.log(v);
    // const deleteUser = [{
    //   board_idx : this.state.board_idx,
    //   user_idx : v
    // }]

    // const deleteInfo = {
    //   method : "DELETE",
    //   body : JSON.stringify(deleteUser),
    //   headers: {
    //     "Content-Type": "application/json"
    //   }
    // }
    // 서버로 부터 memberList데이터를 다시 받아 리랜더한다.
    // fetch("http://localhost:9089/team", deleteUserInfo )
    //   .then( res => res.json )
    //     .then( json => {
    //       this.setState({
    //         memberList : json
    //       })
    //     })
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
      body: JSON.stringify(this.state.searchValue),
      headers: {
        "Content-Type": "application/json"
      }
    };

    //서버로부터 받을 기대하는 json의 형태는 {nickname: "마리오", email: "aaa@naver.com", origin_user_idx: 1}
    // fetch("http://localhost:9089/team", searchNickname)
    // .then(this.handleOpenModal())
    //   .then(res => res.json())
    //     .then(json => {
    //     this.setState({
    //       addUser: json
    //     })
    //   });
    //찾는 유저가 없으면....없다고 신호 줘야함
  };

  componentDidMount = () => {
    //   const boardIdx = { boardIdx: this.props.match.params.boardIdx }
    //   const currentBoardInfo = {
    //   method: "POST",
    //   body: JSON.stringify(boardIdx),
    //   headers: {
    //     "Content-Type": "application/json"
    //   }
    // };
    // fetch("http://localhost:9089/team/{ boardIdx }", currentBoardInfo)
    //   .then(res => res.json())
    //   .then(json => {
    //     //json은 회원목록이 담긴 객체형태여야한다.
    //     this.setState({
    //       memberList: json,
    //       board_idx: json.boardIdx,
    //       board_title: json.board_title
    //     });
    //   });
  };

  render() {
    return (
      <Router>
        <div>
          <header className="Team_header">
            <Link to={`/board/${this.state.board_idx}`}>
              {this.state.board_title}
            </Link>
          </header>
          <section className="Team_sidebar_left">
            <h3>Team Members</h3>
            {/* 스테이트에 저장 된 현재 팀원목록들을 MemberList로 보낸다 */}
            <ul>
              {this.state.memberList.map(member => {
                return (
                  <MemberList
                    origin_user_idx={member.origin_user_idx}
                    nickname={member.nickname}
                    email={member.email}
                    handleDelete={this.handleDelete}
                  />
                );
              })}
            </ul>
          </section>
          <section className="Team_sidebar_left">
            <h4>니 친구를 초대해!!!!</h4>
            <div>
              <input
                type="text"
                placeholder="abc@gamil.com"
                onChange={this.handleSearch}
              />
              <button onClick={this.handleOpenModal}>친구찾기</button>
              {this.state.modal && (
                <ModalPortal>
                  {/* ModalPotal의 지시에 따라, APP내부가 아닌 APP외부의 DOM에 Modal을 띄워줌. --> index.html 확인 */}
                  <Modal
                    handleCloseModal={this.handleCloseModal}
                    addMemberList={this.addMemberList}
                    addUser={this.state.addUser}
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

export default withRouter (Team);
