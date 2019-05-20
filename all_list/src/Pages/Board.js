import React from 'react';
import Sidebar from '../Component/Board/Sidebar';
import Top from '../Component/Board/Top';
import List from '../Component/Board/List';
import './Board.css';
import { fakeData } from '../fakeData';

class Board extends React.Component {
  constructor () {
    super()
    this.state = {
      data: fakeData,
      boardIdx: fakeData[0].board_idx,
      boardName: fakeData[0].board_title,
      boardDesc: fakeData[0].board_desc,
      isPrivate: fakeData[0].is_private
    }
  }

  componentDidMount () {
    let { boardIdx } = this.state;

    let testText = {
      email: "noh@gmail.com",
      pw: "noh",
      nickname: "noh"
    };

    let testObj = {
      method: "POST",
      body: JSON.stringify({ boardIdx }),
      headers: {
        "Content-Type": "application/json"
      }
    };

    fetch("http://localhost:9089/board/get", testObj)
      .then(res => res.json())
      .then(json => console.log(json, '<-------------와라'))
  }

  // sidebar에서 board 이름을 클릭하게 되면 Top에 이름이 바뀌면서 
  // Top의 boardNamde 바뀌게 된다.
  handleClickChange = (e) => {
    let { data } = this.state;
    let cData = [...data];
    for (let i = 0; i < cData.length; i++) {
      if (cData[i].board_idx === Number(e)) {
        this.setState({
          boardIdx: cData[i].board_idx,
          boardName: cData[i].board_title,
          boardDesc: cData[i].board_desc,
          isPrivate: cData[i].is_private 
        })
      }
    }
  }

  handleAddList = (d) => {
    let listName = d[0];
    let { list_idx, origin_list_idx } = d[1];
    let lastList = {...d[1]};

    lastList.list_title = listName;
    lastList.list_idx = list_idx + 1;
    lastList.origin_list_idx = origin_list_idx + 1;
    lastList.card_desc = "";
    lastList.card_title = "";
    console.log(lastList);

    let { data } = this.state
    this.setState({
      data: [...data, lastList]
    })
  }

  handleAddCard = (v1, v2) => {
    let { data } = this.state;
    
    let lastCard = data[data.length - 1]
    let lastCardIdx = lastCard.origin_card_idx;

    let currentCardData = {...v2};
    
    currentCardData.origin_card_idx = lastCardIdx + 1;
    currentCardData.card_desc = v1;

    if (v1 !== ''){
      this.setState({
        data: [...data, currentCardData]
      })
    }
  }

  render() {
    const { boardDesc, 
            boardName, 
            data,
            boardIdx,
            inputValue,
            isPrivate } = this.state;

    return (
      <div>
        <Top boardDesc={boardDesc} 
        boardName={boardName}
        isPrivate={isPrivate}
        boardIdx={boardIdx}
        />
        <div className='side_bar'>
          <Sidebar data={data} 
          onClickBoard={this.handleClickChange} />
        </div>
        <List data={data} 
        boardIdx={boardIdx}
        //onInputChange={this.handleInputChange}
        onCreate={this.handleAddList} // list를 추가는 함수
        onCardCreate={this.handleAddCard} // card를 추가하는 함수
        inputValue={inputValue}
        />
      </div>
    );
  }
}

export default Board;