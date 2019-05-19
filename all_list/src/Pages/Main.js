import React from 'react';
import './Main.css'

export default class Main extends React.Component {
  constructor () {
    super()
    this.state = {}
  }

  render () {
    return (
      <div>
        <nav id="app_title">Every-List</nav>
        <div className="main_center">
          <div className="main_username">유저 아이디</div>
          <section className="main_private">
            <div className="main_private_board">
              <div>Private Board</div>
              <ul className="main_boards"> {/* 여기는 개인의 보드를 담는 로직을 만들어야한다. li는 반복한다. */}
                <li className="boards"> {/* onClick event를 넣는다. 그럼 해당 보더로 이동한다. */}
                  호랑이는 가죽을 남기고,
                  개발자는 TIL를 남긴다.
                </li>
                <li className="boards">
                  인생동안 할 거.
                </li>
                <li className="boards">
                  올해 가고 싶은 것들.
                </li >
                <li className="boards">
                  올해 갖고 싶은 것들.
                </li >
                <li className="boards">
                  올해 하고 싶은 것들.
                </li >
              </ul>
            </div>
          </section>
          <section className="main_team">
            <div className="main_team_board">
              <div>Team Board</div>
              <ul className="main_boards"> {/* 팀의 보드를 담는 로직을 만들어야한다. li는 반복한다. */}
                <li className="boards">  {/* onClick event를 넣는다. 그럼 해당 보더로 이동한다. */}
                  축구동아리
                </li>
                <li className="boards">
                  농구동아리
                </li>
                <li className="boards">
                  야구동아리
                </li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    )
  }
}
