import React from 'react';
import Sidebar from '../Component/Board/Sidebar';
import Top from '../Component/Board/Top';
// import List from '../Component/Board/List';
import './Board.css';
import { fakeData } from '../fakeData';

export default class Board extends React.Component {
  constructor () {
    super()
    this.state = {
      data: fakeData
    }
  }

  componentDidMount () {
    let testText = {
      email: "noh@gmail.com",
      pw: "noh",
      nickname: "noh"
    };

    let testObj = {
      method: "POST",
      body: JSON.stringify({ boardIdx: 1 }),
      headers: {
        "Content-Type": "application/json"
      }
    };

    fetch("http://localhost:9089/board/get", testObj)
      .then(res => res.json())
      .then(json => console.log(json, '<-------------와라'))
  }

  render() {
    const { data } = this.state;

    return (
      <div>
        <Top data={data}/>
        <div className='side_bar'>
          <Sidebar />
        </div>
        {/* <List /> */}
      </div>
    );
  }
}
