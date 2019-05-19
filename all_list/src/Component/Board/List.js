import React from 'react';
import Card from './Card';
import './List.css';

let List = (props) => {
  console.log(props.list, '<----------listNames');
  console.log(props.boardName, '<--------boardName');
  let collection = [];
  for (let i = 0; i < props.list.length; i++) {
    if (props.boardName === props.list[i].boardName &&
        props.list[i].isPrivate === 0) {
      collection.push(props.list[i])
    }
  }
  console.log(collection);
  return (
    <div className="board_lists">
      <div className="list_plus">
        <div className="list_plus_title">+ 추가하기</div>
      </div>
      {collection.map((data, i) => {
        return (
          <div>
            <div className="list">
              <div className="list_title" key={i}>{data.listName}</div>
              <Card listName={data} card={props.card}/>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default List;
