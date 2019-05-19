import React from 'react';
import './Card.css';

let Card = (props) => {
  let collectCard = [];
  console.log(props.listIdx);
  for (let i = 0; i < props.data.length; i++) {
    if (props.data[i].board_idx === props.boardIdx &&
        props.data[i].list_idx === Number(props.listIdx)) {
      collectCard.push(props.data[i]);
    }
  }

  console.log(collectCard);
  return (
    <div className="cards">
      {collectCard.map(data => {
        return <li key={data.origin_card_idx}>{data.card_desc}</li>
      })}
    </div>
  )
}

export default Card;
