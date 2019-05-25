import React, { Component } from 'react';

class Card extends Component {
  constructor () {
    super()
    this.state = {
      cardEditValue: '',
      editing: false
    }
  }

  handleToggleEdit = () => {
    const { editing } = this.state;
    this.setState({ editing: !editing});
  }

  handleCardInputChange = (e) => { 
    this.setState({
      cardEditValue: e.target.value
    }) 

  }

  componentDidUpdate(prevProps, prevState) {

    const { cardValue, onEditCard, cardIdx } = this.props
    const { cardEditValue } = this.state;

    if (!prevState.editing && this.state.editing){
      this.setState({
        cardValue: cardValue
      })
    }

    if (prevState.editing && !this.state.editing) {
      onEditCard(cardIdx, cardEditValue);
    }
  }


  render() {
    const { editing } = this.state;
    const { onRemoveCard, data } = this.props
    if (editing) {
      return (
        <div>
          <div>
            <input className="k_input k_card_input"
              value={this.state.cardEditValue}
              placeholder="할 일 수정"
              onChange={this.handleCardInputChange}
            />
          </div>
          <button onClick={this.handleToggleEdit}>적용</button>
          <button onClick={ () => onRemoveCard(data.origin_card_idx)}>삭제</button>
        </div>
      )
    }

    if (data.card_desc !== '') {
      return (
        <div className="card" key={data.origin_card_idx}>
          <div className="card_description">{data.card_desc}</div>
          <div>
            <div className="fas fa-pencil-alt k_c_pencil"
            // 할 일 내용 수정.
              onClick={this.handleToggleEdit}></div>
            <div className="fas fa-eraser"
            // 할 일 내용 제거.
              onClick={ () => onRemoveCard(data.origin_card_idx)}></div>
          </div>
        </div>
      )
    }
  }
}

export default Card;
