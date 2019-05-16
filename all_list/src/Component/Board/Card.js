import React from 'react';
import './Card.css';

export default class Card extends React.Component {
  constructor () {
    super()
    this.state = {}
  }

  render () {
    return (
      <div className="cards">
        <div className="card">
          알바
        </div>
        <div className="card">
          직장
        </div>
        <div className="card">
          흰머리 뽑기
        </div>
        <div className="card">
          세차하기
        </div>
        <div className="card">
          알바
        </div>
      </div>
    )
  }
}
