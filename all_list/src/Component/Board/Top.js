import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import './Top.css'

class Top extends Component {
  constructor () {
    super()
    this.state = {
    }
  }

  render() {
    const { boardDesc, boardName, isPrivate, boardIdx } = this.props
    return (
      <nav>
        <div className="top_name_and_team_plus">
          <div>
            <div>{boardName}</div>
            <div>{boardDesc}</div>
          </div>
          <Link to={`/team/${boardIdx}`}>
            <button style={{ display: isPrivate ? 'block' : 'none' }}>팀원관리</button>
          </Link>
        </div>
        <div>2019</div>
      </nav>
    )
  }
}

export default withRouter(Top);
