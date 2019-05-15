import React from 'react';
import Sidebar from './Sidebar';
import Top from './Top';
import './board.css';

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
      </div>
    );
  }
}
