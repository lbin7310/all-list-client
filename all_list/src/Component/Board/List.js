import React from 'react';
import Card from './Card';
import './List.css';

export default class List extends React.Component {
  constructor () {
    super()
    this.state = {

    }
  }

  render () {
    return (
      <div className="board_lists">
        <div className="list">
          <div className="list_title">자동차 사기</div>
          <Card />
        </div>
        <div className="list_plus">
          <div className="list_plus_title">+ 추가하기</div>
        </div>
      </div>
    )
  }
}
