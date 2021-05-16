import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import React, { Component } from "react";
import config from "../../data.json";
import Rooms from "./Rooms";
import Message from "./Message";

class Messaging extends Component {
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

  componentDidMount() {
    this.setState({
      currentUser: "User" + Math.floor(Math.random() * 1000000 + 1),
    });
    this.setState({ data: config });
    this.setState({ currentRoom: "General" });
    if (document.getElementsByClassName("emoji-mart-bar")[1]) {
      document.getElementsByClassName("emoji-mart-bar")[1].style.display =
        "none";
    }
  }

  valueChange = (e) => {
    this.setState({ message: e.target.value });
  };

  putMessage = () => {
    this.setState({ showMessage: false });
    let d = new Date();
    d = d.toISOString();

    let temp = { ...this.state.data };

    temp[this.state.currentRoom].push({
      user: this.state.currentUser,
      date: d,
      message: this.state.message,
    });
    this.setState({ data: temp });
    this.setState({ message: "" });
  };

  sendMessage = (e) => {
    if (this.state.message.length > 0) {
      this.putMessage();
    }
  };

  componentDidUpdate() {
    this.updateScroll();
    if (document.getElementsByClassName("emoji-mart-bar")[1]) {
      document.getElementsByClassName("emoji-mart-bar")[1].style.display =
        "none";
    }
  }

  sendMessageEnter = (e) => {
    if (e.key === "Enter" && this.state.message.length > 0) {
      this.putMessage();
    }
  };

  updateScroll = () => {
    var element = document.getElementById("container");
    element.scrollTop = element.scrollHeight;
  };

  roomClicked = (e) => {
    this.setState({ currentRoom: e.target.id });
    this.getAll(e.target.id);
  };

  addEmoji = (e) => {
    this.setState({ message: this.state.message + e.native });
    this.setState({ emoji: false });
  };

  render() {
    return (
      <div
        style={{
          width: 1000,
          margin: "0 auto",
          height: 600,
        }}
        className="box"
      >
        <div style={{ height: "100%" }} className="columns">
          <div className="column is-3">
            <div className="box">
              <h1 style={{ marginBottom: 8 }}>Choose a username : </h1>
              <input
                onChange={(e) => this.setState({ currentUser: e.target.value })}
                className="input is-rounded"
                placeHolder="username"
              ></input>
            </div>

            <div style={{ height: "76%" }} className="box">
              <h1>Rooms</h1>
              <hr></hr>
              <br></br>
              <Rooms
                currentRoom={(room) => this.setState({ currentRoom: room })}
              />
            </div>
          </div>
          <div className="column">
            <div style={{ height: "100%", width: 660 }} className="box">
              <div style={{ height: "94%", width: "100%" }} className="columns">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    flexDirection: "column",
                  }}
                  className="column"
                >
                  <div id="container">
                    <Message
                      currentUser={this.state.currentUser}
                      data={this.state.data}
                      currentRoom={this.state.currentRoom}
                    />
                  </div>
                </div>
              </div>
              <div
                style={{
                  left: 5,
                  position: "relative",
                }}
                className="columns"
              >
                <div className="column ">
                  <div className="columns">
                    <div className="column">
                      <input
                        value={this.state.message}
                        onKeyDown={(e) => {
                          this.sendMessageEnter(e);
                        }}
                        onChange={(e) => this.valueChange(e)}
                        placeholder="Enter message here ..."
                        className="input is-rounded"
                      ></input>
                    </div>
                    <div className="column is-1">
                      <i
                        style={{ fontSize: 27 }}
                        onClick={(e) =>
                          this.setState({ emoji: !this.state.emoji })
                        }
                        class="far fa-smile"
                      ></i>
                    </div>
                  </div>
                  {this.state.emoji && <Picker onSelect={this.addEmoji} />}
                </div>
                <div className="column is-1">
                  <i
                    onClick={(e) => {
                      this.sendMessage(e);
                    }}
                    style={{ fontSize: 24 }}
                    class="far fa-paper-plane"
                  ></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Messaging;
