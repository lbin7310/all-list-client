import React, { Component } from 'react';
import './Sidebar.css';

class Sidebar extends Component {
  constructor () {
    super()
    this.state = {
    }
  }

  render() {
    const { data, onClickBoard, userId } = this.props;
    let privateBoards = {};
    let teamBoards = {};

    let privateBoard = [];
    let teamBoard = [];
    if (data !== undefined) {
      for (let i = 0; i < data.length; i++) {
        let isPrivate = data[i].is_private;
        let boardIdx = data[i].origin_board_idx;
        if (isPrivate === 0) {
          privateBoards[boardIdx] = data[i].board_title;
        } else if (isPrivate === 1) {
          teamBoards[boardIdx] = data[i].board_title;
        }
      }
    }

    for (let key in privateBoards) {
      privateBoard.push({ boardIdx: key, boardName: privateBoards[key] })
    }

    for (let key in teamBoards) {
      teamBoard.push({ boardIdx: key, boardName: teamBoards[key] })
    }
    return (
      <div>
        <section className="top_location_private">
          <div className="private_board">
            <div>Private Board</div>
            <ul>
              {privateBoard.map((d) => {
                return <li className="sidebar_board_title"
                  key={d.boardIdx}
                  onClick={ () => onClickBoard(d.boardIdx, data)}
                >{d.boardName}</li>
              })}
            </ul>
          </div>
        </section>
        <section className="top_location_team">
          <div className="team_board">
            <div>Team Board</div>
            <ul>
              {teamBoard.map((d) => {
                return <li className="sidebar_board_title"
                  key={d.boardIdx}
                  onClick={ () => onClickBoard(d.boardIdx, data)}
                >{d.boardName}</li>
              })}
            </ul>
            <ul>
            </ul>
          </div>
        </section>
      </div>
    )
  }
}

export default Sidebar;
