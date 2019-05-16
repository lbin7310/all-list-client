import React from 'react';
import Sidebar from '../Component/Board/Sidebar';
import Top from '../Component/Board/Top';
import List from '../Component/Board/List';
import './Board.css';

export default class Board extends React.Component {
  constructor () {
    super()
    this.state = {
      time: new Date()
    }
  }

  render () {
    return (
      <div>
        <Top />
        <div className='side_bar'>
          <Sidebar />
        </div>
        <List />
      </div>
    );
  }
}
