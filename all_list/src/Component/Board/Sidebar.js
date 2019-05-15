import React from 'react';

export default class Sidebar extends React.Component {
  constructor () {
    super()
    this.state = {
    }
  }

  render () {
    return (
      <div>
        <section className="top_location_private">
          <div className="private_board">
            <div>Private Board</div>
            <ul> {/* 여기는 개인의 보드를 담는 로직을 만들어야한다. li는 반복한다. */}
              <li> {/* onClick event를 넣는다. 그럼 해당 보더로 이동한다. */}
                호랑이는 가죽을 남기고,
                개발자는 TIL를 남긴다.
              </li>
              <li>
                인생동안 할 거.
              </li>
              <li>
                올해 가장 하고 싶은 것.
              </li>
            </ul>
          </div>
        </section>
        <section className="top_location_team">
          <div className="team_board">
            <div>Team Board</div>
            <ul> {/* 팀의 보드를 담는 로직을 만들어야한다. li는 반복한다. */}
              <li>  {/* onClick event를 넣는다. 그럼 해당 보더로 이동한다. */}
                축구동아리
              </li>
              <li>
                농구동아리
              </li>
              <li>
                야구동아리
              </li>
            </ul>
          </div>
        </section>
      </div>
    )
  }
}
