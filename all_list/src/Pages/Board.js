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
      userId: fakeData[0].owner_idx,
      isPrivate: fakeData[0].is_private
    }
  }

  componentDidMount () {
       
    fetch("http://localhost:9089/board", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "info": JSON.stringify( { origin_board_idx : 1 } )
      }
    })
    .then(res => res.json())
    .then( json => {
      return this.setState({
        data: json
      }) 
    })
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
          userId: cData[i].owner_idx,
          isPrivate: cData[i].is_private 
        })
      }
    }
  }

  handleAddList = (d) => {
    let listName = d;
    let { boardIdx, userId } = this.state;

    let listReq = {
      list_title: listName,
      origin_board_idx: boardIdx,
      origin_user_idx: userId 
    } 

    let listObj = {
      method: "POST",
      body: JSON.stringify( listReq ),
      headers: {
        "Content-Type": "application/json"
      }
    }

    fetch("http://localhost:9089/list", listObj)
    .then(res => res.json())
    .then(json => {
      if (json) { // true
        return fetch("http://localhost:9089/board/",  {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "info": JSON.stringify( { origin_board_idx : 1 } )
          }
        })
        .then( res => res.json())
      }
    })
    .then(json => 
      this.setState({
        data: json
      }));
    // json의 값이 true면 fetch를 한다.
  }

  handleAddCard = (v1, v2) => {
    let { userId } = this.state
    
    let cardReq = {
      origin_list_idx: v2,
      origin_user_idx: userId,
      card_title: v1,
      card_desc: v1
    }

    let cardObj = {
      method: "POST",
      body: JSON.stringify(cardReq),
      headers: {
        "Content-Type": "application/json"
      }
    }

    fetch("http://localhost:9089/card", cardObj)
    .then(res => res.json())
    .then(json => {
      console.log(json);
      if (json){
        return fetch("http://localhost:9089/board", {
          method:"GET",
          headers: {
            "Content-Type": "application/json",
            "info": JSON.stringify( {origin_board_idx : 1} )
          }
        })
        .then(res => res.json())
      }
    })
    .then(json => 
      this.setState({
        data: json
      })
    );
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
        onRemoveCard={this.handleRemoveCard} // card 제거하는 버튼
        />
      </div>
    );
  }
}

export default Board;