import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submitStatus: "new",
      data: {}
    };

    this.getProposals = this.getProposals.bind(this);
  }

  componentWillMount() {
    console.log("component is about to mount!");
    var data = this.getProposals();
    this.setState({ data: data });
  }

  getProposals() {
    console.log("in get proposals");
    fetch("http://localhost:8081/proposals", {
      method: "GET"
    })
      .then(response => {
        console.log("stuff that I got", response);
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
