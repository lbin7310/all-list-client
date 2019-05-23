import React, { Component } from 'react';
import Cards from './Cards';

class List extends Component {
  constructor() {
    super()
    this.state={
      listNameEdit: '',
      editing: false
    }
  }
  handleInputListChange = (e) => {
    this.setState({
      listNameEdit: e.target.value
    })
  }
  
  // list의 이름을 변경하는 함수
  handleToggleEdit = (v) => {
    console.log('aaaaaaaa');
    const { editing } = this.state;
    this.setState({ editing: !editing });
  }

  componentDidUpdate(prevProps, prevState) {
    const { onEditList, listValue, listIdx } = this.props;
    const { listNameEdit } = this.state;

    if (!prevState.editing && this.state.editing) {
      this.setState({
        listNameEdit: listValue
      })
    }

    if (prevState.editing && !this.state.editing) {
      onEditList( listIdx, listNameEdit )
    }
  }

  render() {
    const { editing,
            listNameEdit} = this.state;

    const { onCardCreate,
            boardIdx,
            data,
            onCardSubmit,
            onRemoveCard,
            onEditCard,
            cardData,
            onRemoveList } = this.props;

    if ( editing ) {
      return (
        <div>
          <div>
            <input
              value={listNameEdit}
              placeholder="리스트 수정"
              onChange={this.handleInputListChange}
            />
          </div>
          <button onClick={this.handleToggleEdit}>적용</button>
          <button onClick={ () => onRemoveList(cardData.listIdx, cardData.listName)}>삭제</button>
        </div>
      )
    }
    return (
      <div className="list" key={cardData.listIdx}>
        <div className="list_title">
          <div className="list_name">
            <div>{cardData.listName}</div>
            <div className="list_buttons">
              <button onClick={this.handleToggleEdit}>수정</button>
              <button onClick={ () => onRemoveList(cardData.listIdx, cardData.listName)}>삭제</button>
            </div>
          </div>
          <Cards listIdx={cardData.listIdx}
            onCardCreate={onCardCreate}
            boardIdx={boardIdx}
            data={data}
            onCardSubmit={onCardSubmit}
            onRemoveCard={onRemoveCard}
            onEditCard={onEditCard}/>
        </div>
      </div>
    )
  }
}


export default List;