import React from 'react';
import Card from './Card';
import './List.css';

let List = (props) => {
  let collectList = {};

  for (let i = 0; i < props.data.length; i++) {
    if (props.data[i].board_idx === props.boardIdx) {
      if (collectList[props.data[i].list_idx] === undefined) {
        collectList[props.data[i].list_idx] = props.data[i].list_title;
      }
    }
  }

  let collect = []
  for (let key in collectList) {
    collect.push({ listIdx: key, listName: collectList[key] })
  }

  return (
    <div className="board_lists">
      <div className="list_plus">
        <span className="list_plus_title"
          onClick={(e) => props.onAddList(e)}
        >List 추가하기<button>+</button></span>
      </div>
      <div className="lists">
        {collect.map(data => {
          return (
            <div className="list" key={data.listIdx}>
              <div className="list_title">
                {data.listName}
                <Card listIdx={data.listIdx}
                  boardIdx={props.boardIdx}
                  data={props.data}/>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default List;
