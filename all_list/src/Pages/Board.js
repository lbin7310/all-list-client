import React from 'react';
import Sidebar from '../Component/Board/Sidebar';
import Top from '../Component/Board/Top';
import List from '../Component/Board/List';
import './Board.css';
import { fakeData } from '../fakeData';

export default class Board extends React.Component {
  constructor () {
    super()
    this.state = {
      data: fakeData,
      boardIdx: fakeData[0].board_idx,
      boardName: fakeData[0].board_title,
      boardDesc: fakeData[0].board_desc,
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

  handleClickChange = (e) => {
    let { data } = this.state;
    let cData = [...data];
    for (let i = 0; i < cData.length; i++) {
      if (cData[i].board_idx === Number(e)) {
        this.setState({
          boardIdx: cData[i].board_idx,
          boardName: cData[i].board_title,
          boardDesc: cData[i].board_desc
        })
      }
    }
  }

  handleAddList = (e) => {
    console.log(e.target);
  }

  render() {
    const { boardDesc, 
            boardName, 
            data,
            boardIdx } = this.state;

    return (
      <div>
        <Top boardDesc={boardDesc} boardName={boardName}/>
        <div className='side_bar'>
          <Sidebar data={data} 
          onClickBoard={this.handleClickChange} />
        </div>
        <List data={data} 
        boardIdx={boardIdx}
        onAddList={this.handleAddList}/>
      </div>
    );
  }
}
