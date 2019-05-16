import React from "react";
import MemberList from "../Component/Team/MemberList"
import "./Team.css";

class Team extends React.Component {
  render() {
    return (
      <div>
        <header className="Team_header">
          <h1>팀명</h1>
        </header>
        <section className="Team_sidebar_left">
          <h3>Team Members</h3>
          <MemberList />
        </section>
        <section>
          <h4>니 친구를 초대해!!!!</h4>
          <form>
            <input type="text" placeholder="abc@gamil.com" />
            <button>초대하기</button>
          </form>
        </section>
      </div>
    );
  }
}

export default Team;
