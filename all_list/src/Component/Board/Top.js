import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './Top.css'

class Top extends Component {
  constructor () {
    super()
    this.state = {
      isPrivate: 0
    }
  }

  render() {
    const { boardDesc, boardName, isPrivate, boardIdx } = this.props
    console.log(isPrivate);
    return (
      <Router>
        <nav>
          <div className="top_name_and_team_plus">
            <div>
              <div>{boardName}</div>
              <div>{boardDesc}</div>
            </div>
            <Link to={`/team/${boardIdx}`}>
              <button>팀원관리</button>
            </Link>
          </div>
          <div>2019</div>
        </nav>
      </Router>
    )
  }
}

export default Top;
