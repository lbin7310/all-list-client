import React from 'react';

let Top = (props) => {
  return (
    <nav>
      <div>
        <div>{props.boardName}</div>
        <div>{props.boardDesc}</div>
      </div>
      <div>2019</div>
    </nav>
  )
}

export default Top;
