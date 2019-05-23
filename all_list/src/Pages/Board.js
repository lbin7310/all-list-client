import React from "react";
import Sidebar from "../Component/Board/Sidebar";
import Top from "../Component/Board/Top";
import Lists from "../Component/Board/Lists";
import "./Board.css";
import { fakeData } from "../fakeData";
import {
  Redirect
} from "react-router-dom";

// process env node_env

class Board extends React.Component {
  constructor() {
    super();
    this.state = {
      allData: "",
      data: fakeData,
      boardIdx: null,
      boardName: "",
      boardDesc: "",
      userId: 0,
      isPrivate: 0,
      boardNameEdit: "",
      boardDescriptionEdit: ""
    };
  }

  reFetch = boardidx => {
    return fetch("http://localhost:9089/board/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        info: JSON.stringify({ origin_board_idx: boardidx })
      }
    }).then(res => res.json());
  };

  componentDidMount() {
    const { userId } = this.state;
    const boardIdx = this.props.match.params.id;
    this.reFetch(boardIdx).then(json => {
      return this.setState({
        data: json,
        boardIdx: json[0].origin_board_idx,
        boardName: json[0].board_title,
        boardDesc: json[0].board_desc,
        userId: JSON.parse(window.localStorage.getItem("userInfo")).data[0].origin_user_idx,
        isPrivate: json[0].is_private
      });
    });

    fetch("http://localhost:9089/lender", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        info: JSON.stringify({
          origin_user_idx: Number(userId)
        })
      }
    })
      .then(res => res.json())
      .then(json => {
        if (json !== null) {
          return this.setState({
            allData: json
          });
        }
      });
  }

  // sidebar에서 board 이름을 클릭하게 되면 Top에 이름이 바뀌면서
  // Top의 boardNamde 바뀌게 된다.
  handleClickChange = (e, sideData) => {
    let { userId, data, boardIdx } = this.state;
    let cData = [...sideData];
    for (let i = 0; i < cData.length; i++) {
      if (cData[i].origin_board_idx === Number(e)) {
        this.reFetch(Number(e))
          .then(json => {
            this.setState({
              data: json,
              boardIdx: cData[i].origin_board_idx,
              boardName: cData[i].board_title,
              boardDesc: cData[i].board_desc,
              userId,
              isPrivate: cData[i].is_private
            });
          })
          .then(res => this.props.history.push(`/board/${boardIdx}`));
      }
    }
  };

  // list 추가
  handleAddList = d => {
    let listName = d;
    let { boardIdx, userId } = this.state;
    let listReq = {
      list_title: listName,
      origin_board_idx: boardIdx,
      origin_user_idx: userId
    };

    let listObj = {
      method: "POST",
      body: JSON.stringify(listReq),
      headers: {
        "Content-Type": "application/json"
      }
    };

    fetch("http://localhost:9089/list", listObj)
      .then(res => res.json())
      .then(json => {
        if (json) {
          // true
          return this.reFetch(boardIdx);
        }
      })
      .then(json =>
        this.setState({
          data: json
        })
      );
    // json의 값이 true면 fetch를 한다.
  };

  // card 추가
  handleAddCard = (v1, v2) => {
    let { userId, boardIdx } = this.state;

    let cardReq = {
      origin_list_idx: v2,
      origin_user_idx: userId,
      card_title: v1,
      card_desc: v1
    };

    let cardObj = {
      method: "POST",
      body: JSON.stringify(cardReq),
      headers: {
        "Content-Type": "application/json"
      }
    };

    if (v1 !== null) {
      fetch("http://localhost:9089/card", cardObj)
        .then(res => res.json())
        .then(json => {
          if (json) {
            return this.reFetch(boardIdx);
          }
        })
        .then(json => {
          return this.setState({
            data: json
          });
        });
    }
  };

  // card 제거
  handleRemoveCard = v => {
    const { boardIdx } = this.state;

    let removeReq = {
      origin_card_idx: v
    };

    fetch("http://localhost:9089/card", {
      method: "DELETE",
      body: JSON.stringify(removeReq),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(json => {
        if (json) {
          return this.reFetch(boardIdx);
        }
      })
      .then(json =>
        this.setState({
          data: json
        })
      );
  };

  // card 수정
  handleEditCard = (cardIdx, editValue) => {
    let { boardIdx } = this.state;

    let editCardReq = {
      origin_card_idx: cardIdx,
      card_title: editValue,
      card_desc: editValue
    };

    fetch("http://localhost:9089/card", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(editCardReq)
    })
      .then(res => res.json())
      .then(json => {
        if (json) {
          return this.reFetch(boardIdx);
        }
      })
      .then(json => {
        this.setState({
          data: json
        });
      });
  };

  handleRemoveList = (listIdx, listTitle) => {
    const { boardIdx } = this.state;

    let listRemoveReq = {
      origin_list_idx: listIdx,
      list_title: null
    };

    fetch("http://localhost:9089/list", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(listRemoveReq)
    })
      .then(res => res.json())
      .then(json => {
        if (json) {
          return this.reFetch(boardIdx);
        }
      })
      .then(json =>
        this.setState({
          data: json
        })
      );
  };

  handleEditList = (listIdx, editValue) => {
    let { boardIdx } = this.state;

    let editListReq = {
      origin_list_idx: listIdx,
      list_title: editValue
    };

    fetch("http://localhost:9089/list", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(editListReq)
    })
      .then(res => res.json())
      .then(json => {
        if (json) {
          return this.reFetch(boardIdx);
        }
      })
      .then(json => {
        this.setState({
          data: json
        });
      });
  };
  // 보더 이름 수정.
  handleEditBoard = (boardIdx, edit) => {
    let { userId } = this.state;

    let boardEdit = {
      origin_board_idx: boardIdx,
      board_title: edit.boardName,
      board_desc: edit.boardDesc
    };

    let boardEditReq = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(boardEdit)
    };

    fetch("http://localhost:9089/board", boardEditReq)
      .then(res => res.json())
      .then(json => {
        if (json) {
          return this.reFetch(boardIdx);
        }
      })
      .then(json => {
        this.setState({
          data: json,
          boardName: json[0].board_title,
          boardDesc: json[0].board_desc
        });
      });

    fetch("http://localhost:9089/lender", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        info: JSON.stringify({
          origin_user_idx: Number(userId)
        })
      }
    })
      .then(res => res.json())
      .then(json => {
        if (json !== null) {
          return this.setState({
            allData: json
          });
        }
      });
  };

  render() {
    if (this.props.isLogin === false) {
      return <Redirect to="/" />;
    }
    const {
      boardDesc,
      boardName,
      data,
      boardIdx,
      inputValue,
      isPrivate,
      userId,
      allData
    } = this.state;
    console.log(
      JSON.parse(window.localStorage.getItem("userInfo")).data[0]
        .origin_user_idx
    );

    return (
      <div>
        <Top
          boardDesc={boardDesc}
          boardName={boardName}
          isPrivate={isPrivate}
          boardIdx={boardIdx}
          onEditBoard={this.handleEditBoard}
        />
        <div className="side_bar">
          <Sidebar
            data={allData}
            onClickBoard={this.handleClickChange}
            userId={userId}
          />
        </div>
        <Lists
          data={data}
          boardIdx={boardIdx}
          inputValue={inputValue}
          onCreate={this.handleAddList} // list를 추가는 함수
          onRemoveList={this.handleRemoveList} // list 제거
          onCardCreate={this.handleAddCard} // card를 추가하는 함수
          onRemoveCard={this.handleRemoveCard} // card 제거하는 버튼
          onEditCard={this.handleEditCard} // card 수정하는 버튼
          onEditList={this.handleEditList} // list 수정하는 함수
        />
      </div>
    );
  }
}

export default Board;
