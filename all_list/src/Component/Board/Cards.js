import React, { Component } from 'react';
import Card from './Card';
import './Card.css';

class Cards extends Component {
  constructor () {
    super ()
    this.state={
      cardValue: '',
      editing: false
    }
  }

  // list 안에 있는 input 창에서 값을 입력하면 여기 component에 있는 
  // state의 cardValue를 변경하는 함수
  handleCardInputChange = (e) => { 
    this.setState({
      cardValue: e.target.value
    }) 
  }

  // state의 cardValue를 board component에 보내주는 함수
  handleCardValueSubmit = (e, cardData) => {
    e.preventDefault();
    let { cardValue } = this.state;
    if ( cardValue !== '' ){
      this.props.onCardCreate(cardValue, cardData);
  
      this.setState({
        cardValue: ''
      })
    }
  } 

  render() {
    let collectCard = [];
    
    const { cardValue } = this.state; 
    const { data,
            boardIdx,
            listIdx,
            onRemoveCard,
            onEditCard
          } = this.props; 
    
    for (let i = 0; i < data.length; i++) {
      if (data[i].board_idx === boardIdx &&
        data[i].list_idx === Number(listIdx)) {
          collectCard.push(data[i]);
      }
    }

    return (
      <div className="cards">
        {collectCard.map( data => {
          return <Card onRemoveCard={onRemoveCard}
                       onEditCard={onEditCard}
                       data={data}
                       cardIdx={data.origin_card_idx}
                       key={data.origin_card_idx}
                      />
        })}
        <form onSubmit={ (e) => this.handleCardValueSubmit(e, listIdx)}>
          <input type="text"
            placeholder="할 일"
            value={cardValue}
            name="cardValue"
            onChange={this.handleCardInputChange}
          /><button type="submit">+</button>
        </form>
      </div>
    )
  }
}

export default Cards;
