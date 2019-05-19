import React from 'react';

let Top = (props) => {
  console.log(props.data);
  return (
    <nav>
      <div>
        <div>{props.data.board_title}</div>
        <div>{props.data.board_desc}</div>
      </div>
      <div>2019</div>
    </nav>
  )
}

export default Top;
