import React, { Component } from 'react';
import './Card.css';

class Card extends Component {
  constructor () {
    super ()
    this.state={
      cardValue: ''
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
    this.props.onCardCreate(cardValue, cardData);

    this.setState({
      cardValue: ''
    })
  } 

  render() {
    let collectCard = [];
    
    const { cardValue } = this.state; // state cardValue
    const { data, boardIdx, listIdx } = this.props; // props
    
    for (let i = 0; i < data.length; i++) {
      if (data[i].board_idx === boardIdx &&
        data[i].list_idx === Number(listIdx)) {
          collectCard.push(data[i]);
        }
      }
      
    // card를 추가하기 위해 마지막 idx를 얻기 위한 값
    let currentCard = collectCard[collectCard.length - 1]; 

    return (
      <div className="cards">
        {collectCard.map(data => {
          if (data.card_desc !== '') {
            return (
              <div className="card" key={data.origin_card_idx}>
                <div >{data.card_desc}</div>
              </div>
            )
          }
        })}
        <form onSubmit={ (e) => this.handleCardValueSubmit(e, currentCard)}>
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

export default Card;
