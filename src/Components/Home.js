import React, { Component } from "react";

import Messaging from "./messaging/Messaging";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="App">
        <Messaging />
      </div>
    );
  }
}

export default Home;
