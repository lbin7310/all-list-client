import React, { Component } from 'react';
import './Sidebar.css';

class Sidebar extends Component {
  constructor (props) {
    super()
    this.state = {
      sidedata: props.data
    }
  }

  componentDidMount () {
    const { userId } = this.props;

    fetch('http://localhost:9089/lender', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "info": JSON.stringify({
          origin_user_idx: userId
        })
      }
    })
      .then(res => res.json())
      .then(json => {
        console.log(json);
        if (json !== null) {
          this.setState({
            sidedata: json
          })
        }
      })
  }

  render() {
    const { sidedata } = this.state;
    const { data, onClickBoard, userId } = this.props;

    let privateBoards = {};
    let teamBoards = {};

    let privateBoard = [];
    let teamBoard = [];
    if (sidedata !== undefined) {
      for (let i = 0; i < sidedata.length; i++) {
        let isPrivate = sidedata[i].is_private;
        let boardIdx = sidedata[i].origin_board_idx;
        if (isPrivate === 0) {
          if (privateBoards[boardIdx] === undefined) {
            privateBoards[boardIdx] = sidedata[i].board_title;
          }
        } else if (isPrivate === 1) {
          teamBoards[boardIdx] = sidedata[i].board_title;
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
              {privateBoard.map((data) => {
                return <li className="sidebar_board_title"
                  key={data.boardIdx}
                  onClick={ () => onClickBoard(data.boardIdx, sidedata)}
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
                  onClick={ () => onClickBoard(data.boardIdx, sidedata)}
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
}

export default Sidebar;
