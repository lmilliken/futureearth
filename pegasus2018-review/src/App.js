import React, { Component } from "react";
import axios from "axios";
import "./App.css";
require("dotenv").config();
const keys = require("./keys.js");

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.checkAuthUser = this.checkAuthUser.bind(this);
  }

  async componentWillMount() {
    const data = await this.checkAuthUser();
    console.log(data.data);
    console.log("cookie", document.cookie);
  }

  async checkAuthUser() {
    // why is process.env.HL_KEY not working?
    var authOptions = {
      method: "GET",
      url: "https://api.connectedcommunity.org/api/v2.0/Contacts/GetWhoAmI",
      withCredentials: true,
      headers: {
        HLIAMKey: keys.HL_KEY
      }
    };

    return axios(authOptions)
      .then(res => res)
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">PEGASuS Review</h1>
        </header>
        <p className="App-intro" />
      </div>
    );
  }
}

export default App;
