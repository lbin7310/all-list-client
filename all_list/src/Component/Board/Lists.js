import React, { Component } from 'react';
import Cards from './Cards';
import List from './List';
import './List.css';

class Lists extends Component {
  constructor(){
    super()
    this.state={
      listValue: '',
      editing: false
    }
  }

  // list를 추가하는 input창에서 값을 입력하면 state listValue가 바뀜
  handleInputChange = (e) => {
    this.setState({
      listValue: e.target.value
    }) 
  }

  // list 추가할 때 보내주는 list_title 값
  handleSubmit = (e) => {
    e.preventDefault();
    let { listValue } = this.state 
    if (listValue !== ''){
      this.props.onCreate(listValue);
    }
    
    this.setState({
      listValue: ''
    })
  }

  render() {
  const { data,
          boardIdx,
          onCardCreate,
          onRemoveCard,
          onEditCard,
          onRemoveList,
          onEditList } = this.props; // Board에서 받은 props
          
  const { listValue } = this.state
  
  let collectList = {};
  let originListIdx = [];
  for (let i = 0; i < data.length; i++) {
    if ( data[i].board_idx === boardIdx) {
      if (collectList[data[i].origin_list_idx] === undefined) {
        collectList[data[i].origin_list_idx] = data[i].list_title;
        originListIdx.push(data[i]);
      }
    }
  }

  let collect = []

  for (let key in collectList) {
    collect.push({ listIdx: key, listName: collectList[key] })
  }

    return (
      <div className="board_lists">
        <div className="list_plus list_plus_title">
          <form onSubmit={ (e) => this.handleSubmit(e)}>
            <input  
              className="k_input k_make_list_input"
              type='text'
              placeholder='리스트 생성'
              value={listValue}
              onChange={this.handleInputChange}
              name='listValue'
            />
            <button type="submit">+</button>
          </form>
        </div>
        <div className="lists">
          {collect.map(d => {
            return <List 
              cardData={d}
              listIdx={d.listIdx}
              onCardCreate={onCardCreate}
              boardIdx={boardIdx}
              data={data}
              onCardSubmit={this.handleCardValueSubmit}
              onRemoveCard={onRemoveCard}
              onEditCard={onEditCard}
              onRemoveList={onRemoveList}
              key={d.listIdx}
              onEditList={onEditList}
              listValue={listValue}
            />
          })}
        </div>
      </div>
    )
  } 
}

export default Lists;
