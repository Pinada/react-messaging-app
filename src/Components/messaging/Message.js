import "emoji-mart/css/emoji-mart.css";
import React, { Component } from "react";
import config from "../../data.json";


class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      data: config,
      emoji: false,
      currentRoom: "General",
      rooms: [
        { name: "General", id: 1 },
        { name: "Questions", id: 2 },
      ],
    };
  }

  
  render() {
    let messages = [];

    for (const  item of this.props.data[this.props.currentRoom]) {
      let first = item.date.split`T`[0].replaceAll("-", "/") + "-";
      let second = item.date.split`T`[1].split`:`[0] + ":";
      let third = item.date.split`T`[1].split`:`[1];
      let d = first + second + third;
      messages.push(
        <div style={{overflow:"auto"}}>
          <div
            style={{
              textAlign: item.user == this.props.currentUser ? "right" : "left",
              float: item.user == this.props.currentUser ? "right" : "left",
              fontSize: 8,
              marginLeft: 15,
              marginRight: 15,
            }}
          >
            <span
              style={{
                fontSize: 12,
              }}
            >
              {item.user} -
            </span>

            <span
              style={{
                fontSize: 8,
              }}
            >
              {d}
            </span>
          </div>
          <br></br>

          <div
            style={{
              textAlign: item.user == this.props.currentUser ? "left" : "left",
              float: item.user == this.props.currentUser ? "right" : "left",
              backgroundColor:
                item.user == this.props.currentUser
                  ? "rgb(68, 101, 248)"
                  : "rgb(53, 209, 105)",
            }}
            className="singleMessage"
          >
            {item.message}
          </div>
        </div>
      );
    }
  
    return (
      <div>
        {messages}        
      </div>
    );
  }
}

export default Message;
