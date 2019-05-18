import React from "react";
import MemberList from "../Component/Team/MemberList";
import "./Team.css";
import Modal from "../Component/Team/Modal";
import ModalPortal from "../Component/Team/ModalPortal";

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
      memberList: null,
      searchValue: "",
      addUser: null
    };
  }

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

  addMemberList = () => {
    e.preventDefault();
    //새로 등록할 친구를 db에 저장 했다가, 새로 업데이트된 멤버리스트를 다시 받아와야함
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
        })
      });
  };

  componentDidMount = () => {
    const currentBoardInfo = {
      method: "POST",
      body: JSON.stringify(this.props.origin_board_idx),
      headers: {
        "Content-Type": "application/json"
      }
    };
    fetch("http://localhost:9089/team", currentBoardInfo)
      .then(res => res.json())
      .then(json => {
        //json은 회원목록이 담긴 객체형태여야한다.
        this.setState({
          memberList: json
        });
      });
  };

  handleSearch = e => {
    e.preventDefault();
    this.setState({
      searchValue: e.target.value
    });

    searchUser = e => {
      e.preventDefault();
      const searchNickname = {
        method: "POST",
        body: JSON.stringify(this.state.searchValue),
        headers: {
          "Content-Type": "application/json"
        }
      };
      fetch("http://localhost:9089/team", searchNickname)
        .then(res => res.json())
        .then(json => {
          this.setState({
            addUser: json
          }).then(this.handleOpenModal());
        });
      //찾는 유저가 없으면....없다고 신호 줘야함
    };
  };
  render() {
    return (
      <div>
        <header className="Team_header">
          <h1>팀명</h1>
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
              handleSearch={this.handleSearch}
            />
            <button onClick={this.searchUser}>친구찾기</button>
            {this.state.modal && (
              <ModalPortal>
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
    );
  }
}

export default Team;
