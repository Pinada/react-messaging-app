import React, { Component } from "react";

class Rooms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: [
        { name: "General", id: 1 },
        { name: "Questions", id: 2 },
      ],
    };
  }

  roomClicked = (e) => {
    this.props.currentRoom(e.target.id);
  };

  render() {
    let rooms = [];
    for (const item of this.state.rooms) {
      rooms.push(
        <h1
          onClick={(e) => {
            this.roomClicked(e);
          }}
          id={item.name}
          className={
            this.state.currentRoom == item.id ? "hover active" : "hover"
          }
        >
          {item.name}
        </h1>
      );
    }
    return <div>{rooms}</div>;
  }
}

export default Rooms;
