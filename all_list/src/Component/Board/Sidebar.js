import React from 'react';
import './Sidebar.css';
import { thisExpression } from '@babel/types';

let Sidebar = (props) => {
  let privateBoards = {};
  let teamBoards = {};

  let privateBoard = [];
  let teamBoard = [];

  for (let i = 0; i < props.data.length; i++) {
    let isPrivate = props.data[i].is_private;
    let boardIdx = props.data[i].board_idx;
    if (isPrivate === 0) {
      if (privateBoards[boardIdx] === undefined) {
        privateBoards[boardIdx] = props.data[i].board_title;
      }
    } else if (isPrivate === 1) {
      teamBoards[boardIdx] = props.data[i].board_title;
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
            {privateBoard.map((data) => {
              return <li className="sidebar_board_title"
                key={data.boardIdx}
                onClick={ () => props.onClickBoard(data.boardIdx)}
              >{data.boardName}</li>
            })}
          </ul>
        </div>
      </section>
      <section className="top_location_team">
        <div className="team_board">
          <div>Team Board</div>
          <ul>
            {teamBoard.map((data) => {
              return <li className="sidebar_board_title"
                key={data.boardIdx}
                onClick={ () => props.onClickBoard(data.boardIdx)}
              >{data.boardName}</li>
            })}
          </ul>
          <ul>
          </ul>
        </div>
      </section>
    </div>
  )
}

export default Sidebar;
