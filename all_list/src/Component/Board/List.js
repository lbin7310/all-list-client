import React, { Component } from 'react';
import Card from './Card';
import './List.css';

class List extends Component {
  constructor(){
    super()
    this.state={
      listValue: '',
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
  const { data, boardIdx, onCardCreate, onRemoveCard } = this.props; // Board에서 받은 props
  
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

  const { listValue } = this.state

    return (
      <div className="board_lists">
        <div className="list_plus list_plus_title">
          <form onSubmit={ (e) => this.handleSubmit(e)}>
            <input type='text'
              placeholder='추가하기'
              value={listValue}
              onChange={this.handleInputChange}
              name='listValue'
            />
            <button type="submit">+</button>
          </form>
        </div>
        <div className="lists">
          {collect.map(d => {
            return (
              <div className="list" key={d.listIdx}>
                <div className="list_title">
                  {d.listName}
                  <Card listIdx={d.listIdx}
                    onCardCreate={onCardCreate}
                    boardIdx={boardIdx}
                    data={data}
                    onCardSubmit={this.handleCardValueSubmit}
                    onRemoveCard={onRemoveCard}/>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  } 
}

export default List;
