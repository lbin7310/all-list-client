import React from 'react';
import './Card.css';

let Card = (props) => {
  console.log(props);
  let list = props.listName;
  let card = props.card
  let cardTodo = [];
  for (let i = 0; i < card.length; i++) {
    if (list.listName === card[i].listName &&
       list.boardName === card[i].boardName &&
       list.isPrivate === card[i].isPrivate) {
      cardTodo.push(card[i].todo)
    }
  }
  console.log(cardTodo);
  return (
    <div className="cards">
      {cardTodo.map((todo, i) => {
        return <div className="card" key={i}>{todo}</div>
      })}
    </div>
  )
}

export default Card;
